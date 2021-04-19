---
toc: menu
---

# Edit

编辑组件。在渲染该组件时，先向 dataProvider 获取到该 id 的数据，成功拿到数据之后渲染子组件

#### 组件依赖关系

```
EditController -> useEditController -> useUpdate -> useMuation -> useDataProvider -> ajax
```

## EditController

```js
import { EditController } from '@stbui/prophet-core';

const FormEdit = ({ save }) => {
    return <button onClick={() => save({ name: stbui })}>update</button>;
};

export default props => {
    <EditController {...props}>
        <FormEdit />
    </EditController>;
};
```

#### API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明                         |
| :------- | :----- | :----- | :----------- | :--------------------------- |
| resource | string | -      | 否           | 用于映射到对于接口 path      |
| basePath | string | -      | 否           | 用于页面路由拼接，路由跳转等 |
| id       | number | 是     | 否           | 从 EditButton 组件传入       |

## useEditController

```js
import { useEditController } from '@stbui/prophet-core';

const EditView = ({ record }) => <div>{record.id}</div>;

const App = props => {
    const controllerProps = useEditController(props);

    return <EditView {...controllerProps} {...props} />;
};
```

## useMuation

## useDataProvider
