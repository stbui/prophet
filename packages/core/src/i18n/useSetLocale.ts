/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useContext, useCallback } from 'react';
import TranslationProviderContext from './TranslationProviderContext';
import { useUpdateLoading } from '../loading';
import { useNotify } from '../sideEffect';

/**
 *
 * @example
 *
 * import { useLocale } from '@stbui/prophet-core';
 *
 */
const useSetLocale = () => {
    const { i18nProvider, setLocale } = useContext(TranslationProviderContext);
    const { startLoading, stopLoading } = useUpdateLoading();
    const notify = useNotify();

    const translate = useCallback(
        locale =>
            new Promise(resovle => {
                startLoading();
                resovle(i18nProvider.changeLocale(locale));
            })
                .then(() => {
                    stopLoading();
                    setLocale(locale);
                })
                .catch(error => {
                    stopLoading();
                    notify('prophet.notification.i18n_error', 'warning');
                    console.error(error);
                }),
        [i18nProvider, setLocale, notify, startLoading, stopLoading]
    );

    return i18nProvider ? translate : Promise.resolve();
};

export default useSetLocale;
