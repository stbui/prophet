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
            <Column dataIndex="id">id</Column>
            <Column dataIndex="engName">appID</Column>
            <Column dataIndex="chnName">应用名</Column>
            <Column dataIndex="config">标签</Column>
            <Column dataIndex="fixedConfig">是否启用认证</Column>
            <Column dataIndex="fixedConfig">认证方式</Column>
            <Column dataIndex="fixedConfig">是否启用IP白名单</Column>
            <Column dataIndex="fixedConfig">IP白名单</Column>
            <Column dataIndex="fixedConfig">自定义配置</Column>
            <Column
                width={160}
                render={record => (
                    <React.Fragment>
                        <EditButton
                            id={record.id}
                            resource={props.resource}
                            basePath={props.basePath}
                        />
                        <span className="m-r-12" />
                        <ShowButton
                            id={record.id}
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
