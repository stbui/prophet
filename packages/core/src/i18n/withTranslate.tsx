import React, { ComponentType } from 'react';
import useTranslate from './useTranslate';
import useLocale from './useLocale';

const withTranslate = (Component: ComponentType): ComponentType => {
    const TranslatedComponent = props => {
        const translate = useTranslate();
        const locale = useLocale();

        return <Component translate={translate} locale={locale} {...props} />;
    };

    TranslatedComponent.defaultProps = Component.defaultProps;

    return TranslatedComponent;
};

export default withTranslate;
