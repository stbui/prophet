import React, { cloneElement, Children, Fragment, ReactElement } from 'react';
import { useListContext } from '@stbui/prophet-core';
import { Spin } from 'antd';
import ListActions from './ListActions';

interface ListViewProps {
    children?: any;
    actions?: any;
    basePath?: string;
    drawerView?: any;
}

const ListView = (props: ListViewProps) => {
    const { children, actions, drawerView, ...rest } = props;

    const listContext = useListContext();
    const { loading } = listContext;

    return (
        <Fragment>
            <Spin spinning={!loading}>
                {actions && cloneElement(actions, { ...rest })}
                {children && cloneElement(Children.only(children), { ...rest })}
            </Spin>
            {drawerView}
        </Fragment>
    );
};

ListView.defaultProps = {
    actions: <ListActions />,
};

export default ListView;
