/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useListController, { ListProps } from './useListController';
import { useTranslate } from '../i18n';

interface Props extends ListProps {
    children: (params) => JSX.Element;
}

/*
import { ListController } from '@stbui/prophet-core';
import ListView from './ListView';

const pageComponent = props => (
    <ListController {...props}>
        {controllerProps => <ListView {...controllerProps} {...props} />}
    </ListController>
);
*/

export const ListController = ({ children, ...props }: Props) => {
    const controllerProps = useListController(props);
    const translate = useTranslate();

    return children({ translate, ...controllerProps });
};

export default ListController;
