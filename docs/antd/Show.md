# Show

Show 组件

## 示例

```js
import { Show } from 'prophet-antd';

const ShowView = props => {
    const { record } = props;

    return <div>{record.username}</div>;
};

export default props => (
    <Show {...props}>
        <ShowView />
    </Show>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明 |
| :------- | :----- | :----- | :----------- | :--- |
| resource | string |        |              |      |
| basePath | string |        |              |      |
