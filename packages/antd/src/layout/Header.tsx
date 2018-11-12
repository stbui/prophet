import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon } from 'antd';

export class Header extends Component<any, any> {
  render() {
    return (
      <Layout.Header style={{ background: '#fff', padding: 0 }}>
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
      </Layout.Header>
    );
  }
}

export default Header;
