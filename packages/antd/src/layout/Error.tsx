import React from 'react';
import { useTranslate } from '@stbui/prophet-core';

export const Error = () => {
    const translate = useTranslate();
    return <div>{translate('prophet.page.error')}</div>;
};

export default Error;
