import React from 'react';
import { List, Datagrid, Column } from '@stbui/prophet-antd';

export default props => {
    return (
        <List {...props}>
            <Datagrid>
                <Column dataIndex="name">商品ID</Column>
                <Column dataIndex="name">商品名称</Column>
                <Column dataIndex="name">分类</Column>
                <Column dataIndex="name">价格</Column>
                <Column dataIndex="name">库存</Column>
                <Column dataIndex="name">上架</Column>
                <Column dataIndex="name">添加时间</Column>
            </Datagrid>
        </List>
    );
};
