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
    Upload
} from "antd";
import moment from "moment";
import ImgCrop from 'antd-img-crop';
import { CaretRightOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { emailValidation } from "../../Utils/formValidation";
import { setPurchaseAPi } from "../../Api/Purchase";
import { paramsFormValid, purchaseParams } from '../../Constants/ObjsPurchase';
import "./FormAdd.scss";

export default function FormAddPurchase(props) {

    //#region constants
    const { Panel } = Collapse;
    const [form] = Form.useForm();
    const { titles, dataListB, dataListC } = props;
    const [dataList, setDataList] = useState([]);
    const [ListC, setListC] = useState([]);
    const [inputs, setInputs] = useState(purchaseParams);
    const [formValid, setFormValid] = useState(paramsFormValid);
    const [valuesAuth] = useState(false);
    const [imgData, setImgData] = useState({
        name: "null",
        url: "null",
        imageType: "jpg",
        description: "Sin imagen"
    });
    const format = 'HH:mm:ss';
    const [fileList, setFileList] = useState([]);


    //#endregion constants

    //#region functions
    function validList() {
        if (dataListB.length > 0) {
            setDataList(dataListB);
        }

        if (dataListC.length > 0) {
            setListC(dataListC);
        }
    }

    //console.log("***LCompany", dataListB);
    //console.log("***LProvider", dataListC);

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
        //imgValid();
        console.log(inputs);
        console.log(imgData);

        const nameVal = inputs.name;
        const priceVal = inputs.price;
        const stockVal = inputs.stock;
        const typeVal = inputs.type;
        const storeIdVal = inputs.storeId;
        const providerIdVal = inputs.providerId;
        //const imgNameVal = inputs.imgName;
        //const imgUrl = inputs.imgUrl;
        //const igmTypeVal = inputs.imgType;

        if (
            !nameVal ||
            !priceVal ||
            !stockVal ||
            !typeVal ||
            !storeIdVal ||
            !providerIdVal
            //!imgNameVal ||
            //!imgUrl ||
            //!igmTypeVal
        ) {
            notification["error"]({ message: "Alguno campos son obligatorios" });
        } else {

            const results = await setPurchaseAPi(inputs);

            //console.log("TEST RESULTS AFTER AWAIT" + results);

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
        const inputs = document.getElementsByTagName("inputs");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }

        form.resetFields()
        setInputs(purchaseParams);
        setFormValid(paramsFormValid);
    };


    function onChangeDate(date, dateString) {
        //console.log('Selected Time: ', date);
        //console.log('Formatted Selected Time: ', dateString)
        setInputs({
            ...inputs,
            expiryDate: `${dateString}`,
        });
        console.log(dateString);
    }

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

    function onChangeLstC(value, key) {
        const num = getKeyByValue(dataListC, value)
        const val = value;
        const kVal = value;

        if (val) {
            value = kVal;
        } else {
            value = '';
        }
        setInputs({
            ...inputs,
            providerId: num,
        });
    }

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        console.log("File img list", fileList)

        const cfileList = fileList;
        getImageList(cfileList);
    };

    function getImageList(cfileList) {
        console.log("***",cfileList);
        if (cfileList) {
            // eslint-disable-next-line no-new-object
            let img = new Object();
            let res = [];
            fileList.forEach(function (val) {
                img = {
                    //id: val.uid,
                    name: val.name,
                    url: val.thumbUrl,
                    imageType: val.type,
                    description: inputs.imgDescription
                };
                res.push(img);

            });
            setInputs({
                ...inputs,
                image: img,
            });
            setImgData(res);
            console.log("**IMG LIST", res);
        }
    }

    const onPreview = async file => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow.document.write(image.outerHTML);
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
                <Panel header="Datos del producto" key="1">
                    <Row gutter={[28, 0]}>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Nombre: <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    name="name"
                                    onChange={inputValidation}
                                    value={inputs.name}
                                    placeholder="Nombre completo"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Cantidad: <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    name="stock"
                                    onChange={inputValidation}
                                    value={inputs.stock}
                                    placeholder="Cantidad de artículos"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Precio unitario: <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    name="price"
                                    onChange={inputValidation}
                                    value={inputs.price}
                                    placeholder="Precio de producto"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[28, 0]}>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Tipo (producto/servicio/otro):
                                    <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Input
                                    type="text"
                                    name="type"
                                    onChange={inputValidation}
                                    value={inputs.type}
                                    placeholder="Tipo de producto"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Modelo:
                                </p>
                                <Input
                                    name="model"
                                    onChange={inputValidation}
                                    value={inputs.model}
                                    placeholder="Modelo"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Descuento:
                                </p>
                                <Input
                                    name="discountPercent"
                                    onChange={inputValidation}
                                    value={inputs.discountPercent}
                                    placeholder="Descuento aplicable"
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={[28, 0]}>
                        <Col flex="auto">
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
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Proveedor: <span style={{ color: "tomato" }}>*</span>
                                </p>
                                <Select
                                    name="providerId"
                                    onChange={onChangeLstC}
                                    allowClear
                                    value={inputs.providerId}
                                    placeholder="Proveedor"
                                >
                                    {ListC.map((name, index) => {
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
                            <Form.Item >
                                <p>
                                    Fecha expiración:
                                </p>
                                <DatePicker
                                    type="date"
                                    name="expiryDate"
                                    style={{ width: "100%" }}
                                    onChange={onChangeDate}
                                    allowClear
                                    value={inputs.expiryDate !== "" ? moment(inputs.expiryDate) : null}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    {/**Fifth Row Responsive Form */}
                    <Row gutter={[28, 0]}>
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
                    header="Información adicional"
                    key="2"
                    className="site-collapse-custom-panel"
                >

                    <Row gutter={[28, 0]}>
                        <Col flex={0.3}>
                            <br />
                            <p style={{ width: '13em' }}>Puede agregar una imagen del artículo.</p>

                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <p>
                                    Descripción <span style={{ color: "tomato" }}>*</span>:
                                </p>
                                <Input
                                    type="text"
                                    name="imgDescription"
                                    onChange={inputValidation}
                                    value={inputs.imgDescription}
                                    placeholder="Descripción de imagen"
                                />
                            </Form.Item>
                        </Col>
                        <Col flex="auto">
                            <Form.Item>
                                <ImgCrop rotate>
                                    <Upload
                                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                        listType="picture-card"
                                        fileList={fileList}
                                        onChange={onChange}
                                        onPreview={onPreview}
                                    >
                                        {fileList.length < 1 && '+ Upload'}
                                    </Upload>
                                </ImgCrop>
                            </Form.Item>
                        </Col>
                    </Row>
                </Panel>
            </Collapse>
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
