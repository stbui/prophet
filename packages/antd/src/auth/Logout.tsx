import React, { useCallback } from 'react';
import { useLogout, useTranslate } from '@stbui/prophet-core';
import { Menu } from 'antd';

export default ({ redirectTo }) => {
    const logout = useLogout();
    const translate = useTranslate();

    const onClick = useCallback(() => logout(null, redirectTo, false), [
        redirectTo,
        logout,
    ]);

    return (
        <Menu.Item onClick={onClick}>
            {translate('prophet.auth.logout')}
        </Menu.Item>
    );
};
