import React from 'react';
import { Table, Tag, Space } from 'antd';
import SearchComponent from '../../Components/Admin/search/SearchComponent';
import ModalDetails from '../../Components/modals/ModalDetails';
import ModalOkCancel from '../../Components/modals/ModalOption';
import ModalAddClient from '../../Components/modals/ModalAddClient';

export default function HR() {
  // comando
  const { Column } = Table;
  //componente de busqueda (titulo)
  const searchComponent = {valTitleSearch: "Gestión del empleado"};
  //datos de la table ejemplo
  const data = [
    {
      key: '1',
      claveusuario: '0101',
      nombres: 'Martin Fernando',
      apellidos: 'Poot Chuc',
      puesto: 'IT Agent Operations',
      departamento: 'IT',
      status: 'Activo',
      empresa: 'Hyatt',
      sucursal: 'Tulum',
      fecharegistro: '06/08/2017',
      fechabaja: '00/00/0000',
    }
  ];
  //opciones
  const modalopc = {
    colorBoton: "primary",
    boton: "...",
    titulo: "¿Deseas dar de baja a este cliente?",
    colorModal: "blue",
    opc1: "Cancelar",
    opc2: "Guardar"
  };
  return (
    <>
      {/*Componente de busqueda*/}
      <SearchComponent options={searchComponent}/>
      {/*Agregar nuevos*/}
      <ModalAddClient/><br/><br/><br/>
      <Table dataSource={data}>
        <Column title="Clave usuario" dataIndex="claveusuario" key="claveusuario" />
        <Column title="Nombres" dataIndex="nombres" key="nombres" />
        <Column title="Apellidos" dataIndex="apellidos" key="categoria" />
        <Column title="Puesto" dataIndex="puesto" key="puesto" />
        <Column title="Departamento" dataIndex="departamento" key="departamento" />
        <Column title="Estatus" dataIndex="status" key="status" />
        <Column title="Empresa" dataIndex="empresa" key="empresa" />
        <Column title="Sucursal" dataIndex="sucursal" key="sucursal" />
        <Column title="Fecha de registro" dataIndex="fecharegistro" key="fecharegistro" />
        <Column title="Fecha de baja" dataIndex="fechabaja" key="fechabaja" />
        <Column
          title="..."
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <ModalOkCancel options={modalopc}/>
            </Space>
          )}
        />
      </Table>
    </>
  )
}