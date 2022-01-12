import React, { useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Row,
  Col,
  Collapse,
  Select,
  Divider,
  DatePicker,
  Space,
} from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
//import "../../../scss/partials/Admin/ModalAddClient.scss";
import "../../scss/modals/modal.scss"
export default function ModalAddClient(props) {
  const [visible, setVisible] = useState(false);
  const { Panel } = Collapse;
  const { Option } = Select;

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        className="modal-add-client__button"
      >
        Agregar Cliente
      </Button>
      <Modal
        title={<h3>Agregar cliente</h3>}
        centered
        visible={visible}
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        width={1000}
      >
        {/**First Collapse */}
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header="Datos personales"
            key="1"
            className="site-collapse-custom-panel"
          >
            {/** FORMULARIO 1 !!!! */}
            {/**First Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="name">
                    <p>Nombre(s):</p>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Nombre"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="lastname">
                    <p>Apellido(s):</p>
                    <Input
                      type="text"
                      name="lastname"
                      placeholder="Apellido"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {""}
                <Form>
                  <Form.Item name="sex">
                    <p>Sexo:</p>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Sexo"
                    >
                      <Option value="Mujer">Mujer</Option>
                      <Option value="Hombre">Hombre</Option>
                      <Option value="Otro">Otro</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            {/**Second Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                {/*Fecha de nacimiento*/}
                <p>Fecha de nacimiento:</p>
                <Space direction="vertical" size={200}>
                  <DatePicker />
                </Space>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="phone">
                    <p>Teléfono:</p>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Teléfono"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="email">
                    <p>Correo electrónico:</p>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Correo electrónico"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            {/**Third Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                {""}
                <Form>
                  <Form.Item name="civilstate">
                    <p>Estado Civil:</p>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Estado Civil"
                    >
                      <Option value="Soltero">Soltero</Option>
                      <Option value="Casado">Casado</Option>
                      <Option value="Otro">Otro</Option>
                    </Select>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            {/**Address Data! */}
            <Divider orientation="left">Dirección: </Divider>
            {/**Fourth Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="delegation">
                    <p>Municipio / Delegación:</p>
                    <Input
                      type="text"
                      name="delegation"
                      placeholder="Municipio"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="city">
                    <p>Ciudad:</p>
                    <Input
                      type="text"
                      name="city"
                      placeholder="Ciudad"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="state">
                    <p>Estado:</p>
                    <Input
                      type="text"
                      name="state"
                      placeholder="Estado"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="postalcode">
                    <p>Código Postal:</p>
                    <Input
                      type="text"
                      name="postalcode"
                      placeholder="Código Postal"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            {/**Fifth Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="street">
                    <p>Calle:</p>
                    <Input
                      type="text"
                      name="street"
                      placeholder="Calle"
                      style={{ width: 270 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="interiornumber">
                    <p>No. Interior:</p>
                    <Input
                      type="text"
                      name="interiornumber"
                      placeholder="No. Interior"
                      style={{ width: 130 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="exteriornumber">
                    <p>No. Exterior:</p>
                    <Input
                      type="text"
                      name="exteriornumber"
                      placeholder="No. Exterior"
                      style={{ width: 130 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="region">
                    <p>Colonia / Región:</p>
                    <Input
                      type="text"
                      name="region"
                      placeholder="Colonia"
                      style={{ width: 270 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        {/**Second Collapse */}
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header="Información Adicional"
            key="2"
            className="site-collapse-custom-panel"
          >
            {/**FORMULARIO 2!!! */}
            {/**Sixth Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="emergencycontact">
                    <p>Contacto de emergencia:</p>
                    <Input
                      type="tel"
                      name="emergencycontact"
                      placeholder="Contacto de emergencia"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="contactname">
                    <p>Nombre del contacto:</p>
                    <Input
                      type="text"
                      name="contactname"
                      placeholder="Nombre del contacto"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="relationship">
                    <p>Parentesco:</p>
                    <Input
                      type="text"
                      name="relationship"
                      placeholder="Parentesco"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            {/**Seventh Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="info1">
                    <p>Campo1:</p>
                    <Input
                      type="text"
                      name="info1"
                      placeholder="info1"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="info2">
                    <p>Campo2:</p>
                    <Input
                      type="text"
                      name="info2"
                      placeholder="info2"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="info3">
                    <p>Campo3:</p>
                    <Input
                      type="text"
                      name="info3"
                      placeholder="info3"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
            {/**Eigth Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="info4">
                    <p>Campo4:</p>
                    <Input
                      type="text"
                      name="info4"
                      placeholder="info4"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="info5">
                    <p>Campo5:</p>
                    <Input
                      type="text"
                      name="info5"
                      placeholder="info5"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col>
                {" "}
                <Form>
                  <Form.Item name="info6">
                    <p>Campo6:</p>
                    <Input
                      type="text"
                      name="info6"
                      placeholder="info6"
                      style={{ width: 200 }}
                    />
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Panel>
        </Collapse>
        {/**Third Collapse */}
        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined rotate={isActive ? 90 : 0} />
          )}
          className="site-collapse-custom-collapse"
        >
          <Panel
            header="Pagos y beneficios"
            key="3"
            className="site-collapse-custom-panel"
          >
            {/**FORMULARIO 3!!! */}
            {/**Ninth Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col></Col>
              <Col></Col>
            </Row>
            {/**Tenth Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col></Col>
              <Col></Col>
            </Row>
            {/**Eleventh Row Responsive Form */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col></Col>
              <Col></Col>
            </Row>
          </Panel>
        </Collapse>
      </Modal>
    </>
  );
}

/** <> and </> is another way of representing <Fragment><Fragment/> tag to return more than one component in React! */
