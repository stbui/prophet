import React from 'react';
import { Datagrid, Link, List, Create, Edit, Show } from '@stbui/prophet-antd';
import { Divider } from 'antd';

const Label = ({ title }) => title;

export const MaterialList = props => (
  <List {...props}>
    <Datagrid>
      <Label dataIndex="name">姓名</Label>
      <Label dataIndex="age">年龄</Label>
      <Label
        render={(text, row) => (
          <span>
            <Link to={`${props.basePath}/create`}>create</Link>
            <Divider type="vertical" />
            <Link to={`${props.basePath}/${row.age}`}>edit</Link>
            <Divider type="vertical" />
            <Link to={`${props.basePath}/${row.age}/show`}>show</Link>
          </span>
        )}
      >
        操作
      </Label>
    </Datagrid>
  </List>
);
export const MaterialEdit = props => <Edit>Material edit</Edit>;
export const MaterialCreate = props => <Create>Material create</Create>;
export const MaterialShow = props => <Show>Material show</Show>;
