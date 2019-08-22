import React, { createElement } from 'react';
import { Layout as DefaultLayout } from 'antd';
import Header from './Header';
import Sider from './Sider';
import Menu from './Menu';
import Brand from './Brand';
import Notification from './Notification';

export const Layout = ({
    header,
    sider,
    menu,
    brand,
    dashboard,
    history,
    location,
    match,
    color,
    notification,
    children,
}) => {
    return (
        <React.Fragment>
            <DefaultLayout style={{ minHeight: '100vh' }}>
                {createElement(sider, {
                    brand: createElement(brand),
                    children: createElement(menu, {
                        hasDashboard: !!dashboard,
                        history,
                        location,
                        match,
                    }),
                })}

                {createElement(header)}
                <DefaultLayout.Content
                    style={{
                        margin: 24,
                        backgroundColor: color,
                    }}
                >
                    {children}
                </DefaultLayout.Content>
            </DefaultLayout>
            {createElement(notification)}
        </React.Fragment>
    );
};

Layout.defaultProps = {
    header: Header,
    sider: Sider,
    menu: Menu,
    brand: Brand,
    notification: Notification,
};

export default Layout;
