import React from 'react';
import { NavLink } from 'react-router-dom';
//import logo from "../../../assets/images/landscape/logo-white.png";

function HeaderHome() {

    //#region return
    return (
        <header className="header">
            {/*             <div className="header__logo-box">
                <img src={logo} alt="Logo" className="header__logo" />
            </div> */}
            <div className="header__text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary--main">SOEM</span>
                    <span className="heading-primary--sub">Software de Operaciones Esenciales para Microempresas</span>
                </h1>

                <NavLink to={"/admin/login"} className="btn btn--white btn--animated">Discover SOEM</NavLink >
            </div>
        </header>
    )
    //#endregion return

}

export default HeaderHome;