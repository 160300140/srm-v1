import React, { useState, useEffect } from "react";
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { HomeOutlined, TeamOutlined, AppstoreAddOutlined, AimOutlined, ShopOutlined, ShoppingOutlined } from '@ant-design/icons';
import logoSoem1 from '../../../img/soemLogo1.png';
import logoSoem2 from '../../../img/logo.png'
import '../../../scss/partials/Admin/_MenuSider.scss';

function MenuSider(props) {
    //#region constants
    const { menuCollapsed, location } = props;
    const { Sider } = Layout;
    const { SubMenu } = Menu;
    //#endregion constants

    //console.log(location.pathname);

    //#region return
    return (
        <Layout>
            <Sider className="menu-sider" collapsed={menuCollapsed}>
            <img className={menuCollapsed? "menu-top__left-logob":"menu-top__left-logo"}  src={ menuCollapsed? logoSoem2:logoSoem1 } alt="logo" />
                <Menu theme="dark" mode='inline' defaultSelectedKeys={[location.pathname]}>
                    <Menu.Item key="/admin">
                        <Link className="menu-sider__link" to={"/admin"}>
                            <HomeOutlined />
                            <span className="nav-text">Home</span>
                        </Link>
                    </Menu.Item>
                    <SubMenu key="sub1" icon={<AimOutlined />} title="CRM" >
                        <Menu.Item key="2">
                            <Link className="menu-sider__link" to={"/admin/clients"}>
                                <span className="nav-text">Clientes</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<ShoppingOutlined />} title="Ventas" >
                        <Menu.Item key="3">
                            <Link className="menu-sider__link" to={"/admin/quoted"}>
                                <span className="nav-text">Cotización</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link className="menu-sider__link" to={"/admin/sale"}>
                                <span className="nav-text">Ventas</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" icon={<AppstoreAddOutlined />} title="Logística">
                        <Menu.Item key="5">
                            <Link className="menu-sider__link" to={"/admin/purchase"}>
                                <span className="nav-text">Compras</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link className="menu-sider__link" to={"/admin/providers"}>
                                <span className="nav-text">Proveedores</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" icon={<TeamOutlined />} title="RH">
                        <Menu.Item key="7">
                            <Link className="menu-sider__link" to={"/admin/hr"}>
                                <span className="nav-text">Empleados</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" icon={<ShopOutlined />} title="Compañía">
                        <Menu.Item key="8">
                            <Link className="menu-sider__link" to={"/admin/company"}>
                                <span className="nav-text">Sucursales</span>
                            </Link>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        </Layout>
    )
    //#endregion return
}

export default withRouter(MenuSider);