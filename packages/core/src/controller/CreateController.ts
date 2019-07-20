/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

import useCreateController, { CreateProps } from './useCreateController';

export interface Props extends CreateProps {
    children(props: any): JSX.Element;
}

const CreateController = ({ children, ...props }: Props) => {
    const controllerProps = useCreateController(props);

    return children({ ...controllerProps });
};

export default CreateController;
