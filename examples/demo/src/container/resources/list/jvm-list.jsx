import React, { Component } from 'react';
import { Table } from 'antd';

const dataSource = [];

export default class JvmList extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  columns = [
    {
      title: 'podName',
      dataIndex: 'podName',
      key: 'podName',
    },

    {
      title: '堆内存分配值',
      dataIndex: '堆内存分配值',
      key: '堆内存分配值',
    },
    {
      title: '堆内存使用率',
      dataIndex: '堆内存使用率',
      key: '堆内存使用率',
    },
    {
      title: '非堆内存分配值',
      dataIndex: '非堆内存分配值',
      key: '非堆内存分配值',
    },
    {
      title: '非堆内存使用率',
      dataIndex: '非堆内存使用率',
      key: '非堆内存使用率',
    },
  ];
  render() {
    return (
      <div>
        <div>JVM内存资源情况</div>
        <Table dataSource={dataSource} columns={this.columns} pagination={false} />
      </div>
    );
  }
}
