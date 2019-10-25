import React from 'react';
import { useTranslate } from '@stbui/prophet-core';
import { useHistory } from 'react-router-dom';
import { Button } from 'antd';

export const ShowButton: any = ({ basePath, label, id, className, style }) => {
    const translate = useTranslate();
    const history = useHistory();

    const onClick = () => history.push(`${basePath}/${id}/show`);

    return (
        <Button
            type="link"
            onClick={onClick}
            className={className}
            style={style}
        >
            {translate(label)}
        </Button>
    );
};

ShowButton.defaultProps = {
    label: 'prophet.action.show',
};

export default ShowButton;
