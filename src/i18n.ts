import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

export const resources = {
    en: {
        translation: {
            book: {
                clickToOpen: 'Click to open',
                officialLink: 'Official Link',
                commission: 'commission',
                commissions: 'commissions'
            },
            tags: {
                All: 'All',
                Featured: 'Featured',
                Bunny: 'Bunny',
                Cat: 'Cat',
                Dog: 'Dog',
                Dragon: 'Dragon',
                Fox: 'Fox',
                Furry: 'Furry',
                Tiger: 'Tiger',
                Wolf: 'Wolf'
            },
            results: {
                showing: 'Showing',
                model: 'model',
                models: 'models'
            },
            commissions: {
                noImage: 'No image available',
                by: 'Commission by'
            },
            footer: {
                rights: 'All base model images and commissioned model images belong to their respective owners.',
                label: '© 2025 HaruStar. All rights reserved.'
            },
            vrc_commissions_title: "Haru VRC Model Texture Commissions",
            commission_info: "This site showcases my completed VRC commission works of various models. You can click into each model to view the commissioned retexture work that was done. If you are interested in commissioning, please click the button below and fill out the form.",
            gallery_title: "Commission Gallery",
            request_commission: "Fill out the form here",
            search_placeholder: "Search texture models...",
            search_aria: "Search texture models"
        }
    },
    zh: {
        translation: {
            book: {
                clickToOpen: '點擊開啟',
                officialLink: '官方連結',
                commission: '委託',
                commissions: '委託'
            },
            tags: {
                All: '全部',
                Featured: '精選',
                Bunny: '兔子',
                Cat: '貓',
                Dog: '狗',
                Dragon: '龍',
                Fox: '狐狸',
                Furry: '獸人',
                Tiger: '老虎',
                Wolf: '狼'
            },
            results: {
                showing: '顯示',
                model: '模型',
                models: '模型'
            },
            commissions: {
                noImage: '沒有上傳圖片',
                by: '委託來自'
            },
            footer: {
                rights: '所有基礎模型圖片及委託模型圖片之版權皆屬於各自擁有者。',
                label: '© 2025 HaruStar. All rights reserved.',
            },
            vrc_commissions_title: "哈魯VRC模型上色委託單",
            commission_info: "本網站展示了我已完成的各種VRC模型委託作品。您可以點擊每個模型，查看已完成的上色委託成果。如果您有興趣委託，請點擊下方按鈕並填寫表單。",
            gallery_title: "委託作品集",
            request_commission: "填寫表單",
            search_placeholder: "搜尋紋理模型...",
            search_aria: "搜尋紋理模型"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        lng: 'zh', // Set Chinese as the default language
        fallbackLng: 'zh',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            // Always use Chinese as default unless user has a preference
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    }).catch(() => {});

export default i18n;
