# Create

创建数据组件

## 示例

```js
import { Create } from '@stbui/prophet-antd';

const CreateView = props => {
    const { save } = props;
    const onSubmit = params =>
        save(params, {
            onSuccess: ({ data }) => {
                console.log(data);
            },
            onFailure: error => {
                console.log(error);
            },
            // 更新List数据
            // refresh: true,
        });

    return <button onClick={onSubmit}>提交</button>;
};

export default props => (
    <Create title="创建" {...props}>
        <CreateView />
    </Create>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明 |
| :------- | :----- | :----- | :----------- | :--- |
| resource | string |        |              |      |
| basePath | string |        |              |      |
| title    | string |        |              |      |
