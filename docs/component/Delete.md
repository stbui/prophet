# Delete

删除

#### 组件依赖关系

```
useDeleteController -> useDelete -> useMuation -> useDataProvider -> ajax
```

## useDeleteController

```js
import { useDeleteController } from '@stbui/prophet-core';

const MyApp = props => {
    const controllerProps = useDeleteController(props);

    return <button onClock={() => controllerProps.remove(1)}>delete</button>;
};
```

## useDelete

## useMuation

## useDataProvider
