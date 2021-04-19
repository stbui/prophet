---
nav:
    title: 自定义组件
    order: 4
order: 1
---

# customRoutes

在有些场景中不要页面的基本骨架，可以通过自定义路由来实现

## 示例

```js
import React from 'react';
import { Prophet, Resource } from '@stbui/prophet';
import dataJsonServer from '@stbui/prophet-data-json-server';
import { Route } from 'react-router-dom';

const App = () => {
    return (
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
        </Prophet>
    );
};

export default App;
```
