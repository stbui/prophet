/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext, useCallback } from 'react';
import TranslationProviderContext from './TranslationProviderContext';

const useLocale = () => {
    const { locale } = useContext(TranslationProviderContext);
    return locale;
};

export default useLocale;
