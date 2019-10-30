/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useDeleteController, { DeleteProps } from './useDeleteController';
import { useTranslate } from '../i18n';

export interface Props extends DeleteProps {
    children(props: any): JSX.Element;
}

const DeleteController = ({ children, ...props }: Props) => {
    const controllerProps = useDeleteController(props);
    const translate = useTranslate();

    return children({ translate, ...controllerProps });
};

export default DeleteController;
