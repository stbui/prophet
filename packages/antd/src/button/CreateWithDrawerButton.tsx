import React, { cloneElement, useState, FunctionComponent } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button, Drawer } from 'antd';

export interface CreateDrawerButtonProps {
    children?: any;
    width?: string | number;
    destroyOnClose?: boolean;
    label?: string;
    type?: 'primary' | 'dashed' | 'danger' | 'link';
    drawer?: any;
    button?: any;
}

const CreateWithDrawerButton: FunctionComponent<CreateDrawerButtonProps> = props => {
    const { children, width, destroyOnClose, drawer } = props;
    const { label, type, button } = props;

    const [visible, setVisible] = useState(false);

    const handleDrawerClose = () => {
        setVisible(false);
        useRefresh();
    };

    const handleDrawerShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button type={type} onClick={handleDrawerShow} {...button}>
                {label}
            </Button>
            <Drawer
                width={width}
                visible={visible}
                onClose={handleDrawerClose}
                destroyOnClose={destroyOnClose}
                {...drawer}
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
