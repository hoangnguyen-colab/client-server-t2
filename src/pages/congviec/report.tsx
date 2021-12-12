import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, Typography, Space, Pagination, Input, Button, Select } from 'antd';
import { getListAVG, getListMost, getListSLKMost } from '@core/services/API';
const { Option } = Select;
const { Title } = Typography;

const CongViecMost = () => {
  const [productData, setProductData] = useState<any>();
  const [donGia, setDonGia] = useState<any>(null);

  useEffect(() => {
    getNhanCongList();
  }, [donGia]);

  const getNhanCongList = async () => {
    getListMost(donGia)
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
      title: 'Mã công việc',
      dataIndex: 'maCongViec',
    },
    {
      title: 'Tên công việc',
      dataIndex: 'tenCongViec',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
    },
    {
      title: 'Định mức khoán',
      dataIndex: 'dinhMucKhoan',
    },
    {
      title: 'Đơn vị khoán',
      dataIndex: 'donViKhoan',
    },
    {
      title: 'Hệ số khoán',
      dataIndex: 'heSoKhoan',
    },
  ];

  return (
    <div>
      <Title level={2}>Công việc nhiều/ít đơn giá nhất</Title>
      <Select defaultValue={'max'} style={{ width: 120 }} onChange={(value) => setDonGia(value)}>
        <Option value={'max'}>Max</Option>
        <Option value={'min'}>Min</Option>
      </Select>
      <Table columns={columns} dataSource={productData} pagination={false} />
    </div>
  );
};

const CongViecAVG = () => {
  const [productData, setProductData] = useState<any>();
  const [type, setType] = useState<any>('greater');

  useEffect(() => {
    getNhanCongList();
  }, [type]);

  const getNhanCongList = async () => {
    getListAVG(type)
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
      title: 'Mã công việc',
      dataIndex: 'maCongViec',
    },
    {
      title: 'Tên công việc',
      dataIndex: 'tenCongViec',
    },
    {
      title: 'Đơn giá',
      dataIndex: 'donGia',
    },
    {
      title: 'Định mức khoán',
      dataIndex: 'dinhMucKhoan',
    },
    {
      title: 'Đơn vị khoán',
      dataIndex: 'donViKhoan',
    },
    {
      title: 'Hệ số khoán',
      dataIndex: 'heSoKhoan',
    },
  ];

  return (
    <div>
      <Title level={2}>Công việc Lớn/Nhỏ hơn trung bình</Title>
      <Select defaultValue={'greater'} style={{ width: 120 }} onChange={(value) => setType(value)}>
        <Option value={'greater'}>LỚN hơn trung bình</Option>
        <Option value={'smaller'}>NHỎ hơn trung bình</Option>
      </Select>
      <Table columns={columns} dataSource={productData} pagination={false} />
    </div>
  );
};

const CongViecSLKMost = () => {
  const [productData, setProductData] = useState<any>();

  useEffect(() => {
    getNhanCongList();
  }, []);

  const getNhanCongList = async () => {
    getListSLKMost()
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
      title: 'Mã công việc',
      dataIndex: 'maCongViec',
    },
    {
      title: 'Tên công việc',
      dataIndex: 'tenCongViec',
    },
    {
      title: 'Số lượng',
      dataIndex: 'SoLuong',
    },
  ];

  return (
    <div>
      <Title level={2}>Công việc nhiều slk</Title>
      <Table columns={columns} dataSource={productData} pagination={false} />
    </div>
  );
};

function index() {
  return (
    <>
      <Layout title={'Thong ke cong viec'}>
        <div>
          <CongViecMost />
        </div>
        <br />
        <div>
          <CongViecAVG />
        </div>
        <br />
        <div>
          <CongViecSLKMost />
        </div>
      </Layout>
    </>
  );
}

export default withAuth(index);
