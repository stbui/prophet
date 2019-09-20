import { useContext } from 'react';
import TranslationProviderContext from './TranslationProviderContext';

const TranslationProvider = () => useContext(TranslationProviderContext);

export default TranslationProvider;
