import React, { useState, useEffect } from "react";
import {
    Form,
    Input,
    InputNumber,
    Row,
    Col,
    Space,
    Collapse,
    Select,
    Card,
    Avatar,
    DatePicker,
    notification,
    Button,
    Upload
} from "antd";
import { MinusCircleFilled, PlusOutlined, UserOutlined } from "@ant-design/icons";
import { singnInApi } from "../../Api/user";
import { userHeaders } from '../../Constants/ObjsUser';
import { getCustomerApiLst } from "../../Api/Customer";
import { clientHeaders, clientParams } from '../../Constants/ObjsClient';
import { getCompanyApiList } from "../../Api/Company";
import { companyHeaders, companyParams } from '../../Constants/ObjsCompany';
import { getPurchaseApiList } from "../../Api/Purchase";
import { purchaseHeaders, purchaseParams } from '../../Constants/ObjsPurchase';


import "../FormAdd/FormAdd.scss";

export default function FistStep(props) {
    //const { titles, register, changeForm, inputValidation } = props;
    const { Meta } = Card;
    const [valuesAuth] = useState(false);
    const [inputs, setInputs] = useState(clientParams);
    const [dataListA, setDataListA] = useState([]);
    const [dataListB, setDataListB] = useState([]);
    const [dataListC, setDataListC] = useState([]);
    const [dataListD, setDataListD] = useState([]);
    const [listD, setListD] = useState([]);
    const [valueId, seIdValueD] = useState();
    const [valuePrice, setValuePrice] = useState();
    const [valQty, setValQty] = useState();
    const [valSub, setValSub] = useState();
    const [valTotal, setValTotal] = useState();
    const [discount, setDiscount] = useState();

    const getDataA = async e => {
        //e.preventDefault();
        const response = await singnInApi(userHeaders);

        if (response !== "Failed to fetch") {
            const { result } = response;
            const user = [result];
            user.filter(function (el) {
                const fullName = `${el.name} ${el.lastName} ${el.surName}`;
                setDataListA(fullName);
                return fullName;
            });
        }
    }
    //console.log("dataListA", dataListA);

    //LISTA DE CLIENTES
    const getDataB = async e => {
        //e.preventDefault();
        const result = await getCustomerApiLst(clientHeaders);

        if (result !== "Failed to fetch") {
            const { customerList } = result;
            var reformattedArray = customerList.map(function (obj) {
                var rObj = {};
                rObj[obj.id] = `${obj.name} ${obj.lastName} ${obj.surName}`;
                return rObj;
            });
            const res = Object.assign([], ...reformattedArray)
            setDataListB(res);
        }
    }
    //console.log("dataListB", dataListB);

    function onChangeB(value, key) {
        //e.preventDefault() 
        const num = getKeyByValue(dataListB, value);
        const val = value;
        const kVal = value;

        if (val) {
            value = kVal;
        } else {
            value = '';
        }
        setInputs({
            ...inputs,
            customerId: num,
        });
        console.log("id client", num)
    }

    //LISTA DE SUCURSAL
    const getDataC = async e => {
        //e.preventDefault();
        const result = await getCompanyApiList(companyHeaders);

        if (result !== "Failed to fetch") {
            const { storeList } = result;
            var reformattedArray = storeList.map(function (obj) {
                var rObj = {};
                rObj[obj.id] = obj.name;
                return rObj;
            });
            const res = Object.assign([], ...reformattedArray)
            setDataListC(res);
        }
    }
    //console.log("dataListC", dataListC);

    function onChangeC(value, key) {
        //e.preventDefault() 
        const num = getKeyByValue(dataListC, value);
        const val = value;
        const kVal = value;

        if (val) {
            value = kVal;
        } else {
            value = '';
        }
        setInputs({
            ...inputs,
            storeId: num,
        });
        console.log("id store", num)
    }

    const getDataD = async e => {
        //e.preventDefault();
        const result = await getPurchaseApiList(purchaseHeaders);

        if (result !== "Failed to fetch") {
            const { productList } = result;
            //console.log("fetchList", productList)

            // eslint-disable-next-line no-array-constructor
            let dataVal = new Array();
            let res = [];
            productList.forEach(function (val) {
                dataVal = {
                    idP: val.id,
                    item: val.name,
                    price: val.price,
                    stock: val.stock
                };
                res.push(dataVal);

            });
            setDataListD(res);

            var reformattedArrA = productList.map(function (obj) {
                var rObj = {};
                rObj[obj.id] = obj.name;
                return rObj;
            });
            const resObjA = Object.assign([], ...reformattedArrA)
            setListD(resObjA);
        }
    }
    //console.log("dataListD", dataListD);

    function onChangeD(value, key) {
        console.log("producto", value);
        const num = getKeyByValue(listD, value);
        const val = value;
        const kVal = value;

        if (val) {
            value = kVal;
        } else {
            value = '';
        }
        setInputs({
            ...inputs,
            storeId: num,
        });
        seIdValueD(num);
        console.log("id pruducto", num);

        console.log("List D", dataListD);

        // eslint-disable-next-line array-callback-return
        dataListD.filter(function (el) {
            if (value === el.item) {
                setValuePrice(el.price);
                return el.price;
            }
        });
    }

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    useEffect(() => {
        getDataA();
        getDataB();
        getDataC();
        getDataD();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valuesAuth]);


    const onFinish = values => {
        console.log('Received values of form:', values);
    };

    function onChangeQty(value) {
        console.log('changed n items', value);

        if (value) {
            const subtotal = value * valuePrice;
            setValQty(value);
            setValSub(subtotal);
            setValTotal(subtotal);
            console.log("subtotal", subtotal);
        }

    }

    function onChangeDis(value) {
        console.log('value discount', value);
        var cVal = (value / 100);
        console.log("real discount", cVal);
        setDiscount(cVal);
        onCalcTotal(cVal, valSub);
    }

    function onChangePrice(value) {
        console.log("Price", value);
        value = valuePrice;

    }

    function onCalcTotal(a, b) {
        //console.log("**test", valSub, discount)
        var nVal1 = b;
        var nVal2 = a;
        var finalPrice = nVal1 - (nVal1 * nVal2);
        console.log("Final price", finalPrice);
        setValTotal(finalPrice.toFixed(2));
    }


    function onChangeTot(value) {
        console.log('final price', value);
    }


    return (
        <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="off">
            <Row gutter={[10, 0]} style={{ marginTop: '12px', marginLeft: '3em', marginRight: '0px' }}>
                <Col flex="0%" style={{ padding: '0', marginTop: '2.5%' }}>
                    <Meta
                        avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />}
                    />
                </Col>
                <Col flex="30%">
                    <Form.Item>
                        <strong>
                            Vendedor:
                        </strong>
                        <Input name="seller" readOnly value={dataListA} />
                    </Form.Item>
                </Col>
                <Col flex="30%">
                    <Form.Item>
                        <strong>
                            Cliente: <span style={{ color: "tomato" }}>*</span>
                        </strong>
                        <Select
                            name="customerId"
                            onChange={onChangeB}
                            allowClear
                            //value={inputs.storeId}
                            placeholder="Nombre cliente"
                        >
                            {dataListB.map((name, index) => {
                                return (
                                    <Select.Option key={index} value={name}>
                                        {name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
                <Col flex="30%">
                    <Form.Item>
                        <strong>
                            Sucursal: <span style={{ color: "tomato" }}>*</span>
                        </strong>
                        <Select
                            name="storeId"
                            onChange={onChangeC}
                            allowClear
                            //value={inputs.storeId}
                            placeholder="Sucursal"
                        >
                            {dataListC.map((name, index) => {
                                return (
                                    <Select.Option key={index} value={name}>
                                        {name}
                                    </Select.Option>
                                );
                            })}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Card style={{ marginBottom: '12px' }}>
                <Card.Grid hoverable={false} style={{ width: '17.25em' }}><strong >Concepto</strong></Card.Grid>
                <Card.Grid hoverable={false} style={{ width: '5.7em' }}><strong>Cantidad</strong></Card.Grid>
                <Card.Grid hoverable={false} style={{ width: '7.2em' }}><strong>Precio</strong></Card.Grid>
                <Card.Grid hoverable={false} style={{ width: '7.1em' }}><strong>Subtotal</strong></Card.Grid>
                <Card.Grid hoverable={false} style={{ width: '6.2em' }}><strong>Descuento</strong></Card.Grid>
                <Card.Grid hoverable={false} style={{ width: '8.6em' }}><strong>Total</strong></Card.Grid>
            </Card>
            <Form.List name="users">
                {(fields, { add, remove }) => (
                    <div>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                <Row gutter={[10, 0]}>
                                    <Col flex="auto">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'product']}
                                            //rules={[{ required: true, message: 'Requerido' }]}
                                        >
                                            <Select
                                                onChange={onChangeD}
                                                allowClear
                                                placeholder="Artículo"
                                                style={{ width: '16.9em' }}
                                            >
                                                {listD.map((name, index) => {
                                                    return (
                                                        <Select.Option key={index} value={name}>
                                                            {name}
                                                        </Select.Option>
                                                    );
                                                })}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col flex="auto">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'quatity']}
                                        >
                                            <Space direction="vertical">
                                                <InputNumber min={1} style={{ width: '5em' }} onChange={onChangeQty} />
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                    <Col flex="auto">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price']}
                                            //rules={[{ required: true, message: 'Requerido' }]}
                                        >
                                            <Space direction="vertical">
                                                <Input
                                                    min={0}
                                                    //formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    //parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                    //onChangePrice={onChangePrice}
                                                    onChangePrice={onChangePrice}
                                                    //value={valuePrice}
                                                    readOnly
                                                />
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                    <Col flex="auto">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'subtotal']}
                                        //rules={[{ required: true, message: 'Requerido' }]}
                                        //onChange={onChange}
                                        >
                                            <Space direction="vertical">
                                                <InputNumber
                                                    min={0}
                                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                    //onChange={onChangeSub}
                                                    value={valSub}
                                                    readOnly
                                                />
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                    <Col flex="auto">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'discount']}
                                        >
                                            <Space direction="vertical">
                                                <InputNumber
                                                    //defaultValue={0}
                                                    min={0}
                                                    max={100}
                                                    onChange={onChangeDis}
                                                    formatter={value => `${value}%`}
                                                    parser={value => value.replace('%', '')}
                                                    style={{ width: '5.5em' }}
                                                />
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                    <Col flex="auto">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'finalPrice']}
                                            //rules={[{ required: true, message: 'Requerido' }]}
                                        >
                                            <Space direction="vertical">
                                                <InputNumber
                                                    min={0}
                                                    onChange={onChangeTot}
                                                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                                    style={{ width: '8em' }}
                                                    value={valTotal}
                                                />
                                            </Space>
                                        </Form.Item>
                                    </Col>
                                    <Col flex="auto" style={{ padding: '0' }}>
                                        <MinusCircleFilled style={{ color: "tomato" }} onClick={() => remove(name)} />
                                    </Col>
                                </Row>
                            </Space>
                        ))}
                        <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Agregar compra
                            </Button>
                        </Form.Item>
                        <Form.Item>
                            <Row gutter={[10, 0]} style={{ marginTop: '16px', marginLeft: '32em', marginRight: '0px' }}>
                                <Col style={{ marginTop: '1.5%' }}>
                                    <strong>
                                        Monto total:
                                    </strong>
                                </Col>
                                <Col>
                                    <Form.Item>
                                        <Input readOnly value={'Total'} />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    </div>
                )}
            </Form.List>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}