/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import useShowController, { ShowProps } from './useShowController';

export interface Props extends ShowProps {
    children(props: any): JSX.Element;
}

const ShowController = ({ children, ...props }: Props) => {
    const controllerProps = useShowController(props);

    return children({ ...controllerProps });
};

export default ShowController;
