import React, { FunctionComponent } from 'react';
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
            {label}
        </Button>
    );
};

EditButton.defaultProps = {
    label: '编辑',
    size: 'small',
    type: 'link',
};

export default EditButton;
