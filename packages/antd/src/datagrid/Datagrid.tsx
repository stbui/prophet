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
  children?: any;
  total?: number;
  page?: number;
  perPage?: number;
  setPage?: (page?: any) => void;
  setPerPage?: (page?: any) => void;
}

export class Datagrid extends Component<IProps> {
  handleChange = (pagination: any, filters: any, sorter: any, extra: any) => {};

  handlePageChange = (current: number, pageSize: number) => {
    this.props.setPage(current);
  };

  handleShowSizeChange = (current: number, pageSize: number) => {
    this.props.setPerPage(pageSize);
  };

  handleShowTotal = () => {
    const { page, perPage, total } = this.props;
    return `共 ${total} 条记录 第 ${page}/${Math.ceil(total / perPage)} 页`;
  };

  render() {
    const { children = [], data, ids, page, total } = this.props;
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
      showTotal: this.handleShowTotal,
      onShowSizeChange: this.handleShowSizeChange,
      onChange: this.handlePageChange
    };

    const newData = ids && ids.map(d => data[d]);

    return (
      <Table
        rowKey="id"
        columns={columns}
        dataSource={newData}
        onChange={this.handleChange}
        pagination={pagination}
        {...this.props}
      />
    );
  }
}

export default Datagrid;
