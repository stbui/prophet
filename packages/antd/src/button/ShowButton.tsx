import React from 'react';
import { useTranslate } from '@stbui/prophet-core';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

export const ShowButton: any = ({
    basePath,
    label,
    id,
    className,
    style,
    size,
    type,
}) => {
    const translate = useTranslate();
    const history = useHistory();

    const onClick = () => history.push(`${basePath}/${id}/show`);

    return (
        <Button
            type={type}
            onClick={onClick}
            className={className}
            style={style}
            size={size}
        >
            {translate(label)}
        </Button>
    );
};

ShowButton.defaultProps = {
    label: 'prophet.action.show',
    size: 'small',
    type: 'link',
};

export default ShowButton;
