# 快速开始

```bash
npm install prophet-core@latest prophet-antd@latest prophet-data-json-server@latest
```

```js
import { Prophet, Resource } from 'prophet-core';
import { Layout } from 'prophet-antd';
import dataJsonServer from 'prophet-data-json-server';

<Prophet layout={Layout} dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
    <Resource
        name="users"
        list={props => <div>list</div>}
        edit={props => <div>edit</div>}
        create={props => <div>create</div>}
        show={props => <div>show</div>}
    />
</Prophet>;
```
