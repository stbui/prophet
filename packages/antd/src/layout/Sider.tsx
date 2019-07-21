import React, { cloneElement } from 'react';
import { Layout } from 'antd';

export default ({ children, brand }) => (
    <Layout.Sider trigger={null} collapsible>
        {cloneElement(brand)}
        {cloneElement(children)}
    </Layout.Sider>
);
