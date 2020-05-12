import React, { useState, cloneElement, FunctionComponent } from 'react';
import { Popover, Button } from 'antd';

export interface EditPopoverButtonProps {
    basePath?: string;
    label?: string;
    id?: any;
    title?: any;
    content?: any;
    popover?: any;
    button?: any;
}

export const EditWithPopoverButton: FunctionComponent<EditPopoverButtonProps> = ({
    basePath,
    label,
    id,
    content,
    popover,
    button,
}) => {
    const [visible, setVisible] = useState(false);

    const onShow = () => setVisible(true);
    const onClose = () => setVisible(false);
    const onVisibleChange = v => setVisible(v);

    return (
        <Popover
            content={cloneElement(content, {
                onOk: onClose,
                onCancel: onClose,
                basePath,
                id,
            })}
            visible={visible}
            onVisibleChange={onVisibleChange}
            trigger="click"
            {...popover}
        >
            <Button type="link" size="small" onClick={onShow} {...button}>
                {label}
            </Button>
        </Popover>
    );
};

EditWithPopoverButton.defaultProps = {
    label: '编辑',
};

export default EditWithPopoverButton;
