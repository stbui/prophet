import React from 'react';
import { DeleteController } from 'prophet-core';
import { Popconfirm } from 'antd';

export class DeleteWithConfirmButton extends React.Component<any> {
    confirm = e => {
        const { update, record } = this.props;
        update(record);
    };

    render() {
        const { label, className, style } = this.props;

        return (
            <Popconfirm
                title="你确定要删除吗？"
                okText="确定"
                cancelText="取消"
                onConfirm={this.confirm}
            >
                <a className={className} style={style}>
                    {label}
                </a>
            </Popconfirm>
        );
    }
}

export const DeleteWithButton = props => (
    <DeleteController {...props}>
        {controllerProps => (
            <DeleteWithConfirmButton {...props} {...controllerProps} />
        )}
    </DeleteController>
);

export default DeleteWithButton;
