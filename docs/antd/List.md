# List

渲染数据列表

## 示例

```js
import { List, Datagrid, Column } from 'prophet-antd';

export default props => (
    <List {...props}>
        <Datagrid>
            <Column>title</Column>
        </Datagrid>
    </List>
);
```

## API

| 属性                | 类型      | 默认值 | 可选值／参数 | 说明 |
| :------------------ | :-------- | :----- | :----------- | :--- |
| resource            | string    |        |              |      |
| basePath            | string    |        |              |      |
| filterDefaultValues | object    |        |              |      |
| filter              | object    |        |              |      |
| sort                | object    |        |              |      |
| perPage             | perPage   |        |              |      |
| actions             | component |        |              |      |
