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

import useCreateController, { CreateProps } from './useCreateController';

interface Props extends CreateProps {
    children: (params) => JSX.Element;
}

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
const CreateController = ({ children, ...props }: Props) => {
    const controllerProps = useCreateController(props);

    return children(controllerProps);
};

export default CreateController;
