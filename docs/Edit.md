# Edit

编辑组件

## 组件依赖关系

```
EditController -> useEditController -> useEdit -> useMuation -> useDataProvider -> ajax
```

## 示例

```js
import { EditController } from 'prophet-core';

const FormEdit = ({ save }) => {
    return <button onClick={() => save({ name: stbui })}>form</button>;
};

export default props => {
    <EditController {...props}>
        <FormEdit />
    </EditController>;
};
```

## API

| 属性     | 类型   | 默认值 | 可选值／参数 | 说明 |
| :------- | :----- | :----- | :----------- | :--- |
| resource | string |        | 否           |      |
| basePath | string |        | 否           |      |
| id       | number |        | 否           |      |
