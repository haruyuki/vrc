export interface TextureImage {
  id: string;
  url: string;
  alt: string;
}

export interface Commissioner {
  id: string;
  name: string;
  commissionDate: string;
  modelName: string;
  textureImages: TextureImage[];
}

export interface ModelCommissions {
  modelName: string;
  commissions: Commissioner[];
}

// Raw model metadata interface
export interface ModelMetadata {
  modelName: string;
  dbName: string;
  coverImage: string;
  bgColor: string;
  officialLink: string;
  featured: boolean;
}

// Full model interface with runtime data
export interface Model extends ModelMetadata {
  id: string;
  commissioners: Commissioner[];
}

export interface CommissionStats {
  totalCommissions: number;
  totalModels: number;
  latestCommissionDate: string | null;
  recentModelUpdates: { date: string; modelName: string }[];
}
