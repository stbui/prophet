import React, { FC } from 'react';
import { useDataProvider, useRedirect } from '@stbui/prophet-core';
import { Button, ButtonProps } from 'antd';

export interface CopyButtonProps extends ButtonProps {
    basePath: string;
    resource: string;
    label?: string;
}

const CopyWithCreateButton: FC<CopyButtonProps> = ({
    basePath,
    resource,
    id,
    label,
    type,
    size,
    ...rest
}) => {
    const redirect = useRedirect();
    const dataProvider = useDataProvider();

    const update = () => {};

    return (
        <Button type={type} size={size} onClick={() => update()} {...rest}>
            {label}
        </Button>
    );
};

CopyWithCreateButton.defaultProps = {
    label: '复制',
    type: 'link',
    size: 'small',
};

export default CopyWithCreateButton;
