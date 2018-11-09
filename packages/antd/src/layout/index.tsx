import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout as DefaultLayout, Menu, Icon } from 'antd';
import 'antd/lib/button/style/index.css';
import 'antd/lib/layout/style/index.css';
import 'antd/lib/menu/style/index.css';

export class Layout extends Component<any, any> {
  render() {
    console.log(this.props);
    const { routes } = this.props;

    return (
      <DefaultLayout style={{ minHeight: '100vh' }}>
        <DefaultLayout.Sider trigger={null} collapsible>
          <div
            className="logo"
            style={{
              height: 32,
              background: 'rgba(255,255,255,.2)',
              margin: 16
            }}
          />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
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
        </DefaultLayout.Sider>
        <DefaultLayout>
          <DefaultLayout.Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type="menu-unfold"
              style={{
                fontSize: 18,
                lineHeight: '64px',
                padding: '0 24px',
                cursor: 'pointer',
                transition: 'color .3s'
              }}
            />
          </DefaultLayout.Header>
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
          <DefaultLayout.Footer>Footer</DefaultLayout.Footer>
        </DefaultLayout>
      </DefaultLayout>
    );
  }
}
