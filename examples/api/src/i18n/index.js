import polyglotI18nProvider from '@stbui/prophet-i18n-polyglot';
// import englishMessages from './en';
import chineseMessages from './zh';

const i18nProvider = polyglotI18nProvider(locale => {
    if (locale === 'en') {
        return import('./en').then(messages => messages.default);
    }
    return chineseMessages;
});

export default i18nProvider;
