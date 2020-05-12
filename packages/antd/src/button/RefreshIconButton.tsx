import React, { FunctionComponent } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Icon } from 'antd';

export interface RefreshIconButtonProps {
    onClick?: any;
}

const RefreshIconButton: FunctionComponent<RefreshIconButtonProps> = ({
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
