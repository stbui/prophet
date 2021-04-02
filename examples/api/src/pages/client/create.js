import React from 'react';
import { Create } from '@stbui/prophet-antd';
import FormContainer from './FormContainer';

export default props => (
    <Create title="添加配置" {...props} actions={null}>
        <FormContainer {...props} />
    </Create>
);
