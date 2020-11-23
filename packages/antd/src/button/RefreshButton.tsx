import React, { FC } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button } from 'antd';

export interface RefreshButtonProps {
    label?: string;
    type?: any;
    onClick?: any;
}

const RefreshButton: FC<RefreshButtonProps> = ({
    label,
    type,
    onClick,
    ...reset
}) => {
    const refresh = useRefresh();

    const handleClick = () => {
        refresh();
        onClick && onClick();
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
