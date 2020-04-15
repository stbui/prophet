/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useShowController, { ShowProps } from './useShowController';
import { useTranslate } from '../i18n';

export interface Props extends ShowProps {
    children: (params) => JSX.Element;
}

/*
import { ShowController } from '@stbui/prophet-core';

const ShowView = () => <div>...</div>

const pageComponent = props => (
    <ShowController {...props}>
        {controllerProps => <ShowView {...controllerProps} {...props} />}
    </ShowController>
);
*/

const ShowController = ({ children, ...props }: Props) => {
    const controllerProps = useShowController(props);
    const translate = useTranslate();

    return children({ translate, ...controllerProps });
};

export default ShowController;
