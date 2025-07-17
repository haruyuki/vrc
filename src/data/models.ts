import { Akami } from './models/Akami.ts';
import { Alfie } from './models/Alfie.ts';
import { Alums } from './models/Alums.ts';
import { Asty } from './models/Asty.ts';
import { ChibiNovabeast } from './models/ChibiNovabeast.ts';
import { ChibiNovaPup } from './models/ChibiNovaPup.ts';
import { Crook } from './models/Crook.ts';
import { Espo } from './models/Espo.ts';
import { Flat2 } from './models/Flat2.ts';
import { Foshunia } from './models/Foshunia.ts';
import { JinxedFox } from './models/JinxedFox.ts';
import { Jiro } from './models/Jiro.ts';
import { Kankitsu } from './models/Kankitsu.ts';
import { Kokotora } from './models/Kokotora.ts';
import { Lana } from './models/Lana.ts';
import { Lars } from './models/Lars.ts';
import { Nyaruku } from './models/Nyaruku.ts';
import { PolyPutty } from "./models/PolyPutty.ts";
import { Regulus2 } from './models/Regulus2.ts';
import { Rigaro } from './models/Rigaro.ts';
import { SharatNEW } from './models/SharatNEW.ts';
import { Wako } from './models/Wako.ts';
import { ZiziV2 } from './models/ZiziV2.ts';

export interface Commission {
  id: string;
  images: string[];
  commissioner: string;
  date: string;
}

export interface TextureModel {
  constName: string;
  modelName: string;
  coverImage: string;
  spineColor: string;
  officialLink: string;
  categories: string[];
  featured: boolean;
}

// Build a map of all imported models
const modelObjectMap = {
  Akami,
  Alfie,
  Alums,
  Asty,
  ChibiNovabeast,
  ChibiNovaPup,
  Crook,
  Espo,
  Flat2,
  Foshunia,
  JinxedFox,
  Jiro,
  Kankitsu,
  Kokotora,
  Lana,
  Lars,
  Nyaruku,
  PolyPutty,
  Regulus2,
  Rigaro,
  SharatNEW,
  Wako,
  ZiziV2,
};

// Generate textureModels and textureModelMap from the imported models
export const textureModels: TextureModel[] = Object.entries(modelObjectMap).map(
  ([constName, model]) => ({
    ...model,
    constName,
  }),
);

export const textureModelMap: Record<string, TextureModel> = Object.fromEntries(
  textureModels.map((model) => [model.constName, model]),
);
