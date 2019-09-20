import { createContext } from 'react';

const defaultProvider = {
    locale: 'en',
    setLocale: locale => Promise.resolve(),
};

const TranslationProviderContext = createContext(defaultProvider);

export default TranslationProviderContext;
