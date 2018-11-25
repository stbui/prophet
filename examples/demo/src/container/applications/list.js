import React from 'react';
import { Datagrid, Link, ListTabbed } from 'prophet-antd';
import { Divider } from 'antd';

const panes = [
  { title: 'tech', key: '1' },
  { title: 'sompo', key: '2' },
  { title: 'zagj', key: '3' }
];
const Label = ({ title }) => title;

const appList = props => (
  <ListTabbed
    defaultActiveKey="1"
    panes={panes}
    filter={{ test: 1 }}
    {...props}
  >
    {({ key, title, total, basePath, ...other }) => (
      <Datagrid
        title={() => (
          <div>
            {title} 应用总计： {total}个
          </div>
        )}
        {...other}
      >
        <Label
          dataIndex="appName"
          render={text => <Link to={`${basePath}/${text}/show`}>{text}</Link>}
        >
          应用名称
        </Label>
        <Label dataIndex="instance">实例数</Label>
        <Label dataIndex="requestNum">请求失败数</Label>
        <Label dataIndex="dbOperaNum">db操作数</Label>
        <Label dataIndex="dbOperaFail">db失败数</Label>
        <Label
          render={() => (
            <span>
              <Link key="1" to="/container/resource?tab=pod">
                pod资源
              </Link>
              <Divider type="vertical" />
              <Link key="2" to="/container/resource?tab=host">
                主机资源
              </Link>
              <Divider type="vertical" />
              <Link key="3" to="/container/resource?tab=jvm">
                jvm资源
              </Link>
              <Divider type="vertical" />
              <Link key="4" to="/container/collection">
                采集配置
              </Link>
              <Divider type="vertical" />
              <Link key="5" to="/container/log">
                日志查询
              </Link>
              <Divider type="vertical" />
              <Link key="6" to="/container/log">
                趋势对比
              </Link>
              <Divider type="vertical" />
              <Link key="7" to="/container/fault">
                故障定位
              </Link>
            </span>
          )}
        >
          操作
        </Label>
      </Datagrid>
    )}
  </ListTabbed>
);

export default appList;
