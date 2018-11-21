import React, { Component } from 'react';
import { Input } from 'antd';

export default class HostList extends Component {
  static propTypes = {
    // prop: PropTypes,
  };

  render() {
    return (
      <div>
        主机IP:
        <Input style={{ width: 200 }} />
      </div>
    );
  }
}
