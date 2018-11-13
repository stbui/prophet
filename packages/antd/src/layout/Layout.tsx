import React, { Component, createElement } from 'react';
import { Layout as DefaultLayout } from 'antd';
import Header from './Header';
import Sider from './Sider';
import Menu from './Menu';
import Brand from './Brand';
import 'antd/lib/layout/style/index.css';
import 'antd/lib/icon/style/index.css';

export class Layout extends Component<any, any> {
  static defaultProps = {
    header: Header,
    sider: Sider,
    menu: Menu,
    brand: Brand
  };

  render() {
    const { header, sider, menu, brand, dashboard } = this.props;

    return (
      <DefaultLayout style={{ minHeight: '100vh' }}>
        {createElement(sider, {
          brand: createElement(brand),
          children: createElement(menu, { hasDashboard: !!dashboard })
        })}
        <DefaultLayout>
          {createElement(header)}
          <DefaultLayout.Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280
            }}
          >
            {this.props.children}
          </DefaultLayout.Content>
        </DefaultLayout>
      </DefaultLayout>
    );
  }
}

export default Layout;
