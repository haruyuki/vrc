import { Commission } from '../data/models';
import Papa from 'papaparse';

const SPREADSHEET_ID = import.meta.env.VITE_SPREADSHEET_ID;
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SPREADSHEET_ID}/pub?output=csv`;

interface RawCommissionData {
  id: string;
  date: string;
  commissioner: string;
  modelName: string;
  hasImage1: boolean;
  hasImage2: boolean;
  hasImage3: boolean;
  hasImage4: boolean;
}

// Fetches commission data from the Google Sheet and parses it into RawCommissionData[]
export async function fetchCommissionData(): Promise<RawCommissionData[]> {
  try {
    const response = await fetch(SHEET_URL, {
      cache: 'no-store',
      headers: { 'Accept': 'text/csv' }
    });
    if (!response.ok) {
      console.error(`Failed to fetch spreadsheet data: ${response.status} ${response.statusText}`);
      return [];
    }
    const csvText = await response.text();
    if (!csvText || csvText.trim().length === 0) return [];

    // Parse CSV using PapaParse
    const parsed = Papa.parse<Record<string, never>>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });
    if (!parsed.data || !Array.isArray(parsed.data) || parsed.data.length === 0) return [];

    // Convert parsed rows to RawCommissionData objects
    return parsed.data.reduce<RawCommissionData[]>((acc, row) => {
      if (row["ID"] && row["Model Name"]) {
        acc.push({
          id: row["ID"],
          date: row["Date"] || '',
          commissioner: row["Commissioner"] || '',
          modelName: row["Model Name"],
          hasImage1: !!row["IMG 1"],
          hasImage2: !!row["IMG 2"],
          hasImage3: !!row["IMG 3"],
          hasImage4: !!row["IMG 4"]
        });
      }
      return acc;
    }, []);
  } catch (error) {
    console.error('Error fetching commission data:', error);
    throw error;
  }
}

// Helper to format date from 'DD/MM/YYYY' to 'YYYY-MM-DD'
function formatDate(date?: string): string {
  if (date && date.includes('/')) {
    const [day, month, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  return date || '';
}

// Helper to build image paths for a commission
function buildImagePaths(modelName: string, commissionId: string, hasImages: boolean[]): string[] {
  const modelDir = modelName.replace(/\s+/g, '');
  return hasImages
    .map((hasImg, idx) =>
      hasImg ? `assets/images/commissions/${modelDir}/${commissionId}-${idx + 1}.webp` : null
    )
    .filter(Boolean) as string[];
}

// Processes raw commission data into a record grouped by model name
export function processCommissionData(rawData: RawCommissionData[]): Record<string, Commission[]> {
  const modelCommissions: Record<string, Commission[]> = {};
  if (!rawData || !Array.isArray(rawData)) return {};

  for (const rawCommission of rawData) {
    try {
      const { id, date, commissioner, modelName, hasImage1, hasImage2, hasImage3, hasImage4 } = rawCommission;
      const formattedDate = formatDate(date);
      const idParts = id.split('/');
      const commissionId = idParts.length > 1 ? idParts[idParts.length - 1] : id;
      const images = buildImagePaths(modelName, commissionId, [hasImage1, hasImage2, hasImage3, hasImage4]);
      const commission: Commission = {
        id: commissionId,
        images,
        commissioner: commissioner || 'Unknown',
        date: formattedDate
      };
      if (!modelCommissions[modelName]) modelCommissions[modelName] = [];
      modelCommissions[modelName].push(commission);
    } catch (error) {
      console.error('Error processing commission:', rawCommission, error);
    }
  }

  // Sort commissions for each model by date (descending)
  for (const modelName in modelCommissions) {
    modelCommissions[modelName].sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return b.date.localeCompare(a.date);
    });
  }
  return modelCommissions;
}

// Store processed commissions in memory for easy access
let commissionsByModel: Record<string, Commission[]> = {};

// Initializes the commissionsByModel cache
export async function initializeCommissions() {
  const rawData = await fetchCommissionData();
  commissionsByModel = processCommissionData(rawData);
}

// Retrieves all commissions for a given model
export function getCommissionsForModel(modelName: string): Commission[] {
  return commissionsByModel[modelName] || [];
}
