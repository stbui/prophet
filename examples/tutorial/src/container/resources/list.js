import React from 'react';
import { ListTabbed } from 'prophet-antd';
import { HostList, JvmList, PodList } from './list/index';
import { parse } from 'query-string';

const panes = [
  { title: '主机资源监控', key: 'host' },
  { title: 'pod资源监控', key: 'pod' },
  { title: 'jvm资源监控', key: 'jvm' }
];

const resourceList = props => {
  const {
    location: { search }
  } = props;
  const defaultActiveKey = parse(search).tab || 'host';

  return (
    <ListTabbed defaultActiveKey={defaultActiveKey} panes={panes} {...props}>
      {({ key, title, ...other }) => {
        switch (key) {
          case 'host':
            return <HostList {...other} />;
          case 'pod':
            return <PodList dataSource={[]} {...other} />;
          case 'jvm':
            return <JvmList dataSource={[]} {...other} />;
          default:
            return null;
        }
      }}
    </ListTabbed>
  );
};

export default resourceList;
