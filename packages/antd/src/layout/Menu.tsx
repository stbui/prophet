import React from 'react';
import { Menu } from 'antd';
import { Link } from '../Link';

export const CustomMenu = props => {
    const { hasDashboard, location } = props;
    const resources: any = [];

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
        >
            {hasDashboard && (
                <Menu.Item>
                    <Link to="/">dashboard</Link>
                </Menu.Item>
            )}
            {resources.map(resource => {
                return (
                    <Menu.Item key={`/${resource.name}`}>
                        <Link to={`/${resource.name}`}>
                            {resource.label ? resource.label : resource.name}
                        </Link>
                    </Menu.Item>
                );
            })}
        </Menu>
    );
};

export default CustomMenu;
