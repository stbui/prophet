import React, { Component } from 'react';
import { Modal } from 'antd';

export interface IProps {
  tittle: string;
  text: string;
}

export interface IState {
  visible: boolean;
}

export default class ModalField extends Component<IProps, IState> {
  state = { visible: false };

  handleClick = () => {
    this.onChange();
  };

  handleCancel = () => {
    this.onChange();
  };

  handleOk = () => {
    this.onChange();
  };

  onChange = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { tittle, text, children } = this.props;
    const { visible } = this.state;
    return (
      <span>
        <span onClick={this.handleClick}>{text}</span>
        <Modal
          title={tittle ? tittle : text}
          visible={visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          {...this.props}
        >
          {children}
        </Modal>
      </span>
    );
  }
}
