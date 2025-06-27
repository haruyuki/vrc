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
            vrc_commissions_title: "VRC Model Commissions",
            commission_info: {
                base_price: 'Base Price: 1200 NTD',
                furry_only: 'Only accepting furry models.',
                complex_design: 'Complex designs may increase the base cost.',
                extra_clothing: 'Additional clothing/accessories: 100–200 NTD each, depending on complexity.',
                clothing_texture: 'Texturing clothing: Extra cost based on complexity.',
                free_revisions: 'Up to 3 free revisions; extra revisions incur additional cost.',
                extra_animations: 'Extra prone animations: 30 NTD each (free for Alfie models).',
                sdk2_update: 'SDK2 models: Additional 200 NTD for updating to the latest SDK.',
                model_files: 'Model files must be provided or the model cost must be included in payment.',
                upload_options: 'Upload options: I can upload for you (requires login) or send you the Unity project to upload yourself.',
                streaming: 'Commissions may be streamed. Let me know if you want to opt out.',
                showcase: 'I may display your model as part of my portfolio. Let me know if you want to opt out.',
                payment_title: 'Payment:',
                payment_after: 'Payment after completion (model cost must be paid upfront if included).',
                payment_methods: 'Methods: Paypal (+4% fee), Taiwan bank remittance.',
                contact_title: 'Contact:',
                request_button: 'Request a Commission',
            },
            footer: {
                rights: 'All base model images and commissioned model images belong to their respective owners.'
            },
            footer_label: '© 2025 HaruStar. All rights reserved.',
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
            vrc_commissions_title: "VRC模型委託資訊",
            commission_info: {
                base_price: '價格：1200台幣',
                furry_only: '僅接受獸人模型委託',
                complex_design: '複雜設計會增加基礎費用',
                extra_clothing: '額外服裝/配件：根據安裝難度100-200台幣',
                clothing_texture: '服裝紋理：根據設計複雜度額外收費',
                free_revisions: '最多提供3次免費修正，之後的修正需額外收費',
                extra_animations: '額外趴姿動畫：每個30台幣（Alfie模型免費）',
                sdk2_update: 'SDK2模型：更新新版本需加收200台幣',
                model_files: '必須提供模型檔案，或包含模型費用在付款內',
                upload_options: '上傳選項：我可代為上傳（需提供帳號登入）或提供Unity專案讓您自行上傳',
                streaming: '直播：通常會在直播中完成委託，如不願公開請提前告知',
                showcase: '作品展示：完成的作品可能展示於作品集中，如不願公開請提前告知',
                payment_title: '付款',
                payment_after: '完成後付款，若需代購模型，模型費用需提前支付',
                payment_methods: '付款方式：PayPal（+4%手續費）、台灣銀行匯款',
                contact_title: '聯絡方式',
                request_button: '填寫委託表單',
            },
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
