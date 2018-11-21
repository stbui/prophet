import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getResources } from 'prophet-core';
import { Menu, Icon } from 'antd';

export class M extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: 'https://static.zhongan.com/website/tech/images/logo.png',
      sysName: '智能监控系统',
      menuList: [
        {
          name: '容器云系统监控',
          icon: 'windows',
          key: 'container',
          children: [
            {
              name: '应用监控',
              uri: '/application'
            },
            {
              name: '资源监控',
              uri: '/resource'
            },
            {
              name: '接口调用',
              uri: '/interface'
            },
            {
              name: '采集配置',
              uri: '/collection'
            },
            {
              name: '日志查询',
              uri: '/log'
            },
            {
              name: '故障定位',
              uri: '/fault'
            },
            {
              name: '权限申请',
              uri: '/permission'
            }
          ]
        },
        {
          name: '应用监控',
          icon: 'bar-chart',
          key: 'data-report',
          children: [
            {
              name: '异常看板',
              uri: '/kanban'
            },
            {
              name: '异常趋势',
              uri: '/mine'
            }
          ]
        },
        {
          name: '昆仑引擎',
          icon: 'setting',
          key: 'kunlun',
          children: [
            {
              name: '服务器监控',
              uri: '/server'
            },
            {
              name: '调用链',
              uri: '/call-chain'
            }
          ]
        }
      ]
    };
  }

  renderSubMenuItem = (item, path = '') => {
    const uri = `/${path}${item.uri}`;
    return (
      <Menu.Item key={uri}>
        <Link to={uri}>
          {item.icon && <Icon type={item.icon} />}
          {item.name}
        </Link>
      </Menu.Item>
    );
  };

  render() {
    const { hasDashboard, location } = this.props;
    const { menuList } = this.state;

    const list = menuList.map(item => {
      if (item.children) {
        return (
          <Menu.SubMenu
            key={item.key}
            title={[
              <Icon key="1" type={item.icon} theme="outlined" />,
              <span key="2">{item.name}</span>
            ]}
          >
            {item.children.map(chid => {
              return this.renderSubMenuItem(chid, item.key);
            })}
          </Menu.SubMenu>
        );
      }

      return this.renderSubMenuItem(item);
    });

    return (
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        {hasDashboard && (
          <Menu.Item>
            <Link to="/">主页</Link>
          </Menu.Item>
        )}

        {list}
      </Menu>
    );
  }
}

const mapStateToProps = state => ({ resources: getResources(state) });

export default connect(mapStateToProps)(M);
