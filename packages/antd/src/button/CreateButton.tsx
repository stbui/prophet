import React, { FC } from 'react';
import { useResourceContext, useCreatePath } from '@stbui/prophet-core';
import { Button, ButtonProps } from 'antd';

export interface CreateButtonProps extends ButtonProps {
    label?: string;
}

const CreateButton: FC<CreateButtonProps> = props => {
    const { label, type, ...rest } = props;
    const resource = useResourceContext(props);
    const createPath = useCreatePath();

    return (
        <Button
            type={type}
            onClick={() => createPath({ resource, type: 'create' })}
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
