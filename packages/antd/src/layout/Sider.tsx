import React, { Component, cloneElement } from 'react';
import { Layout } from 'antd';

export interface PropsType {
  brand?: any;
  children?: any;
}

export class Sider extends Component<PropsType> {
  render() {
    const { children, brand } = this.props;

    return (
      <Layout.Sider trigger={null} collapsible>
        {cloneElement(brand)}
        {cloneElement(children)}
      </Layout.Sider>
    );
  }
}

export default Sider;
