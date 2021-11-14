import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, Space, Pagination, DatePicker, Input, Button, Select } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { parse } from 'path/posix';
import Link from 'next/link';
import { deleteSanPham, getListSanPham } from '@core/services/API';
import router from 'next/router';

const { Option } = Select;

const sortSelect = [
  {
    id: 1,
    name: 'name_asc',
    title: 'Tên A-Z',
  },
  {
    id: 2,
    name: 'name_desc',
    title: 'Tên Z-A',
  },
  {
    id: 3,
    name: 'id_asc',
    title: 'ID 0-9',
  },
  {
    id: 4,
    name: 'id_desc',
    title: 'ID 9-0',
  },
];

function index() {
  const [productData, setProductData] = useState<any>();
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [date, setDate] = useState<string>('20190719');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('id_asc');

  useEffect(() => {
    getProductList();
  }, [currentPage, sort]);

  const getProductList = async () => {
    getListSanPham(currentPage - 1, pageSize, search, sort)
      .then((resp) => {
        const data = resp.data;
        setProductData(data.Data);
        setTotalRecord(data.TotalRecord);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleDeleteProduct = (id: any) => {
    deleteSanPham(id!.toString())
      .then((resp) => {
        const data = resp.data;
        getProductList();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: 'Ma San Pham',
      dataIndex: 'maSanPham',
    },
    {
      title: 'Ten San Pham',
      dataIndex: 'tenSanPham',
    },
    {
      title: 'soDangKy',
      dataIndex: 'soDangKy',
    },
    {
      title: 'ngayDangKy',
      dataIndex: 'ngayDangKy',
    },
    {
      title: 'ngaySanXuat',
      dataIndex: 'ngaySanXuat',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link href={`sanpham/${record.maSanPham}`}>
            <a>Detail</a>
          </Link>
          <a onClick={() => handleDeleteProduct(record.maSanPham)}>Delete</a>
        </Space>
      ),
    },
  ];

  const onPagingChange = (page: number) => {
    setCurrentPage(page);
  };

  function onChange(date: any, dateString: any) {
    const selectedDate = dateString.replaceAll('-', '');
    console.log(dateString.replaceAll('-', ''));
    setDate(selectedDate);
  }

  const handleSearchChange = ({ target }: any) => {
    setSearch(target.value);
  };

  const handleSelectChange = (value: any) => {
    setSort(value);
  };

  return (
    <Layout title={'Product'}>
      <div>
        <Input placeholder={'Search'} onChange={handleSearchChange} width="50%" />
        <Button type="primary" onClick={getProductList}>
          Search
        </Button>
        <DatePicker onChange={onChange} />
        <Select defaultValue={'ID 0-9'} style={{ width: 120 }} onChange={handleSelectChange}>
          <Option value={'name_asc'}>Tên A-Z</Option>
          <Option value={'name_desc'}>Tên Z-A</Option>
          <Option value={'id_asc'}>ID 0-9</Option>
          <Option value={'id_desc'}>ID 9-0</Option>
          {/* {sortSelect.map((item, index) => {
            <Option value={item.name} key={index}>{item.title}</Option>
          })} */}
        </Select>
      </div>
      <div>
        <Table columns={columns} dataSource={productData} pagination={false} />
        <Pagination
          defaultPageSize={pageSize}
          defaultCurrent={currentPage}
          onChange={onPagingChange}
          current={currentPage}
          total={totalRecord}
        />
      </div>
    </Layout>
  );
}

export default withAuth(index);
