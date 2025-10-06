import { Akami } from '@/data/models/Akami';
import { Alfie } from '@/data/models/Alfie';
import { Alums } from '@/data/models/Alums';
import { Asty } from '@/data/models/Asty';
import { Chibigen } from '@/data/models/Chibigen';
import { ChibiNovabeast } from '@/data/models/ChibiNovabeast';
import { ChibiNovaPup } from '@/data/models/ChibiNovaPup';
import { Crook } from '@/data/models/Crook';
import { Espo } from '@/data/models/Espo';
import { Flat2 } from '@/data/models/Flat2';
import { Foshunia } from '@/data/models/Foshunia';
import { JinxedFox } from '@/data/models/JinxedFox';
import { Jiro } from '@/data/models/Jiro';
import { Kankitsu } from '@/data/models/Kankitsu';
import { Kokotora } from '@/data/models/Kokotora';
import { Lana } from '@/data/models/Lana';
import { Lars } from '@/data/models/Lars';
import { Lupi } from '@/data/models/Lupi';
import { Nyaruku } from '@/data/models/Nyaruku';
import { PolyPutty } from '@/data/models/PolyPutty';
import { Radlus } from "@/data/models/Radlus";
import { Regulus2 } from '@/data/models/Regulus2';
import { Rigaro } from '@/data/models/Rigaro';
import { SharatNEW } from '@/data/models/SharatNEW';
import { Wako } from '@/data/models/Wako';
import { Yue } from '@/data/models/Yue';
import { ZiziV2 } from '@/data/models/ZiziV2';
import { ModelMetadata } from '@/types';

// Create a centralized model registry using dbName as the key
export const modelRegistry: Record<string, ModelMetadata> = {
  [Akami.dbName]: Akami,
  [Alfie.dbName]: Alfie,
  [Alums.dbName]: Alums,
  [Asty.dbName]: Asty,
  [Chibigen.dbName]: Chibigen,
  [ChibiNovabeast.dbName]: ChibiNovabeast,
  [ChibiNovaPup.dbName]: ChibiNovaPup,
  [Crook.dbName]: Crook,
  [Espo.dbName]: Espo,
  [Flat2.dbName]: Flat2,
  [Foshunia.dbName]: Foshunia,
  [JinxedFox.dbName]: JinxedFox,
  [Jiro.dbName]: Jiro,
  [Kankitsu.dbName]: Kankitsu,
  [Kokotora.dbName]: Kokotora,
  [Lana.dbName]: Lana,
  [Lars.dbName]: Lars,
  [Lupi.dbName]: Lupi,
  [Nyaruku.dbName]: Nyaruku,
  [PolyPutty.dbName]: PolyPutty,
  [Radlus.dbName]: Radlus,
  [Regulus2.dbName]: Regulus2,
  [Rigaro.dbName]: Rigaro,
  [SharatNEW.dbName]: SharatNEW,
  [Wako.dbName]: Wako,
  [Yue.dbName]: Yue,
  [ZiziV2.dbName]: ZiziV2,
};

// Helper function to get model metadata by dbName (from CSV)
export function getModelMetadataByDbName(dbName: string): ModelMetadata | null {
  // Find the model where the dbName matches
  const model = Object.values(modelRegistry).find((model) => model.dbName === dbName);
  return model || null;
}

// Get all available models
export function getAllModels(): ModelMetadata[] {
  return Object.values(modelRegistry);
}
