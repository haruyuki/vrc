import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            completed_works_title: 'Completed Works',
            completed_works_description: 'These are the commissions for models I have completed.',
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
            completed_works_title: '已完成作品',
            completed_works_description: '這裡展示的是我已完成的模型委託作品。',
            book: {
                clickToOpen: '點擊開啟',
                officialLink: '官方連結'
            },
            tags: {
                All: '全部',
                Featured: '精選',
                Cat: '貓',
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
