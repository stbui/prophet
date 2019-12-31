import React from 'react';
import {
    List,
    Datagrid,
    Column,
    EditButton,
    ShowButton,
    DeleteButton,
} from '@stbui/prophet-antd';

export default props => {
    return (
        <List {...props}>
            <Datagrid>
                <Column dataIndex="id">分类ID</Column>
                <Column dataIndex="name">分类名称</Column>
                <Column dataIndex="create_time">添加时间</Column>
                <Column dataIndex="update_time">更新时间</Column>

                <Column
                    render={record => (
                        <React.Fragment>
                            <EditButton
                                id={record.id}
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
                ></Column>
            </Datagrid>
        </List>
    );
};
