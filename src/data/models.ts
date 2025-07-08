import Akami from "./models/Akami.ts";
import Alfie from "./models/Alfie.ts";
import Regulus2 from "./models/Regulus2.ts";
import Asty from "./models/Asty.ts";
import Crook from "./models/Crook.ts";
import Kankitsu from "./models/Kankitsu.ts";
import Nyaruku from "./models/Nyaruku.ts";
import Rigaro from "./models/Rigaro.ts";
import SharatNEW from "./models/SharatNEW.ts";
import ZiziV2 from "./models/ZiziV2.ts";
import Lars from "./models/Lars.ts";
import ChibiNovabeast from "./models/ChibiNovabeast.ts";
import Kokotora from "./models/Kokotora.ts";
import Jiro from "./models/Jiro.ts";
import Lana from "./models/Lana.ts";
import Wako from "./models/Wako.ts";
import Alums from "./models/Alums.ts";
import Espo from "./models/Espo.ts";
import Foshunia from "./models/Foshunia.ts";
import JinxedFox from "./models/JinxedFox.ts";

export interface Commission {
    id: string;
    images: string[];
    commissioner: string;
    date: string;
}

export interface TextureModel {
    modelName: string;
    coverImage: string;
    spineColor: string;
    officialLink: string;
    categories: string[];
    commissions: Commission[];
    featured: boolean;
}

export const textureModels: TextureModel[] = [
    Akami,
    Alfie,
    Alums,
    Asty,
    ChibiNovabeast,
    Crook,
    Espo,
    Foshunia,
    JinxedFox,
    Jiro,
    Kankitsu,
    Kokotora,
    Lana,
    Lars,
    Nyaruku,
    Regulus2,
    Rigaro,
    SharatNEW,
    Wako,
    ZiziV2
];