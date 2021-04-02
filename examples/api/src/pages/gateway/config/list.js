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
        create={<Create width={600} />}
        edit={<Edit width={600} />}
        show={<Show width={600} />}
    >
        <Datagrid defaultOpera={false}>
            <Column dataIndex="apiName">API名称</Column>
            <Column
                dataIndex="requestConfig.path"
                render={(text, record) => (
                    <div>
                        {record.requestConfig.method}&nbsp;
                        {text}
                    </div>
                )}
            >
                前端路径
            </Column>
            {/* <Column dataIndex="requestConfig.method">前端请求方法</Column> */}
            <Column dataIndex="serviceConfig.url">后端服务URL</Column>
            <Column
                dataIndex="serviceConfig.path"
                render={(text, record) => (
                    <div>
                        {record.serviceConfig.method}&nbsp;
                        {text}
                    </div>
                )}
            >
                后端服务路径
            </Column>
            {/* <Column dataIndex="serviceConfig.method">后端服务请求方法</Column> */}
            <Column dataIndex="status" width={100}>
                状态
            </Column>
            <Column
                width={140}
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
