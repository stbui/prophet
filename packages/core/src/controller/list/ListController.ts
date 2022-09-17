/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useListController, ListControllerProps } from './useListController';

/**
 *
 * @param param0
 *
 * @example
 *
 * import { ListController } from '@stbui/prophet-core';
 *
 * const ListView = () => <div>...</div>
 *
 * const pageComponent = props => (
 *    <ListController {...props}>
 *        {controllerProps => <ListView {...controllerProps} {...props} />}
 *    </ListController>
 * );
 */
export const ListController = ({
    children,
    ...props
}: ListControllerProps & { children: (params) => JSX.Element }) => {
    const controllerProps = useListController(props);

    return children(controllerProps);
};
