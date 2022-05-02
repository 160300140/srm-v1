import React from 'react';
import { Line } from '@ant-design/plots';
import { Card } from 'antd';


const SaleByStore = () => {
  //SaleByStore
  /*   const [data, setData] = useState([]);
    useEffect(() => {
      asyncFetch();
    }, []);
    //Example of data
    const asyncFetch = () => {
      fetch('https://gw.alipayobjects.com/os/bmw-prod/55424a73-7cb8-4f79-b60d-3ab627ac5698.json')
        .then((response) => response.json())
        .then((json) => setData(json))
        .catch((error) => {
          console.log('fetch data failed', error);
        });
    };
    const config = {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'category',
      xAxis: {
        type: 'time',
      },
      yAxis: {
        label: {
          formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
        },
      },
    }; */


  const data = [
    { year: '1991', month: 'Enero', value: 3, category: 'Cancún' },
    { year: '1991', month: 'Enero', value: 4, category: 'Mérida' },
    { year: '1992', month: 'Febero', value: 4, category: 'Cancún' },
    { year: '1992', month: 'Febrero', value: 3, category: 'Mérida' },
    { year: '1993', month: 'Marzo', value: 3.5, category: 'Cancún' },
    { year: '1993', month: 'Marzo', value: 3.5, category: 'Mérida' },
    { year: '1994', month: 'Abril', value: 5, category: 'Mérida' },
    { year: '1994', month: 'Abril', value: 7, category: 'Cancún' },
    { year: '1995', month: 'Mayo', value: 3, category: 'Cancún' },
    { year: '1995', month: 'Mayo', value: 4.9, category: 'Mérida' },
    { year: '1996', month: 'Junio', value: 6, category: 'Mérida' },
    { year: '1996', month: 'Junio', value: 5.5, category: 'Cancún' },
    { year: '1997', month: 'Agosto', value: 7, category: 'Mérida' },
    { year: '1997', month: 'Agosto', value: 6, category: 'Cancún' },
    { year: '1998', month: 'septiembre', value: 9, category: 'Mérida' },
    { year: '1998', month: 'septiembre', value: 9, category: 'Cancún' },
    { year: '1999', month: 'Octubre', value: 13, category: 'Mérida' },
    { year: '1999', month: 'Octubre', value: 11, category: 'Cancún' },
  ];

  const config = {
    data,
    height: 400,
    xField: 'month',
    yField: 'value',
    seriesField: 'category',
    /* xAxis: {
      type: 'year',
    }, */
    yAxis: {
      label: {
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
    legend: {
      position: 'top',
    },
    point: {
      size: 4,
      shape: 'diamond | circule',
    },
    slider: {
      start: 0,
      //end: 0.1,
    },
    tooltip: {
      formatter: (data) => {
        return {
          name: data.category,
          // eslint-disable-next-line no-undef
          value: data.value,
        };
      },
      customContent: (name, data) =>
        `<div>${data?.map((item) => {
          return `<div className="tooltip-chart" >
                <span className="tooltip-item-name">${item?.name}</span>
                <span className="tooltip-item-value">${item?.value}</span>
              </div>`;
        })}</div>`,
      showMarkers: Boolean,
      showContent: Boolean,
      position: "right | left",
      showCrosshairs: Boolean,
    },
  };
  return <Card style={{ borderRadius: '8px', borderStyle: 'solid', borderWidth: '1px', borderColor: '#d9d9d9' }}>
    <strong style={{ fontSize: '24px', marginBottom: '16px' }}>
      Tendencia de venta por sucursal
    </strong>
    <Line style={{ marginTop: '16px' }} {...config} />
  </Card>;
};

export default SaleByStore;