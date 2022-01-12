import React, { useState } from "react";
import { Modal, Button } from 'antd';

/**
Recibir objeto:
const modalopc = {
  colorBoton: "primary",
  boton: "Eliminar",
  titulo: "¿Deseas dar de baja a este cliente?",
  colorModal: "blue",
  opc1: "Cancelar",
  opc2: "Guardar"
};
Usar:
<ModalOkCancel options={modalopc}/>
 */

export default function ModalOkCancel(props){

  const [isModalVisible, setIsModalVisible] = useState(false);
  
  const {options} = props;
  const {
    colorBoton = "primary",
    boton = "Boton principal",
    titulo = "Titulo principal del Modal",
    colorModal = "blue",
    opc1 = "Cancelar",
    opc2 = "Guardar"
  } = options;

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
    
    return (
        <>
            <Button type={colorBoton} onClick={showModal}>
                {boton}
            </Button>
            <Modal bodyStyle={{backgroundColor: 'blue', border: 0 }} title={titulo} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
      </Modal>
        </>
    
    )

}

