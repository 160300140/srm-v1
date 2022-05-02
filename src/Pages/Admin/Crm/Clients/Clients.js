import React, { useState, useEffect } from "react";
import { Button, notification, Row, Col } from "antd";
import { getCustomerApiLst } from "../../../../Api/Customer";
import TableFinder from '../../../../Components/TableFinder';
import DetailsClient from '../../../../Components/DetailsList/DetailsClient';
import Modal from '../../../../Components/Modal';
import ModalForm from '../../../../Components/ModalForm';
import ButtonAdd from "../../../../Components/ButtonAdd/ButtonAdd";
import FormAddClient from "../../../../Components/FormAdd/FormAddClient";
import {  clientParams, clientHeaders } from '../../../../Constants/ObjsClient'
import "./Clients.scss";
import { SearchOutlined } from "@ant-design/icons";


export default function Clients(props) {
    //#region constants
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [visibleModalForm, setVisibleModalForm] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalContentForm, setModalContentForm] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [clientList, setClientList] = useState();
    const [valuesAuth] = useState(false);
    const [values, setValues] = useState(clientParams);

    const titles = {
        maintitle: "Cliente",
        modaltitle: "Información de cliente",
        addNameBtn: "Agregar cliente",
        addNewClient: "Agregar nuevo cliente",
    }

    const placeholder = {
        name: "Nombre del cliente",
        key: "Clave del cliente",
        status: "Seleccione un estatus"
    }

    const columns = [
        { title: 'Clave', dataIndex: "customerNumer", key: 'id', fixed: 'left', width: '10%' },
        {
            title: 'Nombre', dataIndex: 'name', key: 'name', filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
                return (
                    <input
                        autoFocus
                        placeholder="Type text here"
                        value={selectedKeys[0] || ''}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onKeyPress={() => { confirm() }}
                        onBlur={() => { confirm() }}>
                    </input>
                )
            },
            filterIcon: () => { return <SearchOutlined /> },
            onFilter: (value, record) => { return record.name.toLowerCase().includes(value.toLowerCase()) }
        },
        { title: 'Tipo cliente', dataIndex: 'type', key: 'type' },
        /*TO DO:  */
        { title: 'Status', dataIndex: 'status', key: 'status', width: '8%' },
        { title: 'Email', dataIndex: 'mail', key: 'mail' },
        { title: 'Teléfono', dataIndex: 'phoneNumber', key: 'phoneNumber', },
        { title: 'Más', key: 'operation', fixed: 'right', render: key => <Button type="link" onClick={() => modalInfo(key)}> Detalles </Button>, width: '8%' },
    ];
    //#endregion constants

    //#region functions

    const updateData = async e => {
        //e.preventDefault();
        const result = await getCustomerApiLst(clientHeaders);
        //console.log(result);
        if (result === "Failed to fetch") {
            notification["error"]({
                message: "No se obtuvo respuesta del servidor."
            });

        } else {
            //console.log(result);
            notification["success"]({
                message: "Datos actualizados exitosamente."
            });

            const { customerList } = result;

            // eslint-disable-next-line no-new-object
            let dataVal = new Object();
            let res = [];
            customerList.forEach(function (client) {
                dataVal = {
                    key: client.id,
                    customerNumer: client.customerNumber,
                    name:  `${client.name} ${client.lastName} ${client.surName}`,
                    //lastName: client.lastName,
                    //surName: client.surName,
                    type: client.type,
                    dateBirth: client.dateBirth,
                    gender: client.gender,
                    rfc: client.rfc,
                    businessName: client.businessName,
                    profession: client.profession,
                    phoneNumber: client.phoneNumber,
                    mail: client.mail,
                    description: client.description,
                    status: client.status,
                };
                res.push(dataVal);

            });
            setClientList(res);
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
            setModalContent(<DetailsClient values={res} />)
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
        setModalContentForm(<FormAddClient values={values} changeForm={changeForm} titles={titles}/>);
    }

    const onFinish = (values) => {
        console.log(values)
        const clientLst = clientList;

        if (values.clientName && values.clientCode) {
            const resSearch = clientLst.filter((e) => e.name === values.clientName && e.customerNumer === values.clientCode)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setClientList(resSearch);
            } else {
                notification["error"]({
                    message: "Los datos buscado no coinciden, verifique e intente nuevamente."
                });
            }
        } else if (values.clientName) {
            const resSearch = clientLst.filter((e) => e.name === values.clientName)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setClientList(resSearch);
            } else {
                notification["info"]({
                    message: "No se encontró el nombre, intente con otro dato diferente."
                });
            }
        } else if (values.clientCode) {
            const resSearch = clientLst.filter((el) => el.customerNumer === values.clientCode)
            console.log("TEST ONFINISH", resSearch);

            if (resSearch.length > 0) {
                setClientList(resSearch);
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


        /* if (values.clientName === undefined && values.clientCode === undefined) {
            notification["info"]({
                message: "Ingresa el dato a buscar"
            });
        } else {

            if (values.customerNumer === '' || values.customerNumer === undefined) {
                const resSearch = clientLst.filter((e) => e.name === values.clientName)
                console.log("TEST ONFINISH", resSearch);

                if (resSearch.length > 0) {
                    setClientList(resSearch);
                } else {
                    notification["info"]({
                        message: "No se encontró el nombre, intente con otro dato diferente."
                    });
                }
            } else if (values.clientName === '' || values.clientName === undefined) {
                const resSearch = clientLst.filter((el) => el.customerNumer === values.clientCode)
                console.log("TEST ONFINISH", resSearch);

                if (resSearch.length > 0) {
                    setClientList(resSearch);
                } else {
                    notification["info"]({
                        message: "No se encontró la clave, intente con otro dato diferente."
                    });
                }
            } else {
                notification["error"]({
                    message: "Solo se puede buscar por cliente o por clave."
                });
            }
        } */
        return values;
    };
    //#endregion functions

    //#region return
    return (
        <div >
            <TableFinder titleInfo={titles.maintitle} columns={columns} dataList={clientList} dataPlaceholder={placeholder} pagination={{ pageSize: 10 }} scroll={{ x: "max-content" }} updateData={updateData} onFinish={onFinish} />
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