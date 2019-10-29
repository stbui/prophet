/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import React from 'react';
import useDataProvider from './useDataProvider';

/* 
import React, { Component } from 'react';
import { withDataProvider, showNotification } from '@stbui/prophet-core';

class UserList extends Component {
    state = {
        users: [],
    };

    componentDidMount() {
        const { dataProvider, dispatch } = this.props;
        dataProvider('GET_LIST', 'users', { filter: { username: 'stbui' } })
            .then(({ data: users }) => this.setState({ users }))
            .catch(error => dispatch(showNotification('error', error.message)));
    }

    render() {
        const { users } = this.state;

        return (
            <React.Fragment>
                {users.map((user, key) => (
                    <UserDetail user={user} key={key} />
                ))}
            </React.Fragment>
        );
    }
}

export default withDataProvider(UserList); 
*/

const withDataProvider = Component => props => (
    <Component {...props} dataProvider={useDataProvider()} />
);

export default withDataProvider;
