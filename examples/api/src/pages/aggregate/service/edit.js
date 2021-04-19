import React from 'react';
import { Edit } from '@stbui/prophet-antd';
import FormContainer from './FormContainer';

export default (props) => (
    <Edit title="编辑配置" {...props} actions={null}>
        <FormContainer {...props} />
    </Edit>
);
