import React, { Component } from 'react';
import { ListTabbed, Datagrid } from 'prophet-antd';

const panes = [
  { title: '主机资源监控', key: 'host' },
  { title: 'pod资源监控', key: 'pod' },
  { title: 'jvm资源监控', key: 'jvm' }
];

const Label = ({ title }) => title;

export default class InterfaceList extends Component {
  render() {
    return (
      <ListTabbed
        className="dynamic-tabs"
        type="card"
        panes={panes}
        {...this.props}
      >
        {({ title, ...other }) => {
          return (
            <Datagrid title={() => <div>{title} 应用</div>} {...other}>
              <Label dataIndex="timestamp">时间</Label>
              <Label dataIndex="podName">实例数</Label>
              <Label dataIndex="ip">宿主机IP</Label>
              <Label dataIndex="dbOperaNum">db操作数</Label>
              <Label dataIndex="status">状态</Label>
            </Datagrid>
          );
        }}
      </ListTabbed>
    );
  }
}
