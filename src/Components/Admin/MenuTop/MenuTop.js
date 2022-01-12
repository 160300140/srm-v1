import React from 'react';
import '../../../scss/partials/Admin/_MenuTop.scss';
import { Button } from "antd";
import { NavLink } from 'react-router-dom';
import { MenuUnfoldOutlined, PoweroffOutlined, MenuFoldOutlined } from '@ant-design/icons';
import logo from '../../../logo.svg';

export default function MenuTop(props) {

    let button;

    console.log(props);
    const { menuCollapsed, setMenuCollapsed } = props;


    if (menuCollapsed) {
        button = <MenuUnfoldOutlined />
    } else {
        button = <MenuFoldOutlined />
    }


    return (
        <div className="menu-top">

            <div className="menu-top__left">
                <img className="menu-top__left-logo" src={logo} alt="logo" />
                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)} >
                    {button}
                </Button>
            </div>
            <div className="menu-top__right">
                <Button type="link">
                    
                    <NavLink to={"/"} > <PoweroffOutlined /> </NavLink >

                </Button>
            </div>
        </div>
    )
}