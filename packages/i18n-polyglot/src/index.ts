import Polyglot from 'node-polyglot';

/* 
import { Prophet, polyglotI18nProvider } from '@stbui/prophet';
import chineseMessages from 'ra-language-chinese';
import englishMessages from 'ra-language-english';

const messages = {
    zh: chineseMessages,
    en: englishMessages,
};

const i18nProvider = polyglotI18nProvider(locale => messages[locale]);

export default () => <Prophet i18nProvider={i18nProvider}>...</Prophet>;
 */

type GetMessages = (locale: string) => Object;

export default (
    getMessages: GetMessages,
    initialLocale: string = 'zh',
    polyglotOptions: any = {}
) => {
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
            new Promise(resolve =>
                resolve(getMessages(newLocale as string))
            ).then(messages => {
                locale = newLocale;
                const newPolyglot = new Polyglot({
                    locale: newLocale,
                    phrases: { '': '', ...messages },
                    ...polyglotOptions,
                });
                translate = newPolyglot.t.bind(newPolyglot);
            }),
        getLocale: () => locale,
    };
};
