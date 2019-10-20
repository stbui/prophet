import { ProphetCore } from '@stbui/prophet-core';
import { Layout, CatchAll, Login } from '@stbui/prophet-antd';
import defaultMessages from '@stbui/prophet-language-chinese';
import polyglotI18nProvider from '@stbui/prophet-i18n-polyglot';

const defaultI18nProvider = polyglotI18nProvider(() => defaultMessages);

const Prophet: any = ProphetCore;

Prophet.defaultProps = {
    layout: Layout,
    catchAll: CatchAll,
    login: Login,
    i18nProvider: defaultI18nProvider,
};

export { Prophet, defaultI18nProvider };

export * from '@stbui/prophet-core';
export * from '@stbui/prophet-antd';
