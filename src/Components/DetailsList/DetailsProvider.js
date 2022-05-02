import React from 'react';
import { Form, Avatar, Row, Col, Card } from 'antd';
import './ListComponent.scss';
import { TeamOutlined } from '@ant-design/icons';

export default function DetailsProvider(props) {

    //#region constants
    const { Meta } = Card;
    const { values } = props;
    const label = {
        1:"Nombre:",
        2:"clave RFC:",
        3:"Sociedad mercantil:",
        4:"No. contacto:",
        5:"status:",
        6:"Categoria:",
        7:"Dirección:",
        8:"Descripción:",
    }
    //#endregion constants

    //#region return
    return (
        //dataSource={props.dataDetails}
        <div>
            <Row >
                <Col style={{ padding: '0px 14px 0px 10px' }}  >
                    <Meta avatar={<Avatar style={{ backgroundColor: '#62DBFB' }} icon={<TeamOutlined />} />} />
                </Col>
                <Col span={21} >
                    <Form
                        className='details-list'
                        labelAlign="left"
                        colon={false}>
                        <Form.Item label={label[1]}>
                            {values.name}
                        </Form.Item>
                        <Form.Item label={label[2]}>
                            {values.rfc}
                        </Form.Item>
                        <Form.Item label={label[3]}>
                            {values.businessName}
                        </Form.Item>
                        <Form.Item label={label[4]}>
                            {values.phoneNumber}
                        </Form.Item>
                        <Form.Item label={label[5]}>
                            {values.status}
                        </Form.Item>
                        <Form.Item label={label[6]}>
                            {values.category}
                        </Form.Item>
                        <Form.Item label={label[7]}>
                            {values.address}
                        </Form.Item>
                        <Form.Item label={label[8]}>
                            {values.description}
                        </Form.Item>
                        
                    </Form>
                </Col>
            </Row>
        </div>
    )
    //#endregion return
}

