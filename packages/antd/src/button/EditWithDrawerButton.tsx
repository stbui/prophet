import React, { useState } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button, Drawer } from 'antd';

const EditWithDrawerButton = props => {
    const { children, width, destroyOnClose, label, type, size } = props;
    const [visible, setVisible] = useState(false);

    const handleDrawerClose = () => {
        setVisible(false);
        useRefresh();
    };

    const handleDrawerShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button type={type} size={size} onClick={handleDrawerShow}>
                {label}
            </Button>
            <Drawer
                width={width}
                visible={visible}
                onClose={handleDrawerClose}
                destroyOnClose={destroyOnClose}
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
