/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useEditController, { EditProps } from './useEditController';

interface Props extends EditProps {
    children: (params) => JSX.Element;
}

/**
 *
 * @param param0
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
const EditController = ({ children, ...props }: Props) => {
    const controllerProps = useEditController(props);

    return children(controllerProps);
};

export default EditController;
