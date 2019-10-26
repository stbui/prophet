import React from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Icon } from 'antd';

const RefreshIconButton = props => {
    const { label, onClick, type, ...other } = props;
    const refresh = useRefresh();

    const handleClick = () => {
        refresh();
        onClick && onClick();
    };

    return <Icon type={type} onClick={handleClick} {...other}></Icon>;
};

RefreshIconButton.defaultProps = {
    type: 'refresh',
};

export default RefreshIconButton;
