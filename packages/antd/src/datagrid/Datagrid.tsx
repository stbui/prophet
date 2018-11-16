import React, { Component, Children } from 'react';
import { Table } from 'antd';
import 'antd/lib/table/style/index.css';
import 'antd/lib/pagination/style/index.css';

/**
 * <Datagrid>
 *  <Text dataIndex="name">姓名</Text>
 *  <Text dataIndex="age">年龄</Text>
 * </Datagrid>
 */
export class Datagrid extends Component {
  render() {
    const { children } = this.props;
    const columns: any = [];

    Children.map(children, (child: any) => {
      columns.push({
        title: child.props.children
          ? child.props.children
          : child.props.dataIndex,
        dataIndex: child.props.dataIndex,
        key: child.props.dataIndex
      });
    });

    return <Table columns={columns} {...this.props} />;
  }
}

export default Datagrid;
