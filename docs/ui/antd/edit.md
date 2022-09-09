---
order: 4
---

# 修改

编辑组件。在渲染该组件时，先向 dataProvider 获取到该 id 的数据，成功拿到数据之后渲染子组件

## 示例

```js
import { Edit, useRecordContext, useSaveContext } from '@stbui/prophet';

const EditView = props => {
    const record = useRecordContext();
    const saveContext = useSaveContext();

    const onSubmit = values => saveContext.save(values);

    return (
        <div>
            <div>{record.username}</div>
            <button onClick={onSubmit}>提交</button>
        </div>
    );
};

export default props => (
    <Edit title="编辑" {...props}>
        <EditView />
    </Edit>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明                    |
| :------- | :----- | :----- | :----------- | :---------------------- |
| resource | string | -      | 否           | 用于映射到对于接口 path |
| title    | string |        |              |                         |
| id       | number | 是     | 否           |                         |
