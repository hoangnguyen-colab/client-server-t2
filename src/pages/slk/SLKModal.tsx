import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Space, Select, Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { addSLK, getListNhanCong, getListCongViec, getListSanPham } from '@core/services/API';
const { Option } = Select;

interface IStaffInfo {
  staffID?: string;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

let timeout: any;

const SLKModal: React.FC<IStaffInfo> = () => {
  const [form] = Form.useForm();
  const [caLam, setCaLam] = useState(1);
  const [congNhanId, setCongNhanId] = useState('');
  const [congNhanTxt, setCongNhanTxt] = useState('');
  const [congNhanData, setCongNhanData] = useState([]);
  const [congViecId, setCongViecId] = useState('');
  const [congViecTxt, setCongViecTxt] = useState('');
  const [congViecData, setCongViecData] = useState([]);
  const [sanPhamId, setSanPhamId] = useState('');
  const [sanPhamTxt, setSanPhamTxt] = useState('');
  const [sanPhamData, setSanPhamData] = useState([]);

  const onFinish = (values: any) => {
    const params = {
      ...values,
      caLam: caLam,
      maCongViec: congViecId,
      maNhanCong: congNhanId,
      maSanPham: sanPhamId,
    };
    console.log('Received: ', params);
    addSLK(params)
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSelectChange = (value: any) => {
    setCaLam(value);
  };

  const RenderCongNhanSelect = () => {
    const options = congNhanData.map((d) => <Option key={d.maNhanCong}>{d.hoTen}</Option>);
    return (
      <Select
        showSearch
        value={congNhanTxt}
        placeholder={'Chọn công nhân'}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleNhanCongTitleChange}
        onChange={(value: string) => setCongNhanTxt(value)}
        onSelect={(value: string) => setCongNhanId(value)}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  };

  const RenderCongViecSelect = () => {
    const options = congViecData.map((d) => <Option key={d.maCongViec}>{d.tenCongViec}</Option>);
    return (
      <Select
        showSearch
        value={congViecTxt}
        placeholder={'Chọn công việc'}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleCongViecTitleChange}
        onChange={(value: string) => setCongViecTxt(value)}
        onSelect={(value: string) => setCongViecId(value)}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  };

  const RenderSanPhamSelect = () => {
    const options = sanPhamData.map((d) => <Option key={d.maSanPham}>{d.tenSanPham}</Option>);
    return (
      <Select
        showSearch
        value={sanPhamTxt}
        placeholder={'Chọn sản phẩm'}
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSanPhamTitleChange}
        onChange={(value: string) => setSanPhamTxt(value)}
        onSelect={(value: string) => setSanPhamId(value)}
        notFoundContent={null}
      >
        {options}
      </Select>
    );
  };

  const getNhanCongData = (value: string) => {
    getListNhanCong(0, 5, value, 'id_asc')
      .then((resp) => {
        const data = resp.data;
        setCongNhanData(data.Data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const getSanPhamData = (value: string) => {
    getListSanPham(0, 5, value, 'id_asc')
      .then((resp) => {
        const data = resp.data;
        setSanPhamData(data.Data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const getCongViecData = (value: string) => {
    getListCongViec(0, 5, value, 'id_asc')
      .then((resp) => {
        const data = resp.data;
        setCongViecData(data.Data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleNhanCongTitleChange = (value: string) => {
    if (value) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => getNhanCongData(value), 300);
    } else {
      // setCongViecData([]);
    }
  };

  const handleCongViecTitleChange = (value: string) => {
    if (value) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => getCongViecData(value), 300);
    } else {
      // setCongViecData([]);
    }
  };

  const handleSanPhamTitleChange = (value: string) => {
    if (value) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      timeout = setTimeout(() => getSanPhamData(value), 300);
    } else {
      // setCongViecData([]);
    }
  };

  return (
    <>
      <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item label="Công Việc">
          <RenderCongViecSelect />
        </Form.Item>
        <Form.Item label="Nhân Công">
          <RenderCongNhanSelect />
        </Form.Item>
        <Form.Item label="Sản Phẩm">
          <RenderSanPhamSelect />
        </Form.Item>
        <Form.Item name="caLam" label="Ca Làm">
          <Select defaultValue={'1'} style={{ width: 120 }} onChange={handleSelectChange}>
            <Option value={'1'}>Ca 1</Option>
            <Option value={'2'}>Ca 2</Option>
            <Option value={'3'}>Ca 3</Option>
          </Select>
        </Form.Item>
        <Form.Item name="sanLuongThucTe" label="Sản Lượng Thực Tế">
          <Input />
        </Form.Item>
        <Form.Item name="soLoSanPham" label="Số Lô Sản Phẩm">
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Thêm mới
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default SLKModal;
