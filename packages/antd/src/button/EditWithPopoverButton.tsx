import React, { useState, cloneElement, FC } from 'react';
import { Popover, Button } from 'antd';

export interface EditPopoverButtonProps {
    basePath?: string;
    label: string;
    id?: any;
    title?: any;
    content: any;
    popover?: any;
    button?: any;
    type?: any;
    size?: any;
}

export const EditWithPopoverButton: FC<EditPopoverButtonProps> = ({
    basePath,
    label,
    id,
    content,
    type,
    size,
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
            <Button type={type} size={size} onClick={onShow} {...button}>
                {label}
            </Button>
        </Popover>
    );
};

EditWithPopoverButton.defaultProps = {
    label: '编辑',
    type: 'link',
    size: 'small',
};

export default EditWithPopoverButton;
