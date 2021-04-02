import React from 'react';
import {
    Datagrid,
    List,
    Column,
    EditButton,
    ShowButton,
    DeleteButton,
} from '@stbui/prophet-antd';

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
                render={record => (
                    <React.Fragment>
                        <EditButton id={record.id} basePath={props.basePath} />
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
