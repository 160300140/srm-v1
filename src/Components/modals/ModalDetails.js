import React from "react";
import { Modal, Button, Space } from 'antd';

/**
Necesita:
const modaldetails = {
    colorBoton: "primary",
    boton: "Detalles",
    titulo: "Detalles de la clase (Servicio)",
    colorModal: "blue",
    productName: "Nombre producto",
    productPrice: "Precio del producto",
    productStock: "Stock del producto"
};
Uso:
<ModalDetails options={modaldetails}/>
 */

export default function ModalDetails(props){
    const {options} = props;
    //Todos los campos posibles del objeto
    const {
        titulo, 
        productName = "Sin detalles",
        productPrice = "Sin detalles",
        productStock = "Sin detalles",
        productStatus = "",
        boton, colorBoton
    } = options;

    
    function info(){
        Modal.info({
            title: '${titulo}',
            content: (
                <div>
                    <p>{productName}</p>
                    <p>{productPrice}</p>
                    <p>{productStock}</p>
                    <p>{productStatus}</p>
                </div>
            ),
            onOk(){},
        });
    }

    return (
        <>
            <Space wrap>
    <Button type={colorBoton} onClick={info}>{boton}</Button>
  </Space>
        </>
    
    )

}

