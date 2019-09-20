import React from 'react';
import { useDispatch } from 'react-redux';
import { refreshView } from '@stbui/prophet-core';
import { Button } from 'antd';

export default props => {
    const { label, onClick, ...other } = props;
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(refreshView());
        onClick && onClick();
    };

    return (
        <Button type="primary" onClick={handleClick} {...other}>
            {label}
        </Button>
    );
};
