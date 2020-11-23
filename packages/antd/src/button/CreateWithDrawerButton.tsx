import React, { cloneElement, useState, FC } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button, Drawer } from 'antd';

export interface CreateDrawerButtonProps {
    children?: any;
    label?: string;
    type?: any;
    drawer?: any;
    button?: any;
    allowRefresh?: boolean;
}

const CreateWithDrawerButton: FC<CreateDrawerButtonProps> = props => {
    const { children, drawer, allowRefresh } = props;
    const { label, type, button } = props;

    const [visible, setVisible] = useState(false);
    const refresh = useRefresh();

    const onClose = () => {
        setVisible(false);
        allowRefresh && refresh();
    };

    const onShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button type={type} onClick={onShow} {...button}>
                {label}
            </Button>
            <Drawer visible={visible} onClose={onClose} {...drawer}>
                {cloneElement(children, {
                    onOk: onClose,
                    onCancel: onClose,
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
