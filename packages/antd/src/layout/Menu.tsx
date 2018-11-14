import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getResources } from '@admin/core';
import { Menu, Icon } from 'antd';
import 'antd/lib/menu/style/index.css';

export class M extends Component<any, any> {
  render() {
    const { resources, hasDashboard } = this.props;

    return (
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']}>
        {hasDashboard && (
          <Menu.Item>
            <Link to="/">dashboard</Link>
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
      </Menu>
    );
  }
}

const mapStateToProps = state => ({ resources: getResources(state) });

export default connect(mapStateToProps)(M);
