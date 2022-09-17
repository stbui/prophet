/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useEditController, EditControllerProps } from './useEditController';

/**
 *
 * @example
 *
 * import { EditController } from '@stbui/prophet-core';
 *
 * const EditView = () => <div>...</div>
 *
 * const App = props => (
 *    <EditController {...props}>
 *        {controllerProps => <EditView {...controllerProps} {...props} />}
 *    </EditController>
 * );
 */
export const EditController = ({
    children,
    ...props
}: EditControllerProps & { children: (params) => JSX.Element }) => {
    const controllerProps = useEditController(props);

    return children(controllerProps);
};
