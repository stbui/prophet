import React, { useState, FC } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button, Drawer } from 'antd';

export interface EditDrawerButtonProps {
    children?: any;
    label?: string;
    type?: string;
    drawer?: any;
    button?: any;
    size?: string;
    allowRefresh?: boolean;
}

const EditWithDrawerButton: FC<EditDrawerButtonProps> = props => {
    const { children, label, type, size, drawer, button, allowRefresh } = props;
    const [visible, setVisible] = useState(false);

    const onClose = () => {
        setVisible(false);
        allowRefresh && useRefresh();
    };

    const onShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button type={type} size={size} onClick={onShow} {...button}>
                {label}
            </Button>
            <Drawer visible={visible} onClose={onClose} {...drawer}>
                {React.cloneElement(children, {
                    onOk: onClose,
                    onCancel: onClose,
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
