import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Store from './Store';

class Core extends Component {
  render() {
    return <Provider store={Store}>index</Provider>;
  }
}
