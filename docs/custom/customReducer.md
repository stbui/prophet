# customReducer

接收用户自定义 reducer。

## 示例

```js
import { Prophet, Resource } from '@stbui/prophet';
import dataJsonServer from 'prophet-data-json-server';

const customReducers = payload => ({
    type: 'custom',
    payload: payload,
});

<Prophet
    dataProvider={dataJsonServer('http://127.0.0.1:3001')}
    customReducers={{ customReducers }}
>
    <Resource
        name="users"
        list={props => <div>list</div>}
        edit={props => <div>edit</div>}
        create={props => <div>create</div>}
        show={props => <div>show</div>}
    />
</Prophet>;
```
