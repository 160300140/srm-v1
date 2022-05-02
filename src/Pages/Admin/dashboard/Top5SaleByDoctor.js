import React from 'react';
import { Bar } from '@ant-design/plots';

const Top5SaleByDoctor = () => {
  //Top5SaleByDoctor
  const data = [
    {
      medico: 'Karina',
      value: 35,
    },
    {
      medico: 'Karla',
      value: 27,
    },
    {
      medico: 'Roxana',
      value: 18,
    },
    {
      medico: 'Wendy',
      value: 13,
    },
    {
      medico: 'Anaisly',
      value: 7,
    },
  ];
  const config = {
    data,
    xField: 'value',
    yField: 'medico',
    seriesField: 'medico',
    color: ({ producto }) => {
      return producto === 'meta' ? '#FAAD14' : '#5B8FF9';
    },
    legend: {
      position: 'top-left',
    },
  };
  return <Bar style={{ height: '200px' }} {...config} />
};

export default Top5SaleByDoctor;