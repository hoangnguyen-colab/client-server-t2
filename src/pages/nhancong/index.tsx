import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, Modal, Space, Pagination, Input, Button, Select } from 'antd';
// import axios from 'axios';
// import Cookies from 'js-cookie';
import { getListNhanCong, deleteNhanCong } from '@core/services/API';
const { Option } = Select;
import ModalEditStaffInfo from './ModalEditStaff';
// import ModalEditStaffInfo from './ModalEditStaffInfo';
// import { getListStaff } from 'core/services/staff';

function index() {
  const [productData, setProductData] = useState<any>();
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [role, setRole] = useState<any>();
  const [listStaff, setListStaff] = useState<any>();
  const [staffID, setStaffID] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('id_asc');
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    getNhanCongList();
  }, [currentPage]);

  const getNhanCongList = async () => {
    getListNhanCong(currentPage - 1, pageSize, search, sort)
      .then((resp) => {
        const data = resp.data;
        setProductData(data.Data);
        setTotalRecord(data.TotalRecord);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const getStaffList = async () => {
    // getListStaff()
    //   .then((resp) => {
    //     console.log(`resp`, resp);
    //     setListStaff(resp?.data.Data);
    //   })
    //   .catch((error) => {
    //     console.log('error', error);
    //   });
  };

  const openDetailModal = (record: any) => {
    setOpenModal(true);
    setStaffID(record.maNhanCong);
    console.log(`record`, record);
  };
  const onPagingChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectChange = (value: any) => {
    setSort(value);
  };

  const handleSearchChange = ({ target }: any) => {
    setSearch(target.value);
  };
  const handleDeleteStaff = (id: any) => {
    deleteNhanCong(id!.toString())
      .then((resp) => {
        getListNhanCong();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const columns = [
    {
      title: 'M?? nh??n c??ng',
      dataIndex: 'maNhanCong',
    },
    {
      title: 'H??? v?? t??n',
      dataIndex: 'hoTen',
    },
    {
      title: 'Ng??y sinh',
      dataIndex: 'ngaySinh',
    },
    {
      title: 'Gi???i t??nh',
      dataIndex: 'gioiTinh',
    },
    {
      title: 'Ph??ng ban',
      dataIndex: 'phongBan',
    },
    {
      title: 'Ch???c v???',
      dataIndex: 'chucVu',
    },
    {
      title: 'Qu?? qu??n',
      dataIndex: 'queQuan',
    },
    {
      title: 'L????ng b???o hi???m',
      dataIndex: 'luongBaoHiem',
    },

    {
      title: 'Action',
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => openDetailModal(record)}>Detail </a>
          <a onClick={() => handleDeleteStaff(record.maSanPham)}>Delete</a>

          {/* <a>Delete</a> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* <Layout title={'Staff'}>
        <div>
          <Table columns={columns} dataSource={listStaff} />
          <Modal
            width={755}
            bodyStyle={{ height: 'max-content' }}
            title={'Detail of staff'}
            visible={showEditProfileModal}
            onCancel={() => setShowEditProfileModal(false)}
            // onOk={handleOkEditProfileModal}
            destroyOnClose
            footer={null}
            className="edit-profile-modal"
          >
            <ModalEditStaffInfo staffID={staffID} />
          </Modal>
        </div>
      </Layout> */}

      <Layout title={'Product'}>
        <div>
          <Input placeholder={'Search'} onChange={handleSearchChange} width="50%" />
          <Button type="primary" onClick={getNhanCongList}>
            Search
          </Button>
          <Select defaultValue={'ID 0-9'} style={{ width: 120 }} onChange={handleSelectChange}>
            <Option value={'name_asc'}>T??n A-Z</Option>
            <Option value={'name_desc'}>T??n Z-A</Option>
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
          <Modal
            width={755}
            bodyStyle={{ height: 'max-content' }}
            title={'Detail of staff'}
            visible={openModal}
            onCancel={() => setOpenModal(false)}
            onOk={() => setOpenModal(false)}
            destroyOnClose
            footer={null}
            className="edit-profile-modal"
          >
            <ModalEditStaffInfo maNhanCong={staffID} onCloseModal={() => setOpenModal(false)} />
          </Modal>
        </div>
      </Layout>
    </>
  );
}

export default withAuth(index);
