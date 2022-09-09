import React from 'react';
import { CreateBase } from '@stbui/prophet-core';
import { CreateView } from './CreateView';

interface CreateProps {
    resource?: string;
    record?: any;
    redirect?: any;
    transform?: any;
    mutationOptions?: any;
    disableAuthentication?: any;
    hasEdit?: any;
    hasShow?: any;
}

export const Create = ({
    resource,
    record,
    redirect,
    transform,
    mutationOptions,
    disableAuthentication,
    hasEdit,
    hasShow,
    ...rest
}: CreateProps) => {
    return (
        <CreateBase
            resource={resource}
            record={record}
            redirect={redirect}
            transform={transform}
            mutationOptions={mutationOptions}
            disableAuthentication={disableAuthentication}
            hasEdit={hasEdit}
            hasShow={hasShow}
        >
            <CreateView {...rest} />
        </CreateBase>
    );
};
