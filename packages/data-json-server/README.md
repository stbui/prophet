# @stbui/prophet-data-json-server

RESTFUL 规范适配器

## Usage

```bash
npm install @stbui/prophet@latest @stbui/prophet-data-json-server@latest
```

配合组件使用

```js
import { Admin, Resource } from '@stbui/prophet-core';
import dataJsonServer from '@stbui/prophet-data-json-server';

<Admin dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
    <Resource
        name="users"
        list={props => <div>list</div>}
        edit={props => <div>edit</div>}
        create={props => <div>create</div>}
        show={props => <div>show</div>}
    />
</Admin>;
```

直接调用

```js
import dataProvider from '@stbui/prophet-data-json-server';
dataProvider('http://127.0.0.1')('GET_LIST', 'users').then(response => {
    console.log(response);
});
```
