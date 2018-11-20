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

export interface IProps {
  data?: any;
}

export class Datagrid extends Component<IProps> {
  render() {
    const { children = [], data } = this.props;
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

    return <Table columns={columns} dataSource={data} {...this.props} />;
  }
}

export default Datagrid;
