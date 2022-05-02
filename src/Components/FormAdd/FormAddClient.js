import React, { useState } from "react";
import {
    Form,
    Input,
    Row,
    Col,
    Space,
    Collapse,
    Select,
    DatePicker,
    notification,
    Button,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import { emailValidation } from "../../Utils/formValidation";
import { setCustomerApi } from "../../Api/Customer";
import { UserAddOutlined } from "@ant-design/icons";
import { clientParams, clientFormValid } from '../../Constants/ObjsClient';
import "./FormAdd.scss";

export default function FormAddClient(props) {

    //#region constants
    const { Panel } = Collapse;
    const { titles } = props;
    const genders = ["Hombre", "Mujer", "Otro"];
    const [inputs, setInputs] = useState(clientParams);

    const [formValid, setFormValid] = useState(clientFormValid);
    //#endregion constants

    //#region functions
    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });

        //console.log("TEST TARGET:" + e.target.name);
        //console.log("Test gender input" + inputs.gender);
    };

    const inputValidation = (e) => {
        const { type, name } = e.target;

        if (type === "email") {
            setFormValid({ ...formValid, [name]: emailValidation(e.target) });
        }
    };

    const register = async (e) => {
        e.preventDefault();
        console.log("TEST BUTON REGISTER AS PROPS");
        console.log(inputs);

        //const sesionIdVal = inputs.sesionId;
        const nameVal = inputs.name;
        const lastNameVal = inputs.lastName;
        //const surNameVal = inputs.surName;
        const typeVal = inputs.type;
        const dateBirthVal = inputs.dateBirth;
        const genderVal = inputs.gender;
        //const rfcVal = inputs.rfc;
        //const businessNameVal = inputs.businessName;
        //const professionVal = inputs.profession;
        const phoneNumberVal = inputs.phoneNumber;
        //const mailVal = inputs.mail;
        //const descriptionVal = inputs.description;

        if (
            !nameVal ||
            !lastNameVal ||
            //!surNameVal ||
            !typeVal ||
            !dateBirthVal ||
            !genderVal ||
            //!rfcVal //
            //!businessNameVal ||
            //!professionVal ||
            !phoneNumberVal
            //!mailVal
            //!descriptionVal 
        ) {
            notification["error"]({ message: "Alguno campos son obligatorios" });
        } else {
            console.log("TEST RESULTS AFTER AWAIT" + inputs);

            const results = await setCustomerApi(inputs);

            console.log("TEST RESULTS AFTER AWAIT" + results);

            if (!results === "") {
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

        setInputs(clientParams);

        setFormValid(clientFormValid);
    };

    function getGenderVal(value) {
        //e.preventDefault();

        if (value === "Hombre") {
            value = "H";
        } else if (value === "Mujer") {
            value = "M";
        } else if (value === "Otro") {
            value = "O";
        }else {
            value = "";
        }

        console.log("TEST SET VALUE GENDER: " + value);
        setInputs({
            ...inputs,
            gender: `${value}`,
        });

        console.log("TEST SET VALUE GENDER: " + value);
    }

    function onChangeDate(date, dateString) {
        console.log('Selected Time: ', date);
        console.log('Formatted Selected Time: ', dateString)
        setInputs({
            ...inputs,
            dateBirth: `${dateString}`,
        });
        console.log(dateString);
    }

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
                <Panel header="Datos personales" key="1">
                    <Row gutter={[28, 0]}>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Nombre(s): <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
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
                                    Apellido paterno:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="lastName"
                                    onChange={inputValidation}
                                    value={inputs.lastName}
                                    placeholder="Apellido"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>Apellido materno:</p>
                                <Input
                                    type="text"
                                    name="surName"
                                    onChange={inputValidation}
                                    value={inputs.surName}
                                    placeholder="Apellido"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[28, 0]}>
                        <Col flex={0.18}>
                            <Form.Item>
                                <p>
                                    Tipo:(Temporal, cliente, eventual)
                                    <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="type"
                                    onChange={inputValidation}
                                    value={inputs.type}
                                    placeholder="Tipo de cliente"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.5}>
                            <Form.Item >
                                <p>
                                    Fecha de nacimiento:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <DatePicker
                                    type="date"
                                    name="dateBirth"
                                    style={{ width: "100%" }}
                                    onChange={onChangeDate}
                                    allowClear
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={1}>
                            <Form.Item>
                                <p>
                                    Género:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Select
                                    name="gender"
                                    onChange={getGenderVal}
                                    allowClear
                                    value={inputs.gender}
                                    placeholder="Género"
                                >
                                    {genders.map((gender, index) => {
                                        return (
                                            <Select.Option key={index} value={gender}>
                                                {gender}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
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
                    header="Información empresarial"
                    key="2"
                    className="site-collapse-custom-panel"
                >
                    <Row gutter={[28, 0]}>
                        <Col flex="auto">
                            <Form.Item>
                                <p>RFC: <span style={{fontSize: "12px"}}>(XAXX010101000)</span></p>
                                <Input
                                    type="text"
                                    name="rfc"
                                    onChange={inputValidation}
                                    value={inputs.rfc}
                                    placeholder="RFC"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>Nombre del negocio/empresa:</p>
                                <Input
                                    type="text"
                                    name="businessName"
                                    onChange={inputValidation}
                                    value={inputs.businessName}
                                    placeholder="Negocio"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Teléfono:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="phoneNumber"
                                    onChange={inputValidation}
                                    value={inputs.phoneNumber}
                                    placeholder="No. Telefónico"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[28, 0]}>
                        <Col flex={0.4}>
                            <Form.Item>
                                <p>Correo electrónico:<span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="email"
                                    name="mail"
                                    onChange={inputValidation}
                                    value={inputs.mail}
                                    placeholder="Correo"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.6}>
                            <Form.Item>
                                <p>Dirección:</p>
                                <Input
                                    type="text"
                                    name="addressCompany"
                                    onChange={inputValidation}
                                    value={inputs.addressCompany}
                                    placeholder="Dirección"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.5}>
                            <Form.Item>
                                <p>Profesión:</p>
                                <Input
                                    type="text"
                                    name="profession"
                                    onChange={inputValidation}
                                    value={inputs.profession}
                                    placeholder="Profesión"
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
                        icon={<UserAddOutlined />}
                    >
                        {titles.addNameBtn}
                    </Button>
                </Form.Item>
            </Space>
        </Form>
    );
    //#endregion return
}
