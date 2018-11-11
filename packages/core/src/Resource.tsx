import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { registerResource } from './actions';

export class Resource extends Component<any, any> {
  componentWillMount() {
    const { registerResource, name, list, edit, create, show } = this.props;
    const resource = { name };
    registerResource(resource);
  }

  render() {
    const { name, list, edit, create, show, match } = this.props;
    console.log(this.props, match);
    return (
      <Switch>
        <Route exact path="/list" render={props => <div>test</div>} />
      </Switch>
    );
  }
}

export default connect(
  null,
  { registerResource }
)(Resource);
