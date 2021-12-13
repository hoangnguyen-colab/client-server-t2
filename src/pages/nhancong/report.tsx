import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, Typography, InputNumber, DatePicker, Input, Button, Select } from 'antd';
import { getNhanCongRetired, getNhanCongAge, getNhanCongShift } from '@core/services/API';
const { Option } = Select;
const { Title } = Typography;

const NhanCongRetired = () => {
  const [productData, setProductData] = useState<any>();
  const [gender, setGender] = useState<any>('nam');

  useEffect(() => {
    getNhanCongList();
  }, [gender]);

  const getNhanCongList = async () => {
    getNhanCongRetired(gender)
      .then((resp) => {
        const data = resp.data;
        setProductData(data.Data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const columns = [
    {
      title: 'Mã nhân công',
      dataIndex: 'maNhanCong',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
    },
    {
      title: 'Chức vụ',
      dataIndex: 'chucVu',
    },
    {
      title: 'Giới thiệu',
      dataIndex: 'gioiTinh',
    },
    {
      title: 'Lương bảo hiểm',
      dataIndex: 'luongBaoHiem',
    },
    {
      title: 'Phòng ban',
      dataIndex: 'phongBan',
    },
    {
      title: 'Quê quán',
      dataIndex: 'queQuan',
    },
  ];

  return (
    <div>
      <Title level={2}>Công nhân nghỉ hưu</Title>
      <Select defaultValue={'nam'} style={{ width: 120 }} onChange={(value) => setGender(value)}>
        <Option value={'nam'}>Nam</Option>
        <Option value={'nu'}>Nữ</Option>
      </Select>
      <Table columns={columns} dataSource={productData} pagination={false} />
    </div>
  );
};

const NhanCongAge = () => {
  const [productData, setProductData] = useState<any>();
  const [start, setStart] = useState<any>(30);
  const [end, setEnd] = useState<any>(45);

  useEffect(() => {
    getNhanCongList();
  }, []);

  const getNhanCongList = async () => {
    getNhanCongAge(start, end)
      .then((resp) => {
        const data = resp.data;
        setProductData(data.Data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const columns = [
    {
      title: 'Mã nhân công',
      dataIndex: 'maNhanCong',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
    },
    {
      title: 'Quê quán',
      dataIndex: 'queQuan',
    },
  ];

  return (
    <div>
      <Title level={2}>Công nhân trong độ tuổi</Title>
      Start: <InputNumber min={18} max={98} defaultValue={start} onChange={(value) => setStart(value)} />
      End: <InputNumber min={start + 1} max={100} defaultValue={end} onChange={(value) => setEnd(value)} />
      <Button type="primary" onClick={getNhanCongList}>
        Tìm kiếm
      </Button>
      <Table columns={columns} dataSource={productData} pagination={false} />
    </div>
  );
};

const NhanCongShift = () => {
  const [productData, setProductData] = useState<any>();
  const [caLam, setCaLam] = useState<any>(1);
  const [date, setDate] = useState<any>('20200701');

  useEffect(() => {
    getNhanCongList();
  }, [caLam, date]);

  const getNhanCongList = async () => {
    getNhanCongShift(date, caLam)
      .then((resp) => {
        const data = resp.data;
        setProductData(data.Data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  function onDateChange(date: any, dateString: any) {
    let selectedDate = dateString.replaceAll('-', '');
    setDate(selectedDate);
  }

  const columns = [
    {
      title: 'Mã nhân công',
      dataIndex: 'maNhanCong',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'ngaySinh',
    },
    {
      title: 'Quê quán',
      dataIndex: 'queQuan',
    },
  ];

  return (
    <div>
      <Title level={2}>Công nhân ca làm</Title>
      <DatePicker onChange={onDateChange} />
      <Select defaultValue={1} style={{ width: 120 }} onChange={(value) => setCaLam(value)}>
        <Option value={1}>Ca 1: 6h - 14h</Option>
        <Option value={2}>Ca 2: 14h - 22h</Option>
        <Option value={3}>Ca 3: 22h - 6h</Option>
      </Select>
      <Table columns={columns} dataSource={productData} pagination={false} />
    </div>
  );
};

function index() {
  return (
    <>
      <Layout title={'Thong ke nhan cong'}>
        <div>
          <NhanCongAge />
        </div>
        <br />
        <div>
          <NhanCongShift />
        </div>
        <br />
        <div>
          <NhanCongRetired />
        </div>
      </Layout>
    </>
  );
}

export default withAuth(index);
