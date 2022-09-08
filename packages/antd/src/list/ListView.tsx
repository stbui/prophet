import React, { Fragment } from 'react';
import { useListContext } from '@stbui/prophet-core';
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

    return <Fragment>{children}</Fragment>;
};

ListView.defaultProps = {
    actions: <ListActions />,
};

export default ListView;
