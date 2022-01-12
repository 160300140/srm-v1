import React from 'react';
import { NavLink } from 'react-router-dom';
//import logo from "../../../assets/images/landscape/logo-white.png";

function HeaderHome() {

    return (

        <header className="header">
            {/*             <div className="header__logo-box">
                <img src={logo} alt="Logo" className="header__logo" />
            </div> */}

            <div className="header__text-box">
                <h1 className="heading-primary">
                    <span className="heading-primary--main">Simplicity</span>
                    <span className="heading-primary--sub">is where the business happens</span>
                </h1>

                <NavLink to={"/admin/login"} className="btn btn--white btn--animated">Discover SRM</NavLink > 
            </div>
        </header>

    )

}

export default HeaderHome;