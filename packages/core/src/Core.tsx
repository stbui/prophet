import React, { Component, createElement } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Store from './Store';

export class Core extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={Store}>
        <div>core</div>
      </Provider>
    );
  }
}

export default Core;
