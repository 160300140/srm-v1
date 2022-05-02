import React from 'react';
import { Statistic, Card, Row, Col } from 'antd';
import {  FallOutlined, RiseOutlined } from '@ant-design/icons';
import './dashboard.scss'

export default function TopStatistics() {

    return (
        <div className="site-statistic-demo-card">
            <Row gutter={16}>
                <Col span={6}>
                    <Card style={{ borderRadius:'8px', borderStyle:'solid', borderWidth:'1px', borderColor:'#d9d9d9' }} className='ds-info-top'>
                        <Row gutter={20}>
                            <Col>
                                <Statistic
                                    style={{ fontWeight: '600' }}
                                    title="Ingresos"
                                    value={'6,892'}
                                    precision={2}
                                    //valueStyle={{ color: '#3f8600' }}
                                    prefix={'$'}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    className='ds-small-content'
                                    //title="Ingresos"
                                    value={'8.2'}
                                    precision={2}
                                    valueStyle={{ color: '#22CF84' }}
                                    prefix={<RiseOutlined />}
                                //suffix="$"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                                Comparado con el mes anterior
                            </span>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                    <Card style={{ borderRadius:'8px', borderStyle:'solid', borderWidth:'1px', borderColor:'#d9d9d9' }} className='ds-info-top'>
                        <Row gutter={20}>
                            <Col>
                                <Statistic
                                    style={{ fontWeight: '600' }}
                                    title="Costos"
                                    value={'8,310'}
                                    precision={2}
                                    prefix={'$'}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    className='ds-small-content'
                                    value={'0.7'}
                                    precision={2}
                                    valueStyle={{ color: '#22CF84' }}
                                    prefix={<RiseOutlined />}
                                //suffix="$"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                                Comparado con el mes anterior
                            </span>
                        </Row>
                    </Card>

                </Col>
                <Col span={6}>
                    <Card style={{ borderRadius:'8px', borderStyle:'solid', borderWidth:'1px', borderColor:'#d9d9d9' }} className='ds-info-top'>
                        <Row gutter={20}>
                            <Col>
                                <Statistic
                                    style={{ fontWeight: '600' }}
                                    title="Margen $"
                                    value={'2454'}
                                    precision={2}
                                    //valueStyle={{ color: '#3f8600' }}
                                    prefix={'$'}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    className='ds-small-content'
                                    //title="Ingresos"
                                    value={'8.2'}
                                    precision={2}
                                    valueStyle={{ color: '#FF637D' }}
                                    prefix={<FallOutlined />}
                                //suffix="$"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                                Comparado con el mes anterior
                            </span>
                        </Row>
                    </Card>
                </Col>
                <Col span={6}>
                <Card style={{ borderRadius:'8px', borderStyle:'solid', borderWidth:'1px', borderColor:'#d9d9d9' }} className='ds-info-top'>
                        <Row gutter={20}>
                            <Col>
                                <Statistic
                                    style={{ fontWeight: '600' }}
                                    title="Margen %"
                                    value={'19.24'}
                                    precision={2}
                                    //valueStyle={{ color: '#3f8600' }}
                                    prefix={'%'}
                                />
                            </Col>
                            <Col>
                                <Statistic
                                    className='ds-small-content'
                                    //title="Ingresos"
                                    value={'1.4 pp'}
                                    precision={2}
                                    valueStyle={{ color: '#FF637D' }}
                                    prefix={<FallOutlined />}
                                //suffix="$"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <span style={{ color: 'rgba(0, 0, 0, 0.45)' }}>
                                Comparado con el mes anterior
                            </span>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </div>
    );


};