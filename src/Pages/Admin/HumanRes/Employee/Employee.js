import React, { useState, useEffect } from "react";
import { Button, notification, Row, Col } from "antd";
import { getHumanResApiList } from "../../../../Api/HumanRes";
import TableFinder from "../../../../Components/TableFinder";
import DetailsHumanRes from "../../../../Components/DetailsList/DetailsHumanRes";
import Modal from "../../../../Components/Modal";
import ModalForm from "../../../../Components/ModalForm";
import ButtonAdd from "../../../../Components/ButtonAdd/ButtonAdd";
import FormAddEmployee from "../../../../Components/FormAdd/FormAddEmployee";
import {
  employeeParams,
  employeeHeaders,
} from "../../../../Constants/ObjEmployee";
import { getCompanyApiList } from "../../../../Api/Company";
import { companyHeaders } from "../../../../Constants/ObjsCompany";

export default function HumanRes() {
  //#region constants
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [visibleModalForm, setVisibleModalForm] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [modalContentForm, setModalContentForm] = useState(null);
  const [modalTitle, setModalTitle] = useState("");
  const [dataList, setDataList] = useState();
  const [valuesAuth] = useState(false);
  const [values, setValues] = useState(employeeParams);
  const [ dataListB, setDataListB] = useState({});

  const titles = {
    maintitle: "Empleados",
    modaltitle: "Información del empleado",
    addNameBtn: "Agregar empleado",
    addNewClient: "Agregar nuevo empleado",
  };

  const placeholder = {
    name: "Nombre del empleado",
    key: "Clave del empleado",
    status: "Seleccione un estatus",
  };

  const columns = [
    {
      title: "Clave",
      dataIndex: "key",
      key: "key",
      fixed: "left",
      width: "12%",
    },
    { title: "Nombre", dataIndex: "fullName", key: "fullName" },
    { title: "RFC", dataIndex: "rfc", key: "rfc", width: "12%" },
    { title: "No. Seguro social", dataIndex: "nss", key: "nss", width: "12%" },
    {
      title: "Teléfono",
      dataIndex: "emergencyPhone",
      key: "emergencyPhone",
      width: "10%",
    },
    { title: "Puesto", dataIndex: "jobTitle", key: "jobTitle" },
    //{ title: 'Descripción', dataIndex: 'description', key: 'description' },
    {
      title: "Más",
      key: "operation",
      fixed: "right",
      render: (key) => (
        <Button type="link" onClick={() => modalInfo(key)}>
          {" "}
          Detalles{" "}
        </Button>
      ),
      width: "8%",
    },
  ];
  //#endregion constants

  //#region functions

  const updateData = async (e) => {
    //e.preventDefault();
    const result = await getHumanResApiList(employeeHeaders);

    if (result !== "Failed to fetch") {
      /* notification["error"]({
        message: "No se obtuvo respuesta del servidor.",
      });
    } else {
      //console.log(result);
      notification["success"]({
        message: "Datos actualizados exitosamente.",
      }); */

      const { employeeList } = result;

      // eslint-disable-next-line no-new-object
      let dataVal = new Object();
      let res = [];
      employeeList.forEach(function (value) {
        dataVal = {
          id: value.id,
          fullName: value.fullName,
          key: value.employeeNumber,
          status: value.status,
          gender: value.gender,
          marital: value.marital,
          businessName: value.businessName,
          birthday: value.birthday,
          certificate: value.certificate,
          emergencyContact: value.emergencyContact,
          emergencyPhone: value.emergencyPhone,
          barcode: value.barcode,
          jobTitle: value.jobTitle,
          workPhone: value.workPhone,
          mobilePhone: value.mobilePhone,
          workEmail: value.workEmail,
          workLocation: value.workLocation,
          lastCheckIn: value.lastCheckIn,
          lastCheckOut: value.lastCheckOut,
          description: value.description,
          address: {
            /*
            id: value.id,
            name: value.name,
            postalCode: value.postalCode,
            latitude: value.latitude,
            longitude: value.longitude,
            phoneNumber: value.phoneNumber,
            region: value.region,
            city: value.city,
            */
            fullAddress: `${value.address.city}, Reg.${value.address.region}, C.P. ${value.address.postalCode}`,
            description: value.description,
          },
          store: {
            /* 
            id: value.id,
            storeNumber: value.storeNumber,
            status: value.status,
            phoneNumber: value.phoneNumber,
            mail: value.mail,
            openingTime: value.openingTime,
            closingTime: value.closingTime,
            coordinates: value.coordinates,
            description: value.description,
            address: `${value.address.city}, Reg.${value.address.region}, C.P. ${value.address.postalCode}`,
            */
            name: value.store.name,
          },
          rfc: value.rfc,
          nss: value.nss,
        };
        res.push(dataVal);
      });
      setDataList(res);
      //console.log(res);
    }
  };

  const getData = async e => {
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

  useEffect(() => {
    updateData();
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesAuth]);

  const changeForm = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const modalInfo = (key) => {
    setIsVisibleModal(true);
    setModalTitle(titles.modaltitle);
    const res = key;

    if (res) {
      setModalContent(<DetailsHumanRes values={res} />);
    } else {
      notification["error"]({
        message: "El id de usuario no coincide con el buscado",
      });
    }
  };

  const openAddTo = (e) => {
    getData()
    e.preventDefault();
    setVisibleModalForm(true);
    setModalTitle(titles.addNewClient);
    setModalContentForm(
      <FormAddEmployee values={values} changeForm={changeForm} titles={titles} dataListB={dataListB} />
    );
  };

  const onFinish = (values) => {
    console.log(values);
    const dataLst = dataList;
    console.log(dataLst);

    if (values.clientName && values.clientCode) {
      const resSearch = dataLst.filter(
        (e) =>
          e.fullName === values.clientName &&
          e.employeeNumber === values.clientCode
      );
      console.log("TEST ONFINISH", resSearch);

      if (resSearch.length > 0) {
        setDataList(resSearch);
      } else {
        notification["error"]({
          message:
            "Los datos buscado no coinciden, verifique o intente nuevamente.",
        });
      }
    } else if (values.clientName) {
      const resSearch = dataLst.filter((e) => e.fullName === values.clientName);
      console.log("TEST ONFINISH", resSearch);

      if (resSearch.length > 0) {
        setDataList(resSearch);
      } else {
        notification["info"]({
          message: "No se encontró el nombre, intente con otro dato diferente.",
        });
      }
    } else if (values.clientCode) {
      const resSearch = dataLst.filter(
        (el) => el.employeeNumber === values.clientCode
      );
      console.log("TEST ONFINISH", resSearch);

      if (resSearch.length > 0) {
        setDataList(resSearch);
      } else {
        notification["info"]({
          message: "No se encontró la clave, intente con otro dato diferente.",
        });
      }
    } else {
      notification["info"]({
        message: "Ingresa el dato a buscar",
      });
    }

    return values;
  };
  //#endregion functions

  //#region return
  return (
    <div>
      <TableFinder
        titleInfo={titles.maintitle}
        columns={columns}
        dataList={dataList}
        dataPlaceholder={placeholder}
        pagination={{ pageSize: 10 }}
        scroll={{ x: "max-content" }}
        updateData={updateData}
        onFinish={onFinish}
      />
      <Modal
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
      <Row>
        <Col flex="auto"></Col>
        <Col flex="100px">
          <ButtonAdd openAddTo={openAddTo}>{titles.addNameBtn}</ButtonAdd>
        </Col>
      </Row>
      <ModalForm
        title={modalTitle}
        visibleModalForm={visibleModalForm}
        setVisibleModalForm={setVisibleModalForm}
      >
        {modalContentForm}
      </ModalForm>
    </div>
  );
  //#endregion return
}
