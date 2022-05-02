import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout, Button } from 'antd';
import "../scss/partials/pages/_LayoutAdmin.scss";
import MenuSider from '../Components/Admin/MenuSider';
import AdminSignIn from '../Pages/Admin/SignIn';
import { MenuUnfoldOutlined, PoweroffOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import '../scss/partials/Admin/_MenuTop.scss';


export default function LayoutAdmin(props) {

    //#region constans
    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;
    let button;
    const user = "null"; //"";

    //#endregion constans


    //#region ValidationsFunctions
    if (menuCollapsed) {
        button = <MenuUnfoldOutlined />
    } else {
        button = <MenuFoldOutlined />
    }

    if (!user) {
        return (
            <>
                <Switch>
                    <Route path="/admin/login" component={AdminSignIn} />
                    <Redirect to='/admin/login' />
                </Switch>
            </>
        )
    }
    

    if (user) {

        //#region return
        return (
            <Layout>
                <MenuSider menuCollapsed={menuCollapsed} />
                <Layout className="layout-admin" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                    <Header >
                        <div className="menu-top">
                            <div className="menu-top__left">
                                <Button type="link" onClick={() => setMenuCollapsed(!menuCollapsed)} >
                                    {button}
                                </Button>
                            </div>
                            <div className="menu-top__right" style={{ marginLeft: 'auto' }}>
                                <Button type="link" >

                                    <NavLink to={"/"} > <PoweroffOutlined /> </NavLink >

                                </Button>
                            </div>
                        </div>
                    </Header>
                    <Content className="layout-admin__content">
                        <LoadRoutes routes={routes} />

                    </Content>
                    <Footer className="layout-admin__footer">
                        SRM 2021
                    </Footer>
                </Layout>

            </Layout>
        )
        //#endregion return
    }
    //#endregion ValidationsFunctions

    //console.log(props);

    return null;
}

//#region ExternalFunctions 
function LoadRoutes({ routes }) {
    //console.log("TEST ALL ROUTES" + routes);

    //#region return
    return (
        <Switch>
            {
                routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        exact={route.exact}
                        component={route.component}
                    />
                ))
            }
        </Switch>
    )
    //#endregion return
}
//#endregion ExternalFunctions 