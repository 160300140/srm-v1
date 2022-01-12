import React, { Component } from 'react';
import '../../../scss/partials/Admin/_SignIn.scss';
import { UnlockOutlined } from '@ant-design/icons';
import { Layout, Tabs } from 'antd';
import loginimg from '../../../img/businessa.jpeg';
import RegisterForm from "../../../Components/Admin/RegisterForm";
import LoginForm from "../../../Components/Admin/LoginForm";
import axios from 'axios';

const baseUrlLocal = "http://ec2-18-189-16-61.us-east-2.compute.amazonaws.com:9001/SRM/User/";

const { Content } = Layout;
const { TabPane } = Tabs;


class SignIn extends Component {
    state = {
        form: {
            user_name: null,
            password: null
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }



    render() {
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
                            <img className="card-img" src={loginimg} alt="login image" />
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
    }
}
export default SignIn;