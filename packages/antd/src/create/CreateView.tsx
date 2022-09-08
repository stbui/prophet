import React from 'react';

interface CreateViewProps {
    loading?: any;
    actions?: any;
    record?: object;
    [key: string]: any;
}

export const CreateView = ({
    children,
    loading,
    record = {},
    actions,
    ...reset
}: CreateViewProps) => children;
