# 快速开始

我们以 create-react-app 脚手架快速创建项目

```bash
npx create-react-app demo
```

安装 prophet 相关依赖

```bash
npm install @stbui/prophet@latest @stbui/prophet-data-json-server@latest
```

然后在 App.js 文件写入代码

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
