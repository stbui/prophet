# Create

创建一条记录组件。将要提交的数据传递给该组件，将会触发POST请求。

## 示例

```js
import { Create } from '@stbui/prophet-antd';

const CreateView = props => {
    const { save } = props;

    // params 需求提交的数据
    const onSubmit = params =>
        save(params, {
            onSuccess: ({ data }) => {
                // 请求返回的数据
                console.log(data);
            },
            onFailure: error => {
                // 请求出错
                console.log(error);
            },
            // 创建成功后，会立即更新List数据
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
