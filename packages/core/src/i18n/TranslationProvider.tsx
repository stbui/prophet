/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, {
    Children,
    useCallback,
    useState,
    useMemo,
    ReactElement,
    FunctionComponent,
} from 'react';
import TranslationProviderContext from './TranslationProviderContext';

interface Props {
    locale?: string;
    i18nProvider: any;
}

/**
 *
 * @param props.locale 默认zh
 * @param props.i18nProvider
 *
 * @example
 *
 * import { TranslationProvider } from '@stbui/prophet-core';
 *
 * const View = () => <div></div>
 *
 * const MyApp = () => <TranslationProvider i18nProvider={i18nProvider}><View />/TranslationProvider>
 *
 */
const TranslationProvider: FunctionComponent<Props> = props => {
    const { i18nProvider, children } = props;

    const [state, setState] = useState({
        locale: i18nProvider ? i18nProvider.getLocale() : 'zh',
        i18nProvider,
    });

    const setLocale = useCallback(
        (newLocale: string) =>
            setState(state => ({ ...state, locale: newLocale })),
        [setState]
    );

    const value = useMemo(
        () => ({
            ...state,
            setLocale,
        }),
        [setLocale, state]
    );

    return (
        <TranslationProviderContext.Provider value={value}>
            {Children.only(children)}
        </TranslationProviderContext.Provider>
    );
};

export default TranslationProvider;
