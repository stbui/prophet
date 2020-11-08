# Edit

编辑组件。在渲染该组件时，先向 dataProvider 获取到该 id 的数据，成功拿到数据之后渲染子组件

## 示例

```js
import { Edit } from '@stbui/prophet-antd';

const EditView = props => {
    const { record, save } = props;
    const onSubmit = params => save(params);

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

## 示例

```js
import { Edit } from '@stbui/prophet-antd';

const EditView = props => {
    const { record, save } = props;
    const onSubmit = params =>
        save(params, {
            onSuccess: ({ data }) => {
                console.log(data);
            },
            onFailure: error => {
                console.log(error);
            },
        });

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

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明                         |
| :------- | :----- | :----- | :----------- | :--------------------------- |
| resource | string | -      | 否           | 用于映射到对于接口 path      |
| basePath | string | -      | 否           | 用于页面路由拼接，路由跳转等 |
| title    | string |        |              |                              |
| id       | number | 是     | 否           |                              |
