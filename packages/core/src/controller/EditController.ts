/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { crudGetOne, crudUpdate } from '../actions';

export interface IProps {
    children(props): any;
    basePath: any;
    resource: any;
    id: string | number;
    record: any;
    crudUpdate: any;
    isLoading: boolean;
    redirectTo: any;
    refresh: any;
    version: any;
    crudGetOne: (resource: string, id: string | number) => any;
}

const mapStateToProps = (state, props) => {
    return {
        id: props.id,
        // isLoading: state.loading > 0,
        isLoading: false,
        version: state.refresh,
        record: state.resources[props.resource]
            ? state.resources[props.resource].data[props.id]
            : null,
    };
};

export class EditController extends Component<IProps> {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { resource, id } = this.props;
        this.updateData(resource, id);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id !== nextProps.id) {
            this.updateData(nextProps.resource, nextProps.id);
        }
    }

    updateData(resource: string, id: number | string) {
        this.props.crudGetOne(resource, id);
    }

    save = (data: any, callback: any) => {
        const { crudUpdate, resource, id, basePath, redirectTo, refresh } = this.props;
        crudUpdate(resource, id, data, basePath, redirectTo, refresh, callback);
    };

    render() {
        const { children, basePath, resource, record, isLoading, version } = this.props;

        if (!children) return null;

        return children({
            basePath,
            resource,
            record,
            isLoading,
            save: this.save,
            version
        });
    }
}

export default connect(
    mapStateToProps,
    { crudGetOne, crudUpdate }
)(EditController);
