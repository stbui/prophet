import React, { createElement } from 'react';
import { Route } from 'react-router';

/**
<EditRouter basePath="/user" resource="user">
    <Show />
</EditRouter>;
 */

export const EditRouter = ({ basePath, resource, children }) => {
    if (!children) {
        return null;
    }

    return (
        <Route
            path={`${basePath}/:id`}
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

export default EditRouter;
