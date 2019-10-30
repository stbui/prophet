/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useListController, { ListProps } from './useListController';
import { useTranslate } from '../i18n';

interface Props extends ListProps {
    children(props): any;
}

export const ListController = ({ children, ...props }: Props) => {
    const controllerProps = useListController(props);
    const translate = useTranslate();

    return children({ translate, ...controllerProps });
};

export default ListController;
