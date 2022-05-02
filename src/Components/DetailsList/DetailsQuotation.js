import React from 'react';
import { Form, Avatar, Row, Col, Card } from 'antd';
import './ListComponent.scss';
import { TagsOutlined } from '@ant-design/icons';
//import styles from './your-stylesheet.css';


export default function DetailsQuotation(props) {

    //#region constants
    const { Meta } = Card;
    const { values } = props;
    const label = {
        1:"Clave:",
        2:"Fecha creación:",
        3:"Fecha actualización:",
        4:"Cliente",
        5:"Tipo:",
        6:"Status:",
        7:"Tienda:",
        8:"Descuento:",
        9:"Total:",
        10:"Vendedor:",
        11:"Descripción:",
    }
    //#endregion constants

    //#region return
    return (
        //dataSource={props.dataDetails}
        <div>
            <Row >
                <Col style={{ padding: '0px 14px 0px 10px' }}  >
                    <Meta avatar={<Avatar style={{ backgroundColor: '#ffc107' }} icon={<TagsOutlined />} />} />
                </Col>
                <Col span={21} >
                    <Form
                        className='details-list'
                        labelAlign="left"
                        colon={false}>
                        <Form.Item label={label[1]}>
                            {values.key}
                        </Form.Item>
                        <Form.Item label={label[2]}>
                            {values.createDate}
                        </Form.Item>
                        <Form.Item label={label[3]}>
                            {values.updateDate}
                        </Form.Item>
                        <Form.Item label={label[4]}>
                            {values.customer}
                        </Form.Item>
                        <Form.Item label={label[5]}>
                            {values.type}
                        </Form.Item>
                        <Form.Item label={label[6]}>
                            {values.status}
                        </Form.Item>
                        <Form.Item label={label[7]}>
                            {values.store}
                        </Form.Item>
                        <Form.Item label={label[8]}>
                            {values.discountAmount}
                        </Form.Item>
                        <Form.Item label={label[9]}>
                            {values.total}
                        </Form.Item>
                        <Form.Item label={label[10]}>
                            {values.vendedor}
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

