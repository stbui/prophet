import React from 'react';
import {
  Datagrid,
  List,
  Column,
  EditButton,
  ShowButton,
  DeleteButton
} from 'prophet-antd';
import { Divider } from 'antd';

export default props => (
  <List {...props}>
    <Datagrid>
      <Column dataIndex="id">ID</Column>
      <Column dataIndex="username">用户名</Column>
      <Column dataIndex="nickName">昵称</Column>
      <Column dataIndex="nickName">角色</Column>
      <Column dataIndex="address_id">邮箱</Column>
      <Column dataIndex="phone">手机号</Column>
      <Column dataIndex="create_time">创建时间</Column>
      <Column dataIndex="status">状态</Column>
      <Column
        render={row => (
          <React.Fragment>
            <EditButton record={row} {...props} label="编辑" />
            <Divider type="vertical" />
            <ShowButton record={row} {...props} label="详情" />
            <Divider type="vertical" />
            <DeleteButton record={row} {...props} label="删除" />
          </React.Fragment>
        )}
      >
        操作
      </Column>
    </Datagrid>
  </List>
);
