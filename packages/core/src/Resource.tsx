/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import React, { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { registerResource } from './actions';

export interface IProps {
    list?: any;
    edit?: any;
    create?: any;
    show?: any;
    name: string;
    label?: string;
    context?: 'registration';
    match?: any;
    lazy?: any;
    fallback?: any;
    registerResource?: any;
}

// @connect(
//   null,
//   { registerResource }
// )
export class Resource extends Component<IProps, any> {
    static defaultProps = {
        fallback: <div />,
    };

    componentWillMount() {
        const {
            registerResource,
            name,
            label,
            list,
            edit,
            create,
            show,
            context,
        } = this.props;

        if (context === 'registration') {
            const resource = {
                name,
                label,
                hasList: !!list,
                hasEdit: !!edit,
                hasCreate: !!create,
                hasShow: !!show,
            };

            registerResource(resource);
        }
    }

    renderRoute() {
        const { name, label, list, edit, create, show, match } = this.props;
        const resource = {
            resource: name,
            label,
            hasList: !!list,
            hasEdit: !!edit,
            hasCreate: !!create,
            hasShow: !!show,
        };

        return (
            <Switch>
                {create && (
                    <Route
                        path={`${match.url}/create`}
                        render={props =>
                            createElement(create, {
                                basePath: match.url,
                                ...resource,
                                ...props,
                            })
                        }
                    />
                )}
                {show && (
                    <Route
                        path={`${match.url}/:id/show`}
                        render={props =>
                            createElement(show, {
                                basePath: match.url,
                                id: decodeURIComponent(props.match.params.id),
                                ...resource,
                                ...props,
                            })
                        }
                    />
                )}
                {edit && (
                    <Route
                        path={`${match.url}/:id`}
                        render={props =>
                            createElement(edit, {
                                basePath: match.url,
                                id: decodeURIComponent(props.match.params.id),
                                ...resource,
                                ...props,
                            })
                        }
                    />
                )}

                {list && (
                    <Route
                        path={match.url}
                        render={props =>
                            createElement(list, {
                                basePath: match.url,
                                ...resource,
                                ...props,
                            })
                        }
                    />
                )}
            </Switch>
        );
    }

    render() {
        const { context, lazy, fallback } = this.props;

        if (context === 'registration') {
            return null;
        }

        if (lazy) {
            return (
                <React.Suspense fallback={fallback}>
                    {this.renderRoute()}
                </React.Suspense>
            );
        }

        return this.renderRoute();
    }
}

export default connect(
    null,
    { registerResource }
)(Resource);
