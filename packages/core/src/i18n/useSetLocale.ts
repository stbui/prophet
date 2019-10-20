import { useContext, useCallback } from 'react';
import TranslationProviderContext from './TranslationProviderContext';
import { useNotify } from '../sideEffect';

const useSetLocale = () => {
    const { i18nProvider, setLocale } = useContext(TranslationProviderContext);
    const notify = useNotify();

    const translate = useCallback(
        locale =>
            new Promise(resovle => {
                resovle(i18nProvider.changeLocale(locale));
            })
                .then(() => {
                    setLocale(locale);
                })
                .catch(error => {
                    notify('prophet.notification.i18n_error', 'warning');
                    console.error(error);
                }),
        [i18nProvider, setLocale, notify]
    );

    return i18nProvider ? translate : Promise.resolve();
};

export default useSetLocale;
