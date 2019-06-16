import React, { Component, createElement } from 'react';
import { Layout as DefaultLayout } from 'antd';
import Header from './Header';
import Sider from './Sider';
import Menu from './Menu';
import Brand from './Brand';
import Notification from './Notification';

export class Layout extends Component<any, any> {
  static defaultProps = {
    header: Header,
    sider: Sider,
    menu: Menu,
    brand: Brand,
    notification: Notification
  };

  render() {
    const {
      header,
      sider,
      menu,
      brand,
      dashboard,
      history,
      location,
      match,
      color,
      notification
    } = this.props;

    return (
      <React.Fragment>
        <DefaultLayout style={{ minHeight: '100vh' }}>
          {createElement(sider, {
            brand: createElement(brand),
            children: createElement(menu, {
              hasDashboard: !!dashboard,
              history,
              location,
              match
            })
          })}
          <DefaultLayout>
            {createElement(header)}
            <DefaultLayout.Content
              style={{
                margin: 24,
                backgroundColor: color
              }}
            >
              {this.props.children}
            </DefaultLayout.Content>
          </DefaultLayout>
        </DefaultLayout>
        {createElement(notification)}
      </React.Fragment>
    );
  }
}

export default Layout;
