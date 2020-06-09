# 问题

### 如何集成到现有项目？

可以参照 packages/prophet/src/Prophet.tsx 移植到现有项目

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

### 团队接口规范与 prophet 提供的包不一致，如何处理？

可以参考@stbui/prophet-data-json-server 包的实现方式，修改成团队的规范

### 现有项目使用了 redux，能否集成？

### 定义的路由如何扩展

参考 packages/core/src/core/Resource.tsx，添加新的路由
