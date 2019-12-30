/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext, useCallback } from 'react';
import TranslationProviderContext from './TranslationProviderContext';

/* 
import { useTranslate } from '@stbui/prophet';
const User = () => {
    const translate = useTranslate();
    return <div>{translate('name')}</div>;
};
*/

const useTranslate = () => {
    const { i18nProvider, locale } = useContext(TranslationProviderContext);

    const translate = useCallback(
        (key, options?) => i18nProvider.translate(key, options),
        [i18nProvider, locale]
    );

    return i18nProvider ? translate : (key: any) => key;
};

export default useTranslate;
