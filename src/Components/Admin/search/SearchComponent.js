import React, { useState } from "react";
import SearchForm from "./SearchForm";
import { Row, Col, Button } from "antd";

/*
const searchComponent = {
    valTitleSearch: "Gestión del cliente"
};
<SearchComponent options={searchComponent}/>
*/

export default function SearchComponent(props){
    const {options} = props;
    const { valTitleSearch } = options;

    const valForm = {
        valTitle: "Nombre cliente:",
        valName: "nameclient",
        valType: "text",
        valPlaceHolder: "Nombre"
    };
    const valForm1 = {
        valTitle: "Clave cliente:",
        valName: "nameclient",
        valType: "text",
        valPlaceHolder: "Nombre"
    };
    const valForm2 = {
        valTitle: "Fecha inicio:",
        valName: "n",
        valType: "date",
        valPlaceHolder: "Nombre"
    };
    const valForm3 = {
        valTitle: "Fecha final:",
        valName: "nameclient",
        valType: "date",
        valPlaceHolder: "Nombre"
    };
    const valForm4 = {
        valTitle: "Estatus:",
        valName: "nameclient",
        valType: "text",
        valPlaceHolder: "Nombre"
    };
    const valForm5 = {
        valTitle: "Empresa:",
        valName: "nameclient",
        valType: "text",
        valPlaceHolder: "Nombre"
    };
    const valForm6 = {
        valTitle: "Sucursal:",
        valName: "nameclient",
        valType: "text",
        valPlaceHolder: "Nombre"
    };
    
    const [visible, setVisible] = useState(false);
    return(
        <>
        
        <h2>{valTitleSearch}</h2>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col>
                    <SearchForm options={valForm}/>
                </Col>
                <Col>
                    <SearchForm options={valForm1}/>
                </Col>
                <Col>
                    <SearchForm options={valForm2}/>
                </Col>
                <Col>
                    <SearchForm options={valForm3}/>
                </Col>
            </Row>
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col>
                    <SearchForm options={valForm4}/>
                </Col>
                <Col>
                    <SearchForm options={valForm5}/>
                </Col>
                <Col>
                    <SearchForm options={valForm6}/>
                </Col>
                <Col Style="display: flex;align-items: center;justify-content: center;">
                    <Button
                        type="primary"
                        onClick={() => setVisible(true)}
                        className="modal-add-client__button"
                        >
                        Buscar
                    </Button>
                </Col>
            </Row>
        </>
    );
}