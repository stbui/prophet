import React from 'react';
import { List, Datagrid, Column } from '@stbui/prophet-antd';

import Filter from './Filter';

export default props => (
    <List {...props} actions={<Filter />}>
        <Datagrid defaultOpera={false}>
            <Column dataIndex="id">#</Column>
            <Column dataIndex="gatewayGroup">来源IP</Column>
            <Column dataIndex="proxyMode">网关分组</Column>
            <Column dataIndex="service">服务名</Column>
            <Column dataIndex="path">请求方法</Column>
            <Column dataIndex="method">appID</Column>
            <Column dataIndex="pluginNames">API Path</Column>
            <Column dataIndex="appEnabled">请求次数</Column>
            <Column dataIndex="appEnabled">最近请求时间</Column>
        </Datagrid>
    </List>
);
