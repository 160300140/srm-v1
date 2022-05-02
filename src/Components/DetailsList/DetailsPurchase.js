import React, { useEffect, useState } from 'react';
import { Form, Avatar, Row, Col, Card } from 'antd';
import './ListComponent.scss';
import { ConsoleSqlOutlined, TagsOutlined } from '@ant-design/icons';
import { Image, Space } from 'antd';
import { thumbUrl } from '../../img/ExampleImg'
//import styles from './your-stylesheet.css';


export default function DetailsPurchase(props) {

    //#region constants
    const { Meta } = Card;
    const { values } = props;
    const [item, setItem] = useState();
    const [valuesOn] = useState(false);
    // eslint-disable-next-line no-undef
    const label = {
        1: "Nombre:",
        2: "Clave:",
        3: "Precio:",
        4: "Modelo:",
        5: "Stock:",
        6: "Tipo:",
        7: "Descuento:",
        8: "Fecha: expiración",
        9: "Proveedor:",
        10: "Descripción:",
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
                        //labelCol={{ flex: '70px' }}
                        labelAlign="left"
                        //wrapperCol={{ flex: 1 }}
                        colon={false}>
                        <Form.Item label={label[1]}>
                            {values.name}
                        </Form.Item>
                        <Form.Item label={label[2]}>
                            {values.key}
                        </Form.Item>
                        <Form.Item label={label[3]}>
                            {values.price}
                        </Form.Item>
                        <Form.Item label={label[4]}>
                            {values.model}
                        </Form.Item>
                        <Form.Item label={label[5]}>
                            {values.stock}
                        </Form.Item>
                        <Form.Item label={label[6]}>
                            {values.type}
                        </Form.Item>
                        <Form.Item label={label[7]}>
                            {values.discountPercent}
                        </Form.Item>
                        <Form.Item label={label[8]}>
                            {values.expiryDate}
                        </Form.Item>
                        <Form.Item label={label[9]}>
                            {values.provider}
                        </Form.Item>
                        <Form.Item label={label[10]}>
                            {values.description}
                        </Form.Item>
                        <Form.Item label={label[12]}>
                            <Space size={12}>
                                <Image width={300} src={values.image? values.image: thumbUrl} alt="data" />
                            </Space>
                        </Form.Item>

                    </Form>
                </Col>
            </Row>
        </div>
    )
    //#endregion return
}

