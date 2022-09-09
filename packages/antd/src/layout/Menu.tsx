import React from 'react';
import { useResourceDefinitions } from '@stbui/prophet-core';
import { Menu } from 'antd';

export const CustomMenu = props => {
    const { hasDashboard } = props;
    const resources = useResourceDefinitions();

    const items = Object.keys(resources).map(resource => {
        return {
            label: resources[resource].name,
            key: resources[resource].name,
        };
    });

    console.log(hasDashboard, resources);

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[]}
            items={items}
        ></Menu>
    );
};

export default CustomMenu;
