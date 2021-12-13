import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, Typography, DatePicker, Pagination, InputNumber, Button, Select } from 'antd';
import { getListRegistration, getListExpiryDate } from '@core/services/API';
const { Option } = Select;
const { Title } = Typography;

const ExpiryDateProduct = () => {
  const [productData, setProductData] = useState<any>();
  const [daysLeft, setDaysLeft] = useState<any>(1);

  useEffect(() => {
    getListSp();
  }, [daysLeft]);

  const getListSp = async () => {
    getListExpiryDate(daysLeft)
      .then((resp) => {
        const data = resp.data;
        setProductData(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const columns = [
    {
      title: 'Mã Sản Phẩm',
      dataIndex: 'maSanPham',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'tenSanPham',
    },
    {
      title: 'Số Đăng Ký',
      dataIndex: 'soDangKy',
    },
    {
      title: 'Ngày Đăng Ký',
      dataIndex: 'ngayDangKy',
    },
    {
      title: 'Ngày Sản Xuất',
      dataIndex: 'ngaySanXuat',
    },
    {
      title: 'Hạn Sử Dụng',
      dataIndex: 'hanSuDung',
    },
  ];

  return (
    <div>
      <Title level={2}>Thống kê theo hạn sử dụng còn lại</Title>
      <InputNumber placeholder="Hạn sử dụng còn lại" style={{ width: 200 }} onChange={(value) => setDaysLeft(value)} />
      <Button
        type="primary"
        onClick={() => {
          getListSp();
        }}
      >
        Tìm kiếm
      </Button>
      <Table columns={columns} dataSource={productData} pagination={false} />
    </div>
  );
};

const SanPhamNDK = () => {
  const [productData, setProductData] = useState<any>();
  const [ndk, setNdk] = useState<any>('20190815');
  useEffect(() => {
    getListSp();
  }, [ndk]);

  const getListSp = async () => {
    getListRegistration(ndk)
      .then((resp) => {
        const data = resp.data;
        console.log(`data`, data);
        setProductData(data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const onDateChange = (date: any, dateString: any) => {
    const selectedDate = dateString.replaceAll('-', '');
    setNdk(selectedDate);
  };

  const columns = [
    {
      title: 'Mã Sản Phẩm',
      dataIndex: 'maSanPham',
    },
    {
      title: 'Tên Sản Phẩm',
      dataIndex: 'tenSanPham',
    },
    {
      title: 'Số Đăng Ký',
      dataIndex: 'soDangKy',
    },
    {
      title: 'Ngày Đăng Ký',
      dataIndex: 'ngayDangKy',
    },
    {
      title: 'Ngày Sản Xuất',
      dataIndex: 'ngaySanXuat',
    },
    {
      title: 'Hạn Sử Dụng',
      dataIndex: 'hanSuDung',
    },
  ];

  return (
    <div>
      <Title level={2}>Sản phẩm có ngày đăng ký trước:</Title>
      <DatePicker onChange={onDateChange} />
      <Table columns={columns} dataSource={productData} pagination={false} />
    </div>
  );
};

function index() {
  return (
    <>
      <Layout title={'Thong ke cong viec'}>
        <div>
          <ExpiryDateProduct />
        </div>
        <br />
        <div>
          <SanPhamNDK />
        </div>
      </Layout>
    </>
  );
}

export default withAuth(index);
