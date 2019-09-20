import React from 'react';
import { Link } from '@stbui/prophet-antd';
import { Menu, Icon } from 'antd';
import { routes } from './routes';

const CustomMenu = props => {
    const { hasDashboard, location } = props;

    return (
        <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[location.pathname]}
            defaultOpenKeys={[location.pathname.split('/')[1]]}
        >
            {hasDashboard && (
                <Menu.Item>
                    <Icon type="home" />
                    <Link to="/" style={{ display: 'inline-block' }}>
                        主页
                    </Link>
                </Menu.Item>
            )}
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
