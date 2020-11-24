import React, { FC } from 'react';
import { useDataProvider, useRedirect, GET_ONE } from '@stbui/prophet-core';
import { Button } from 'antd';

export interface CopyButtonProps {
    basePath: string;
    resource: string;
    id: string | number;
    label?: string;
    type?: any;
    size?: any;
    [key: string]: any;
}

const CopyWithCreateButton: FC<CopyButtonProps> = ({
    basePath,
    resource,
    id,
    label,
    type,
    size,
    ...rest
}) => {
    const redirect = useRedirect();
    const dataProvider = useDataProvider();

    const update = () =>
        dataProvider(GET_ONE, resource, { id }, {}).then(({ data }) => {
            const source = encodeURIComponent(JSON.stringify(data));

            redirect(
                (basePath, id, data) => {
                    return `${basePath}/create?source=${source}`;
                },
                basePath,
                false
            );
        });

    return (
        <Button type={type} size={size} onClick={() => update()} {...rest}>
            {label}
        </Button>
    );
};

CopyWithCreateButton.defaultProps = {
    label: '复制',
    type: 'link',
    size: 'small',
};

export default CopyWithCreateButton;
