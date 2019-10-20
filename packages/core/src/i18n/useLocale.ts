import { useContext, useCallback } from 'react';
import TranslationProviderContext from './TranslationProviderContext';

const useLocale = () => {
    const { locale } = useContext(TranslationProviderContext);
    return locale;
};

export default useLocale;
