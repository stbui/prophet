import React from 'react';
import PropTypes from 'prop-types';
import { Show } from 'prophet-antd';

const Text = ({ title }) => title;

export const UsersShow = props => (
  <Show {...props}>
    <Text title="用户名" />
  </Show>
);

export default UsersShow;
