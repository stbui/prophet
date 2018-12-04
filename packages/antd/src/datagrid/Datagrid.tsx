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
  children?: [];
  total?: number;
  pagination?: any;
  setPage?: (page?: any) => void;
}

export class Datagrid extends Component<IProps> {
  handleTable = pagation => {
    this.props.setPage(pagation);
  };

  render() {
    const { children = [], data, pagination } = this.props;
    const columns: any = [];

    Children.map(children, (child: any) => {
      const { children, dataIndex, ...other } = child.props;
      columns.push({
        title: children ? children : dataIndex,
        dataIndex: dataIndex,
        key: dataIndex,
        ...other
      });
    });

    return (
      <Table
        columns={columns}
        dataSource={data}
        onChange={this.handleTable}
        pagination={pagination}
        {...this.props}
      />
    );
  }
}

export default Datagrid;
