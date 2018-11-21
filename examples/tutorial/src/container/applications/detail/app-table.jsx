import React, { Component } from 'react';
import { Link } from 'prophet-antd';
import { Table } from 'antd';
import { Divider } from 'antd';
import SqlTable from './sql-table';

const dataSource = [
  {
    key: '1',
    appName: 'sompo-product',
    instance: 3,
    requestNum: 371,
    requestFail: 38,
    dbOperaNum: 230,
    dbOperaFail: 3,
    podId: 1,
    hostId: 1,
    jvmId: 1,
    collectionId: 1,
    logId: 1,
    faultId: 1
  },
  {
    key: '2',
    appName: 'sompo-market',
    instance: 3,
    requestNum: 371,
    requestFail: 38,
    dbOperaNum: 230,
    dbOperaFail: 3,
    podId: 1,
    hostId: 1,
    jvmId: 1,
    collectionId: 1,
    logId: 1,
    faultId: 1
  },
  {
    key: '3',
    appName: 'sompo-policy',
    instance: 3,
    requestNum: 371,
    requestFail: 38,
    dbOperaNum: 230,
    dbOperaFail: 3,
    podId: 1,
    hostId: 1,
    jvmId: 1,
    collectionId: 1,
    logId: 1,
    faultId: 1
  }
];

export default class AppDetail extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  state = { visible: false };

  columns = [
    {
      title: '应用名称/podName',
      dataIndex: 'appName',
      key: 'appName'
    },

    {
      title: '请求数',
      dataIndex: 'requestNum',
      key: 'requestNum'
    },
    {
      title: '请求失败数',
      dataIndex: 'requestFail',
      key: 'requestFail'
    },
    {
      title: 'db操作数',
      dataIndex: 'dbOperaNum',
      key: 'dbOperaNum'
    },
    {
      title: 'db失败数',
      dataIndex: 'dbOperaFail',
      key: 'dbOperaFail'
    },
    {
      title: '操作',
      render: () => (
        <span>
          <Link key="1" to="/container/resource">
            pod资源
          </Link>
          <Divider type="vertical" />
          <Link key="2" to="/container/resource">
            主机资源
          </Link>
          <Divider type="vertical" />
          <Link key="3" to="/container/resource">
            jvm资源
          </Link>
          <Divider type="vertical" />
          <a key="4" className="color-primary" onClick={this.handleOk}>
            慢sql查询
          </a>
        </span>
      )
    }
  ];

  handleOk = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={this.columns}
          pagination={false}
        />
        <SqlTable visible={this.state.visible} onOk={this.handleOk} />
      </div>
    );
  }
}
