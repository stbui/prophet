import React, { Component } from 'react';
import { connect } from 'react-redux';
import { refreshView } from 'prophet-core';
import { Button } from 'antd';

export class RefreshButton extends Component<any> {
  handleClick = () => {
    const { refreshView, onClick } = this.props;
    refreshView();
    onClick && onClick();
  };

  render() {
    const { label, ...other } = this.props;
    return (
      <Button type="primary" onClick={this.handleClick} {...other}>
        {label}
      </Button>
    );
  }
}

export default connect(
  null,
  { refreshView }
)(RefreshButton);
