---
order: 3
---

# 创建

通过 Create 包装过的组件，将赋予了创建一条数据的功能。将要提交的数据传递给该组件，将会触发 dataProvider 对应 CREATE 类型。

## 示例

```js
import { Create, useSaveContext } from '@stbui/prophet';

const CreateView = props => {
    const saveContext = useSaveContext();

    // values 需求提交的数据
    const onSubmit = values =>
        saveContext.save(values, {
            onSuccess: ({ data }) => {
                // 请求成功，返回的数据
                console.log(data);
            },
            onError: error => {
                // 请求失败，返回的数据
                console.log(error);
            },
            // 创建成功后，会立即更新List数据，
            // 可以使用userRefresh() 更新List数据，
        });

    return <button onClick={onSubmit}>提交</button>;
};

export default props => (
    <Create>
        <CreateView />
    </Create>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明                    |
| :------- | :----- | :----- | :----------- | :---------------------- |
| resource | string | -      | 否           | 用于映射到对于接口 path |
