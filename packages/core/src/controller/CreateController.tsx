/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useCreateController, { CreateProps } from './useCreateController';
import { useTranslate } from '../i18n';

export interface Props extends CreateProps {
    children: (params) => JSX.Element;
}

/**
 * 
 * @examplez
 * 
 * import { CreateController } from '@stbui/prophet-core';
 * 
 * const CreateView = () => <div>...</div>
 * 
 * const pageComponent = props => (
 *     <CreateController {...props}>
 *         {controllerProps => <CreateView {...controllerProps} {...props} />}
 *     </CreateController>
 * );
 */
const CreateController = ({ children, ...props }: Props) => {
    const controllerProps = useCreateController(props);
    const translate = useTranslate();

    return children({ translate, ...controllerProps });
};

export default CreateController;
