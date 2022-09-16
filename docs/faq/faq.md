---
nav:
    title: FQA
    order: 5
order: 1
toc: menu
---

# 问题

### 如何集成到现有项目？

可以参照 [packages/prophet/src/Prophet.tsx](https://github.com/stbui/prophet/blob/master/packages/prophet/src/Prophet.tsx) 移植到现有项目

### 如何在现有项目使用 prohet 提供的 dataProvider?

在顶层组件中

```js
import { DataProviderContext } from '@stbui/prophet-core';
import dataJsonServer from '@stbui/prophet-data-json-server';

// App.js
export default () => (
    <DataProviderContext.Provider value={dataJsonServer('/api')}>
        <div>demo</div>
    </DataProviderContext.Provider>
);
```

### api 接口数据规范与 prophet 数据规范不一致，如何处理？

可以参考@stbui/prophet-data-json-server 包的实现方式，对 respone 数据进行处理

### 定义的路由如何扩展

参考 [packages/core/src/core/Resource.tsx](https://github.com/stbui/prophet/blob/master/packages/core/src/core/Resource.tsx)，添加新的路由

### umi 中如何使用 prophet

1. 添加 prophet 依赖

```js
  "dependencies": {
    "@stbui/prophet": "^3.0.1",
  },
```

2. 修改 umi 入口文件 `/src/app.ts`, 不使用框架预设的路由配置

```js
import Index from './pages/index.tsx';

export function rootContainer() {
    return React.createElement(Index);
}
```

3. `./pages/index.tsx`自定义入口文件，使用 proheht 框架

```js
import React from 'react';
import { Prophet, Resource } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';
import 'antd/dist/antd.css';

const App = () => {
    return (
        <Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
            <Resource
                name="users"
                list={props => <div>list</div>}
                edit={props => <div>edit</div>}
                create={props => <div>create</div>}
                show={props => <div>show</div>}
            />
        </Prophet>
    );
};
```
