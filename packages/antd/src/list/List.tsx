import React, { ReactElement } from 'react';
import { ListBase } from '@stbui/prophet-core';
import ListView from './ListView';

interface ListProps {
    resource?: string;
    perPage?: number;
    filter?: object;
    sort?: any;
}

export const List = (props: ListProps): ReactElement => {
    const { resource, perPage, sort, ...reset } = props;
    return (
        <ListBase resource={resource} perPage={perPage} sort={sort}>
            <ListView {...reset} />
        </ListBase>
    );
};

List.defaultProps = {
    filter: {},
    perPage: 10,
};
