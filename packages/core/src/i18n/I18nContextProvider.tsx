import React from 'react';
import { useEffect, useState, ReactNode } from 'react';

import { I18nContext } from './I18nContext';
import { useStore } from '../store/useStore';
import { useNotify } from '../notification';
import { I18nProvider } from '../types';

export const I18nContextProvider = ({
    value = defaulti18nContext,
    children,
}: I18nContextProviderProps) => {
    const [locale] = useStore('locale');
    const notify = useNotify();
    const [key, setKey] = useState(0);

    const [isInitialized, setInitialized] = useState(
        locale === value.getLocale()
    );

    useEffect(() => {
        if (locale && value.getLocale() !== locale) {
            new Promise(resolve => {
                resolve(value.changeLocale(locale));
            })
                .then(() => {
                    setKey(key => key + 1);
                    setInitialized(true);
                })
                .catch(error => {
                    setInitialized(true);
                    notify('ra.notification.i18n_error', { type: 'warning' });
                    console.error(error);
                });
        } else {
            setInitialized(true);
        }
    }, [value, locale, notify]);

    return isInitialized ? (
        <I18nContext.Provider value={value} key={key}>
            {children}
        </I18nContext.Provider>
    ) : null;
};

export interface I18nContextProviderProps {
    value: I18nProvider;
    children: ReactNode;
}

const defaulti18nContext = {
    translate: x => x,
    changeLocale: () => Promise.resolve(),
    getLocale: () => 'en',
};
