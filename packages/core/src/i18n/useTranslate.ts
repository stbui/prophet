/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext, useCallback } from 'react';
import TranslationProviderContext from './TranslationProviderContext';
import { Translate } from '../types';

/**
 *
 * @example
 *
 * import { useTranslate } from '@stbui/prophet-core';
 *
 * const SettingsMenu = () => {
 *   const translate = useTranslate();
 *   return <div>{translate('settings')}</div>;
 * };
 */
const useTranslate = (): Translate => {
    const { i18nProvider, locale } = useContext(TranslationProviderContext);

    const translate = useCallback(
        (key: string, options?) => i18nProvider.translate(key, options),
        [i18nProvider, locale]
    );

    return i18nProvider ? translate : (key: string) => key;
};

export default useTranslate;
