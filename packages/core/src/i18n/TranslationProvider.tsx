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
    children: ReactElement<any>;
}

const TranslationProvider: FunctionComponent<Props> = props => {
    const { i18nProvider, children } = props;

    const [state, setState] = useState({
        locale: i18nProvider ? i18nProvider.getLocale() : 'zh',
        i18nProvider,
    });

    const setLocale = useCallback(
        (locale: string) =>
            setState({
                locale: locale,
                i18nProvider,
            }),
        [i18nProvider, setState]
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
