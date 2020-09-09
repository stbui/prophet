## Layout

用于一般后台布局形式，默认侧边两列式布局

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
