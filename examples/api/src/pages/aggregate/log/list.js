import React from 'react';
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
        create={<Create width={800} />}
        edit={<Edit width={800} />}
        show={<Show width={800} />}
    >
        <Datagrid defaultOpera={false}>
            <Column dataIndex="id">#</Column>
            <Column dataIndex="gatewayGroup">网关分组</Column>
            <Column dataIndex="proxyMode">路由类型</Column>
            <Column dataIndex="service">前端服务名</Column>
            <Column dataIndex="path">前端API路径</Column>
            <Column dataIndex="method">请求方法</Column>
            <Column dataIndex="pluginNames">插件</Column>
            <Column dataIndex="appEnabled">访问</Column>
            <Column
                width={160}
                render={record => (
                    <React.Fragment>
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
                        <ShowButton
                            id={`${record.id}+${record.app_name}+${
                                record.app_id
                            }+${encodeURIComponent(record.url)}`}
                            resource={props.resource}
                            basePath={props.basePath}
                        />
                    </React.Fragment>
                )}
            >
                操作
            </Column>
        </Datagrid>
    </ListDrawer>
);
