import React from 'react'
import CIcon from '@coreui/icons-react'

import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilScreenSmartphone,
  cilPlaylistAdd,
  cilMenu,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Thống kê',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'MỚI',
    },
  },

  {
    component: CNavTitle,
    name: 'Chức Năng',
  },
  {
    component: CNavGroup,
    name: 'Sản Phẩm',
    to: '/base',
    icon: <CIcon icon={cilScreenSmartphone} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Sản Phẩm',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: ' Biến thể sản phẩm',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: 'Thuộc tính sản phẩm',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Đánh giá sản phẩm',
        to: '/base/carousels',
      },
      // {
      //   component: CNavItem,
      //   name: 'Collapse',
      //   to: '/base/collapses',
      // },
      // {
      //   component: CNavItem,
      //   name: 'List group',
      //   to: '/base/list-groups',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Navs & Tabs',
      //   to: '/base/navs',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Pagination',
      //   to: '/base/paginations',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Placeholders',
      //   to: '/base/placeholders',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Popovers',
      //   to: '/base/popovers',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Progress',
      //   to: '/base/progress',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Spinners',
      //   to: '/base/spinners',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Tables',
      //   to: '/base/tables',
      // },
      // {
      //   component: CNavItem,
      //   name: 'Tooltips',
      //   to: '/base/tooltips',
      // },
    ],
  },
  {
    component: CNavGroup,
    name: 'Loại sản phẩm',
    to: '/buttons',
    icon: <CIcon icon={cilPlaylistAdd} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Loại sản phẩm',
        to: '/buttons/dropdowns',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Đơn hàng',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Đơn hàng',
        to: '/forms/form-control',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Thống kê',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Nhãn hiệu',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Nhãn hiệu',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Chức năng khác',
    icon: <CIcon icon={cilMenu} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Quản lý Slide',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Quản lý khách hàng',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Quản lý nhà cung cấp',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Quản lý hóa đơn nhập',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Thông báo',
    to: '/widgets',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Bổ sung',
  },
  {
    component: CNavGroup,
    name: 'Trang Web',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
