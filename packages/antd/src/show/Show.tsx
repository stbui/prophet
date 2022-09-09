import React from 'react';
import { ShowBase } from '@stbui/prophet-core';

interface Props {
    children?: any;
    id?: any;
    resource?: any;
    queryOptions?: any;
    disableAuthentication?: any;
}

export const ShowView = ({ children, ...rest }: Props) => <div>{children}</div>;

export const Show = ({
    id,
    resource,
    queryOptions,
    disableAuthentication,
    ...rest
}) => {
    return (
        <ShowBase
            id={id}
            disableAuthentication={disableAuthentication}
            queryOptions={queryOptions}
            resource={resource}
        >
            <ShowView {...rest} />
        </ShowBase>
    );
};
