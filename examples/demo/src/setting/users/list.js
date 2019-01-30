import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Datagrid, List, Link } from 'prophet-antd';
import { Button, Icon } from 'antd';

const Label = ({ title }) => title;

export default class UsersList extends Component {
  static propTypes = {};

  handleAddClick = () => {
    const { basePath, history } = this.props;
    history.push(`${basePath}/create`);
  };

  renderActions() {
    return (
      <div style={{ marginBottom: 12, marginTop: 12 }}>
        <Button
          type="primary"
          icon="plus"
          onClick={this.handleAddClick}
          style={{ marginLeft: 8 }}
        >
          新增
        </Button>
        <Button disabled style={{ marginLeft: 8 }}>
          启用
        </Button>
        <Button disabled style={{ marginLeft: 8 }}>
          禁用
        </Button>
        <Button icon="close" disabled style={{ marginLeft: 8 }}>
          删除
        </Button>
      </div>
    );
  }

  render() {
    const { basePath } = this.props;

    return (
      <List actions={this.renderActions()} {...this.props}>
        <Datagrid>
          <Label dataIndex="key">ID</Label>
          <Label dataIndex="username">用户名</Label>
          <Label dataIndex="nickname">昵称</Label>
          <Label dataIndex="role">角色</Label>
          <Label dataIndex="email">邮箱</Label>
          <Label dataIndex="phone">手机号</Label>
          <Label dataIndex="createTime">创建时间</Label>
          <Label dataIndex="status">状态</Label>
          <Label
            render={(text,row) => (
              <span>
                <Link to={`${basePath}/${row.key}`}>编辑</Link>
                <Link to={`${basePath}/${row.key}/show`}>查看</Link>
              </span>
            )}
          >
            操作
          </Label>
        </Datagrid>
      </List>
    );
  }
}
