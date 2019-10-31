import React, { cloneElement, useState, FunctionComponent } from 'react';
import { useRefresh } from '@stbui/prophet-core';
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

const CreateWithDrawerButton: FunctionComponent<
    CreateWithDrawerButtonProps
> = props => {
    const { children, width, destroyOnClose } = props;
    const { label, type, ghost, icon, disabled, shape, size } = props;

    const [visible, setVisible] = useState(false);

    const handleDrawerClose = () => {
        setVisible(false);
        useRefresh();
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

CreateWithDrawerButton.defaultProps = {
    label: '添加',
    type: 'primary',
};

export default CreateWithDrawerButton;
