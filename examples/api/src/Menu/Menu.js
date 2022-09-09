import React from 'react';
import { Menu } from 'antd';
import { routes } from './routes';

const CustomMenu = props => {
    return <Menu theme="dark" mode="inline" items={routes}></Menu>;
};

export default CustomMenu;
