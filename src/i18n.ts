import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            texture_library: 'Haru VRChat Commission Gallery',
            description_text: 'This site contains commissioned work made by Haru for VRChat. For more information, please refer to this post and the image below.',
            book: {
                clickToOpen: 'Click to open',
                officialLink: 'Official Link'
            },
            tags: {
                All: 'All',
                Featured: 'Featured',
                Cat: 'Cat',
                Dog: 'Dog',
                Dragon: 'Dragon',
                Fox: 'Fox',
                Furry: 'Furry',
                Tiger: 'Tiger',
                Wolf: 'Wolf'
            },
        }
    },
    zh: {
        translation: {
            texture_library: '哈魯VRChat委托画廊',
            description_text: '這個網站是來展示Haru被委託上色VRChat模型。點上任意模型可瀏覽委託作品。更多資訊請參閱本帖和下方圖片。',
            book: {
                clickToOpen: '點開',
                officialLink: '官方連結'
            },
            tags: {
                All: '全部',
                Featured: '精選',
                Cat: '猫',
                Dog: '狗',
                Dragon: '龍',
                Fox: '狐狸',
                Furry: '獸人',
                Tiger: '老虎',
                Wolf: '狼'
            },
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
