import React, { useState, useEffect } from "react";
import { Button, notification, Row, Col } from "antd";
import { getQuotationApiList } from "../../../../Api/Sale";
import TableFinder from '../../../../Components/TableFinder';
import DetailsQuotation from '../../../../Components/DetailsList/DetailsQuotation';
import Modal from '../../../../Components/Modal';
import ModalForm from '../../../../Components/ModalForm';
import ButtonAdd from "../../../../Components/ButtonAdd/ButtonAdd";
import FormAddQuoted from "../../../../Components/FormAdd/FormAddQuoted";
import { quotationParams, quotationHeaders } from '../../../../Constants/ObjsQuotation';

export default function Quotation() {
    //#region constants
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [visibleModalForm, setVisibleModalForm] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalContentForm, setModalContentForm] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [productList, setProductList] = useState();
    const [valuesAuth] = useState(false);
    const [values, setValues] = useState(quotationParams);

    const titles = {
        maintitle: "Cotización",
        modaltitle: "Información de la cotización",
        addNameBtn: "Agregar cotización",
        addNewClient: "Agregar nueva cotización",
    }

    const placeholder = {
        name: "Nombre del cliente",
        key: "Clave de la cotización",
        status: "Seleccione un estatus",
    }

    const columns = [
        { title: 'Clave', dataIndex: "key", key: 'key', fixed: 'left', width: '10%' },
        { title: 'Vendedor', dataIndex: 'vendedor', key: 'vendedor' },
        { title: 'Cliente', dataIndex: 'customer', key: 'customer' },
        { title: 'Monto total', dataIndex: 'total', key: 'total', width: '10%' },
        { title: 'Fecha creación', dataIndex: 'createDate', key: 'createDate' },
        { title: 'Descripción', dataIndex: 'description', key: 'description' },
        { title: 'Tienda', dataIndex: 'store', key: 'store' },
        { title: 'Más', key: 'operation', fixed: 'right', render: key => <Button type="link" onClick={() => modalInfo(key)}> Detalles </Button>, width: '8%' },
    ];
    //#endregion constants

    //#region functions
    const updateData = async e => {
        //e.preventDefault();
        const result = await getQuotationApiList(quotationHeaders);
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

            const { quotationList } = result;
            console.log("** ProdLst", quotationList);

            // eslint-disable-next-line no-new-object
            let dataVal = new Object();
            let res = [];
            
            quotationList.forEach(function (value) {
                dataVal = {
                    key: value.key,
                    customer: `${value.customer.name} ${value.customer.lastName} ${value.customer.surName}`,
                    type: value.type,
                    status: value.status,
                    discountAmount: `${value.discountAmount} MXN`,
                    total: `${value.total} MXN` ,
                    vendedor: value.user.name,
                    description: value.description,
                    createDate: value.createDate,
                    updateDate: value.updateDate,
                    store: value.store.name,
                    storeNumber: value.store.storeNumber,
                };
                res.push(dataVal);

            }); 
            setProductList(res);
            //console.log(res);
        }
    }

    useEffect(() => {
        updateData();
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
            setModalContent(<DetailsQuotation values={res} />)
        } else {
            notification["error"]({
                message: "El id de usuario no coincide con el buscado"
            });
        }
    }

    const openAddTo = (e) => {
        e.preventDefault();
        setVisibleModalForm(true);
        //setModalTitle(titles.addNewClient);
        setModalContentForm(<FormAddQuoted />);
    }

    const onFinish = (values) => {
        console.log(values)
        const productLst = productList;

        if (values.clientName && values.clientCode) {

            const resSearch = productLst.filter((e) => e.customer === values.clientName && e.key === values.clientCode)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setProductList(resSearch);
            } else {
                notification["error"]({
                    message: "Los datos buscado no coinciden, verifique o intente nuevamente."
                });
            }

        } else if (values.clientName) {
            const resSearch = productLst.filter((e) => e.customer === values.clientName)
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



/* export default function Quotation() {
    //#region constants
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [visibleModalForm, setVisibleModalForm] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalContentForm, setModalContentForm] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [dataList, setDataList] = useState();
    const [valuesAuth] = useState(false);
    const [values, setValues] = useState({

        id: 0,
        key: '',
        type: '',
        status: '',
        total: 0,
        discountAmount: 0,
        description: '',
        store: {
            id: 0,
            name: '',
            storeNumber: ''
        },
        customer: {
            id: 0,
            name: '',
            lastName: '',
            surName: '',
            customerNumber: '',
        },
        user: {
            id: 0,
            name: '',
        },
        productList: [
            {
                createDate: '',
                updateDate: '',
                createId: 0,
                id: 0,
                productQuantity: '',
                totalAmount: 0,
                discountTotal: 0,
                productKey: '',
                productName: '',
                productModel: '',
                productType: '',
            },
            {
                createDate: '',
                updateDate: '',
                createId: 0,
                id: 0,
                productQuantity: '',
                totalAmount: 0,
                discountTotal: 0,
                productKey: '',
                productName: '',
                productModel: '',
                productType: ''
            },
            {
                createDate: '',
                updateDate: '',
                createId: 0,
                id: 0,
                productQuantity: '',
                totalAmount: 0,
                discountTotal: 0,
                productKey: '',
                productName: '',
                productModel: '',
                productType: '',
            }
        ] 
    });

    const [dataHeaders] = useState({
        quotationId: 0,
        key: "",
        status: "",
        dateType: "",
        startDate: "",
        finalDate: "",
        pagination: 0
    });

    const titles = {
        maintitle: "Cotizaciones",
        modaltitle: "Información de la cotización",
        addNameBtn: "Agregar cotización",
        addNewClient: "Agregar nueva cotización",
    }

    const placeholder = {
        name: "Nombre de la cotización",
        key: "Clave de la cotización",
        status: "Seleccione un estatus",
    }

    const columns = [
        { title: 'Clave', dataIndex: "key", key: 'key', fixed: 'left', width: '10%' },
        { title: 'Cliente', dataIndex: 'customer', key: 'customer' },
        { title: 'Monto total', dataIndex: 'total', key: 'total', width: '10%'},
        { title: 'Descripción', dataIndex: 'description', key: 'description' },
        { title: 'Vendedor', dataIndex: 'user', key: 'user' },
        { title: 'Más', key: 'operation', fixed: 'right', render: key => <Button type="link" onClick={() => modalInfo(key)}> Detalles </Button>, width: '8%' },
    ];
    //#endregion constants

    //#region functions

    const updateData = async e => {
        //e.preventDefault();
        const result = await getSaleApiList(dataHeaders);
        console.log(result);

        if (result == null) {
            notification["error"]({
                message: "No se obtuvo respuesta del servidor."
            });

        } else {
            console.log(result);
            notification["success"]({
                message: "Datos actualizados exitosamente."
            });

            const { saleList } = result;
            console.log("** ProdLst", saleList);

            // eslint-disable-next-line no-new-object
            let dataVal = new Object();
            let res = [];
            saleList.forEach(function (value) {
                dataVal = {
                    key: value.key,
                    customer: `${value.customer.name} ${value.address.lastName} ${value.address.surName}`,
                    total: value.total,
                    vendedor: value.user.name,
                    description: value.description,
                };
                res.push(dataVal);

            });
            setDataList(res);
            //console.log(res);
        }
    }

    useEffect(() => {
        updateData();
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
            setModalContent(<DetailsQuotation values={res} />)
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
        setModalContentForm(<FormAdd values={values} changeForm={changeForm} />);
    }

    const onFinish = (values) => {
        console.log(values)
        const dataLst = dataList;
        console.log(dataLst)

        if (values.clientName && values.clientCode) {
            const resSearch = dataLst.filter((e) => e.customer === values.clientName && e.key === values.clientCode)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setDataList(resSearch);
            } else {
                notification["error"]({
                    message: "Los datos buscado no coinciden, verifique o intente nuevamente."
                });
            }

        } else if (values.clientName) {
            const resSearch = dataLst.filter((e) => e.customer === values.clientName)
                console.log("TEST ONFINISH", resSearch);

                if (resSearch.length > 0) {
                    setDataList(resSearch);
                } else {
                    notification["info"]({
                        message: "No se encontró el nombre, intente con otro dato diferente."
                    });
                }
        } else if (values.clientCode) {
            const resSearch = dataLst.filter((el) => el.key === values.clientCode)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setDataList(resSearch);
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
            <TableFinder titleInfo={titles.maintitle} columns={columns} dataList={dataList} dataPlaceholder={placeholder} pagination={{ pageSize: 10 }} scroll={{ x: "max-content" }} updateData={updateData} onFinish={onFinish} />
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
} */