import React, { FC } from 'react';
import { useRedirect } from '@stbui/prophet-core';
import { Button, ButtonProps } from 'antd';

export interface ShowButtonProps extends ButtonProps {
    basePath: string;
    label?: string;
}

export const ShowButton: FC<ShowButtonProps> = ({
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
            onClick={() => redirect('show', basePath, id)}
            {...rest}
        >
            {label}
        </Button>
    );
};

ShowButton.defaultProps = {
    label: '详情',
    size: 'small',
    type: 'link',
};

export default ShowButton;
