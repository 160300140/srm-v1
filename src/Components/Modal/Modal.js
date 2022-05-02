import React from 'react';
import { Modal as ModalAntd } from 'antd';
import './Modal.scss';

export default function Modal(props) {

    //#region constants
    const { title, isVisible, setIsVisible, children } = props;
    //#endregion constants

    //#region return
    return (
        <ModalAntd title={title} centered className="modal-card" visible={isVisible} onOk={() => setIsVisible(false)} cancelButtonProps={{ style: { display: 'none' } }}>
            {children}
        </ModalAntd>
    );
    //#endregion return
};
