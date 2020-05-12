import React, { FunctionComponent } from 'react';
import { useRedirect } from '@stbui/prophet-core';
import { Button } from 'antd';

export interface EditButtonProps {
    basePath?: string;
    label?: string;
    type?: 'primary' | 'dashed' | 'danger' | 'link';
    id?: any;
    size?: any;
}

const EditButton: FunctionComponent<EditButtonProps> = ({
    basePath,
    label,
    id,
    size,
    type,
    ...rest
}) => {
    const redirect = useRedirect();

    return (
        <Button
            type={type}
            size={size}
            onClick={() => redirect('edit', basePath, id)}
            {...rest}
        >
            {label}
        </Button>
    );
};

EditButton.defaultProps = {
    label: '编辑',
    size: 'small',
    type: 'link',
};

export default EditButton;
