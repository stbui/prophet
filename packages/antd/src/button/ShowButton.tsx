import React, { FC } from 'react';
import {
    useResourceContext,
    useCreatePath,
    useRecordContext,
} from '@stbui/prophet-core';
import { Button, ButtonProps } from 'antd';

export interface ShowButtonProps extends ButtonProps {
    label?: string;
}

export const ShowButton: FC<ShowButtonProps> = props => {
    const { label, id, size, type, ...rest } = props;
    const resource = useResourceContext(props);
    const createPath = useCreatePath();
    const record = useRecordContext(props);
    if (!record) return null;

    return (
        <Button
            type={type}
            size={size}
            onClick={() =>
                createPath({ resource, type: 'show', id: record.id })
            }
            {...rest}
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
