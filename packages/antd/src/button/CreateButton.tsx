import React from 'react';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Button } from 'antd';

export interface CreateButtonProps {
    basePath?: string;
    label?: string;
    type?: 'primary' | 'dashed' | 'danger' | 'link';
    ghost?: boolean;
    icon?: string;
    disabled?: boolean;
    shape?: 'circle' | 'round';
    size?: 'small' | 'large';
}

export const CreateButton = (props: CreateButtonProps) => {
    const {
        basePath,
        label = '添加',
        type = 'primary',
        ghost,
        icon,
        disabled,
        shape,
        size,
    } = props;
    const dispatch = useDispatch();

    const handleClick = () => dispatch(push(`${basePath}/create`));

    return (
        <Button
            type={type}
            ghost={ghost}
            icon={icon}
            disabled={disabled}
            shape={shape}
            size={size}
            onClick={handleClick}
        >
            {label}
        </Button>
    );
};

export default CreateButton;
