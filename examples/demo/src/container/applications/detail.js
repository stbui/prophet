import React from 'react';
import { List, Datagrid, Link, ModalField } from 'prophet-antd';
import { Divider, Alert } from 'antd';

const Label = ({ title }) => title;

export const SqlTable = ({ ...props }) => (
  <Datagrid pagination={false} {...props}>
    <Label dataIndex="sql">sql</Label>
    <Label dataIndex="callNum">调用次数</Label>
    <Label dataIndex="avgTimer">平均执行时间</Label>
  </Datagrid>
);

export const AppTable = props => (
  <Datagrid pagination={false} {...props}>
    <Label dataIndex="appName">应用名称/podName</Label>
    <Label dataIndex="requestNum">请求数</Label>
    <Label dataIndex="requestFail">请求失败数</Label>
    <Label dataIndex="dbOperaNum">db操作数</Label>
    <Label dataIndex="dbOperaFail">db失败数</Label>
    <Label
      render={(text, row) => (
        <span>
          <Link key="1" to="/container/resource">
            pod资源
          </Link>
          <Divider type="vertical" />
          <Link key="2" to="/container/resource">
            主机资源
          </Link>
          <Divider type="vertical" />
          <Link key="3" to="/container/resource">
            jvm资源
          </Link>
          <Divider type="vertical" />
          <ModalField text="慢sql查询" source={row}>
            <SqlTable
              title={() => (
                <Alert
                  message={`应用名称:${row.appName} podName:${row.appName}`}
                  type="info"
                  showIcon
                />
              )}
            />
          </ModalField>
        </span>
      )}
    >
      操作
    </Label>
  </Datagrid>
);

export const PodTable = props => (
  <Datagrid pagination={false} {...props}>
    <Label dataIndex="timestamp">时间</Label>
    <Label dataIndex="podName">实例数</Label>
    <Label dataIndex="ip">宿主机IP</Label>
    <Label dataIndex="dbOperaNum">db操作数</Label>
    <Label dataIndex="status">状态</Label>
  </Datagrid>
);

const appList = props => (
  <div>
    <List {...props}>
      <AppTable {...props} />
    </List>
    <div>POD状态变化列表</div>
    <List {...props} resource="container/application.pod">
      <PodTable {...props} />
    </List>
  </div>
);

export default appList;
