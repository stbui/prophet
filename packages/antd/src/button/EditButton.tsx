import React, { FunctionComponent } from 'react';
import { useTranslate } from '@stbui/prophet-core';
import { useHistory } from 'react-router-dom';

import { Button } from 'antd';

const EditButton: FunctionComponent<any> = ({
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

    const onClick = () => history.push(`${basePath}/${id}`);

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

EditButton.defaultProps = {
    label: 'prophet.action.edit',
    size: 'small',
    type: 'link',
};

export default EditButton;
