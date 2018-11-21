import React, { Component } from 'react';
import { List } from 'prophet-antd';
import PodList from './detail/pod-list';
import AppTable from './detail/app-table';

export class Tabbed extends Component {
  render() {
    return (
      <div>
        <AppTable {...this.props} />
        <div>POD状态变化列表</div>
        <PodList {...this.props} />
      </div>
    );
  }
}

const appList = ({ ...props }) => (
  <List {...props}>
    <Tabbed />
  </List>
);

export default appList;
