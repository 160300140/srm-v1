import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    Collapse,
    Select,
    Image,
    Button,
} from "antd";
import wallet from '../../img/wallet.png';


export default function SecondStep(props) {
    const { setDescVal } = props;
    const { Option } = Select;
    const { TextArea } = Input;
    const [ description, setDescription] = useState();
    const payment = ["Efectivo", "Otro"];


    const onFinish = values => {
        console.log('Received values of form:', values);
        console.log("state desc", description)
        setDescVal(description)
    };

    function texArea(e) {
        console.log('Change:', e.target.value);
        const text = e.target.value;
        
        setDescription({
            description: text 
        });
    }

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
                            placeholder="Agrege su texto aquí"
                            allowClear
                            name="description"
                            onChange={texArea}
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
                            //onChange={}
                            allowClear
                            //value={}
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
                <Col flex="auto">
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
            <br />
            <Row gutter={[28, 0]}>
                <Col flex="auto">
                    <Form.Item>
                        <Button type="primary" htmlType="submit"   ghost>
                            Confirmar
                        </Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    );
}