import React from 'react';
import {
    List,
    Datagrid,
    Column,
    useTranslate,
    EditButton,
    ShowButton,
    DeleteButton,
} from '@stbui/prophet';

export default props => {
    const translate = useTranslate();

    return (
        <List {...props}>
            <Datagrid>
                <Column dataIndex="id">
                    {translate('resources.' + props.resource + '.fields.id')}
                </Column>
                <Column dataIndex="name">
                    {translate('resources.' + props.resource + '.fields.name')}
                </Column>
                <Column dataIndex="categories">
                    {translate(
                        'resources.' + props.resource + '.fields.categories'
                    )}
                </Column>
                <Column dataIndex="price">
                    {translate('resources.' + props.resource + '.fields.price')}
                </Column>
                <Column dataIndex="store_count">库存</Column>
                <Column dataIndex="is_on_sale">上架</Column>
                <Column dataIndex="create_time">添加时间</Column>

                <Column
                    render={record => (
                        <React.Fragment>
                            <EditButton
                                id={record.id}
                                basePath={props.basePath}
                            />
                            <span style={{ marginRight: 12 }}></span>
                            <ShowButton
                                id={record.id}
                                resource={props.resource}
                                basePath={props.basePath}
                            />
                            <span style={{ marginRight: 12 }}></span>
                            <DeleteButton
                                id={record.id}
                                record={record}
                                resource={props.resource}
                                basePath={props.basePath}
                            />
                        </React.Fragment>
                    )}
                ></Column>
            </Datagrid>
        </List>
    );
};
