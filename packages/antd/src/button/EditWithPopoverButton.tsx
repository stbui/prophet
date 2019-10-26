import React, { useState, cloneElement, createElement } from 'react';
import { useTranslate } from '@stbui/prophet-core';
import { useHistory } from 'react-router-dom';
import { Popover, Button } from 'antd';

export const EditWithPopoverButton = ({
    basePath,
    label,
    id,
    className,
    style,
    size,
    type,
    title,
    content,
    placement,
    trigger,
    arrowPointAtCenter,
    autoAdjustOverflow,
    getPopupContainer,
    mouseEnterDelay,
    mouseLeaveDelay,
    overlayClassName,
    overlayStyle,
}) => {
    const [visible, setVisible] = useState(false);
    const translate = useTranslate();

    const onShow = () => setVisible(true);
    const onClose = () => setVisible(false);
    const onVisibleChange = v => setVisible(v);

    return (
        <Popover
            content={cloneElement(content, {
                onOk: onClose,
                onCancel: onClose,
            })}
            title={title}
            visible={visible}
            placement={placement}
            trigger={trigger}
            onVisibleChange={onVisibleChange}
            arrowPointAtCenter={arrowPointAtCenter}
            autoAdjustOverflow={autoAdjustOverflow}
            getPopupContainer={getPopupContainer}
            mouseEnterDelay={mouseEnterDelay}
            mouseLeaveDelay={mouseLeaveDelay}
            overlayClassName={overlayClassName}
            overlayStyle={overlayStyle}
        >
            <Button
                type={type}
                onClick={onShow}
                className={className}
                style={style}
                size={size}
            >
                {translate(label)}
            </Button>
        </Popover>
    );
};

EditWithPopoverButton.defaultProps = {
    label: 'prophet.action.show',
    size: 'small',
    type: 'link',
    trigger: 'click',
};

export default EditWithPopoverButton;
