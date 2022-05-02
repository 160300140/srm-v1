import React from 'react';
import { Bar } from '@ant-design/plots';

const Top5ProductSale = () => {
  const data = [
    {
      producto: 'Abono',
      ventas: 35,
    },
    {
      producto: 'Resina Dental',
      ventas: 27,
    },
    {
      producto: 'Cita Mensual',
      ventas: 18,
    },
    {
      producto: 'Limpieza Dental',
      ventas: 13,
    },
    {
      producto: 'Blanqueamiento',
      ventas: 7,
    },
  ];
  const config = {
    data,
    xField: 'ventas',
    yField: 'producto',
    seriesField: 'producto',
    maxBarWidth: 15,
    legend: false,
    meta: {
      producto: {
        alias: 'product',
      },
      ventas: {
        alias: 'sales',
      },
    },
  };
  return <Bar style={{ height: '190px' }} {...config} />
 
};

export default Top5ProductSale;