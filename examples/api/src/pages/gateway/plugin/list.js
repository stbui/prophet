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
            <Column dataIndex="engName">插件名称</Column>
            <Column dataIndex="chnName">插件描述</Column>
            <Column dataIndex="config">表单定义</Column>
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
