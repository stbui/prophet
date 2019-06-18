import React, { Component, Children } from 'react';
import { Table } from 'antd';

/**
 * <Datagrid>
 *  <Text dataIndex="name">姓名</Text>
 *  <Text dataIndex="age">年龄</Text>
 * </Datagrid>
 */

export interface IProps {
  data?: any;
  ids?: any;
  children?: [];
  total?: number;
  page?: number;
  perPage?: number;
  setPage?: (page?: any) => void;
}

export class Datagrid extends Component<IProps> {
  handleTable = ({ current, pageSize, total }) => {
    this.props.setPage(current);
  };

  render() {
    const { children = [], data, ids, page, perPage, total } = this.props;
    const columns: any = [];

    Children.map(children, (child: any, key: any) => {
      const { children, dataIndex, ...other } = child.props;
      columns.push({
        title: children ? children : dataIndex,
        dataIndex: dataIndex,
        key: key,
        ...other
      });
    });

    const pagination = {
      showSizeChanger: true,
      showQuickJumper: true,
      total: total,
      current: page,
      showTotal: () =>
        `共 ${total} 条记录 第 ${page}/${Math.ceil(total / perPage)} 页`
    };

    const newData = ids && ids.map(d => data[d]);

    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={newData}
        onChange={this.handleTable}
        pagination={pagination}
        {...this.props}
      />
    );
  }
}

export default Datagrid;
