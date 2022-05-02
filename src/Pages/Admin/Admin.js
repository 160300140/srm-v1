import React from 'react';
import { Row, Col, Card } from 'antd';
import Top5SaleByDoctor from './dashboard/Top5SaleByDoctor'
import SaleByStore from './dashboard/SaleByStore';
import Top5ProductSale from './dashboard/Top5ProductSale';
import TopStatistics from './dashboard/TopStatistics';

export default function Admin() {
  return (
    <div className="container-fluid cew-9">
      <TopStatistics />
      <br />
      <Row gutter={[18]}>
        <Col span={18}>
          <SaleByStore />
        </Col>
        <Col span={6} className="row-statistic">
          <Card style={{ borderRadius: '8px', borderStyle: 'solid', borderWidth: '1px', borderColor: '#d9d9d9' }}>
            <strong>
              Top 5 productos vendidos
            </strong>
            <Top5ProductSale />
          </Card>
          <br />
          <Card style={{ borderRadius: '8px', borderStyle: 'solid', borderWidth: '1px', borderColor: '#d9d9d9' }} >
            <strong>
              Top 5 ventas por doctor
            </strong>
            <Top5SaleByDoctor />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

//ReactDOM.render(<admin />, document.getElementById('root'));