import { apiClient } from './axiosInstance';
import { ENDPOINTS } from '../constants/endpoint';

const { get, post } = apiClient;

export const addSLK = (params: object) => post(`${ENDPOINTS.SLK}/add`, params);
export const slk_all = (date: string) => get(ENDPOINTS.SLK_ALL + `?date=${date}`);
export const slk_thang = (date: string) => get(`${ENDPOINTS.SLK}/thang?date=${date}`);
export const getListSLKThang = (
  date: string,
  pageIndex?: number,
  pageSize?: number,
  search: string = '',
  sort: string = 'id_asc',
) =>
  get(`${ENDPOINTS.SLK}/thang?date=${date}&pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}&search=${search}`);
export const getListSLK = (
  thang: boolean,
  date: string,
  pageIndex?: number,
  pageSize?: number,
  search: string = '',
  sort: string = 'id_asc',
) =>
  get(
    `${ENDPOINTS.SLK}/thang_tuan?thang=${thang}&date=${date}&pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}&search=${search}`,
  );

export const getListSanPham = (pageIndex?: number, pageSize?: number, search: string = '', sort: string = 'id_asc') =>
  get(`${ENDPOINTS.SANPHAM}?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}&search=${search}`);
export const getSanPham = (id: string) => get(`${ENDPOINTS.SANPHAM}/${id}`);
export const getSanPhamNDK = (date: string) => get(`${ENDPOINTS.SANPHAM}/${date}`);
export const editSanPham = (params: object, id: string) => post(`${ENDPOINTS.SANPHAM}/edit/${id}`, params);
export const addSanPham = (params: object) => post(`${ENDPOINTS.SANPHAM}/add`, params);
export const deleteSanPham = (id: string) => apiClient.delete(`${ENDPOINTS.SANPHAM}/delete/${id}`);
export const getNgayCong = (date: string) => get(`${ENDPOINTS.NGAYCONG}?date=${date}`);

//api cong viec
export const getListCongViec = (pageIndex?: number, pageSize?: number, search: string = '', sort: string = 'id_asc') =>
  get(`${ENDPOINTS.CONGVIEC}?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}&search=${search}`);
export const getCongViec = (id: string) => get(`${ENDPOINTS.CONGVIEC}/${id}`);
export const editCongViec = (params: object, id: string) => post(`${ENDPOINTS.CONGVIEC}/edit/${id}`, params);
export const deleteCongViec = (id: string) => apiClient.delete(`${ENDPOINTS.CONGVIEC}/delete/${id}`);
export const addCongViec = (params: object) => post(`${ENDPOINTS.CONGVIEC}/add`, params);

//api nhan cong
export const getListNhanCong = (pageIndex?: number, pageSize?: number, search: string = '', sort: string = 'id_asc') =>
  get(`${ENDPOINTS.NHANCONG}?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}&search=${search}`);
export const getNhanCong = (id: string) => get(`${ENDPOINTS.NHANCONG}/${id}`);
export const editNhanCong = (params: object, id: string) => post(`${ENDPOINTS.NHANCONG}/edit/${id}`, params);
export const addNhanCong = (params: object) => post(`${ENDPOINTS.NHANCONG}/add`, params);
export const deleteNhanCong = (id: string) => apiClient.delete(`${ENDPOINTS.NHANCONG}/delete/${id}`);
