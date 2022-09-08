import React from 'react';
import { EditBase } from '@stbui/prophet-core';
import { EditView } from './EditView';
interface EditProps {
    resource: string;
    id: string | number;
    [key: string]: any;
}

export const Edit = ({
    resource,
    id,
    mutationMode,
    mutationOptions,
    queryOptions,
    redirect,
    transform,
    disableAuthentication,
    ...rest
}: EditProps) => {
    return (
        <EditBase
            resource={resource}
            id={id}
            mutationMode={mutationMode}
            mutationOptions={mutationOptions}
            queryOptions={queryOptions}
            redirect={redirect}
            transform={transform}
            disableAuthentication={disableAuthentication}
        >
            <EditView {...rest} />
        </EditBase>
    );
};
