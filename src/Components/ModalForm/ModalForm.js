import React from 'react';
import { Modal, Button } from 'antd';


export default function ModalForm(props) {

    //#region constants
    const { title, visibleModalForm, setVisibleModalForm, children } = props;
    //#endregion constants

    //#region functions
    /*
    const addData = (e) => {
        e.preventDefault();
        console.log("TEST ADD DATA");

        const addSucces = true;

        if (addSucces) {

            notification["success"]({
                message: "Se agregó nuevo usuario."
            });

            setTimeout(() => {
                setVisibleModalForm(false);
            }, 1000);
        }
    } */
    //#endregion functions

    //#region return
    return (
        <Modal
            title={title}
            centered
            className="modal-card"
            closeIcon
            visible={visibleModalForm}
            width={800}
            onClick={() => setVisibleModalForm(false)}
            footer={[
                <Button key="back" onClick={() => setVisibleModalForm(false)} size="small" type="link" danger >
                    Cerrar
                </Button>,
                // <Button key="submit" type="primary"  onClick={addData}>
                //     Agregar
                // </Button>
            ]}
        >
            {children}
        </Modal>
    );
    //#endregion return

}