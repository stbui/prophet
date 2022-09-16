---
nav:
    title: 自定义组件
    order: 4
order: 1
---

# <CustomRoutes> 自定义路由

注册你自己的路由

## 示例

```js
import React from 'react';
import { Prophet, Resource } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';
import { Route } from 'react-router-dom';

const App = () => {
    return (
        <Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
            <Resource
                name="users"
                list={() => <div>list</div>}
                edit={() => <div>edit</div>}
                create={() => <div>create</div>}
                show={() => <div>show</div>}
            />
            <Resource name="article" {...article}>
                <Route path="comment" element={<div>comment</div>} />
            </Resource>
            <CustomRoutes>
                <Route path="/settings" element={<div>settings</div>} />
                <Route path="/profile" element={<div>profile</div>} />
            </CustomRoutes>
        </Prophet>
    );
};

export default App;
```

如果你需要在页面 layout 外定义路由，可以使用 noLayout 属性, 此时页面渲染在 layout 之外

```js
import React from 'react';
import { Prophet, Resource } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';
import { Route } from 'react-router-dom';

const App = () => {
    return (
        <Prophet dataProvider={dataJsonServer('http://127.0.0.1:3001')}>
            <CustomRoutes noLayout>
                <Route path="/login" element={<div>login</div>} />
            </CustomRoutes>
        </Prophet>
    );
};

export default App;
```
