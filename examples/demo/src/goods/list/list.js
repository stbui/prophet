import React from 'react';
import {
    List,
    Datagrid,
    Column,
    EditButton,
    ShowButton,
    DeleteButton,
} from 'prophet-antd';

export default props => {
    return (
        <List {...props}>
            <Datagrid>
                <Column dataIndex="id">商品ID</Column>
                <Column dataIndex="goods_name">商品名称</Column>
                <Column dataIndex="category_id">分类</Column>
                <Column dataIndex="name">价格</Column>
                <Column dataIndex="store_count">库存</Column>
                <Column dataIndex="is_on_sale">上架</Column>
                <Column dataIndex="create_time">添加时间</Column>
                <Column
                    render={record => (
                        <React.Fragment>
                            <EditButton
                                id={record.id}
                                resource={props.resource}
                                basePath={props.basePath}
                            />
                            <span style={{ marginRight: 12 }}></span>
                            <ShowButton
                                id={record.id}
                                resource={props.resource}
                                basePath={props.basePath}
                            />
                            <span style={{ marginRight: 12 }}></span>
                            <DeleteButton
                                id={record.id}
                                record={record}
                                resource={props.resource}
                                basePath={props.basePath}
                            />
                        </React.Fragment>
                    )}
                >
                    操作
                </Column>
            </Datagrid>
        </List>
    );
};
