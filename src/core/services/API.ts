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

export const getListCongViec = (pageIndex?: number, pageSize?: number, search: string = '', sort: string = 'id_asc') =>
  get(`${ENDPOINTS.CONGVIEC}?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}&search=${search}`);

export const getListMost = (dongia?: string) => {
  let query = `${ENDPOINTS.CONGVIEC}/most`;
  if (dongia != null) {
    query += `?dongia=${dongia}`;
  }
  return get(query);
};

export const getListAVG = (type?: string) => {
  let query = `${ENDPOINTS.CONGVIEC}/avg`;
  if (type != null) {
    query += `?type=${type}`;
  }
  return get(query);
};

export const getListSLKMost = () => get(`${ENDPOINTS.CONGVIEC}/slk_most`);

export const getListNhanCong = (pageIndex?: number, pageSize?: number, search: string = '', sort: string = 'id_asc') =>
  get(`${ENDPOINTS.NHANCONG}?pageIndex=${pageIndex}&pageSize=${pageSize}&sort=${sort}&search=${search}`);

export const getNhanCongRetired = (gender?: string) => get(`${ENDPOINTS.NHANCONG}/retired?gender=${gender}`);
export const getNhanCongAge = (start?: number, end?: number) =>
  get(`${ENDPOINTS.NHANCONG}/age?start=${start}&end=${end}`);
export const getNhanCongShift = (caLam?: number) => get(`${ENDPOINTS.NHANCONG}/shift?caLam=${caLam}`);
