/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React, { ComponentType } from 'react';
import { useTranslate } from './useTranslate';
import { useLocale } from './useLocale';

/**
 *
 * @example
 *
 * import { withTranslate } from '@stbui/prophet-core'
 *
 * const Page = ({ translate }) => {
 *     return <button>{translate('stbui.title')}</button>
 * }
 *
 * export default withTranslate(Page);
 *
 */
const withTranslate = (BaseComponent: ComponentType): ComponentType => {
    const TranslatedComponent = props => {
        const translate = useTranslate();
        const locale = useLocale();

        return (
            <BaseComponent {...props} translate={translate} locale={locale} />
        );
    };

    TranslatedComponent.defaultProps = BaseComponent.defaultProps;

    return TranslatedComponent;
};

export default withTranslate;
