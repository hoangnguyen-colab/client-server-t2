import React, { useEffect, useState } from 'react';
import Layout from 'Layouts';
import withAuth from '@hocs/withAuth';
import { Table, Modal, Checkbox, Pagination, DatePicker, Input, Button, Select } from 'antd';
import { getListSLK, getListSLKThang } from '@core/services/API';
import SLKModal from './SLKModal';
const { Option } = Select;

function index() {
  const [totalRecord, setTotalRecord] = useState<number>(0);
  const [selectThang, setSelectThang] = useState<boolean>(true);
  const [pageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [sort, setSort] = useState<string>('id_asc');
  const [slkData, setSlkData] = useState([]);
  const [date, setDate] = useState<string>('20190719');
  const [showEditProfileModal, setShowEditProfileModal] = React.useState<boolean>(false);

  useEffect(() => {
    getSLKList();
  }, [date, sort]);

  const getSLKList = async () => {
    getListSLK(selectThang, date, currentPage - 1, pageSize, search, sort)
      .then((resp: any) => {
        const data = resp.data;
        setSlkData(data.Data);
        setTotalRecord(data.TotalRecord);
      })
      .catch((error: any) => {
        console.log('error', error);
      });
  };

  const columns = [
    {
      title: 'Ma NKSLK',
      dataIndex: 'maNKSLK',
    },
    {
      title: 'Ho Ten',
      dataIndex: 'hoTen',
    },
    {
      title: 'Ten Cong Viec',
      dataIndex: 'tenCongViec',
    },
    {
      title: 'Ngay',
      dataIndex: 'ngay',
    },
    {
      title: 'Gio Bat Dau',
      dataIndex: 'gioBatDau',
    },
    {
      title: 'Gio Ket Thuc',
      dataIndex: 'gioKetThuc',
    },
  ];

  function onDateChange(date: any, dateString: any) {
    let selectedDate = dateString.replaceAll('-', '');
    if (selectThang) {
      selectedDate = selectedDate + '01';
    }
    setDate(selectedDate);
  }

  const openDetailModal = (id: string) => {
    setShowEditProfileModal(true);
    // setStaffID(id);
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

  const handleCheckboxChange = () => {
    setSelectThang((prev) => !prev);
  };

  return (
    <Layout title={'SLK'}>
      <div>
        <div>
          <DatePicker onChange={onDateChange} picker={selectThang ? 'month' : 'date'} />
          <Checkbox checked={selectThang} onChange={handleCheckboxChange}>
            {selectThang ? 'Theo Tháng' : 'Theo Tuần'}
          </Checkbox>
        </div>
        <div>
          <Input placeholder={'Search'} onChange={handleSearchChange} width="50%" />
          <Button type="primary" onClick={getSLKList}>
            Tìm kiếm
          </Button>
        </div>
        <Select defaultValue={'ID 0-9'} style={{ width: 120 }} onChange={handleSelectChange}>
          <Option value={'work_name_asc'}>Công Việc A-Z</Option>
          <Option value={'work_name_desc'}>Công Việc Z-A</Option>
          <Option value={'empl_name_asc'}>Tên A-Z</Option>
          <Option value={'empl_name_desc'}>Tên Z-A</Option>
          <Option value={'id_asc'}>ID 0-9</Option>
          <Option value={'id_desc'}>ID 9-0</Option>
          {/* {sortSelect.map((item, index) => {
            <Option value={item.name} key={index}>{item.title}</Option>
          })} */}
        </Select>
        <Button type="primary" onClick={() => setShowEditProfileModal(true)}>
          Thêm mới
        </Button>
      </div>
      <div>
        <Table columns={columns} dataSource={slkData} pagination={false} />
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
          title={'Thêm mới SLK'}
          visible={showEditProfileModal}
          onCancel={() => setShowEditProfileModal(false)}
          destroyOnClose
          footer={null}
          className="edit-profile-modal"
        >
          <SLKModal />
        </Modal>
      </div>
    </Layout>
  );
}

export default withAuth(index);
