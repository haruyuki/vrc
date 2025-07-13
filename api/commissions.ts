import type { VercelRequest, VercelResponse } from '@vercel/node';
import Papa from 'papaparse';

const SPREADSHEET_ID = process.env.VITE_SPREADSHEET_ID || process.env.SPREADSHEET_ID;
const SHEET_URL = `https://docs.google.com/spreadsheets/d/e/${SPREADSHEET_ID}/pub?output=csv`;

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  try {
    const response = await fetch(SHEET_URL, {
      headers: { 'Accept': 'text/csv' },
      cache: 'no-store',
    });
    if (!response.ok) {
      return res.status(500).json({ error: 'Failed to fetch spreadsheet data' });
    }
    const csvText = await response.text();
    if (!csvText || csvText.trim().length === 0) {
      return res.status(200).json([]);
    }
    const parsed = Papa.parse<Record<string, never>>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });
    if (!parsed.data || !Array.isArray(parsed.data) || parsed.data.length === 0) {
      return res.status(200).json([]);
    }
    // Optionally, map/validate data here
    res.status(200).json(parsed.data);
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
    console.log(err);
  }
}

