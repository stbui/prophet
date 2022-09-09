/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useCallback } from 'react';
import { useI18nProvider } from './useI18nProvider';
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
export const useTranslate = (): Translate => {
    const i18nProvider = useI18nProvider();

    const translate = useCallback(
        (key: string, options?: any) =>
            i18nProvider.translate(key, options) as string,
        [i18nProvider]
    );
    return i18nProvider ? translate : key => key;
};
