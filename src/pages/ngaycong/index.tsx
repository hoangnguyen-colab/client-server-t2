import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, DatePicker } from 'antd';
import { getNgayCong } from '@core/services/API';

function index() {
  const [slkData, setSlkData] = useState([]);
  const [date, setDate] = useState<string>('20190719');

  useEffect(() => {
    getNgayCongList();
  }, [date]);

  const getNgayCongList = async () => {
    getNgayCong(date)
      .then((resp: any) => {
        console.log(resp.data);

        setSlkData(resp.data);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: 'Ho Ten',
      dataIndex: 'hoTen',
    },
    {
      title: 'Số công',
      dataIndex: 'soCong',
    },
  ];
  function onChange(date: any, dateString: any) {
    const selectedDate = dateString.replaceAll('-', '');
    setDate(selectedDate);
  }
  return (
    <Layout title={'Staff'}>
      <div>
        <DatePicker onChange={onChange} />
      </div>
      <div>
        <Table columns={columns} dataSource={slkData} />
      </div>
    </Layout>
  );
}

export default withAuth(index);
