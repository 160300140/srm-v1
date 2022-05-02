import React from 'react';
import { Redirect } from 'react-router-dom';
import '../../../scss/partials/Admin/_SignIn.scss';
import { UnlockOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import loginimg from '../../../img/businessa.jpeg';
import LoginForm from "../../../Components/Admin/LoginForm";

//#region GlobalConstans
const { Content } = Layout;
//#endregion GlobalConstans

export default function SignIn(props) {

    /*

    state = {
        form: {
            mail: null,
            password: null
        }
    }

    const handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }
    */

    //#region constans
    const user = "null"; //"";
    //#endregion constants

    //#region ValidationsFunction
    if (user) {
        return <Redirect to="/admin" />
    }
    //#endregion ValitdationsFunction

    //#region return
    return (
        <div className="auth-wrapper">
            <div className="auth-content">
                <div className="auth-bg">
                    <span className="r" />
                    <span className="r s" />
                    <span className="r s" />
                    <span className="r" />
                </div>
                <div className="card-group">
                    <div className="card" >
                        <img className="card-img" src={loginimg} alt="login" />
                    </div>

                    <div className="card">
                        <div className="card-body text-center">
                            <div className="mb-4">
                                <UnlockOutlined style={{ fontSize: '250%', color: '#1de9b6', marginTop: '10px' }} />
                            </div>
                            <h3>Login</h3>
                            <Layout className="sign-in">
                                <Content className="sign-in__content">
                                    <h1 className="sign-in__content-logo">
                                        {/* <img src={Logo} alt="Agustin Navarro Galdon" /> */}
                                    </h1>

                                    <div className="sign-in__content-tabs">
                                        <LoginForm />
                                        {/* 
                                            <Tabs type="card">
                                                <TabPane tab={<span>Entrar</span>} key="1">
                                                    <LoginForm />
                                                </TabPane>

                                                <TabPane tab={<span>Nuevo usuario</span>} key="2">
                                                    <RegisterForm />
                                                </TabPane>
                                            </Tabs>
                                            */}
                                    </div>
                                </Content>
                            </Layout>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
    //#endregion return
}
//export default SignIn;