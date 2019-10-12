import React from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button } from 'antd';

export default props => {
    const { label, onClick, ...other } = props;
    const refresh = useRefresh();

    const handleClick = () => {
        refresh();
        onClick && onClick();
    };

    return (
        <Button type="primary" onClick={handleClick} {...other}>
            {label}
        </Button>
    );
};
