import React, { useState } from 'react';
import { useRefresh } from '@stbui/prophet-core';
import { Button, Drawer } from 'antd';

export default props => {
    const { children, width, destroyOnClose } = props;
    const [visible, setVisible] = useState(false);

    const handleDrawerClose = () => {
        setVisible(false);
        useRefresh();
    };

    const handleDrawerShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button type="link" onClick={handleDrawerShow}>
                编辑
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
