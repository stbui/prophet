/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { createContext } from 'react';
import { I18nProvider } from '../types';

interface TranslationProviderContextProps {
    locale: string;
    setLocale: (locale: string) => void;
    i18nProvider: I18nProvider;
}

const defaultProvider = {
    locale: 'zh',
    setLocale: () => {},
    i18nProvider: {
        translate: x => x,
        changeLocale: () => Promise.resolve(),
        getLocale: () => 'zh',
    },
};

const TranslationProviderContext = createContext<
    TranslationProviderContextProps
>(defaultProvider);

export default TranslationProviderContext;
