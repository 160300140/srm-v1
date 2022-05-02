import React, { useState, useEffect } from "react";
import { Button, notification, Row, Col } from "antd";
import { getSaleApiList } from "../../../../Api/Sale";
import TableFinder from '../../../../Components/TableFinder';
import DetailsSale from '../../../../Components/DetailsList/DetailsSale';
import Modal from '../../../../Components/Modal';
import ModalForm from '../../../../Components/ModalForm';
import ButtonAdd from "../../../../Components/ButtonAdd/ButtonAdd";
import FormAddSale from "../../../../Components/FormAdd/FormAddSale";
import { saleParams, saleHeaders } from '../../../../Constants/ObjsSale';
import { getCompanyApiList } from "../../../../Api/Company";
import { companyHeaders } from "../../../../Constants/ObjsCompany"
import { getHumanResApiList } from "../../../../Api/HumanRes";
import { employeeHeaders } from "../../../../Constants/ObjEmployee";
import { getPurchaseApiList } from "../../../../Api/Purchase";
import { purchaseHeaders } from "../../../../Constants/ObjsPurchase";
import { getCustomerApiLst } from "../../../../Api/Customer";
import { clientHeaders } from "../../../../Constants/ObjsClient";

export default function Sale() {
    //#region constants
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [visibleModalForm, setVisibleModalForm] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalContentForm, setModalContentForm] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [dataList, setDataList] = useState();
    const [valuesAuth] = useState(false);
    const [values, setValues] = useState(saleParams);
    const [dataListB, setDataListB] = useState({});
    const [dataListC, setDataListC] = useState({});
    const [dataListD, setDataListD] = useState({});

    const titles = {
        maintitle: "Ventas",
        modaltitle: "Información de la venta",
        addNameBtn: "Agregar venta",
        addNewClient: "Agregar nueva venta",
    }

    const placeholder = {
        name: "Nombre del cliente",
        key: "Clave de venta",
        status: "Seleccione un estatus"
    }

    const columns = [
        { title: 'Clave', dataIndex: "key", key: 'key', fixed: 'left', width: '10%' },
        { title: 'Cliente', dataIndex: 'customer', key: 'customer' },
        { title: 'Vendedor', dataIndex: 'user', key: 'user' },
        { title: 'Monto', dataIndex: 'discountAmount', key: 'discountAmount', width: '12%'},
        { title: 'Descripción', dataIndex: 'description', key: 'description' },
        { title: 'Más', key: 'operation', fixed: 'right', render: key => <Button type="link" onClick={() => modalInfo(key)}> Detalles </Button>, width: '8%' },
    ];
    //#endregion constants

    //#region functions

    const updateData = async e => {
        //e.preventDefault();
        const result = await getSaleApiList(saleHeaders);
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

            const { saleList } = result;
            console.log("** ProdLst", saleList);

            // eslint-disable-next-line no-new-object
            let dataVal = new Object();
            let res = [];
            saleList.forEach(function (value) {
                dataVal = {
                    key: value.key,
                    customer: `${value.customer.name} ${value.customer.lastName} ${value.customer.surName}`,
                    user: value.user.name,
                    discountAmount: `${value.discountAmount}${value.currency.symbol}` ,
                    description: value.description,
                };
                res.push(dataVal);

            });
            setDataList(res);
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
        const result = await getHumanResApiList(employeeHeaders);

        if (result !== "Failed to fetch") {
            const { employeeList } = result;
            var reformattedArray = employeeList.map(function (obj) {
                var rObj = {};
                rObj[obj.id] = obj.name;
                return rObj;
            });
            const res = Object.assign([], ...reformattedArray)
            setDataListC(res);
        }
    }

    const getDataD = async e => {
        //e.preventDefault();
        const result = await getPurchaseApiList(purchaseHeaders);

        if (result !== "Failed to fetch") {
            const { productList } = result;
            var reformattedArray = productList.map(function (obj) {
                var rObj = {};
                rObj[obj.id] = obj.name;
                return rObj;
            });
            const res = Object.assign([], ...reformattedArray)
            setDataListD(res);
        }
    }

    const getDataE = async e => {
        //e.preventDefault();
        const result = await getCustomerApiLst(clientHeaders);

        if (result !== "Failed to fetch") {
            const { customerList } = result;
            var reformattedArray = customerList.map(function (obj) {
                var rObj = {};
                rObj[obj.id] = obj.name;
                return rObj;
            });
            const res = Object.assign([], ...reformattedArray)
            setDataListD(res);
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
            setModalContent(<DetailsSale values={res} />)
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
        setModalContentForm(<FormAddSale values={values} changeForm={changeForm} titles={titles} dataListB={dataListB} dataListC={dataListC} getDataD={getDataD}/>);
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
}