import React from 'react';
import { useNotify, useRefresh } from '@stbui/prophet-core';

import { Button, Popconfirm, ButtonProps, PopconfirmProps } from 'antd';

export interface EnableButtonProps extends ButtonProps {
    resource: string;
    record?: any;
    button?: ButtonProps;
    popconfirm?: PopconfirmProps;
}

export const EnabledButton: React.FC<EnableButtonProps> = props => {
    const { id, is, record, resource } = props;
    const { type, button, popconfirm } = props;

    const refresh = useRefresh();
    const notify = useNotify();

    const onClick = () => {};

    return (
        <Popconfirm
            title={`确认要${!is ? '禁用' : '启用'}吗？`}
            onConfirm={onClick}
            {...popconfirm}
        >
            <Button type={type} {...button}>
                {is ? '启用' : '停用'}
            </Button>
        </Popconfirm>
    );
};

EnabledButton.defaultProps = {
    type: 'link',
};

export default EnabledButton;
