import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'antd';

export class CreateButton extends Component<any> {
    static defaultProps = {
        label: '添加',
        type: 'primary',
    };
    handleClick = () => {
        const { basePath, push } = this.props;

        push(`${basePath}/create`);
    };
    render() {
        const { label, type, icon, ghost } = this.props;

        return (
            <Button
                ghost={ghost}
                type={type}
                onClick={this.handleClick}
                icon={icon}
            >
                {label}
            </Button>
        );
    }
}

export default connect(
    null,
    { push }
)(CreateButton);
