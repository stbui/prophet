import React from 'react';
import {
    useCreateController,
    CreateContextProvider,
} from '@stbui/prophet-core';
import { CreateView } from './CreateView';

interface CreateProps {
    resource: string;
    basePath: string;
    [key: string]: any;
}

export const Create = (props: CreateProps) => {
    const controllerProps = useCreateController(props);
    return (
        <CreateContextProvider value={controllerProps}>
            <CreateView {...props} {...controllerProps} />
        </CreateContextProvider>
    );
};

export default Create;
