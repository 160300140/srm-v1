import React, { useState } from 'react';
import { Select, Form, Row, Col, Input, Button } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import './EditUserInfo.scss';

export default function EditUserForm(props) {

    //#region constants
    const { user } = props;
    const [userData, setUserData] = useState({
        name: "",
        lastName: "",
        email: "",
        role: "",
    })
    //#endregion constants

    //#region return
    return (
        <div className='edit-user-form'>
            <EditForm user={user} userData={userData} setUserData={setUserData} />
        </div>
    )
    //#endregion return

}

//#region externalFunctions
function EditForm(props) {
    const { user, userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className='form-edit' onSubmit={updateUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='Nombre'
                            defaultValue={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Apellido"
                            defaultValue={userData.lastname}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<MailOutlined />}
                            type="email"
                            placeholder="Correo"
                            defaultValue={userData.email}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Select
                        placeholder="Selecciona uno"
                        onChange={e => setUserData({ ...userData, role: e })}
                        default={userData.role}
                    >
                        <Option value="admin">Administrador</Option>
                        <Option value="empleado">gerente</Option>
                    </Select>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Contraseña"
                            defaultValue={userData.email}
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Input
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Repetir contraseña"
                            defaultValue={userData.email}
                            onChange={e => setUserData({ ...userData, repeatpassword: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Actualizar usuario
                </Button>
            </Form.Item>
        </Form>
    )
}
//#endregion externalFunctions