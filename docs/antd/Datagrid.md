# Datagrid

ant table 组件

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

参考 antd table

| 属性   | 类型   | 默认值 | 可选值／参数 | 说明 |
| :----- | :----- | :----- | :----------- | :--- |
| data   | string |        |              |      |
| noData | string |        |              |      |

## 编辑示例

```js
import { List, Datagrid, Column, EditButton } from 'prophet-antd';

export default props => (
    <List {...props}>
        <Datagrid>
            <Column>title</Column>
            <Column
                render={record => (
                    <EditButton
                        id={record}
                        record={record}
                        resource={props.resource}
                        label="编辑"
                    />
                )}
            >
                操作
            </Column>
        </Datagrid>
    </List>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明 |
| :------- | :----- | :----- | :----------- | :--- |
| id       | string |        |              |      |
| record   | string |        |              |      |
| resource | string |        |              |      |
| label    | string |        |              |      |

## 详情示例

```js
import { List, Datagrid, Column, ShowButton } from 'prophet-antd';

export default props => (
    <List {...props}>
        <Datagrid>
            <Column>title</Column>
            <Column
                render={record => (
                    <ShowButton
                        id={record}
                        record={record}
                        resource={props.resource}
                        label="详情"
                    />
                )}
            >
                操作
            </Column>
        </Datagrid>
    </List>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明 |
| :------- | :----- | :----- | :----------- | :--- |
| id       | string |        |              |      |
| record   | string |        |              |      |
| resource | string |        |              |      |
| label    | string |        |              |      |

## 删除示例

```js
import { List, Datagrid, Column, DeleteButton } from 'prophet-antd';

export default props => (
    <List {...props}>
        <Datagrid>
            <Column>title</Column>
            <Column
                render={record => (
                    <DeleteButton
                        id={record}
                        record={record}
                        resource={props.resource}
                        label="删除"
                    />
                )}
            >
                操作
            </Column>
        </Datagrid>
    </List>
);
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明 |
| :------- | :----- | :----- | :----------- | :--- |
| id       | string |        |              |      |
| record   | string |        |              |      |
| resource | string |        |              |      |
| label    | string |        |              |      |
