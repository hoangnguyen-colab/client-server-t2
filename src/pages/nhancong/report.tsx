import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, Typography, InputNumber, Pagination, Input, Button, Select } from 'antd';
import { getNhanCongRetired, getNhanCongAge } from '@core/services/API';
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

function index() {
  return (
    <>
      <Layout title={'Thong ke nhan cong'}>
        <div>
          <NhanCongRetired />
        </div>
        <br />
        <div>
          <NhanCongAge />
        </div>
      </Layout>
    </>
  );
}

export default withAuth(index);
