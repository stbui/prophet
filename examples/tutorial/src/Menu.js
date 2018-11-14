import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getResources } from '@admin/core';
import { Menu, Icon } from 'antd';
import { routes } from './routes';
import 'antd/lib/menu/style/index.css';

export class M extends Component {
  render() {
    const { resources, hasDashboard } = this.props;
    console.log(resources);
    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
        {hasDashboard && (
          <Menu.Item>
            <Link to="/">customeMenu</Link>
          </Menu.Item>
        )}
        {resources.map(resource => {
          return (
            <Menu.Item key={resource.name}>
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
  }
}

const mapStateToProps = state => ({ resources: getResources(state) });

export default connect(mapStateToProps)(M);
