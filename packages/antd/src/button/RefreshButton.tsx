import React, { FC } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button, ButtonProps } from 'antd';

export interface RefreshButtonProps extends ButtonProps {
    label?: string;
}

const RefreshButton: FC<RefreshButtonProps> = ({
    label,
    type,
    onClick,
    ...reset
}) => {
    const refresh = useRefresh();

    const handleClick = event => {
        refresh();
        onClick && onClick(event);
    };

    return (
        <Button type={type} onClick={handleClick} {...reset}>
            {label}
        </Button>
    );
};

RefreshButton.defaultProps = {
    label: '刷新',
    type: 'primary',
};

export default RefreshButton;
