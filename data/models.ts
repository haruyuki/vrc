import { Akami } from './models/Akami';
import { Alfie } from './models/Alfie';
import { Alums } from './models/Alums';
import { Asty } from './models/Asty';
import { ChibiNovabeast } from './models/ChibiNovabeast';
import { ChibiNovaPup } from './models/ChibiNovaPup';
import { Crook } from './models/Crook';
import { Espo } from './models/Espo';
import { Flat2 } from './models/Flat2';
import { Foshunia } from './models/Foshunia';
import { JinxedFox } from './models/JinxedFox';
import { Jiro } from './models/Jiro';
import { Kankitsu } from './models/Kankitsu';
import { Kokotora } from './models/Kokotora';
import { Lana } from './models/Lana';
import { Lars } from './models/Lars';
import { Lupi } from './models/Lupi';
import { Nyaruku } from './models/Nyaruku';
import { PolyPutty } from './models/PolyPutty';
import { Regulus2 } from './models/Regulus2';
import { Rigaro } from './models/Rigaro';
import { SharatNEW } from './models/SharatNEW';
import { Wako } from './models/Wako';
import { ZiziV2 } from './models/ZiziV2';
import { ModelMetadata } from '@/types';

// Create a centralized model registry using dbName as the key
export const modelRegistry: Record<string, ModelMetadata> = {
  [Akami.dbName]: Akami,
  [Alfie.dbName]: Alfie,
  [Alums.dbName]: Alums,
  [Asty.dbName]: Asty,
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
  [Regulus2.dbName]: Regulus2,
  [Rigaro.dbName]: Rigaro,
  [SharatNEW.dbName]: SharatNEW,
  [Wako.dbName]: Wako,
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
