import React from 'react';
import { Datagrid, Link, List, Create, Edit, Show } from '@admin/antd';

const Text = ({ title }) => title;

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
];

export const MaterialList = props => (
  <List dataSource={dataSource}>
    list
    <Datagrid>
      <Text dataIndex="name">姓名</Text>
      <Text dataIndex="age">年龄</Text>
    </Datagrid>
    <p>
      <Link to={`${props.basePath}/1`}>edit</Link>
    </p>
    <p>
      <Link to={`${props.basePath}/create`}>create</Link>
    </p>
    <p>
      <Link to={`${props.basePath}/2/show`}>show</Link>
    </p>
  </List>
);
export const MaterialEdit = props => <Edit>Material edit</Edit>;
export const MaterialCreate = props => <Create>Material create</Create>;
export const MaterialShow = props => <Show>Material show</Show>;
