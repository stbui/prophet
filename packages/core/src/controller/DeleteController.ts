/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import useDeleteController, { DeleteProps } from './useDeleteController';

export interface Props extends DeleteProps {
    children(props: any): JSX.Element;
}

const DeleteController = ({ children, ...props }: Props) => {
    const controllerProps = useDeleteController(props);
    return children({ ...controllerProps });
};

export default DeleteController;
