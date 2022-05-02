import React, { useState, useEffect } from "react";
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
    TimePicker
} from "antd";
import moment from "moment";
import { CaretRightOutlined } from "@ant-design/icons";
import { emailValidation } from "../../Utils/formValidation";
import { setHumanResAPi } from "../../Api/HumanRes";
import { PlusCircleOutlined } from "@ant-design/icons";
import { employeeForm, employeeFormValid } from '../../Constants/ObjEmployee';
import "./FormAdd.scss";

export default function FormAddEmployee(props) {

    //#region constants
    const { Panel } = Collapse;
    const [form] = Form.useForm();
    const { titles, dataListB } = props;
    const [dataList, setDataList] = useState([]);
    const [inputs, setInputs] = useState(employeeForm);
    const genders = ["Hombre", "Mujer", "Otro"];
    const maritalOps = ["Soltero", "Casado", "Divorciado", "Viudo", "Concubinato", "Otro"];
    const [formValid, setFormValid] = useState(employeeFormValid);
    const [valuesAuth] = useState(false);
    const [dateRange, changeDateRange] = useState(null);
    const format = 'HH:mm:ss';


    //#endregion constants

    //#region functions
    function validList() {
        if (dataListB.length > 0) {
            setDataList(dataListB);
        }
    }

    useEffect(() => {
        validList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valuesAuth]);

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
        e.preventDefault();
        //console.log("TEST BUTON REGISTER AS PROPS");
        console.log(inputs);

        const nameVal = inputs.fullName;
        const genderVal = inputs.gender;
        const maritalVal = inputs.marital;
        const RFCVal = inputs.rfc;
        const NSSVal = inputs.nss;
        const BNVal = inputs.businessName;
        const BirthVal = inputs.birthday;
        const idStoreVal = inputs.storeId;

        const phoneVal = inputs.mobilePhone;
        const addressVal = inputs.addressCompany;

        if (
            !nameVal ||
            !genderVal ||
            !maritalVal ||
            !RFCVal ||
            !NSSVal ||
            !BNVal ||
            !BirthVal ||
            !idStoreVal ||
            !phoneVal ||
            !addressVal
        ) {
            notification["error"]({ message: "Alguno campos son obligatorios" });
        } else {

            const results = await setHumanResAPi(inputs);

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
        //document.getElementById("Form").reset();
        form.setFieldsValue({
            Metric: undefined
        })

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }

        setInputs(employeeForm);
        setFormValid(employeeFormValid);
        changeDateRange(null);
        console.log("**",dateRange)
    };

    function getGenderVal(value) {
        //e.preventDefault();

        if (value === "Hombre") {
            value = "H";

        } else if (value === "Mujer") {
            value = "M";
        } else if (value === "Otro") {
            value = "O";
        } else {
            value = "";
        }

        setInputs({
            ...inputs,
            gender: `${value}`,
        });

        //console.log("TEST SET VALUE GENDER: " + value);
    }

    function getInputVal(value) {
        //e.preventDefault();
        const val = value;
        const kVal = value;

        if (val) {
            value = kVal;
        } else {
            value = "";
        }

        setInputs({
            ...inputs,
            marital: `${value}`,
        });

        //console.log("TEST SET VALUE: " + value);
    }

    function onChangeDate(date, dateString) {
        //console.log('Selected Time: ', date);
        //console.log('Formatted Selected Time: ', dateString)

        setInputs({
            ...inputs,
            birthday: `${dateString}`,
        });
        //console.log(dateString);
    }

    const onChangeTime = (dateRange, dateString) => {
        console.log(dateRange, dateString)
        if (dateRange) {
            changeDateRange(returnMomentDateRange(dateRange[0], dateRange[1]));
            setInputs({
                ...inputs,
                lastCheckIn: `${dateString[0]}`,
                lastCheckOut: `${dateString[1]}`,
            });
        } else {
            changeDateRange([]);
        }
    }

    const returnMomentDateRange = (start, finish) => {
        return [moment(start, "YYYY-MM-DD"), moment(finish, "YYYY-MM-DD")];
    };

    //console.log("***CL form", dataListB);

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function onChangeCompany(value, key) {
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
            storeId: num,
        });

    }
    //#endregion functions

    //#region return
    return (
        <Form id="Form" onSubmit={register} onChange={changeForm} className="form-add-cli">
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
                                    name="fullName"
                                    onChange={inputValidation}
                                    value={inputs.fullName}
                                    placeholder="Nombre completo"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Estado civil:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Select
                                    name="marital"
                                    onChange={getInputVal}
                                    value={inputs.marital}
                                    placeholder="Género"
                                    allowClear
                                >
                                    {maritalOps.map((marital, index) => {
                                        return (
                                            <Select.Option key={index} value={marital}>
                                                {marital}
                                            </Select.Option>
                                        );
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
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

                    <Row gutter={[28, 0]}>
                        <Col flex={0.5}>
                            <Form.Item>
                                <p>Dirección: <span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="text"
                                    name="addressCompany"
                                    onChange={inputValidation}
                                    value={inputs.addressCompany}
                                    placeholder="Dirección"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.3}>
                            <Form.Item>
                                <p>
                                    Teléfono:
                                    <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="mobilePhone"
                                    onChange={inputValidation}
                                    value={inputs.mobilePhone}
                                    placeholder="Tipo de cliente"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.3}>
                            <Form.Item >
                                <p>
                                    Fecha de nacimiento:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <DatePicker
                                    type="date"
                                    name="birthday"
                                    style={{ width: "100%" }}
                                    onChange={onChangeDate}
                                    allowClear
                                    value={inputs.birthday !== "" ? moment(inputs.birthday) : null}
                                />
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
                                <p>RFC: <span style={{ color: "tomato" }}>*</span> <span style={{ fontSize: "12px" }}>(XAXX010101000)</span></p>
                                <Input
                                    type="text"
                                    name="rfc"
                                    onChange={inputValidation}
                                    value={inputs.rfc}
                                    placeholder="Clave RFC"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>No. Seguro social: <span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="text"
                                    name="nss"
                                    onChange={inputValidation}
                                    value={inputs.nss}
                                    placeholder="Número seguro social"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>Profesión: <span style={{ color: "tomato" }}>*</span></p>
                                <Input
                                    type="text"
                                    name="businessName"
                                    onChange={inputValidation}
                                    value={inputs.businessName}
                                    placeholder="Profesión"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[28, 0]}>
                        <Col flex={0.3}>
                            <Form.Item>
                                <p>
                                    Correo electrónico:<span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="workEmail"
                                    onChange={inputValidation}
                                    value={inputs.workEmail}
                                    placeholder="Correo del trabajo"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.3}>
                            <Form.Item>
                                <p>
                                    Contacto de emergencia:
                                </p>
                                <Input
                                    type="text"
                                    name="emergencyContact"
                                    onChange={inputValidation}
                                    value={inputs.emergencyContact}
                                    placeholder="Contacto de emergencia"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.3}>
                            <Form.Item>
                                <p>
                                    Sucursal: <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Select
                                    name="storeId"
                                    onChange={onChangeCompany}
                                    allowClear
                                    value={inputs.storeId}
                                    placeholder="Sucursal"
                                >
                                    {dataList.map((name, index) => {
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
                    <Row gutter={[28, 0]}>
                        <Col flex={0.3}>
                            <Form.Item>
                                <p>Nombre de área:</p>
                                <Input
                                    type="text"
                                    name="jobTitle"
                                    onChange={inputValidation}
                                    value={inputs.jobTitle}
                                    placeholder="Nombre de puesto"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex={0.3}>
                            <Form.Item >
                                <p>
                                    Horario laboral:
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
                        <Col flex={0.3}>
                            <Form.Item >
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
