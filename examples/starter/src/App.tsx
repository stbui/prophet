import React, { Component } from 'react';
import { Prophet, Resource } from 'prophet-core';
import { Layout } from 'prophet-antd';
import jsonServerProvider from 'prophet-data-json-server';
import { crudMetadata } from 'prophet-common';

const List = (props: any) => <div>list</div>;
const Edit = (props: any) => <div>edit</div>;
const Create = (props: any) => <div>create</div>;
const Show = (props: any) => <div>custom</div>;
const CatchAll = (props: any) => <div>CatchAll</div>;

class App extends Component {
  render() {
    return (
      <Prophet
        dataProvider={jsonServerProvider('http://127.0.0.1')}
        layout={Layout}
      >
        <Resource
          name="forms"
          list={List}
          edit={Edit}
          create={Create}
          show={Show}
        />
      </Prophet>
    );
  }
}

export default App;
