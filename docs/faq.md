# 问题

### 如何集成到现有项目？

### 如何在现有项目使用 prohet 提供的 Hook？

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

### 接口没有按规范开发，如何处理？

### 现有项目使用了 redux，能否集成？
