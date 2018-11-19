import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getResources } from '@prophet/core';
import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style/index.css';

@connect(state => ({ resources: getResources(state) }))
export default class M extends Component<any, any> {
  render() {
    const { resources, hasDashboard, location } = this.props;

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        {hasDashboard && (
          <Menu.Item>
            <Link to="/">dashboard</Link>
          </Menu.Item>
        )}
        {resources.map(resource => {
          return (
            <Menu.Item key={`/${resource.name}`}>
              <Link to={`/${resource.name}`}>
                {resource.icon && <Icon type={resource.icon} />}
                {resource.label ? resource.label : resource.name}
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }
}

// const mapStateToProps = state => ({ resources: getResources(state) });

// export default connect(mapStateToProps)(M);
