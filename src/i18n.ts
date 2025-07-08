import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            book: {
                clickToOpen: 'Click to open',
                officialLink: 'Official Link'
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
            vrc_commissions_title: "Haru VRC Model Texture Commissions",
            commission_info: "This site showcases my completed VRC commission works of various models. You can click into each model to view the commissioned retexture work that was done. If you are interested in commissioning, please click the button below and fill out the form.",
            request_commission: "Fill out the form here",
            footer: {
                rights: 'All base model images and commissioned model images belong to their respective owners.'
            },
            footer_label: '© 2025 HaruStar. All rights reserved.',
        }
    },
    zh: {
        translation: {
            book: {
                clickToOpen: '點擊開啟',
                officialLink: '官方連結'
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
            vrc_commissions_title: "哈魯VRC模型上色委託單",
            commission_info: "本網站展示了我已完成的各種VRC模型委託作品。您可以點擊每個模型，查看已完成的上色委託成果。如果您有興趣委託，請點擊下方按鈕並填寫表單。",
            request_commission: "填寫表單",
            footer: {
                rights: '所有基礎模型圖片及委託模型圖片之版權皆屬於各自擁有者。'
            },
            footer_label: '© 2025 HaruStar. All rights reserved.',
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
    });

export default i18n;
