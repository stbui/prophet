import React from 'react';
import { Datagrid, Link, List, Create, Edit, Show } from 'prophet-antd';

const Label = ({ title }) => title;

export const MaterialList = props => (
  <List {...props}>
    list
    <Datagrid>
      <Label dataIndex="name">姓名</Label>
      <Label dataIndex="age">年龄</Label>
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
