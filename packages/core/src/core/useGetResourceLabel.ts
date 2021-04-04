/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui/prophet
 */

import { useTranslate } from '../i18n';

export const useGetResourceLabel = () => {
    const translate = useTranslate();

    return resource => {
        const label = translate(`resource.${resource}.name`);

        return label;
    };
};
