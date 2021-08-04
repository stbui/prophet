import React from 'react';
import { useEditController, CreateContextProvider } from '@stbui/prophet-core';
import { EditView } from './EditView';
interface EditProps {
    resource: string;
    basePath: string;
    id: string | number;
    [key: string]: any;
}

export const Edit = (props: EditProps) => {
    const controllerProps = useEditController(props);
    return (
        <CreateContextProvider value={controllerProps}>
            <EditView {...props} {...controllerProps} />
        </CreateContextProvider>
    );
};
export default Edit;
