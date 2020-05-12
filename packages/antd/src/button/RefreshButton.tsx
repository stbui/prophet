import React, { FunctionComponent } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button } from 'antd';

export interface RefreshButtonProps {
    label?: any;
    onClick?: any;
}

const RefreshButton: FunctionComponent<RefreshButtonProps> = ({
    label,
    onClick,
    ...reset
}) => {
    const refresh = useRefresh();

    const handleClick = () => {
        refresh();
        onClick && onClick();
    };

    return (
        <Button type="primary" onClick={handleClick} {...reset}>
            {label}
        </Button>
    );
};

RefreshButton.defaultProps = {
    label: '刷新',
};

export default RefreshButton;
