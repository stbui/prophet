import React, { Component } from 'react';
import { GET_LIST } from 'prophet-core';
import { Datagrid } from 'prophet-antd';
import dataProvider from '../../../dataProvider';

const Label = ({ title }) => title;

export const Table = ({ ...props }) => (
  <Datagrid pagination={false} {...props}>
    <Label dataIndex="timestamp">时间</Label>
    <Label dataIndex="podName">实例数</Label>
    <Label dataIndex="ip">宿主机IP</Label>
    <Label dataIndex="dbOperaNum">db操作数</Label>
    <Label dataIndex="status">状态</Label>
  </Datagrid>
);

export default class PodList extends Component {
  state = {
    dataSource: []
  };
  componentDidMount() {
    dataProvider(GET_LIST, 'container/application.pod', { test: 1 }).then(
      response => {
        console.log(1, response);
        this.setState({ dataSource: response.data });
      }
    );
  }
  render() {
    return <Table {...this.state} {...this.props} />;
  }
}
