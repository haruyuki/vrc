'use client';

import { useState, useEffect, useCallback } from 'react';
import { Model, Commissioner, ModelCommissions, CommissionStats, ModelMetadata } from '@/types';
import { getAllModels, getModelMetadataByDbName } from '@/data/models';

interface ApiResponse {
  success: boolean;
  data: ModelCommissions[];
  lastUpdated: string;
}

const initialModels: Model[] = getAllModels().map((metadata: ModelMetadata) => ({
  ...metadata,
  id: metadata.dbName.toLowerCase(),
  commissioners: [],
}));

export function useCommissionData() {
  const [models, setModels] = useState<Model[]>([]);
  const [commissions, setCommissions] = useState<ModelCommissions[]>([]);
  const [loading, setLoading] = useState(false); // False as initial state
  const [error, setError] = useState<string | null>(null);

  const calculateStats = useCallback((data: ModelCommissions[]): CommissionStats => {
    if (data.length === 0) {
      return {
        totalCommissions: 0,
        totalModels: 0,
        latestCommissionDate: null,
        recentModelUpdates: [],
      };
    }

    let totalCommissions = 0;
    let latestDate: Date | null = null;
    const allUpdates: { modelName: string; date: Date }[] = [];

    for (const modelData of data) {
      totalCommissions += modelData.commissions.length;

      const metadata = getModelMetadataByDbName(modelData.modelName);
      const displayName = metadata?.modelName || modelData.modelName;

      for (const commission of modelData.commissions) {
        const commissionDate = new Date(commission.commissionDate.split('/').reverse().join('-'));

        if (!latestDate || commissionDate > latestDate) {
          latestDate = commissionDate;
        }

        allUpdates.push({
          modelName: displayName,
          date: commissionDate,
        });
      }
    }

    const recentModelUpdates = allUpdates
    .sort((a, b) => b.date.getTime() - a.date.getTime())
    .slice(0, 5)
    .map(({ modelName, date }) => ({
      date: date.toISOString().split('T')[0].replace(/-/g, '/'),
      modelName,
    }));

    return {
      totalCommissions,
      totalModels: data.length,
      latestCommissionDate: latestDate
        ? latestDate.toISOString().split('T')[0].replace(/-/g, '/')
        : null,
      recentModelUpdates,
    };
  }, []);

  const stats =
    commissions.length === 0
      ? {
        totalCommissions: 0,
        totalModels: 0,
        latestCommissionDate: null,
        recentModelUpdates: [],
      }
      : calculateStats(commissions);

  useEffect(() => {
    setModels(initialModels);
    fetchCommissions();
  }, []); // Only run once on mount

  const fetchCommissions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/commissions');

      if (!response.ok) {
        setError(`HTTP error! status: ${response.status}`);
        return;
      }

      const result: ApiResponse = await response.json();

      if (!result.success) {
        setError('API returned unsuccessful response');
        return;
      }

      setCommissions(result.data);
    } catch (err) {
      console.error('Error fetching commission data:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch commission data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update models when commission data changes
  useEffect(() => {
    if (commissions.length === 0) return;

    const map = new Map<string, Commissioner[]>();
    commissions.forEach((modelData) => {
      map.set(modelData.modelName.toLowerCase(), modelData.commissions);
    });

    setModels((prevModels) => {
      return prevModels.map((model) => {
        const modelCommissions = map.get(model.id) || [];
        return {
          ...model,
          commissioners: modelCommissions,
        };
      });
    });
  }, [commissions]);

  const getCommissionsForModel = useCallback(
    (modelName: string): Commissioner[] => {
      const modelData = commissions.find(
        (c) => c.modelName.toLowerCase() === modelName.toLowerCase(),
      );
      return modelData ? modelData.commissions : [];
    },
    [commissions],
  );

  const getCommissionCount = useCallback(
    (modelName: string): number => {
      const modelData = commissions.find(
        (c) => c.modelName.toLowerCase() === modelName.toLowerCase(),
      );
      return modelData ? modelData.commissions.length : 0;
    },
    [commissions],
  );

  return {
    models,
    loading,
    error,
    stats,
    commissions,
    getCommissionsForModel,
    getCommissionCount,
    refreshData: fetchCommissions,
  };
}
