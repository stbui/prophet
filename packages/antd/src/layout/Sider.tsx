import React, { cloneElement, useState } from 'react';
import { Layout } from 'antd';

export default ({ children, brand }) => {
    const [collapsed, setCollapsed] = useState(false);

    const onCollapse = state => {
        setCollapsed(state);
    };

    return (
        <Layout.Sider
            collapsible
            collapsed={collapsed}
            onCollapse={onCollapse}
            style={{
                overflow: 'auto',
                height: '100vh',
            }}
        >
            {cloneElement(brand)}
            {cloneElement(children)}
        </Layout.Sider>
    );
};
