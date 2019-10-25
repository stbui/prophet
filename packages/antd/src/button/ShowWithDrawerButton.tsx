import React, { useState } from 'react';
import { useTranslate } from '@stbui/prophet-core';
import { Button, Drawer } from 'antd';

const ShowWithDrawerButton = props => {
    const { children, width, destroyOnClose, label, type } = props;
    const [visible, setVisible] = useState(false);
    const translate = useTranslate();

    const handleDrawerClose = () => setVisible(false);
    const handleDrawerShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button type={type} onClick={handleDrawerShow}>
                {translate(label)}
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

ShowWithDrawerButton.defaultProps = {
    label: 'prophet.action.show',
    type: 'link',
};

export default ShowWithDrawerButton;
