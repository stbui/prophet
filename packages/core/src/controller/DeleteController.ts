/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useDeleteController, { DeleteProps } from './useDeleteController';
import { useTranslate } from '../i18n';

export interface Props extends DeleteProps {
    children: (params) => JSX.Element;
}

/**
 *
 * @example
 *
 * import { DeleteController } from '@stbui/prophet-core';
 *
 * const DeleteView = () => <div>...</div>
 *
 * const pageComponent = props => (
 *    <DeleteController {...props}>
 *        {controllerProps => <DeleteView {...controllerProps} {...props} />}
 *    </DeleteController>
 * );
 */
const DeleteController = ({ children, ...props }: Props) => {
    const controllerProps = useDeleteController(props);
    const translate = useTranslate();

    return children({ translate, ...controllerProps });
};

export default DeleteController;
