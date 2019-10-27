import React from 'react';
import { List, Datagrid, Column } from '@stbui/prophet-antd';

export default props => {
    return (
        <List {...props}>
            <Datagrid>
                <Column dataIndex="id">分类ID</Column>
                <Column dataIndex="name">分类名称</Column>
                <Column dataIndex="create_time">添加时间</Column>
                <Column dataIndex="update_time">更新时间</Column>
            </Datagrid>
        </List>
    );
};
