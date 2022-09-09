import React from 'react';
import {
    List,
    EditButton,
    ShowButton,
    DeleteButton,
    useListContext,
} from '@stbui/prophet';

const D = props => {
    const { sort, data, isLoading, total } = useListContext(props);

    return JSON.stringify(data);
};

export default props => {
    return (
        <List>
            <D />
        </List>
    );
};
