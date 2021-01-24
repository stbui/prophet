# 先知（Prophet）

[![React](https://img.shields.io/badge/react-16.14.0-brightgreen.svg?style=square)](https://github.com/facebook/react)
[![redux](https://img.shields.io/badge/redux-4.0.5-brightgreen.svg?style=square)](https://github.com/facebook/react)
[![antd](https://img.shields.io/badge/antd-4.8.2-brightgreen.svg?style=square)](https://github.com/facebook/react)
[![Downloads](https://img.shields.io/npm/dm/@stbui/prophet.svg)](https://npmcharts.com/compare/@stbui/prophet?minimal=true)
[![npm](https://img.shields.io/badge/prophet-3.0.1-green.svg?style=flat)](https://github.com/stbui/prophet)
[![Powered_by](https://img.shields.io/badge/Powered_by-stbui-green.svg?style=flat)](https://github.com/stbui/prophet)

Prophet 可以快速帮你构建后台管理的中后台前端应用框架，能帮助你使用很少的代码就实现功能完善的后台管理功能。

## 特性

-   高生产效率: 10 分钟内做一个管理后台
-   提炼 CRUD 容器组件，UI 与逻辑分离，快速开始前端开发
-   提炼后台应用的典型页面和场景，具备完备的组件和布局
-   提供一致的 react hook，提供更强大的组件拓展与封装能力
-   默认集成 antd 组件布局，同时也灵活支持第三方 UI 组件集成
-   引入 dataProvider 来处理各 种数据规范
-   模块化管理，提供更加灵活的扩展机制。

# 架构

![架构](docs/prophet.png)

## 起步

```bash
npm install @stbui/prophet@latest @stbui/prophet-data-json-server@latest
```

```js
import React from 'react';
import { Prophet, Resource } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';

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

export default App;
```

## Packages

| Package                                                         | Docs | Description       |
| --------------------------------------------------------------- | ---- | ----------------- |
| [`@stbui/prophet-core`](/packages/core)                         |      | 底层组件的封装    |
| [`@stbui/prophet-antd`](/packages/antd)                         |      | antd UI 实现      |
| [`@stbui/prophet-data-json-server`](/packages/data-json-server) |      | REST 接口规范实现 |
