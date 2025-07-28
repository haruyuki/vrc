import { NextResponse } from 'next/server';
import { Commissioner } from '@/types';

// HTTP cache headers configuration
const CACHE_DURATION = 5 * 60; // 5 minutes in seconds
const STALE_WHILE_REVALIDATE = 10 * 60; // 10 minutes

function parseDate(dateStr: string): string {
  // Assume dateStr is always valid and in AEST (already validated in Google Sheets)
  const [day, month, year] = dateStr.split('/').map((v) => v.padStart(2, '0'));
  return `${year}-${month}-${day}`;
}

function generateTextureImages(
  id: string,
  imageFlags: { img1: boolean; img2: boolean; img3: boolean; img4: boolean },
): Commissioner['textureImages'] {
  const [modelName, commissionId] = id.split('/');
  const baseUrl = `/assets/images/commissions/${modelName}`;

  return Object.entries(imageFlags).reduce<Commissioner['textureImages']>(
    (images, [, hasImage], index) => {
      if (hasImage) {
        const imageNumber = index + 1;
        images.push({
          id: `${id}-${imageNumber}`,
          url: `${baseUrl}/${commissionId}-${imageNumber}.webp`,
          alt: `${modelName} texture variant ${imageNumber} for ${commissionId}`,
        });
      }
      return images;
    },
    [],
  );
}

function parseCSV(csvText: string): Commissioner[] {
  const lines = csvText.trim().split('\n');
  const commissions: Commissioner[] = [];

  // Skip header row and process data
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue; // Skip empty lines

    const values = line.split(',');

    // Early validation to skip invalid rows
    if (values.length < 8) continue;

    // Extract and validate required fields
    const id = values[0]?.trim();
    const date = values[1]?.trim();
    const commissionerName = values[2]?.trim();
    const modelName = values[3]?.trim();

    try {
      const imageFlags = {
        img1: values[4]?.trim().toUpperCase() === 'TRUE',
        img2: values[5]?.trim().toUpperCase() === 'TRUE',
        img3: values[6]?.trim().toUpperCase() === 'TRUE',
        img4: values[7]?.trim().toUpperCase() === 'TRUE',
      };

      commissions.push({
        id,
        name: commissionerName,
        commissionDate: parseDate(date),
        modelName,
        textureImages: generateTextureImages(id, imageFlags),
      });
    } catch (error) {
      console.warn(`Skipping commission ${id} due to error:`, error);
    }
  }

  return commissions;
}

// Process commissions into grouped format
function processCommissions(commissions: Commissioner[]) {
  const modelMap = new Map<string, Commissioner[]>();

  commissions.forEach((commission) => {
    const modelName = commission.modelName;
    if (!modelMap.has(modelName)) {
      modelMap.set(modelName, []);
    }
    modelMap.get(modelName)!.push(commission);
  });

  // Convert to final format with pre-sorted data
  return Array.from(modelMap.entries()).map(([modelName, commissions]) => ({
    modelName,
    commissions: commissions.sort(
      (a, b) => new Date(b.commissionDate).getTime() - new Date(a.commissionDate).getTime(),
    ),
  }));
}

export async function GET(request: Request) {
  try {
    // Get the Google Sheets CSV URL from environment variables
    const spreadSheetId = process.env.GOOGLE_SHEETS_ID;

    if (!spreadSheetId) {
      return NextResponse.json({ error: 'Google Sheets ID not configured' }, { status: 500 });
    }

    const sheetsUrl = `https://docs.google.com/spreadsheets/d/e/${spreadSheetId}/pub?output=csv`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

    try {
      const response = await fetch(sheetsUrl, {
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Commission-API/1.0)',
          // Add If-Modified-Since header for conditional requests if available
          ...(request.headers.get('if-modified-since') && {
            'If-Modified-Since': request.headers.get('if-modified-since')!,
          }),
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const csvText = await response.text();

      // Process data
      const commissions = parseCSV(csvText);
      const models = processCommissions(commissions);

      // Create response with proper caching headers
      const jsonResponse = NextResponse.json({
        success: true,
        data: models,
        lastUpdated: new Date().toISOString(),
        stats: {
          totalCommissions: commissions.length,
          totalModels: models.length,
        },
      });

      const etag = Buffer.from(
        JSON.stringify({
          count: commissions.length,
          lastModified: new Date().toISOString().slice(0, 10),
        }),
      ).toString('base64');
      jsonResponse.headers.set(
        'Cache-Control',
        `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`,
      );
      jsonResponse.headers.set('ETag', `"${etag}"`);
      jsonResponse.headers.set('Last-Modified', new Date().toUTCString());
      jsonResponse.headers.set('Vary', 'Accept-Encoding');

      return jsonResponse;
    } catch (fetchError) {
      clearTimeout(timeoutId);
      throw fetchError;
    }
  } catch (error) {
    console.error('Error fetching commission data:', error);

    return NextResponse.json(
      {
        error: 'Failed to fetch commission data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}
