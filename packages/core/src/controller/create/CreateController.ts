/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import {
    useCreateController,
    CreateControllerProps,
} from './useCreateController';

/**
 *
 * @example
 *
 * import { CreateController } from '@stbui/prophet-core';
 *
 * const CreateView = () => <div>...</div>
 *
 * const App = props => (
 *     <CreateController {...props}>
 *         {controllerProps => <CreateView {...controllerProps} {...props} />}
 *     </CreateController>
 * );
 */
export const CreateController = ({
    children,
    ...props
}: CreateControllerProps & { children: (params) => JSX.Element }) => {
    const controllerProps = useCreateController(props);

    return children(controllerProps);
};
