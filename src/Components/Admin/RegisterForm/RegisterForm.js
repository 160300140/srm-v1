import React, { useState } from "react";
import { Form, Button, Checkbox, notification, Input } from "antd";
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined, MailOutlined } from '@ant-design/icons';
import { emailValidation, minLengthValidation } from "../../../Utils/formValidation";
import { signUpApi } from '../../../Api/user';

import "./RegisterForm.scss";

export default function RegisterForm() {

  const [inputs, setInputs] = useState({

    //profile: "AD",
    name: "",
    lastName: "",
    surName: "",
    userName: "",
    mail: "",
    position: "Administrador",
    password: "",
    confirmPassword: "",
    //status: "AC",
    privacyPolicy: false,
    //sesionId: "05",


  });

  const [formValid, setFormValid] = useState({
    //profile:false,
    name: false,
    lastName: false,
    surName: false,
    userName: false,
    mail: false,
    position: false,
    password: false,
    confirmPassword: false,
    //status:false,
    //sesionId:false,
    privacyPolicy: false


  });

  const changeForm = (event) => {

    if (event.target.name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [event.target.name]: event.target.checked
      });
    } else {
      setInputs({
        ...inputs,
        [event.target.name]: event.target.value
      });
    }
    /* TEST VALUES */
    //console.log(event.target);
    console.log(event.target.name);
  };

  const inputValidation = e => {
    const { type, name } = e.target;

    if (type === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (type === "password") {
      setFormValid({ ...formValid, [name]: minLengthValidation(e.target, 6) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const register = async e => {
    e.preventDefault();
    console.log(inputs);

    //const profileVal = inputs.profile;
    const nameVal = inputs.name;
    const lastNameVal = inputs.lastName;
    const surNameVal = inputs.surName;
    const emailVal = inputs.mail;
    const positionVal = inputs.position;
    const passwordVal = inputs.password;
    const confirmPasswordVal = inputs.confirmPassword;
    //const statusVal = inputs.status;
    //const sesionIdVal = inputs.sesionId;
    const privacyPolicyVal = inputs.privacyPolicy;


    if (!nameVal || !lastNameVal || !positionVal || !surNameVal || !emailVal || !passwordVal || !confirmPasswordVal || !privacyPolicyVal) {
      notification['error']({ message: "Todos los campos son obligatorios" });
    } else {
      if (passwordVal !== confirmPasswordVal) {
        notification["error"]({ message: "Las contraseñas deben que ser iguales" });
      } else {

        //notification["success"]({message:"Cuenta creada"});
        const results = await signUpApi(inputs);

        console.log("TEST RESULTS AFTER AWAIT" + results);

        if (results.message !== "Proceso exitoso.") {
          notification["error"]({ message: results.message });
        } else {
          notification["success"]({ message: results.message });
          resetForm();
        }
        //TEST CONEXIÓn DIRECTA: Conectar con el API y registrar usuario
        /*
        fetch("http://localhost:9001/SRM/User/CreateUser",{
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body:JSON.stringify(inputs)
        }).then(() =>{console.log("Nuevo usuario creado")})
        */

      }
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName('input');

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");
    }

    setInputs({
      //profile: "AD",
      name: "",
      lastName: "",
      surName: "",
      userName: "",
      mail: "",
      position: "Administrador",
      password: "",
      confirmPassword: "",
      //status: "AC",
      //sesionId: "0",
      privacyPolicy: false

    });

    setFormValid({
      //profile:false,
      name: false,
      lastName: false,
      surName: false,
      userName: false,
      mail: false,
      position: false,
      password: false,
      confirmPassword: false,
      //status:false,
      //sesionId:false,
      privacyPolicy: false

    });
  }

  return (
    <Form className="register-form" onSubmit={register} onChange={changeForm}>
      <Form.Item>
        <Input
          addonAfter={<UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="text"
          name="name"
          placeholder="Nombre(s)"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.name}
        />
      </Form.Item>
      <Form.Item>
        <Input
          addonAfter={<UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="text"
          name="lastName"
          placeholder="Apellido paterno"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.lastName}
        />
      </Form.Item>
      <Form.Item>
        <Input
          addonAfter={<UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="text"
          name="surName"
          placeholder="Apellido materno"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.surName}
        />
      </Form.Item>
      <br />
      <Form.Item>
        <Input
          addonAfter={<UserOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="text"
          name="position"
          placeholder="Rol"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.position}
          readOnly
        />
      </Form.Item>
      <Form.Item>
        <Input
          addonAfter={<MailOutlined type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="mail"
          placeholder="Correo electrónico"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.mail}
        />
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.password}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
        />
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="confirmPassword"
          placeholder="Repetir contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={inputs.confirmPassword}
          iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}

        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          onChange={inputValidation}
          checked={inputs.privacyPolicy}
        >
          He leído y acepto la política de privacidad. {/* <a className="login-form__registerLink" hr>política de privacidad</a>.*/}
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button" onClick={register} >
          Crear cuenta
        </Button>
      </Form.Item>
    </Form>

  );
}