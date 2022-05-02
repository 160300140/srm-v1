import React from 'react';
import { Form, Avatar, Row, Col, Card } from 'antd';
import './ListComponent.scss';
import { ContactsOutlined } from '@ant-design/icons';

export default function DetailsHumanRes(props) {
    //#region constants
    const { Meta } = Card;
    const { values } = props;
    const label = {
        1:"Nombre:",
        2:"Clave:",
        3:"No. Seguro social:",
        4:"RFC:",
        5:"Género:",
        6:"Estado civil:",
        7:"Fecha de nacimiento:",
        8:"Contacto de emergencia:",
        9:"Teléfono de contacto:",
        10:"Puesto:",
        11:"Correo del trabajo:",
        12:"Local/Sucursal",
        13:"Dirección",
        14:"Descripción de puesto:",
    }
    //#endregion constants

    //#region return
    return (
        //dataSource={props.dataDetails}
        <div>
            <Row >
                <Col style={{ padding: '0px 14px 0px 10px' }}  >
                    <Meta avatar={<Avatar style={{ backgroundColor: '#F08080' }} icon={<ContactsOutlined />} />} />
                </Col>
                <Col span={21} >
                    <Form
                        className='details-list'
                        //labelCol={{ flex: '70px' }}
                        labelAlign="left"
                        //wrapperCol={{ flex: 1 }}
                        colon={false}>
                        <Form.Item label={label[1]}>
                            {values.fullName}
                        </Form.Item>
                        <Form.Item label={label[2]}>
                            {values.key}
                        </Form.Item>
                        <Form.Item label={label[3]}>
                            {values.nss}
                        </Form.Item>
                        <Form.Item label={label[4]}>
                            {values.rfc}
                        </Form.Item>
                        <Form.Item label={label[5]}>
                            {values.gender}
                        </Form.Item>
                        <Form.Item label={label[6]}>
                            {values.marital}
                        </Form.Item>
                        <Form.Item label={label[7]}>
                            {values.birthday}
                        </Form.Item>
                        <Form.Item label={label[8]}>
                            {values.emergencyContact}
                        </Form.Item>
                        <Form.Item label={label[9]}>
                            {values.emergencyPhone}
                        </Form.Item>
                        <Form.Item label={label[10]}>
                            {values.jobTitle}
                        </Form.Item>
                        <Form.Item label={label[11]}>
                            {values.workEmail}
                        </Form.Item>
                        <Form.Item label={label[12]}>
                            {values.store.name}
                        </Form.Item>
                        <Form.Item label={label[13]}>
                            {values.fullAddress}
                        </Form.Item>
                        <Form.Item label={label[14]}>
                            {values.description}
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
    //#endregion return
}

