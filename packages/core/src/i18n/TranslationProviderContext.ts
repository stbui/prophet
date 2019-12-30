/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext } from 'react';

interface TranslationProviderContextProps {
    locale: string;
    setLocale: (locale: string) => Promise<void>;
    i18nProvider: any;
}

const defaultProvider = {
    locale: 'zh',
    setLocale: (locale: string) => Promise.resolve(),
    i18nProvider: {
        translate: (x, options?) => x,
        changeLocale: (locale: string, options?: any) => Promise.resolve(),
        getTranslate: () => 'zh',
    },
};

const TranslationProviderContext: any = createContext<
    TranslationProviderContextProps
>(defaultProvider);

export default TranslationProviderContext;
