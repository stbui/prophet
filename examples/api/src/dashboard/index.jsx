import React from 'react';
import { Row, Col, Tooltip, Tabs, Card } from 'antd';
import {
    ChartCard,
    Field,
    MiniArea,
    MiniBar,
    MiniProgress,
} from '../components/Charts';
import Trend from '../components/Trend';
import './index.scss';

const visitData = [];
const beginDay = new Date().getTime();

const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
for (let i = 0; i < fakeY.length; i += 1) {
    visitData.push({
        x: beginDay + 1000 * 60 * 60 * 24 * i,
        y: fakeY[i],
    });
}

const topColResponsiveProps = {
    xs: 24,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 6,
    style: { marginBottom: 24 },
};

export default () => {
    return (
        <div>
            <Row gutter={24}>
                <Col {...topColResponsiveProps}>
                    <ChartCard
                        bordered={false}
                        title="总销售额"
                        // action={
                        //     <Tooltip title="指标说明">
                        //         <Icon type="info-circle-o" />
                        //     </Tooltip>
                        // }
                        total="￥126,560"
                        footer={<Field label="日销售额" value={` ￥12,423`} />}
                        contentHeight={46}
                    >
                        <Trend flag="up" style={{ marginRight: 16 }}>
                            周同比
                            <span className="trendText">12%</span>
                        </Trend>
                        <Trend flag="down">
                            日同比
                            <span className="trendText">11%</span>
                        </Trend>
                    </ChartCard>
                </Col>
                <Col {...topColResponsiveProps}>
                    <ChartCard
                        bordered={false}
                        title="访问量"
                        // action={
                        //     <Tooltip title="指标说明">
                        //         <Icon type="info-circle-o" />
                        //     </Tooltip>
                        // }
                        total="8,846"
                        footer={<Field label="日访问量" value={`1,234`} />}
                        contentHeight={46}
                    >
                        <MiniArea
                            color="#975FE4"
                            height={200}
                            data={visitData}
                        />
                    </ChartCard>
                </Col>
                <Col {...topColResponsiveProps}>
                    <ChartCard
                        bordered={false}
                        title="支付笔数"
                        // action={
                        //     <Tooltip title="指标说明">
                        //         <Icon type="info-circle-o" />
                        //     </Tooltip>
                        // }
                        total="6,560"
                        footer={<Field label="转化率" value={`60%`} />}
                        contentHeight={46}
                    >
                        <MiniBar height={200} data={visitData} />
                    </ChartCard>
                </Col>

                <Col {...topColResponsiveProps}>
                    <ChartCard
                        bordered={false}
                        title="运营活动效果"
                        // action={
                        //     <Tooltip title="指标说明">
                        //         <Icon type="info-circle-o" />
                        //     </Tooltip>
                        // }
                        total="78%"
                        footer={
                            <div
                                style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                }}
                            >
                                <Trend flag="up" style={{ marginRight: 16 }}>
                                    周同比
                                    <span className="trendText">12%</span>
                                </Trend>
                                <Trend flag="down">
                                    日同比
                                    <span className="trendText">11%</span>
                                </Trend>
                            </div>
                        }
                        contentHeight={46}
                    >
                        <MiniProgress
                            percent={78}
                            strokeWidth={8}
                            target={80}
                            color="#13C2C2"
                        />
                    </ChartCard>
                </Col>
            </Row>
            <Card bordered={false} bodyStyle={{ padding: 0 }}>
                <Tabs size="large" tabBarStyle={{ marginBottom: 24 }}>
                    <Tabs.TabPane tab="销售额" key="sales">
                        销售趋势
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="访问量" key="views">
                        访问量趋势
                    </Tabs.TabPane>
                </Tabs>
            </Card>
            <Row gutter={24}>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Card
                        bordered={false}
                        title="线上热门搜索"
                        style={{ marginTop: 24 }}
                    >
                        搜索用户数
                    </Card>
                </Col>
                <Col xl={12} lg={24} md={24} sm={24} xs={24}>
                    <Card
                        bordered={false}
                        title="销售额类别占比"
                        style={{ marginTop: 24 }}
                    >
                        销售额
                    </Card>
                </Col>
            </Row>
        </div>
    );
};
