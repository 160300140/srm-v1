import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import "../scss/partials/pages/_LayoutAdmin.scss";
import MenuTop from '../Components/Admin/MenuTop';
import MenuSider from '../Components/Admin/MenuSider';
import AdminSignIn from '../Pages/Admin/SignIn';


export default function LayoutAdmin(props) {

    const { routes } = props;
    const [menuCollapsed, setMenuCollapsed] = useState(false);
    const { Header, Content, Footer } = Layout;

    const user = null;

    
    if (!user) {
        return (
            <>
                <Route path="/admin/login" component={AdminSignIn} />
                <Redirect to='/admin/login' />
            </>
        )
    }
    
    
    
    

    //console.log(props);

    return (
        
        <Layout>
            <MenuSider menuCollapsed={menuCollapsed} />
            <Layout className="layout-admin" style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}>
                <Header className="layout-admin__header">
                    <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed} />
                </Header>
                <Content className="layout-admin__content">
                    <LoadRoutes routes={routes} />
                    <h2> Content admin </h2>
                </Content>
                <Footer className="layout-admin__footer">
                    SRM 2021
                </Footer>
            </Layout>
        </Layout>
        

        
        
    )
}

function LoadRoutes({ routes }) {
    console.log(routes);

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
}