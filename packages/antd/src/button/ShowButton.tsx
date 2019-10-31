import React from 'react';
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
            {label}
        </Button>
    );
};

ShowButton.defaultProps = {
    label: '详情',
    size: 'small',
    type: 'link',
};

export default ShowButton;
