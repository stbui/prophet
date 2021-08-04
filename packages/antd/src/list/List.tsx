import React, { ReactElement } from 'react';
import { useListController, ListContextProvider } from '@stbui/prophet-core';
import ListView from './ListView';

interface ListProps {
    resource: string;
    basePath: string;
    perPage?: number;
    filter?: object;
}

export const List = (props: ListProps): ReactElement => {
    const controllerProps = useListController(props);
    return (
        <ListContextProvider value={controllerProps}>
            <ListView {...props} {...controllerProps} />
        </ListContextProvider>
    );
};

List.defaultProps = {
    filter: {},
    perPage: 10,
};

export default List;
