import React from 'react';
import { Datagrid, List, Column } from '@stbui/prophet-antd';

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
        </Datagrid>
    </List>
);
