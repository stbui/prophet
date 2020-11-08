import Polyglot from 'node-polyglot';
import { I18nProvider } from '@stbui/prophet-core';

type GetMessages = (locale: string) => Object;

/**
 *
 * @example
 *
 * import { Prophet, polyglotI18nProvider } from '@stbui/prophet';
 * import chineseMessages from 'ra-language-chinese';
 * import englishMessages from 'ra-language-english';
 *
 * const messages = {
 *   zh: chineseMessages,
 *   en: englishMessages,
 * };
 *
 * const i18nProvider = polyglotI18nProvider(locale => messages[locale]);
 * export default () => <Prophet i18nProvider={i18nProvider}>...</Prophet>;
 */
export default (
    getMessages: GetMessages,
    initialLocale: string = 'zh',
    polyglotOptions: any = {}
): I18nProvider => {
    let locale = initialLocale;
    const messages = getMessages(initialLocale);
    const polyglot = new Polyglot({
        locale,
        phrases: { '': '', ...messages },
        ...polyglotOptions,
    });
    let translate = polyglot.t.bind(polyglot);

    return {
        translate: (key: string, options: any = {}) => translate(key, options),
        changeLocale: (newLocale: string) =>
            Promise.resolve(getMessages(newLocale as string)).then(
                (messages: any) => {
                    locale = newLocale;
                    const newPolyglot = new Polyglot({
                        locale: newLocale,
                        phrases: { '': '', ...messages },
                        ...polyglotOptions,
                    });
                    translate = newPolyglot.t.bind(newPolyglot);
                }
            ),
        getLocale: () => locale,
    };
};
