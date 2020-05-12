import React, { useState, FunctionComponent } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button, Drawer } from 'antd';

export interface EditDrawerButtonProps {
    children?: any;
    width?: string | number;
    destroyOnClose?: boolean;
    label?: string;
    type?: 'primary' | 'dashed' | 'danger' | 'link';
    drawer?: any;
    button?: any;
    size?: any;
}

const EditWithDrawerButton: FunctionComponent<EditDrawerButtonProps> = props => {
    const {
        children,
        width,
        destroyOnClose,
        label,
        type,
        size,
        drawer,
        button,
    } = props;
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
                size={size}
                onClick={handleDrawerShow}
                {...button}
            >
                {label}
            </Button>
            <Drawer
                width={width}
                visible={visible}
                onClose={handleDrawerClose}
                destroyOnClose={destroyOnClose}
                {...drawer}
            >
                {React.cloneElement(children, {
                    onOk: handleDrawerClose,
                    onCancel: handleDrawerClose,
                })}
            </Drawer>
        </React.Fragment>
    );
};

EditWithDrawerButton.defaultProps = {
    label: '编辑',
    type: 'link',
    size: 'small',
};

export default EditWithDrawerButton;
