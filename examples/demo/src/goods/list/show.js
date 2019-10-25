import React from 'react';
import { Show, Form } from '@stbui/prophet-antd';
import { Input } from 'antd';

export default props => {
    return (
        <Show {...props}>
            <Form>
                <Input
                    label="商品名称"
                    name="goods_name"
                    placeholder="请输入商品名称"
                />

                <Input label="app_id" name="app_id" placeholder="app_id" />
            </Form>
        </Show>
    );
};
