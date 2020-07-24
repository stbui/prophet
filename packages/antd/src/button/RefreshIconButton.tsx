import React, { FC } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Icon } from 'antd';

export interface RefreshIconButtonProps {
    onClick?: any;
}

const RefreshIconButton: FC<RefreshIconButtonProps> = ({
    onClick,
    ...rest
}) => {
    const refresh = useRefresh();

    const handleClick = () => {
        refresh();
        onClick && onClick();
    };

    return <Icon type="refresh" onClick={handleClick} {...rest}></Icon>;
};

export default RefreshIconButton;
