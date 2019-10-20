# Prophet

通过 dataProvider 把传递过来的数据,分发给内部组件

## 示例

```js
import { Prophet, Resource } from '@stbui/prophet-core';
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

### 基本用法

```js
<Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>...</Prophet>
```

## API

```ts
interface CoreProps {
    dashboard: ComponentType;
    menu: ComponentType;
    brand: ComponentType;
    login: ComponentType;
    layout: ComponentType;
    catchAll: ComponentType;
    initialState: any;
    authProvider: any;
    dataProvider: any;
    i18nProvider: any;
    customRoutes: any;
    customSagas: any;
    customReducers: any;
    history: any;
}
```
