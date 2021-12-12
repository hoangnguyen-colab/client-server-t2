import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Checkbox, Row, Col, Form, Input, Button, Space } from 'antd';
import { getSanPham, editSanPham } from '@core/services/API';

// import { getStaffDetail, editStaffDetail } from 'core/services/staff';

interface IStaffInfo {
  maSanPham?: string;
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
const ModalEditStaffInfo: React.FC<IStaffInfo> = ({ maSanPham, onCloseModal, onSubmitAndReload }) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const router = useRouter();
  const LoadDetail = () => {
    getSanPham(maSanPham!.toString())
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
      maSanPham: data?.maSanPham,
      tenSanPham: data?.tenSanPham,
      ngaySanXuat: data?.ngaySanXuat,
      ngayDangKy: data.ngayDangKy,
      hanSuDung: data.hanSuDung,
      soDangKy: data.soDangKy,
    });
  };

  const handleEditProduct = (values: any) => {
    editSanPham(values, maSanPham!.toString())
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
        <Form.Item name="maSanPham" label="Mã sản phẩm">
          <Input />
        </Form.Item>
        <Form.Item name="tenSanPham" label="Tên sản phẩm">
          <Input />
        </Form.Item>
        <Form.Item name="ngaySanXuat" label="Ngày sản xuất">
          <Input />
        </Form.Item>
        <Form.Item name="ngayDangKy" label="Ngày đăng ký">
          <Input />
        </Form.Item>
        <Form.Item name="soDangKy" label="Số đăng ký">
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

export default ModalEditStaffInfo;
