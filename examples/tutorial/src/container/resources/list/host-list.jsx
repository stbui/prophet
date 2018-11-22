import React, { Component } from 'react';
import { Input, Button } from 'antd';

export default class HostList extends Component {
  static propTypes = {
    // prop: PropTypes,
  };

  handleBtnClick = () => {
    const { changeParams } = this.props;
    changeParams({ test: 'test' });
  };

  render() {
    
    return (
      <div>
        主机IP:
        <Input style={{ width: 200 }} />
        <Button type="primary" onClick={this.handleBtnClick}>
          查询
        </Button>
      </div>
    );
  }
}
