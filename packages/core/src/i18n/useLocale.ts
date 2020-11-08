/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext } from 'react';
import TranslationProviderContext from './TranslationProviderContext';

/**
 *
 * @example
 *
 * import { useLocale } from '@stbui/prophet-core';
 *
 * const availableLanguages = {
 *     fr: 'China',
 *     en: 'English',
 * }
 * const CurrentLanguage = () => {
 *     const locale = useLocale();
 *     return <span>{availableLanguages[locale]}</span>;
 * }
 */
const useLocale = () => {
    const { locale } = useContext(TranslationProviderContext);
    return locale;
};

export default useLocale;
