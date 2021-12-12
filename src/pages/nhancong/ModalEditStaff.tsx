import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { Checkbox, Row, Col, Form, Input, Button, Space } from 'antd';
import { getNhanCong, editNhanCong } from '@core/services/API';

// import { getStaffDetail, editStaffDetail } from 'core/services/staff';

interface IStaffInfo {
  maNhanCong?: string;
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
const ModalEditStaffInfo: React.FC<IStaffInfo> = ({ maNhanCong, onCloseModal, onSubmitAndReload }) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
  };

  const router = useRouter();
  const LoadDetail = () => {
    getNhanCong(maNhanCong!.toString())
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
      maNhanCong: data?.maNhanCong,
      hoTen: data?.hoTen,
      gioiTinh: data?.gioiTinh,
      ngaySinh: data.ngaySinh,
      queQuan: data.hanSuDung,
      chucVu: data.chucVu,
      phongBan: data.phongBan,
      luongBaoHiem: data.luongBaoHiem,
    });
  };

  const handleEditProduct = (values: any) => {
    editNhanCong(values, maNhanCong!.toString())
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
        <Form.Item name="maNhanCong" label="Mã sản phẩm">
          <Input />
        </Form.Item>
        <Form.Item name="hoTen" label="Tên sản phẩm">
          <Input />
        </Form.Item>
        <Form.Item name="gioiTinh" label="Ngày sản xuất">
          <Input />
        </Form.Item>
        <Form.Item name="ngaySinh" label="Ngày đăng ký">
          <Input />
        </Form.Item>
        <Form.Item name="queQuan" label="Số đăng ký">
          <Input />
        </Form.Item>
        <Form.Item name="chucVu" label="Số đăng ký">
          <Input />
        </Form.Item>
        <Form.Item name="phongBan" label="Số đăng ký">
          <Input />
        </Form.Item>
        <Form.Item name="luongBaoHiem" label="Số đăng ký">
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
