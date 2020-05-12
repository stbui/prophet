import React, { useState, FunctionComponent } from 'react';
import { Button, Drawer } from 'antd';

export interface ShowDrawerButtonProps {
    children?: any;
    width?: string | number;
    destroyOnClose?: boolean;
    label?: string;
    drawer?: any;
    button?: any;
    size?: any;
}

const ShowWithDrawerButton: FunctionComponent<ShowDrawerButtonProps> = ({
    children,
    width,
    destroyOnClose,
    label,
    drawer,
    button,
}) => {
    const [visible, setVisible] = useState(false);

    const handleDrawerClose = () => setVisible(false);
    const handleDrawerShow = () => setVisible(true);

    return (
        <React.Fragment>
            <Button type="link" onClick={handleDrawerShow} {...button}>
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

ShowWithDrawerButton.defaultProps = {
    label: '查看',
};

export default ShowWithDrawerButton;
