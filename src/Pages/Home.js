import React from "react";
import logo from "../logo.svg"


function Home() {

    return (

        <div className="Home">
            <div className="Home__main-logo">
                <img src={logo} className="Home__home-logo" alt="logo" />
            </div>

            <h1 className="Home__title" >Sistema de Radiografía Microempresarial</h1>
            <br />

        </div>

    )
};


export default Home;