import React, { FC } from 'react';
import { useRedirect } from '@stbui/prophet-core';
import { Button } from 'antd';

export interface ShowButtonProps {
    basePath?: string;
    label?: string;
    type?: any;
    id?: any;
    size?: any;
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
