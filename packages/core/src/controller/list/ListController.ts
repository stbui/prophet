/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useListController, { ListProps } from './useListController';

interface Props extends ListProps {
    children: (params) => JSX.Element;
}

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
export const ListController = ({ children, ...props }: Props) => {
    const controllerProps = useListController(props);

    return children(controllerProps);
};

export default ListController;
