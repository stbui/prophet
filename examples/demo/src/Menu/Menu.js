import React from 'react';
import { useSelector } from 'react-redux';
import { getResources } from 'prophet-core';
import { Link } from 'prophet-antd';
import { Menu, Icon } from 'antd';
import { routes } from './routes';

export const CustomMenu = props => {
    const { hasDashboard, location } = props;
    const resources = useSelector(state => getResources(state));

    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
        >
            {resources.map(resource => {
                return (
                    <Menu.Item key={`/${resource.name}`}>
                        <Link to={`/${resource.name}`}>
                            {resource.label ? resource.label : resource.name}
                        </Link>
                    </Menu.Item>
                );
            })}
            {routes.map(route => {
                if (route.children) {
                    return (
                        <Menu.SubMenu
                            key={route.id}
                            title={
                                <span>
                                    <Icon type={route.icon} />
                                    {route.title}
                                </span>
                            }
                        >
                            {route.children.map(r => {
                                return (
                                    <Menu.Item key={r.id}>
                                        <Link to={r.url}>{r.title}</Link>
                                    </Menu.Item>
                                );
                            })}
                        </Menu.SubMenu>
                    );
                } else {
                    return (
                        <Menu.Item key={route.id}>
                            <Icon type={route.icon} />
                            <span>{route.title}</span>
                        </Menu.Item>
                    );
                }
            })}
        </Menu>
    );
};

export default CustomMenu;
