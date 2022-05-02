import React, { useState, useEffect } from "react";
import { Button, notification, Row, Col } from "antd";
import { getCompanyApiList } from "../../../../Api/Company";
import TableFinder from '../../../../Components/TableFinder';
import DetailsCompany from '../../../../Components/DetailsList/DetailsCompany';
import Modal from '../../../../Components/Modal';
import ModalForm from '../../../../Components/ModalForm';
import ButtonAdd from "../../../../Components/ButtonAdd/ButtonAdd";
import FormAddCompany from "../../../../Components/FormAdd/FormAddCompany";
import { companyParams, companyHeaders } from '../../../../Constants/ObjsCompany';


export default function Business() {
    //#region constants
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [visibleModalForm, setVisibleModalForm] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalContentForm, setModalContentForm] = useState(null);
    const [modalTitle, setModalTitle] = useState("");
    const [dataList, setDataList] = useState();
    const [valuesAuth] = useState(false);
    const [values, setValues] = useState(companyParams);

    const titles = {
        maintitle: "Sucursales",
        modaltitle: "Información de sucursal",
        addNameBtn: "Agregar sucursal",
        addNew: "Agregar nueva sucursal",
    }

    const placeholder = {
        name: "Nombre de la sucursal",
        key: "Clave de la tienda",
        status: "Seleccione un estatus"
    }

    const columns = [
        { title: 'Clave', dataIndex: "key", key: 'id', fixed: 'left', width: '10%' },
        { title: 'Nombre', dataIndex: 'name', key: 'name' },
        //{ title: 'RFC', dataIndex: 'rfc', key: 'rfc'},
        { title: 'Teléfono', dataIndex: 'phoneNumber', key: 'phoneNumber', width: '10%' },
        { title: 'Correo', dataIndex: 'mail', key: 'mail' },
        { title: 'Horario', dataIndex: 'schedule', key: 'schedule' },
        { title: 'Descripción', dataIndex: 'description', key: 'description' },
        { title: 'Más', key: 'operation', fixed: 'right', render: key => <Button type="link" onClick={() => modalInfo(key)}> Detalles </Button>, width: '8%' },
    ];
    //#endregion constants

    //#region functions
    const updateData = async e => {
        //e.preventDefault();
        const result = await getCompanyApiList(companyHeaders);

        if (result !== "Failed to fetch") {
            /* notification["error"]({
                message: "No se obtuvo respuesta del servidor."
            });

        } else {
            console.log(result);
            notification["success"]({
                message: "Datos actualizados exitosamente."
            }); */

            const { storeList } = result;
            console.log("** ProdLst", storeList);

            // eslint-disable-next-line no-new-object
            let dataVal = new Object();
            let res = [];
            storeList.forEach(function (value) {
                dataVal = {
                    createUid: value.createUid,
                    id: value.id,
                    name: value.name,
                    key: value.storeNumber,
                    status: value.status,
                    phoneNumber: value.phoneNumber,
                    mail: value.mail,
                    schedule: `${value.openingTime} - ${value.closingTime}`,
                    coordinates: "000000,000000",
                    address: `${value.address.city}, Reg.${value.address.region}, C.P. ${value.address.postalCode} ${value.address.description}`,
                    description: value.description,
                    //street: value.address.name,
                    //colonia: value.address.region,
                    //postalCode: value.address.postalCode,
                    latitude: value.address.latitude,
                    longitude: value.address.longitude,
                    //phoneNumberA: value.address.phoneNumber,
                    //city: value.address.city,
                    descriptionA: value.address.description,

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
            setModalContent(<DetailsCompany values={res} />)
        } else {
            notification["error"]({
                message: "El id de usuario no coincide con el buscado"
            });
        }
    }

    const openAddTo = (e) => {
        e.preventDefault();
        setVisibleModalForm(true);
        setModalTitle(titles.addNew);
        setModalContentForm(<FormAddCompany values={values} changeForm={changeForm} titles={titles} />);
    }

    const onFinish = (values) => {
        console.log(values)
        const dataLst = dataList;
        console.log(dataLst)

        if (values.clientName && values.clientCode) {
            const resSearch = dataLst.filter((e) => e.name === values.clientName && e.key === values.clientCode)
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