import React, { Component } from 'react';
import { connect } from 'react-redux';
import { notification as notice } from 'antd';
import { hideNotification } from 'prophet-core';

export class Notify extends Component<any> {
  state = {
    open: false
  };

  componentWillMount() {
    this.setOpenState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.setOpenState(nextProps);
  }

  setOpenState({ notification }: any) {
    if (notification) {
      this.openNotification(notification);
    } else {
      this.destroyNotification();
    }
  }

  destroyNotification() {
    this.props.hideNotification();
    notice.destroy();
  }

  openNotification(notification) {
    notice[notification.type]({
      message: notification.message,
      description: notification.description
    });
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => {
  return { notification: state.notifications[0] };
};

export default connect(
  mapStateToProps,
  { hideNotification }
)(Notify);
