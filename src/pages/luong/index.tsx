import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, Modal, Checkbox, Pagination, DatePicker, Input, Button, Select } from 'antd';
import { getLuongSP } from '@core/services/API';
const { Option } = Select;

function index() {
  const [slkData, setSlkData] = useState([]);
  const [date, setDate] = useState<string>('20200701');
  const [type, setType] = useState<string>('max');

  useEffect(() => {
    getSLKList();
  }, [date, type]);

  const getSLKList = async () => {
    getLuongSP(date, type)
      .then((resp: any) => {
        setSlkData(resp.data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  const columns = [
    {
      title: 'Mã Nhân Công',
      dataIndex: 'maNhanCong',
    },
    {
      title: 'Họ Tên',
      dataIndex: 'hoTen',
    },
    {
      title: 'Lương',
      dataIndex: 'Luong',
    },
  ];

  function onDateChange(date: any, dateString: any) {
    let selectedDate = dateString.replaceAll('-', '') + '01';
    setDate(selectedDate);
  }

  return (
    <Layout title={'SLK'}>
      <div>
        <div>
          <DatePicker onChange={onDateChange} picker={'month'} />
          <Select defaultValue={'max'} style={{ width: 120 }} onChange={(value) => setType(value)}>
            <Option value={'max'}>Lớn nhất</Option>
            <Option value={'min'}>Nhỏ nhất</Option>
          </Select>
        </div>
      </div>
      <div>
        <Table columns={columns} dataSource={slkData} pagination={false} />
      </div>
    </Layout>
  );
}

export default withAuth(index);
