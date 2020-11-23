import React, { FC } from 'react';
import { useRedirect } from '@stbui/prophet-core';
import { Button } from 'antd';

export interface CreateButtonProps {
    basePath: string;
    label?: string;
    type?: any;
}

const CreateButton: FC<CreateButtonProps> = ({
    basePath,
    label,
    type,
    ...rest
}) => {
    const redirect = useRedirect();

    return (
        <Button
            type={type}
            onClick={() => redirect('create', basePath)}
            {...rest}
        >
            {label}
        </Button>
    );
};

CreateButton.defaultProps = {
    label: '添加',
    type: 'primary',
};

export default CreateButton;
