import React, { cloneElement } from 'react';
import { Layout, Menu, Dropdown, Icon } from 'antd';
import { useLogout } from '@stbui/prophet-core';

export const Header = ({ brand }) => {
    const logout = useLogout();

    return (
        <Layout.Header
            style={{
                display: 'flex',
                position: 'fixed',
                zIndex: 1,
                width: '100%',
                padding: 0,
            }}
        >
            {cloneElement(brand)}
            <span style={{ flex: 'auto' }}></span>
            <Dropdown
                overlay={
                    <Menu>
                        <Menu.Item onClick={logout}>退出</Menu.Item>
                    </Menu>
                }
            >
                <div
                    className="ant-dropdown-link"
                    style={{ paddingRight: 20, color: '#fff' }}
                >
                    我的用户 <Icon type="down" />
                </div>
            </Dropdown>
        </Layout.Header>
    );
};

export default Header;
