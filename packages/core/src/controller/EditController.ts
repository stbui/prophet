/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import useEditController, { EditProps } from './useEditController';
import { useTranslate } from '../i18n';

export interface Props extends EditProps {
    children(props): any;
}

const EditController = ({ children, ...props }: Props) => {
    const controllerProps = useEditController(props);
    const translate = useTranslate();

    return children({ translate, ...controllerProps });
};

export default EditController;
