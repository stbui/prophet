/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext, useCallback } from 'react';
import TranslationProviderContext from './TranslationProviderContext';
import { useUpdateLoading } from '../loading';
import { useNotify } from '../sideEffect';

type SetLocale = (locale: String) => Promise<void>;

/**
 *
 * @example
 *
 * import { useSetLocale } from '@stbui/prophet-core';
 *
 * const availableLanguages = {
 *     fr: 'China',
 *     en: 'English',
 * }
 * const LanguageSwitcher = () => {
 *     const setLocale = useSetLocale();
 *     return (
 *         <ul>{
 *             Object.keys(availableLanguages).map(locale => {
 *                  <li key={locale} onClick={() => setLocale(locale)}>
 *                      {availableLanguages[locale]}
 *                  </li>
 *              })
 *         }</ul>
 *     );
 * }
 */
const useSetLocale = (): SetLocale => {
    const { i18nProvider, setLocale } = useContext(TranslationProviderContext);
    const { startLoading, stopLoading } = useUpdateLoading();
    const notify = useNotify();

    const translate = useCallback(
        newLocale =>
            new Promise(resovle => {
                startLoading();
                resovle(i18nProvider.changeLocale(newLocale));
            })
                .then(() => {
                    stopLoading();
                    setLocale(newLocale);
                })
                .catch(error => {
                    stopLoading();
                    notify('prophet.notification.i18n_error', 'warning');
                    console.error(error);
                }),
        [i18nProvider, setLocale, notify, startLoading, stopLoading]
    );

    return translate;
};

export default useSetLocale;
