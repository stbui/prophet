import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style/index.css';

export class M extends Component<any, any> {
  render() {
    const { menus } = this.props;

    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
        {menus.map(route => {
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
  }
}

const mapStateToProps = state => {
  console.log(state);
  return state;
};

export default connect(mapStateToProps)(M);
