import { Commission } from '../data/models';
import { textureModelMap } from '../data/models';

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

// Fetches commission data from the serverless API and parses it into RawCommissionData[]
export async function fetchCommissionData(): Promise<RawCommissionData[]> {
  try {
    const response = await fetch('/api/commissions', {
      cache: 'no-store',
      headers: { 'Accept': 'application/json' }
    });
    if (!response.ok) {
      console.error(`Failed to fetch commission data: ${response.status} ${response.statusText}`);
      return [];
    }
    const data = await response.json();
    if (!data || !Array.isArray(data) || data.length === 0) return [];

    // Convert API rows to RawCommissionData objects
    return data.reduce<RawCommissionData[]>((acc, row) => {
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
  } catch (err) {
    console.error('Error fetching commission data:', err);
    return [];
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
      // Only process if the modelName exists in textureModelMap
      if (!textureModelMap[modelName]) continue;
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
  // Only return commissions if the modelName exists in textureModelMap
  if (!textureModelMap[modelName]) return [];
  return commissionsByModel[modelName] || [];
}
