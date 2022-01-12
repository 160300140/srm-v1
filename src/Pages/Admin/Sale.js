import React from 'react';
import { Table, Tag, Space } from 'antd';
import SearchComponent from '../../Components/Admin/search/SearchComponent';
import ModalDetails from '../../Components/modals/ModalDetails';
import ModalOkCancel from '../../Components/modals/ModalOption';
import ModalAddClient from '../../Components/modals/ModalAddClient';

export default function Sale() {

    const { Column, ColumnGroup } = Table;
    const searchComponent = {
        valTitleSearch: "Gestión de productos"
    };
    //datos de la table
      const data = [
        {
          key: '1',
          clave: '0101',
          producto: 'clase jazz',
          categoria: 'Servicio',
          fechacompra: '12/12/12',
          status: 'alta',
          nonota: '0102303010',
          importetotal: '$354.00 MXN',
          empresa: 'MycroScanCloud',
          sucursal: 'Sucursal 1',
          descripcion: 'Sin Descripcion',
        }
      ];
      const modaldetails = {
        colorBoton: "primary",
        boton: "...",
        titulo: "Detalles de la clase (Servicio)",
        colorModal: "blue",
        productName: "Nombre producto",
        productPrice: "Precio del producto",
        productStock: "Stock del producto"
    };
    return (
        <>

        <SearchComponent options={searchComponent}/>
{/*
        <Table dataSource={dataSource} columns={columns} />;
*/}
<ModalAddClient/><br/>
<br/>
<br/>
<Table dataSource={data}>
    <Column title="Clave" dataIndex="clave" key="clave" />
    <Column title="Producto" dataIndex="producto" key="producto" />
    <Column title="Categoría" dataIndex="categoria" key="categoria" />
    <Column title="Fecha de compra" dataIndex="fechacompra" key="fechacompra" />
    <Column title="Status" dataIndex="status" key="status" />
    <Column title="No. nota" dataIndex="nonota" key="nonota" />
    <Column title="Importe Total" dataIndex="importetotal" key="importetotal" />
    <Column title="Empresa" dataIndex="empresa" key="empresa" />
    <Column title="Sucursal" dataIndex="sucursal" key="sucursal" />
    <Column title="Descripción" dataIndex="descripcion" key="descripcion" />
    <Column
      title="..."
      key="action"
      render={(text, record) => (
        <Space size="middle">
        <ModalDetails options={modaldetails}/>
        </Space>
      )}
    />
  </Table>
  

        </>
    )
}