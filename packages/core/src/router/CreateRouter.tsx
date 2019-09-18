import React, { createElement } from 'react';
import { Route } from 'react-router';

/**
<CreateRouter basePath="/user" resource="user">
    <Create />
</CreateRouter>;
 */

export const CreateRouter = ({ basePath, resource, children }) => {
    if (!children) {
        return null;
    }

    return (
        <Route
            path={`${basePath}/create`}
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

export default CreateRouter;
