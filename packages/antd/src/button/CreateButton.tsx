import React, { FC } from 'react';
import { useRedirect } from '@stbui/prophet-core';
import { Button, ButtonProps } from 'antd';

export interface CreateButtonProps extends ButtonProps {
    basePath?: string;
    label?: string;
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
