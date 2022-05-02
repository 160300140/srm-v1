import React from 'react';
import { Form, Avatar, Row, Col, Card } from 'antd';
import './ListComponent.scss';
import { UserOutlined } from '@ant-design/icons';
//import styles from './your-stylesheet.css';

//dataSource={props.dataDetails}

export default function DetailsClient(props) {

    //#region constants
    const { values } = props;
    const { Meta } = Card;
    //const fullName = values.name + " " + values.lastName + " " + values.surName;
    const label = {
        1: "Nombre completo:",
        2: "Clave:",
        3: "Fecha nacimiento:",
        4: "Tipo de cliente",
        5: "Género:",
        6: "Dato RFC:",
        7: "Empresa:",
        8: "Profesión:",
        9: "No. de contacto:",
        10: "Correo electrónico:",
        11: "Descripción:"
    }
    //#endregion constants

    //#region return
    return (
        //dataSource={props.dataDetails}
        <div>
            <Row >
                <Col style={{ padding: '0px 14px 0px 10px' }}  >
                    <Meta avatar={<Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />} />
                </Col>
                <Col span={21} >
                    <Form
                        className='details-list'
                        //labelCol={{ flex: '70px' }}
                        labelAlign="left"
                        //wrapperCol={{ flex: 1 }}
                        colon={false}>
                        <Form.Item label={label[1]} >
                            {values.name}
                        </Form.Item>
                        <Form.Item label={label[2]}>
                            {values.customerNumer}
                        </Form.Item>
                        <Form.Item label={label[3]}>
                            {values.dateBirth}
                        </Form.Item>
                        <Form.Item label={label[4]}>
                            {values.type}
                        </Form.Item>
                        <Form.Item label={label[5]}>
                            {values.gender}
                        </Form.Item>
                        <Form.Item label={label[6]}>
                            {values.rfc}
                        </Form.Item>
                        <Form.Item label={label[7]}>
                            {values.businessName}
                        </Form.Item>
                        <Form.Item label={label[8]}>
                            {values.profession}
                        </Form.Item>
                        <Form.Item label={label[9]}>
                            {values.phoneNumber}
                        </Form.Item>
                        <Form.Item label={label[10]}>
                            {values.mail}
                        </Form.Item>
                        <Form.Item label={label[11]}>
                            {values.description}
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
    //#endregion return
}