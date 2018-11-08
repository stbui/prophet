import React, { Component } from 'react';
import { Button } from 'antd';

export class Layout extends Component<any, any> {
  render() {
    return (
      <div className="Layout">
        <Button>Button</Button>
        {this.props.children}
      </div>
    );
  }
}
