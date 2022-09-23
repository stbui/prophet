## 布局

提供一个标准的中后台标准布局。

### 基本用法

```js
import { Layout } from '@stbui/prophet-antd';

<Prophet layout={Layout}>...</Prophet>;
```

## API

| 属性   | 类型          | 默认值              | 实现参考                         |
| :----- | :------------ | :------------------ | :------------------------------- |
| header | ComponentType | [Header](Header.md) | /packages/antd/layout/Header.tsx |
| sider  | ComponentType | [Sider](Sider.md)   | /packages/antd/layout/Sider.tsx  |
| menu   | ComponentType | [Menu](Menu.md)     | /packages/antd/layout/Menu.tsx   |
| brand  | ComponentType | [Brand](Brand.md)   | /packages/antd/layout/Brand.tsx  |
