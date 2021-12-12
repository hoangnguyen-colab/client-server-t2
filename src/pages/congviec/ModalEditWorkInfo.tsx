import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Checkbox, Row, Col, Form, Input, Button, Space } from 'antd';
import { getCongViec, editCongViec } from '@core/services/API';

// import { getStaffDetail, editStaffDetail } from 'core/services/staff';

interface IWorkInfo {
  maCongViec?: string;
  onCloseModal?: () => void;
  onSubmitAndReload?: () => void;
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
const ModalEditWorkInfo: React.FC<IWorkInfo> = ({ maCongViec, onCloseModal, onSubmitAndReload }) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const router = useRouter();
  const LoadDetail = () => {
    getCongViec(maCongViec!.toString())
      .then((resp) => {
        const data = resp.data;
        if (data) {
          fillForm(resp.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fillForm = (data: any) => {
    form.setFieldsValue({
      maCongViec: data?.maCongViec,
      tenCongViec: data?.tenCongViec,
      dinhMucKhoan: data?.dinhMucKhoan,
      donViKhoan: data.donViKhoan,
      heSoKhoan: data.heSoKhoan,
      dinhMucLaoDong: data.dinhMucLaoDong,
      donGia: data.donGia,
    });
  };

  const handleEditProduct = (values: any) => {
    editCongViec(values, maCongViec!.toString())
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    LoadDetail();
  }, []);

  return (
    <>
      <Form {...formItemLayout} form={form} name="register" onFinish={handleEditProduct} scrollToFirstError>
        <Form.Item name="maCongViec" label="Mã công việc">
          <Input />
        </Form.Item>
        <Form.Item name="tenCongViec" label="Tên công việc">
          <Input />
        </Form.Item>
        <Form.Item name="dinhMucKhoan" label="Định mức khoán">
          <Input />
        </Form.Item>
        <Form.Item name="donViKhoan" label="Đơn vị khoán">
          <Input />
        </Form.Item>
        <Form.Item name="heSoKhoan" label="Hệ số khoán">
          <Input />
        </Form.Item>
        <Form.Item name="dinhMucLaoDong" label="Định mức lao động">
          <Input />
        </Form.Item>
        <Form.Item name="donGia" label="Đơn giá">
          <Input />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Space>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
            <Button htmlType="button" onClick={onCloseModal}>
              Cancel
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
};

export default ModalEditWorkInfo;
