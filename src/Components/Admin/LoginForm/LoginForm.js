import React, { useState } from "react";
import { Form, Input, Button, notification, message, Modal } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined } from '@ant-design/icons';
//import { singnInApi } from '../../../api/user';
import { singnInApi } from '../../../Api/user';
import RegisterForm from '../../../Components/Admin/RegisterForm';


import "./LoginForm.scss";

export default function LoginForm() {


  const [inputs, setInputs] = useState({

    sesionId: "0",
    userName: "",
    password: ""

  });

  const changeForm = (e) => {

    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });

    //console.log( "TEST: changeForm: target.name " + e.target.name);
    //console.log( "TEST: changeForm:target.value " + e.target.value);
  };

  const login = async e => {

    e.preventDefault();

    const result = await singnInApi(inputs);

    /*
    var resultM = jsonObject.filter(obj => obj.message == "Proceso exitoso");
    console.log(resultM);
    */

    if (result.message != "Proceso exitoso.") {
      notification["error"]({
        message: result.message
      });
    } else {
      //TO DO: verify access token api and accesstoken constants front
      //localStorage.setItem(ACCESS_TOKEN, accessToken);
      //localStorage.setItem(REFRESH_TOKEN, refreshToken);
      console.log(result);
      notification["success"]({
        message: "Login correcto."
      });
      //window.location.href = "/admin"
    }
    console.log(" Click button working");

  };


  const [visible, setVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  return (
    <>
      <Form className="login-form" onChange={changeForm}>
        <Form.Item>
          <Input
            prefix={<UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="email"
            name="userName"
            placeholder="Correo electronico"
            className="login-form__input"
            value={inputs.userName}
          />
        </Form.Item>
        <Form.Item>
          <Input.Password
            prefix={<LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            name="password"
            placeholder="Contraseña"
            className="login-form__input"
            iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            value={inputs.password}
          />
        </Form.Item>
        <Form.Item>
          <Button htmlType="submit" className="login-form__button" onClick={login}>
            Entrar
          </Button>
          <div style={{ marginTop: '16px' }}>
            Or <a className="login-form__registerLink" onClick={showModal}>register now! </a>

          </div>
        </Form.Item>
      </Form>

      <Modal
        //title="Modal 1000px width"
        centered
        visible={visible}
        //okText="Hello"
        okButtonProps={{ style: { display: 'none' } }}
        //onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
      //width={1000}
      >
        <div className="card-body text-center">
          <div className="mb-4">
            <UserAddOutlined style={{ fontSize: '250%', color: '#1de9b6', marginTop: '10px' }} />
          </div>
          <h3>Crear cuenta</h3>
        </div>
        <br />

        <RegisterForm />

      </Modal>

    </>
  );

}
