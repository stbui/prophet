import React from 'react';
import { ShowBase } from '@stbui/prophet-core';

interface Props {
    children?: any;
    actions?: any;
    title?: string;
}

export const ShowView = ({ children, actions, ...rest }: Props) => (
    <div>{children}</div>
);

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
