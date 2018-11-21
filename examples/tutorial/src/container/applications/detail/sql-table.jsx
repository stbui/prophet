import React, { Component } from 'react';
import { Modal, Alert } from 'antd';
import { Datagrid } from 'prophet-antd';

const dataSource = [];

const Label = ({ title }) => title;

export const Table = ({ ...props }) => (
  <Datagrid pagination={false} {...props}>
    <Label dataIndex="sql">sql</Label>
    <Label dataIndex="callNum">调用次数</Label>
    <Label dataIndex="avgTimer">平均执行时间</Label>
  </Datagrid>
);

export default class AppDetail extends Component {
  static propTypes = {
    // prop: PropTypes
  };

  columns = [
    {
      title: 'sql',
      dataIndex: 'sql',
      key: 'sql'
    },

    {
      title: '调用次数',
      dataIndex: 'callNum',
      key: 'callNum'
    },
    {
      title: '平均执行时间',
      dataIndex: 'avgTimer',
      key: 'avgTimer'
    }
  ];

  render() {
    const { visible, onOk } = this.props;

    return (
      <Modal
        title="慢sql查询"
        width={900}
        visible={visible}
        onOk={onOk}
        onCancel={onOk}
      >
        <Alert
          message="应用名称:sompo-product podName:15830-sompo-product-332dcfgn"
          type="info"
          showIcon
        />
        <Table dataSource={dataSource} {...this.props} />
      </Modal>
    );
  }
}
