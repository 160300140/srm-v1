import React, { useState } from "react";
import { Form, Input, Button, notification, Modal } from 'antd';
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, UserAddOutlined } from '@ant-design/icons';
import { singnInApi } from '../../../Api/user';
import RegisterForm from '../RegisterForm';
import { userLogin } from '../../../Constants/ObjsUser'


import "./LoginForm.scss";

export default function LoginForm(props) {
  //console.log( "TEST PROPS LOGINFORM" + props);

  //#region constants
  const [inputs, setInputs] = useState({
    sesionId: "0",
    mail: "",
    password: ""
  });
  const [visible, setVisible] = React.useState(false);
  const [userName, setUserName] = useState(userLogin);
  //#endregion constants

  //#region functions
  const showModal = () => {
    setVisible(true);
  };

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });

    //console.log( "TEST: changeForm: target.name " + e.target.name);
    //console.log( "TEST: changeForm:target.value " + e.target.value);
  };

  const loginTest = e => {
    e.preventDefault();

    if (inputs.mail && inputs.password) {
      console.dir("Receiving data for login" + inputs.mail + " " + inputs.password);
      setInputs({
        name: inputs.mail,
        password: inputs.password

      });

    } else {
      console.log("Null data")
    }

    //console.log("TEST SUBMIT logintest" + JSON.stringify(inputs));
    //console.log("TEST SUBMIT logintest mail" + JSON.stringify(inputs.mail));


  }

  const login = async e => {
    e.preventDefault();
    const response = await singnInApi(inputs);

    /*
    var resultM = jsonObject.filter(obj => obj.message == "Proceso exitoso");
    console.log(resultM);
    */

    if (response.message !== "Proceso exitoso.") {
      notification["error"]({
        message: response.message
      });
    } else {
      //TO DO: verify access token api and accesstoken constants front
      //localStorage.setItem(ACCESS_TOKEN, accessToken);
      //localStorage.setItem(REFRESH_TOKEN, refreshToken);
      console.log(response);
      notification["success"]({
        message: "Login correcto."
      });

      // eslint-disable-next-line no-lone-blocks

      if (userLogin != null) {

        //userLogin = result;
        /* const { result } = response;
        const user = [result];
        user.filter(function (el) {
          const fullName = `${el.name} ${el.lastName} ${el.surName}`;
          setUserName(fullName);

          //return fullName;
        }); */
        window.location.href = "/admin"
      };
    }
  }

  console.log("userName", userName);

  //#endregion functions

  //#region return
  return (
    <>
      <Form className="login-form" onChange={changeForm}>
        <Form.Item>
          <Input
            prefix={<UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="email"
            name="mail"
            placeholder="Correo electronico"
            className="login-form__input"
            value={inputs.mail}
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
          <Button htmlType="submit" className="login-form__button" onClick={login} > {/** onClick={login} */}
            Entrar
          </Button>
          <div style={{ marginTop: '16px' }}>
            <Button
              type="text"
              className="login-form__registerLink"
              onClick={showModal}
            >
              Ó ¡Registrarme ahora!
            </Button>
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
  //#endregion return

}