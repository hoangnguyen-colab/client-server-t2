import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Input, Button, Space, Select } from 'antd';
import { addSLK } from '@core/services/API';
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

const SLKModal: React.FC<IStaffInfo> = () => {
  const [form] = Form.useForm();
  const [caLam, setCaLam] = useState(1);
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
    const params = {
      caLam: caLam,
    };
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

  useEffect(() => {}, []);

  return (
    <>
      <Form {...formItemLayout} form={form} name="register" onFinish={onFinish} scrollToFirstError>
        <Form.Item name="tenCongViec" label="Tên Công Việc">
          <Input />
        </Form.Item>
        <Form.Item name="tenNhanCong" label="Tên Nhân Công">
          <Input />
        </Form.Item>
        <Form.Item name="caLam" label="Ca Làm">
          <Select defaultValue={'1'} style={{ width: 120 }} onChange={handleSelectChange}>
            <Option value={'1'}>Ca 1</Option>
            <Option value={'2'}>Ca 2</Option>
            <Option value={'3'}>Ca 3</Option>
          </Select>
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
