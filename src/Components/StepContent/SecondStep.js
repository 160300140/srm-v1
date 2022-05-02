import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    Collapse,
    Select,
    Image,
} from "antd";
import wallet from '../../img/wallet.png';


export default function SecondStep(props) {
    const { titles, register, changeForm, inputValidation, onChangeCompany } = props;
    const { Option } = Select;
    const { Panel } = Collapse;
    const { TextArea } = Input;
    const [dataList, setDataList] = useState([]);
    const [ListC, setListC] = useState([]);
    const payment = ["Efectivo", "Otro"];


    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    return (
        <Form onFinish={onFinish} autoComplete="off">
            <Row gutter={[28, 0]} style={{ marginTop: '12px' }}>
                <Col flex="58%">
                    <Form.Item>
                        <strong>Descripción:</strong>
                        {/* <Input
                            type="text"
                            name="description"
                            onChange={inputValidation}
                            //value={inputs.description}
                            placeholder="Información relevante"
                        /> */}
                        <TextArea 
                            placeholder="textarea with clear icon" 
                            allowClear 
                            name="description"
                            onChange={inputValidation}
                        />
                    </Form.Item>
                </Col>
                <Col flex="25%">
                    <Form.Item>
                        <strong>
                            Tipo pago: <span style={{ color: "tomato" }}>*</span>
                        </strong>
                        <Select
                            name="storeId"
                            onChange={onChangeCompany}
                            allowClear
                            //value={inputs.storeId}
                            placeholder="Moneda"
                        >
                            {payment.map((name, index) => {
                                return (
                                    <Select.Option key={index} value={name}>
                                        {name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col flex="15%">
                    <Form.Item>
                        <strong>
                            Moneda:<span style={{ color: "tomato" }}>*</span>
                        </strong>
                        <Select defaultValue="USD" >
                            <Option value="USD">$</Option>
                            <Option value="EUR">€</Option>
                            <Option value="GBP">£</Option>
                            <Option value="CNY">¥</Option>
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[28, 0]}>
                <Col flex="65%">
                    <Form.Item>
                    </Form.Item>
                </Col>
                <Col flex="auto">
                    <Image
                        width={100}
                        preview={false}
                        src={wallet}
                    />
                </Col>
            </Row>
        </Form>
    );
}