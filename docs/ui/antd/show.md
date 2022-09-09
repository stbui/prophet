---
order: 5
---

# 详情

Show 组件

## 示例

```js
import { Show, useRecordContext } from '@stbui/prophet-antd';

const ShowView = props => {
    const record = useRecordContext();

    return <div>{record.username}</div>;
};

export default props => (
    <Show>
        <ShowView />
    </Show>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明                    |
| :------- | :----- | :----- | :----------- | :---------------------- |
| resource | string | -      | 否           | 用于映射到对于接口 path |
| id       | number | 是     | 否           |                         |
