import { Akami } from '@/data/models/Akami';
import { Alfie } from '@/data/models/Alfie';
import { Alums } from '@/data/models/Alums';
import { Asty } from '@/data/models/Asty';
import { ChezzPuff } from "@/data/models/ChezzPuff";
import { Chibigen } from '@/data/models/Chibigen';
import { ChibiNovabeast } from '@/data/models/ChibiNovabeast';
import { ChibiNovaPup } from '@/data/models/ChibiNovaPup';
import { DaifukuDragon } from "@/data/models/DaifukuDragon";
import { Espo } from '@/data/models/Espo';
import { Fenrir } from "@/data/models/Fenrir";
import { Flat2 } from '@/data/models/Flat2';
import { Foshunia } from '@/data/models/Foshunia';
import { HARO } from "@/data/models/HARO";
import { JinxedFox } from '@/data/models/JinxedFox';
import { Jiro } from '@/data/models/Jiro';
import { Kankitsu } from '@/data/models/Kankitsu';
import { KemoDog } from "@/data/models/KemoDog";
import { Kokotora } from '@/data/models/Kokotora';
import { Korone } from "@/data/models/Korone";
import { Lana } from '@/data/models/Lana';
import { Lars } from '@/data/models/Lars';
import { LuluJuvenile } from "@/data/models/LuluJuvenile";
import { Lupi } from '@/data/models/Lupi';
import { Nyaruku } from '@/data/models/Nyaruku';
import { PolyPutty } from '@/data/models/PolyPutty';
import { Radlus } from "@/data/models/Radlus";
import { Regulus2 } from '@/data/models/Regulus2';
import { Rem } from "@/data/models/Rem";
import { Rigaro } from '@/data/models/Rigaro';
import { Rosune } from "@/data/models/Rosune";
import { Rui } from "@/data/models/Rui";
import { SharatNEW } from '@/data/models/SharatNEW';
import { Sora } from "@/data/models/Sora";
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
  [ChezzPuff.dbName]: ChezzPuff,
  [Chibigen.dbName]: Chibigen,
  [ChibiNovabeast.dbName]: ChibiNovabeast,
  [ChibiNovaPup.dbName]: ChibiNovaPup,
  [DaifukuDragon.dbName]: DaifukuDragon,
  [Espo.dbName]: Espo,
  [Fenrir.dbName]: Fenrir,
  [Flat2.dbName]: Flat2,
  [Foshunia.dbName]: Foshunia,
  [HARO.dbName]: HARO,
  [JinxedFox.dbName]: JinxedFox,
  [Jiro.dbName]: Jiro,
  [Kankitsu.dbName]: Kankitsu,
  [KemoDog.dbName]: KemoDog,
  [Kokotora.dbName]: Kokotora,
  [Korone.dbName]: Korone,
  [Lana.dbName]: Lana,
  [Lars.dbName]: Lars,
  [LuluJuvenile.dbName]: LuluJuvenile,
  [Lupi.dbName]: Lupi,
  [Nyaruku.dbName]: Nyaruku,
  [PolyPutty.dbName]: PolyPutty,
  [Radlus.dbName]: Radlus,
  [Regulus2.dbName]: Regulus2,
  [Rem.dbName]: Rem,
  [Rigaro.dbName]: Rigaro,
  [Rosune.dbName]: Rosune,
  [Rui.dbName]: Rui,
  [SharatNEW.dbName]: SharatNEW,
  [Sora.dbName]: Sora,
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
