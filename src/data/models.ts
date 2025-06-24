import Akami from "./models/Akami.ts";
import Alfie from "./models/Alfie.ts";
import Regulus2 from "./models/Regulus2.ts";
import Asty from "./models/Asty.ts";
import Crook from "./models/Crook.ts";
import Kankitsu from "./models/Kankitsu.ts";
import Nyaruku from "./models/Nyaruku.ts";
import Rigaro from "./models/Rigaro.ts";
import SharatNEW from "./models/SharatNEW.ts";

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
    Asty,
    Crook,
    Kankitsu,
    Nyaruku,
    Regulus2,
    Rigaro,
    SharatNEW,
];