/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Form, Row, Col, Input, Button, Card, Table } from 'antd';

import './TableFinder.scss';

export default function TableFinder(props) {

    //#region constants
    const { dataPlaceholder, columns, dataList, titleInfo } = props;
    const [form] = Form.useForm();
    const { updateData , onFinish } = props;
    //#endregion constants

    //#region functions

    //#endregion functions

    //#region return
    return (
        <div>
            <div className="site-card-border-less-wrapper">
                <Card title={titleInfo} bordered={true}>

                    <Form
                        form={form}
                        name="advanced_search"
                        className="ant-advanced-search-form"
                        onFinish={onFinish}
                    >
                        <Row gutter={24}>
                            <Col xs={24} xl={8}>
                                <Form.Item name="clientName" label="Nombre">
                                    <Input allowClear placeholder={dataPlaceholder.name} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} xl={8}>
                                <Form.Item name="clientCode" label="Clave">
                                    <Input allowClear placeholder={dataPlaceholder.key} />
                                </Form.Item>
                            </Col>
                            <Col xs={24} xl={8}>
                                {/* <Form.Item name="status" label="Estatus">
                                    <Select placeholder={dataPlaceholder.status} allowClear>
                                        <Option value="all">Todos los estatus</Option>
                                        <Option value="active">Cliente activo</Option>
                                        <Option value="inactive">Cliente inactivo</Option>
                                    </Select>
                                </Form.Item> */}
                            </Col>
                            {/* 
                                <Col xs={24} xl={8} >
                                    <Input.Group label="Form Layout">
                                        <Input readOnly style={{ width: '30%' }} defaultValue="Inicio/Fin" />
                                        <DatePicker.RangePicker style={{ width: '70%' }} />
                                    </Input.Group>
                                </Col> */}
                        </Row>

                        <Row>
                            <Col span={24} style={{ textAlign: 'right', }}>
                                
                                <Button  size="small" onClick={() => { form.resetFields(); updateData() }} >
                                    Limpiar
                                </Button>
                                <Button style={{ margin: '0 8px', }} type="primary" size="small" htmlType="submit">
                                    Buscar
                                </Button>
                                <Button type="primary" size="small" onClick={updateData} >
                                    Actualizar
                                </Button>
                                {/* <a style={{ fontSize: 12 }} onClick={() => { setExpand(!expand) }}>
                                    {expand ? <UpOutlined /> : <DownOutlined />} Collapse
                                </a> */}
                            </Col>
                        </Row>
                    </Form>

                </Card>
            </div>
            <br />
            <div className="site-card-border-less-wrapper">
                <Card bordered={true}>
                    <Table columns={columns} dataSource={dataList} scroll={{ x: 1300 }} />
                </Card>
            </div>
        </div>
    )
    //#endregion return
}