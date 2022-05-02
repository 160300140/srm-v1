import React, { useState, useEffect } from "react";
import { Button, notification, Row, Col } from "antd";
import { getPurchaseApiList } from "../../../../Api/Purchase";
import TableFinder from '../../../../Components/TableFinder';
import DetailsPurchase from '../../../../Components/DetailsList/DetailsPurchase';
import Modal from '../../../../Components/Modal';
import ModalForm from '../../../../Components/ModalForm';
import ButtonAdd from "../../../../Components/ButtonAdd/ButtonAdd";
import FormAddPurchase from "../../../../Components/FormAdd/FormAddPurchase";
import { purchaseParams, purchaseHeaders } from '../../../../Constants/ObjsPurchase';
import { getCompanyApiList } from "../../../../Api/Company";
import { companyHeaders } from "../../../../Constants/ObjsCompany"
import { getProvidersApiList } from "../../../../Api/Providers";
import { providerHeaders } from "../../../../Constants/ObjsProvider";
import "./Purchase.scss";

export default function Purchase() {
    //#region constants
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [visibleModalForm, setVisibleModalForm] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalContentForm, setModalContentForm] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [productList, setProductList] = useState();
    const [valuesAuth] = useState(false);
    const [values, setValues] = useState(purchaseParams);
    const [dataListB, setDataListB] = useState({});
    const [dataListC, setDataListC] = useState({});
    const titles = {
        maintitle: "Compras",
        modaltitle: "Información del producto",
        addNameBtn: "Agregar producto",
        addNewClient: "Agregar nuevo producto",
    }

    const placeholder = {
        name: "Nombre del producto",
        key: "Clave del producto",
        status: "Seleccione un estatus"
    }

    const columns = [
        { title: 'Clave', dataIndex: "key", key: 'key', fixed: 'left', width: '10%' },
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        { title: 'Precio', dataIndex: 'price', key: 'price', width: '10%' },
        /*TO DO:  */
        { title: 'Piezas', dataIndex: 'stock', key: 'stock', width: '8%' },
        { title: 'Tipo', dataIndex: 'type', key: 'type' },
        { title: 'Descripción', dataIndex: 'description', key: 'description' },
        { title: 'Más', key: 'operation', fixed: 'right', render: key => <Button type="link" onClick={() => modalInfo(key)}> Detalles </Button>, width: '8%' },
    ];
    //#endregion constants

    //#region functions

    const updateData = async e => {
        //e.preventDefault();
        const result = await getPurchaseApiList(purchaseHeaders);
        console.log(result);

        if (result === "Failed to fetch") {
            notification["error"]({
                message: "No se obtuvo respuesta del servidor."
            });

        } else {
            console.log(result);
            notification["success"]({
                message: "Datos actualizados exitosamente."
            });

            const { productList } = result;
            console.log("** ProdLst", productList);

            // eslint-disable-next-line no-new-object
            let dataVal = new Object();
            let res = [];
            productList.forEach(function (product) {
                dataVal = {
                    sesionId: '',
                    key: product.key,
                    name: product.name,
                    price: product.price,
                    model: product.model,
                    stock: product.stock,
                    type: product.type,
                    QRCode: product.qrcode,
                    discountPercent: product.discountPercent,
                    expiryDate: product.expiryDate,
                    provider: product.provider.name,
                    description: product.description,
                    image: product.image.url,
                };
                res.push(dataVal);

            });
            setProductList(res);
            //console.log(res);
        }
    }

    const getDataB = async e => {
        //e.preventDefault();
        const result = await getCompanyApiList(companyHeaders);
        //console.log(result);

        if (result !== "Failed to fetch") {
            /* notification["error"]({
            message: "No se obtuvo respuesta del servidor."
            });
        } else  {*/
            const { storeList } = result;
            var reformattedArray = storeList.map(function (obj) {
                var rObj = {};
                rObj[obj.id] = obj.name;
                return rObj;
            });

            const res = Object.assign([], ...reformattedArray)

            setDataListB(res);
        }
    }

    const getDataC = async e => {
        //e.preventDefault();
        const result = await getProvidersApiList(providerHeaders);

        if (result !== "Failed to fetch") {
            const { providerList } = result;
            var reformattedArray = providerList.map(function (obj) {
                var rObj = {};
                rObj[obj.id] = obj.name;
                return rObj;
            });
            const res = Object.assign([], ...reformattedArray)
            setDataListC(res);
        }
    }

    useEffect(() => {
        updateData();
        getDataB();
        getDataC();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valuesAuth]);


    const changeForm = (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    };

    const modalInfo = (key) => {
        setIsVisibleModal(true);
        setModalTitle(titles.modaltitle);
        const res = key;

        if (res) {
            setModalContent(<DetailsPurchase values={res} />)
        } else {
            notification["error"]({
                message: "El id de usuario no coincide con el buscado"
            });
        }
    }

    const openAddTo = (e) => {
        e.preventDefault();
        setVisibleModalForm(true);
        setModalTitle(titles.addNewClient);
        setModalContentForm(<FormAddPurchase values={values} changeForm={changeForm} titles={titles} dataListB={dataListB} dataListC={dataListC} />);
    }

    const onFinish = (values) => {
        console.log(values)
        const productLst = productList;

        if (values.clientName && values.clientCode) {

            const resSearch = productLst.filter((e) => e.name === values.clientName && e.key === values.clientCode)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setProductList(resSearch);
            } else {
                notification["error"]({
                    message: "Los datos buscado no coinciden, verifique o intente nuevamente."
                });
            }

        } else if (values.clientName) {
            const resSearch = productLst.filter((e) => e.name === values.clientName)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setProductList(resSearch);
            } else {
                notification["info"]({
                    message: "No se encontró el nombre, intente con otro dato diferente."
                });
            }
        } else if (values.clientCode) {
            const resSearch = productLst.filter((el) => el.key === values.clientCode)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setProductList(resSearch);
            } else {
                notification["info"]({
                    message: "No se encontró la clave, intente con otro dato diferente."
                });
            }
        } else {
            notification["info"]({
                message: "Ingresa el dato a buscar"
            });
        }

        return values;
    };
    //#endregion functions

    //#region return
    return (
        <div >
            <TableFinder titleInfo={titles.maintitle} columns={columns} dataList={productList} dataPlaceholder={placeholder} pagination={{ pageSize: 10 }} scroll={{ x: "max-content" }} updateData={updateData} onFinish={onFinish} />
            <Modal title={modalTitle} isVisible={isVisibleModal} setIsVisible={setIsVisibleModal} >
                {modalContent}
            </Modal>
            <Row>
                <Col flex="auto">
                </Col>
                <Col flex="100px">
                    <ButtonAdd openAddTo={openAddTo}>
                        {titles.addNameBtn}
                    </ButtonAdd>
                </Col>
            </Row>
            <ModalForm title={modalTitle} visibleModalForm={visibleModalForm} setVisibleModalForm={setVisibleModalForm} >
                {modalContentForm}
            </ModalForm>
        </div>
    );
    //#endregion return
}