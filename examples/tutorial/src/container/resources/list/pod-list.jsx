import React, { Component } from 'react';
import { Datagrid } from 'prophet-antd';

const Label = ({ title }) => title;

export const Table = ({ ...props }) => (
  <Datagrid pagination={false} {...props}>
    <Label dataIndex="timestamp">podName</Label>
    <Label dataIndex="podName">CPU分配值</Label>
    <Label dataIndex="cup">应用CPU使用率</Label>
    <Label dataIndex="cupUser">内存分配值</Label>
    <Label dataIndex="mem">内存分配值</Label>
    <Label dataIndex="memUser">应用内存使用值</Label>
  </Datagrid>
);

export default class PodList extends Component {
  render() {
    return (
      <div>
        <div>当前资源情况</div>
        <Table {...this.props} />
      </div>
    );
  }
}
