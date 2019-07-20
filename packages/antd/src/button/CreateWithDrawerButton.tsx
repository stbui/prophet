import React, { cloneElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshView } from 'prophet-core';
import { Button, Drawer } from 'antd';

export interface CreateWithDrawerButtonProps {
    children?: any;
    width?: string | number;
    destroyOnClose?: boolean;
    label?: string;
    type?: 'primary' | 'dashed' | 'danger' | 'link';
    ghost?: boolean;
    icon?: string;
    disabled?: boolean;
    shape?: 'circle' | 'round';
    size?: 'small' | 'large';
}

export const CreateWithDrawerButton = (props: CreateWithDrawerButtonProps) => {
    const { children, width, destroyOnClose } = props;
    const {
        label = '添加',
        type = 'primary',
        ghost,
        icon,
        disabled,
        shape,
        size,
    } = props;

    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const handleDrawerClose = () => {
        setVisible(false);
        dispatch(refreshView());
    };

    const handleDrawerShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button
                type={type}
                ghost={ghost}
                icon={icon}
                disabled={disabled}
                shape={shape}
                size={size}
                onClick={handleDrawerShow}
            >
                {label}
            </Button>
            <Drawer
                width={width}
                visible={visible}
                onClose={handleDrawerClose}
                destroyOnClose={destroyOnClose}
            >
                {cloneElement(children, {
                    onOk: handleDrawerClose,
                    onCancel: handleDrawerClose,
                })}
            </Drawer>
        </React.Fragment>
    );
};

export default CreateWithDrawerButton;
