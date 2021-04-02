import React from 'react';
import { Space } from 'antd';
import {
    ListDrawer,
    Datagrid,
    Column,
    EditButton,
    ShowButton,
    EnabledButton,
} from '@stbui/prophet-antd';

import Create from './create';
import Edit from './edit';
import Show from './show';

import Filter from './Filter';

export default props => (
    <ListDrawer
        {...props}
        actions={<Filter />}
        create={<Create width={600} />}
        edit={<Edit width={600} />}
        show={<Show width={600} />}
    >
        <Datagrid defaultOpera={false}>
            <Column dataIndex="env">环境</Column>
            <Column dataIndex="path">路径规则</Column>
            <Column dataIndex="url">后端服务</Column>

            <Column dataIndex="status" width={100}>
                状态
            </Column>
            <Column
                width={120}
                render={record => (
                    <Space size={4}>
                        <EnabledButton
                            id={record.id}
                            is={record.is_deleted === 'Y'}
                            name={record.app_name}
                            record={record}
                            resource={props.resource}
                            basePath={props.basePath}
                        />

                        <span className="m-r-12" />
                        <EditButton
                            id={record.id}
                            resource={props.resource}
                            basePath={props.basePath}
                        />
                        <span className="m-r-12" />
                     
                    </Space>
                )}
            >
                操作
            </Column>
        </Datagrid>
    </ListDrawer>
);
