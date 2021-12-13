import { MenuItemType } from '@paljs/ui/types';

const items: MenuItemType[] = [
  {
    title: 'Home Page',
    icon: { name: 'home' },
    link: { href: '/dashboard' },
  },
  {
    title: 'NKSLK',
    icon: { name: 'edit-2-outline' },
    link: { href: '/slk' },
  },
  {
    title: 'Công Việc',
    icon: { name: 'edit-2-outline' },
    children: [
      {
        title: 'Thống kê',
        link: { href: '/congviec/report' },
      },
      {
        title: 'Danh sách',
        link: { href: '/congviec' },
      },
    ],
  },
  // {
  //   title: 'Sản Phẩm',
  //   icon: { name: 'edit-2-outline' },
  //   link: { href: '/sanpham' },
  // },
  {
    title: 'Nhân Công',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Thống kê',
        link: { href: '/nhancong/report' },
      },
      {
        title: 'Danh sách',
        link: { href: '/nhancong' },
      },
    ],
  },
  // {
  //   title: 'FEATURES',
  //   group: true,
  // },
  {
    title: 'Sản Phẩm',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Danh sách',
        link: { href: '/sanpham' },
      },
      {
        title: 'Thống kê',
        link: { href: '/sanpham/report' },
      },
    ],
  },
  {
    title: 'Thống kê',
    icon: { name: 'star-outline' },
    children: [
      {
        title: 'Ngày công',
        link: { href: '/ngaycong' },
      },
      {
        title: 'Lương',
        link: { href: '/luong' },
      },
    ],
  },
  // {
  //   title: 'Forms',
  //   icon: { name: 'edit-2-outline' },
  //   children: [
  //     {
  //       title: 'Inputs',
  //       link: { href: '/forms/inputs' },
  //     },
  //     {
  //       title: 'Layout',
  //       link: { href: '/forms/form-layout' },
  //     },
  //     {
  //       title: 'Buttons',
  //       link: { href: '/forms/buttons' },
  //     },
  //     {
  //       title: 'Select',
  //       link: { href: '/forms/select' },
  //     },
  //   ],
  // },
  // {
  //   title: 'UI Features',
  //   icon: { name: 'keypad-outline' },
  //   children: [
  //     {
  //       title: 'Grid',
  //       link: { href: '/ui-features/grid' },
  //     },
  //     {
  //       title: 'Animated Searches',
  //       link: { href: '/ui-features/search' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Modal & Overlays',
  //   icon: { name: 'browser-outline' },
  //   children: [
  //     {
  //       title: 'Popover',
  //       link: { href: '/modal-overlays/popover' },
  //     },
  //     {
  //       title: 'Tooltip',
  //       link: { href: '/modal-overlays/tooltip' },
  //     },
  //     {
  //       title: 'Toastr',
  //       link: { href: '/modal-overlays/toastr' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Editors',
  //   icon: { name: 'text-outline' },
  //   children: [
  //     {
  //       title: 'TinyMCE',
  //       link: { href: '/editors/tinymce' },
  //     },
  //     {
  //       title: 'CKEditor',
  //       link: { href: '/editors/ckeditor' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Miscellaneous',
  //   icon: { name: 'shuffle-2-outline' },
  //   children: [
  //     {
  //       title: '404',
  //       link: { href: '/miscellaneous/404' },
  //     },
  //   ],
  // },
  // {
  //   title: 'Auth',
  //   icon: { name: 'lock-outline' },
  //   children: [
  //     {
  //       title: 'Login',
  //       link: { href: '/auth/login' },
  //     },
  //     {
  //       title: 'Register',
  //       link: { href: '/auth/register' },
  //     },
  //     {
  //       title: 'Request Password',
  //       link: { href: '/auth/request-password' },
  //     },
  //     {
  //       title: 'Reset Password',
  //       link: { href: '/auth/reset-password' },
  //     },
  //   ],
  // },
];

export default items;
