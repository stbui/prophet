import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification } from 'antd';

export class Notify extends Component<any> {
  state = {
    open: false
  };

  componentWillMount = () => {
    this.setOpenState(this.props);
  };

  componentWillReceiveProps = nextProps => {
    this.setOpenState(nextProps);
  };

  setOpenState = ({ notification }: any) => {
    if (notification) {
      this.openNotification();
    } else {
      this.destroyNotification();
    }
  };

  destroyNotification = () => {
    notification.destroy();
  };

  openNotification = () => {
    notification[this.props.notification.type]({
      message: this.props.notification.message,
      description: this.props.notification.description
    });
  };

  render() {
    return null;
  }
}

const mapStateToProps = state => ({ notification: state.notification });

export default connect(mapStateToProps)(Notify);
