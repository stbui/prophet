import React, { createElement } from 'react';
import { Route } from 'react-router';

/**
<ListRouter basePath="/user" resource="user">
    <Create />
</ListRouter>;
 */

export const ListRouter = ({ basePath, resource, children }) => {
    if (!children) {
        return null;
    }

    return (
        <Route
            path={basePath}
            render={props =>
                createElement(children, {
                    basePath,
                    ...resource,
                    ...props,
                })
            }
        />
    );
};

export default ListRouter;
