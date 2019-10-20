import React from 'react';
import { List, Datagrid, Column, useTranslate } from '@stbui/prophet';

export default props => {
    const translate = useTranslate();

    return (
        <List {...props}>
            <Datagrid>
                <Column dataIndex="id">
                    {translate('resources.' + props.resource + '.fields.id')}
                </Column>
                <Column dataIndex="goods_name">
                    {translate('resources.' + props.resource + '.fields.name')}
                </Column>
                <Column dataIndex="category_id">
                    {translate(
                        'resources.' + props.resource + '.fields.category'
                    )}
                </Column>
                <Column dataIndex="price">
                    {translate('resources.' + props.resource + '.fields.price')}
                </Column>
                <Column dataIndex="store_count">库存</Column>
                <Column dataIndex="is_on_sale">上架</Column>
                <Column dataIndex="create_time">添加时间</Column>
            </Datagrid>
        </List>
    );
};
