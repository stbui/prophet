import React, { Component } from 'react';
import { ListTabbed } from 'prophet-antd';
import { HostList, JvmList, PodList } from './list/index';
import { parse } from 'query-string';

const panes = [
  { title: '主机资源监控', key: 'host' },
  { title: 'pod资源监控', key: 'pod' },
  { title: 'jvm资源监控', key: 'jvm' }
];

// export class Tabbed extends Component {
//   handleTabsChange = tab => {
//     const { changeParams } = this.props;
//     changeParams({ tab });
//   };

//   render() {
//     console.log(this.props);
//     const {
//       location: { search }
//     } = this.props;

//     return (
//       <DynamicTabs
//         defaultActiveKey={parse(search).tab}
//         panes={panes}
//         onChange={this.handleTabsChange}
//       >
//         {tab => {
//           switch (tab.key) {
//             case 'host':
//               return <HostList {...this.props} />;
//             case 'pod':
//               return <PodList dataSource={[]} {...this.props} />;
//             case 'jvm':
//               return <JvmList dataSource={[]} {...this.props} />;
//             default:
//               return null;
//           }
//         }}
//       </DynamicTabs>
//     );
//   }
// }

const resourceList = ({ ...props }) => (
  <ListTabbed defaultActiveKey="pod" panes={panes} {...props}>
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

export default resourceList;
