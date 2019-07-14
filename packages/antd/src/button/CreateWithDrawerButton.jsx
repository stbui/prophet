import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { refreshView } from 'prophet-core';
import { Button, Drawer } from 'antd';

export default props => {
    const { children, width, destroyOnClose } = props;
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    const handleDrawerClose = () => {
        setVisible(false);
        dispatch(refreshView());
    };

    const handleDrawerShow = () => {
        setVisible(true);
    };

    return (
        <React.Fragment>
            <Button type="primary" onClick={handleDrawerShow}>
                添加
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
