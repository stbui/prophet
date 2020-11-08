# 删除

向 http 发起 delete 请求组件。

删除操作提供了不同交互方式组件

-   DeleteButton
-   DeleteWithButton
-   DeleteWithButton
-   DeleteWithConfirmButton

## 示例

```js
import { List, Datagrid, Column, DeleteButton } from '@stbui/prophet-antd';

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

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明                         |
| :------- | :----- | :----- | :----------- | :--------------------------- |
| resource | string | -      | 否           | 用于映射到对于接口 path      |
| basePath | string | -      | 否           | 用于页面路由拼接，路由跳转等 |
| id       | number | 是     | 否           |                              |
