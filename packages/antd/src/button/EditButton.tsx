import React, { FunctionComponent } from 'react';
import { useTranslate } from '@stbui/prophet-core';
import { Link } from '../Link';

interface Props {
    basePath: string;
    label: string;
    id: string | number;
}

const EditButton: FunctionComponent<Props> = ({ basePath, label, id }) => {
    const translate = useTranslate();
    return <Link to={`${basePath}/${id}`}>{translate(label)}</Link>;
};

EditButton.defaultProps = {
    label: 'prophet.action.edit',
};

export default EditButton;
