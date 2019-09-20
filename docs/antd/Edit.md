# Edit

Edit 组件

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
            // 更新List数据
            // refresh: true,
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

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明 |
| :------- | :----- | :----- | :----------- | :--- |
| resource | string |        |              |      |
| basePath | string |        |              |      |
| title    | string |        |              |      |
