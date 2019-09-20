# customRoutes

自定义路由

## 示例

```js
import { Prophet, Resource } from '@stbui/prophet-core';
import dataJsonServer from 'prophet-data-json-server';
import { Route } from 'react-router-dom';

<Prophet
    dataProvider={dataJsonServer('http://127.0.0.1:3001')}
    customRoutes={[
        <Route path="custom" component={<div>custom router</div>} />,
    ]}
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
