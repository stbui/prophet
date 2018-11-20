import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DynamicTabs from '../../components/dynamic-tabs';

const panes = [
  { title: 'tech', key: '1' },
  { title: 'sompo', key: '2' },
  { title: 'zagj', key: '3' }
];

export default class list extends Component {
  static propTypes = {};

  render() {
    return (
      <div>
        <DynamicTabs defaultActiveKey="1" panes={panes}>
          {() => {
            return <div>1</div>;
          }}
        </DynamicTabs>
      </div>
    );
  }
}

