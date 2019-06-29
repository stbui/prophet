# Setup

```bash
npm install prophet-core prophet-data-json-server
```

```js
import { Prophet, Resource } from 'prophet-core';
import dataJsonServer from 'prophet-data-json-server';

<Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
  <Resource
    name="users"
    list={props => <div>list</div>}
    edit={props => <div>edit</div>}
    create={props => <div>create</div>}
    show={props => <div>show</div>}
  />
</Prophet>;
```
