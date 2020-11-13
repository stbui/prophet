import React from 'react';
import { Link } from '@stbui/prophet-antd';
import { Menu } from 'antd';
import { routes } from './routes';

const CustomMenu = props => {
    const { hasDashboard, location } = props;
    const renderMenu = () => {
        const loop = data => {
            return data.map(item => {
                if (item.children) {
                    return (
                        <Menu.SubMenu
                            key={item.id}
                            title={<span>{item.name}</span>}
                        >
                            {item.children.map(chid => {
                                if (chid.children) {
                                    return (
                                        <Menu.SubMenu
                                            key={chid.id}
                                            title={
                                                <span>
                                                    <span>{chid.name}</span>
                                                </span>
                                            }
                                        >
                                            {loop(chid.children)}
                                        </Menu.SubMenu>
                                    );
                                }

                                return (
                                    <Menu.Item key={chid.path}>
                                        <Link to={chid.path}>{chid.name}</Link>
                                    </Menu.Item>
                                );
                            })}
                        </Menu.SubMenu>
                    );
                }

                return (
                    <Menu.Item key={item.path}>
                        <Link to={item.path}>{item.name}</Link>
                    </Menu.Item>
                );
            });
        };

        return loop(routes);
    };
    return (
        <Menu
            theme="dark"
            mode="inline"
            defaultOpenKeys={[location.pathname.split('/')[1]]}
            defaultSelectedKeys={[location.pathname]}
        >
            {hasDashboard && (
                <Menu.Item>
                    <Link to="/" style={{ display: 'inline-block' }}>
                        主页
                    </Link>
                </Menu.Item>
            )}
            {renderMenu()}
        </Menu>
    );
};

export default CustomMenu;
