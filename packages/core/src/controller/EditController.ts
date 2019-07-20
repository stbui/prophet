/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import useEditController, { EditProps } from './useEditController';

export interface Props extends EditProps {
    children(props): any;
}

const EditController = ({ children, ...props }: Props) => {
    const controllerProps = useEditController(props);
    return children({ ...controllerProps });
};

export default EditController;
