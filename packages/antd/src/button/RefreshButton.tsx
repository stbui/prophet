import React from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button } from 'antd';

const RefreshButton = props => {
    const { label, type, onClick, ...other } = props;
    const refresh = useRefresh();

    const handleClick = () => {
        refresh();
        onClick && onClick();
    };

    return (
        <Button type={type} onClick={handleClick} {...other}>
            {label}
        </Button>
    );
};

RefreshButton.defaultProps = {
    label: '刷新',
    type: 'primary',
};

export default RefreshButton;
