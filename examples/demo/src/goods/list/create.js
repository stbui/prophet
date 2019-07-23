import React from 'react';
import { Create, Form, FormInput } from 'prophet-antd';
import { Input, Select, Radio } from 'antd';

export default props => {
    return (
        <Create {...props}>
            <Form>
                <Input
                    label="商品名称"
                    name="goods_name"
                    placeholder="请输入商品名称"
                    rules={[
                        {
                            required: true,
                            message: '请输入商品名称',
                        },
                    ]}
                />
                <Input
                    label="商品简介"
                    name="goods_remark"
                    placeholder="请输入商品简介"
                />
                <Input
                    label="商品分类"
                    name="username"
                    placeholder="请输入商品分类"
                />
                <Input
                    label="商品品牌"
                    name="username"
                    placeholder="请输入商品品牌"
                />
                <Input
                    label="运费模板"
                    name="username"
                    placeholder="请输入运费模板"
                />
                <Input
                    label="赠送积分"
                    name="give_integral"
                    placeholder="请输入赠送积分"
                />
                <Input
                    label="初始销量"
                    name="sales_initial"
                    placeholder="请输入初始销量"
                />
                <Input
                    label="分佣方式"
                    name="agent_price"
                    placeholder="请输入分佣方式"
                />
                <Input
                    label="app_id"
                    name="app_id"
                    placeholder="app_id"
                />
            </Form>
        </Create>
    );
};
