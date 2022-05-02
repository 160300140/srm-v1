import React from 'react';
import { Form, Avatar, Row, Col, Card } from 'antd';
import './ListComponent.scss';
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function DetailsSale(props) {

    //#region constants
    const { Meta } = Card;
    const { values } = props;
    const label = {
        1:"Clave:",
        2:"Cliente",
        3:"Vendedor:",
        4:"Total:",
        5:"Descripción:",
    }
    //#endregion constants

    //#region return
    return (
        //dataSource={props.dataDetails}
        <div>
            <Row >
                <Col style={{ padding: '0px 14px 0px 10px' }}  >
                    <Meta avatar={<Avatar style={{ backgroundColor: '#DC143C' }} icon={<ShoppingCartOutlined />} />} />
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
                            {values.customer}
                        </Form.Item>
                        <Form.Item label={label[3]}>
                            {values.user}
                        </Form.Item>
                        <Form.Item label={label[4]}>
                            {values.discountAmount}
                        </Form.Item>
                        <Form.Item label={label[5]}>
                            {values.description}
                        </Form.Item>
                        
                    </Form>
                </Col>
            </Row>
        </div>
    )
    //#endregion return
}

