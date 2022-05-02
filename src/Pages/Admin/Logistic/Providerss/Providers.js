import React, { useState, useEffect } from "react";
import { Button, notification, Row, Col } from "antd";
import { getProvidersApiList } from "../../../../Api/Providers";
import TableFinder from '../../../../Components/TableFinder';
import DetailsProvider from '../../../../Components/DetailsList/DetailsProvider';
import Modal from '../../../../Components/Modal';
import ModalForm from '../../../../Components/ModalForm';
import ButtonAdd from "../../../../Components/ButtonAdd/ButtonAdd";
import FormAddProvider from "../../../../Components/FormAdd/FormAddProvider";
import { providerParams, providerHeaders } from '../../../../Constants/ObjsProvider';


export default function Purchase() {
    //#region constants
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [visibleModalForm, setVisibleModalForm] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalContentForm, setModalContentForm] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [dataList, setDataList] = useState();
    const [valuesAuth] = useState(false);
    const [values, setValues] = useState(providerParams);

    const titles = {
        maintitle: "Proveedores",
        modaltitle: "Información del proveedor",
        addNameBtn: "Agregar proveedor",
        addNewClient: "Agregar nuevo proveedor",
    }

    const placeholder = {
        name: "Nombre del proveedor",
        key: "RFC del proveedor",
        status: "Seleccione un estatus"
    }

    const columns = [
        { title: 'Clave RFC', dataIndex: "rfc", key: 'id', fixed: 'left', width: '10%' },
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        //{ title: 'RFC', dataIndex: 'rfc', key: 'rfc'},
        { title: 'Teléfono', dataIndex: 'phoneNumber', key: 'phoneNumber', width: '10%'},
        { title: 'Sociedad Mercantil', dataIndex: 'businessName', key: 'businessName' },
        { title: 'Descripción', dataIndex: 'description', key: 'description' },
        { title: 'Más', key: 'operation', fixed: 'right', render: key => <Button type="link" onClick={() => modalInfo(key)}> Detalles </Button>, width: '8%' },
    ];
    //#endregion constants

    //#region functions

    const updateData = async e => {
        //e.preventDefault();
        const result = await getProvidersApiList(providerHeaders);
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

            const { providerList } = result;
            console.log("** ProdLst", providerList);

            // eslint-disable-next-line no-new-object
            let dataVal = new Object();
            let res = [];
            providerList.forEach(function (value) {
                dataVal = {
                    key: value.id,
                    name: value.name,
                    status: value.status,
                    phoneNumber: value.phoneNumber,
                    stock: value.stock,
                    businessName: value.businessName,
                    category: value.category,
                    rfc: value.rfc,
                    address: `${value.address.city}, Reg.${value.address.region}, C.P. ${value.address.postalCode}` ,
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
            setModalContent(<DetailsProvider values={res} />)
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
        setModalContentForm(<FormAddProvider values={values} changeForm={changeForm} titles={titles} />);
    }

    const onFinish = (values) => {
        console.log(values)
        const dataLst = dataList;
        console.log(dataLst)

        if (values.clientName && values.clientCode) {
            const resSearch = dataLst.filter((e) => e.name === values.clientName && e.rfc === values.clientCode)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setDataList(resSearch);
            } else {
                notification["error"]({
                    message: "Los datos buscado no coinciden, verifique o intente nuevamente."
                });
            }

        } else if (values.clientName) {
            const resSearch = dataLst.filter((e) => e.name === values.clientName)
                console.log("TEST ONFINISH", resSearch);

                if (resSearch.length > 0) {
                    setDataList(resSearch);
                } else {
                    notification["info"]({
                        message: "No se encontró el nombre, intente con otro dato diferente."
                    });
                }
        } else if (values.clientCode) {
            const resSearch = dataLst.filter((el) => el.rfc === values.clientCode)
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