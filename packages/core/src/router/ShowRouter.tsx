import React, { createElement } from 'react';
import { Route } from 'react-router';

/**
<ShowRouter basePath="/user" resource="user">
    <Show />
</ShowRouter>;
 */

export const ShowRouter = ({ basePath, resource, children }) => {
    if (!children) {
        return null;
    }

    return (
        <Route
            path={`${basePath}/:id/show`}
            render={props =>
                createElement(children, {
                    basePath,
                    id: decodeURIComponent(props.match.params.id),
                    ...resource,
                    ...props,
                })
            }
        />
    );
};

export default ShowRouter;
