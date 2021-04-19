---
group:
    title: antd
order: 2
---

# 列表

展示数据列表组件，可以将数据渲染到 table

## 默认示例

```js
import { List, Datagrid, Column } from '@stbui/prophet-antd';

export default props => (
    <List {...props}>
        <Datagrid>
            <Column>id</Column>
            <Column>title</Column>
        </Datagrid>
    </List>
);
```

## 分页示例

```js
import { List, Datagrid, Column } from '@stbui/prophet-antd';

export default props => (
    <List page={2} perPage={20} {...props}>
        <Datagrid>
            <Column>id</Column>
            <Column>title</Column>
        </Datagrid>
    </List>
);
```

## 排序示例

```js
import { List, Datagrid, Column } from '@stbui/prophet-antd';

export default props => (
    <List sort={{ field: 'id', order: 'ASC' }} {...props}>
        <Datagrid>
            <Column>id</Column>
            <Column>title</Column>
        </Datagrid>
    </List>
);
```

## 过滤条件示例

```js
import { List, Datagrid, Column } from '@stbui/prophet-antd';

export default props => (
    <List filter={{ name: 'stbui' }} {...props}>
        <Datagrid>
            <Column>id</Column>
            <Column>title</Column>
        </Datagrid>
    </List>
);
```

## API

| 属性                | 类型      | 默认值                      | 可选值／参数 | 说明          |
| :------------------ | :-------- | :-------------------------- | :----------- | :------------ |
| resource            | string    | -                           |              | 资源标志      |
| basePath            | string    | -                           |              | 当前资源 path |
| filterDefaultValues | object    | -                           |              | 默认过滤条件  |
| filter              | object    | -                           |              | 过滤条件      |
| sort                | object    | {field: 'id', order: 'ASC'} |              | 排序          |
| page                | number    | 1                           |              | 当前页数      |
| perPage             | number    | 10                          |              | 分页大小      |
| actions             | component |                             |              | 过滤条件组件  |
