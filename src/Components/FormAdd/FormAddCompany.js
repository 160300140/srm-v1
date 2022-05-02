import React, { useState } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    Space,
    Collapse,
    TimePicker,
    notification,
    Button,
} from "antd";
import moment from "moment";
import { CaretRightOutlined } from "@ant-design/icons";
import { emailValidation } from "../../Utils/formValidation";
import { setCompanyAPi } from "../../Api/Company";
import { PlusCircleOutlined } from "@ant-design/icons";
import { companyForm, companyFormValid } from '../../Constants/ObjsCompany';
import "./FormAdd.scss";

export default function FormAddCompany(props) {

    //#region constants
    const { Panel } = Collapse;
    const { titles } = props;
    const [inputs, setInputs] = useState(companyForm);
    const [formValid, setFormValid] = useState(companyFormValid);
    const format = 'HH:mm:ss';
    const [dateRange, changeDateRange] = useState(null);
    //#endregion constants

    //#region functions


    const changeForm = (e) => {

        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });

        //console.log("TEST TARGET:" + e.target.name);
        //console.log("Test gender input" + e.target.value);
    };

    const inputValidation = (e) => {
        const { type, name } = e.target;

        if (type === "email") {
            setFormValid({ ...formValid, [name]: emailValidation(e.target) });
        }
    };

    const register = async (e) => {
        e.preventDefault();;
        const nameVal = inputs.name;
        const phoneNumberVal = inputs.phoneNumber;
        const mailVal = inputs.mail;
        const oTimeVal = inputs.openingTime;
        const cTimeVal = inputs.closingTime;

        const rfcVal = inputs.rfc;
        const streetVal = inputs.calle;
        const coloniaVal = inputs.region;
        const cityVal = inputs.city;
        const pcVal = inputs.PostalCode;
        const latVal = inputs.latitud;
        const logVal = inputs.longitud;

        if (
            !nameVal ||
            !phoneNumberVal ||
            !cTimeVal ||
            !mailVal ||
            !oTimeVal ||
            !phoneNumberVal ||
            !rfcVal ||
            !streetVal ||
            !coloniaVal ||
            !cityVal ||
            !pcVal ||
            !latVal ||
            !logVal
        ) {
            notification["error"]({ message: "Alguno campos son obligatorios" });
        } else {
            // eslint-disable-next-line no-const-assign
            const value = inputs;
            const objParams = {

                sesionId: "SES25270322201717",
                name: value.name,
                phoneNumber: value.phoneNumber,
                mail: value.mail,
                openingTime: value.openingTime,
                closingTime: value.closingTime,
                rfc: value.rfc,
                coordinates: "000000,000000",
                description: value.description,
                address: {
                    calle: value.calle,
                    postalCode: value.PostalCode,
                    latitude: value.latitud,
                    longitude: value.longitud,
                    phoneNumber: "0000000",
                    region: value.region,
                    city: value.city,
                    description: value.description,
                }
            };
            console.log("**LISTFORM", objParams)

            const results = await setCompanyAPi(objParams);

            console.log("TEST RESULTS AFTER AWAIT" + results);

            if (results.success === false) {
                notification["error"]({
                    message:
                        "Parece que hay problemas, el cliente no se agregó con éxito.",
                });
            } else {
                notification["success"]({
                    message: "El clientes se agregó exitosamente",
                });
                resetForm();
            }
        }
    };


    const resetForm = () => {
        const inputs = document.getElementsByTagName("input");

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }

        setInputs(companyForm);
        setFormValid(companyFormValid);
        changeDateRange(null);
        console.log("**",dateRange)
    };

    const onChangeTime = (dateRange, dateString) => {
        console.log(dateRange, dateString)
        if (dateRange) {
            changeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
            setInputs({
                ...inputs,
                openingTime: `${dateString[0]}`,
                closingTime: `${dateString[1]}`,
            });
        } else {
            changeDateRange([]);
        }
    }

    const returnMomentDateRange = (start, finish) => {
        return [moment(start, "YYYY-MM-DD"), moment(finish, "YYYY-MM-DD")];
    };

    //#endregion functions

    //#region return
    return (

        <Form onSubmit={register} onChange={changeForm} className="form-add-cli">
            <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                    <CaretRightOutlined
                        rotate={isActive ? 90 : 0}
                        style={{ color: "tomato" }}
                    />
                )}
            >
                <Panel header="Datos principales" key="1">
                    <Row gutter={[28, 0]}>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Nombre: <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="name"
                                    onChange={inputValidation}
                                    value={inputs.name}
                                    placeholder="Nombre"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Teléfono: <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    onChange={inputValidation}
                                    value={inputs.phoneNumber}
                                    placeholder="Teléfono"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>Correo electrónico: <span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="email"
                                    name="mail"
                                    onChange={inputValidation}
                                    value={inputs.mail}
                                    placeholder="Correo"
                                />

                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={[28, 0]}>
                        <Col flex={0}>
                            <Form.Item >
                                <p>
                                    Horario de apertura:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Space direction="vertical" size={5}>
                                    <TimePicker.RangePicker
                                        type="date"
                                        name="schedule"
                                        style={{ width: "100%" }}
                                        onChange={onChangeTime}
                                        format={format}
                                        allowClear
                                        value={dateRange !== "" ? dateRange : ""}
                                    />
                                </Space>
                            </Form.Item>
                        </Col>
                        <Col flex={0.2}>
                            <Form.Item>
                                <p>RFC: <span style={{ color: "tomato" }}>*</span> <span style={{ fontSize: "12px" }}>(XAXX010101000)</span></p>
                                <Input
                                    type="text"
                                    name="rfc"
                                    onChange={inputValidation}
                                    value={inputs.rfc}
                                    placeholder="RFC"
                                />
                            </Form.Item>
                        </Col>
                        {/* <Col flex={1}>
                            <Form.Item>
                                <p>
                                    Descripción:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="description"
                                    onChange={inputValidation}
                                    value={inputs.description}
                                    placeholder="Descripción"
                                />
                            </Form.Item>
                        </Col> */}
                    </Row>
                    {/**Fifth Row Responsive Form */}
                </Panel>
            </Collapse>

            <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                    <CaretRightOutlined
                        rotate={isActive ? 90 : 0}
                        style={{ color: "tomato" }}
                    />
                )}
                className="site-collapse-custom-collapse"
            >
                <Panel
                    header="Información de localización"
                    key="2"
                    className="site-collapse-custom-panel"
                >
                    <Row gutter={[28, 0]}>
                        <Col flex="auto">
                            <Form.Item>
                                <p>Calle: <span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="text"
                                    name="calle"
                                    onChange={inputValidation}
                                    value={inputs.calle}
                                    placeholder="No. de calle o nombre"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>Colonia/Región: <span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="text"
                                    name="region"
                                    onChange={inputValidation}
                                    value={inputs.region}
                                    placeholder="Colonia o no. región"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Ciudad: <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="city"
                                    onChange={inputValidation}
                                    value={inputs.city}
                                    placeholder="Ciudad"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[28, 0]}>
                        <Col flex={0.33}>
                            <Form.Item>
                                <p>Código postal:<span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="text"
                                    name="PostalCode"
                                    onChange={inputValidation}
                                    value={inputs.PostalCode}
                                    placeholder="Código postal"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.33}>
                            <Form.Item>
                                <p>Longitud: <span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="text"
                                    name="longitud"
                                    onChange={inputValidation}
                                    value={inputs.longitud}
                                    placeholder="Longitud"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.33}>
                            <Form.Item>
                                <p>Latitud: <span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="text"
                                    name="latitud"
                                    onChange={inputValidation}
                                    value={inputs.latitud}
                                    placeholder="Latitud"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
            {/**Second Collapse */}
            <Collapse
                bordered={false}
                defaultActiveKey={["1"]}
                expandIcon={({ isActive }) => (
                    <CaretRightOutlined
                        rotate={isActive ? 90 : 0}
                        style={{ color: "tomato" }}
                    />
                )}
                className="site-collapse-custom-collapse"
            >
                <Panel
                    header="Información Adicional"
                    key="2"
                    className="site-collapse-custom-panel"
                >
                    {/**FORMULARIO 2!!! */}
                    {/**Sixth Row Responsive Form */}
                    <Row>
                        <Col flex="auto">
                            <Form.Item>
                                <p>Descripción:</p>
                                <Input
                                    type="text"
                                    name="description"
                                    onChange={inputValidation}
                                    value={inputs.description}
                                    placeholder="Información relevante"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/**Seventh Row Responsive Form */}
                </Panel>
            </Collapse>
            {/**Third Collapse */}

            <Space
                direction="horizontal"
                style={{ width: "100%", justifyContent: "center" }}
            >
                <Form.Item className="form-add-cli__item-btn">
                    <Button
                        htmlType="submit"
                        type="primary"
                        onClick={register}
                        icon={<PlusCircleOutlined />}
                    >
                        {titles.addNameBtn}
                    </Button>
                </Form.Item>
            </Space>
        </Form>
    );
    //#endregion return
}
