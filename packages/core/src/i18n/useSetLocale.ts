import { useLocaleState } from './useLocaleState';

/**
 *
 * @example
 *
 * import { useSetLocale } from '@stbui/prophet';
 *
 * const availableLanguages = {
 *     en: 'English',
 *     fr: 'Français',
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
 *
 */
export const useSetLocale = () => {
    const [, setLocale] = useLocaleState();
    return setLocale;
};
