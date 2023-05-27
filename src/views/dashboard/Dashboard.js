import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import CartImage from './../../../src/assets/images/cart/images.png'
import doanhthu from './../../../src/assets/images/cart/tăng doanh thu.png'
import review from './../../../src/assets/images/cart/pngtree-set-of-user-icon-user-symbol-profile-vector-outline-people-symbol-png-image_1885497.jpg'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils'
import CIcon from '@coreui/icons-react'
import {
  cibCcAmex,
  cibCcApplePay,
  cibCcMastercard,
  cibCcPaypal,
  cibCcStripe,
  cibCcVisa,
  cibGoogle,
  cibFacebook,
  cibLinkedin,
  cifBr,
  cifEs,
  cifFr,
  cifIn,
  cifPl,
  cifUs,
  cibTwitter,
  cilCloudDownload,
  cilPeople,
  cilUser,
  cilUserFemale,
} from '@coreui/icons'

import avatar1 from 'src/assets/images/avatars/1.jpg'
import avatar2 from 'src/assets/images/avatars/2.jpg'
import avatar3 from 'src/assets/images/avatars/3.jpg'
import avatar4 from 'src/assets/images/avatars/4.jpg'
import avatar5 from 'src/assets/images/avatars/5.jpg'
import avatar6 from 'src/assets/images/avatars/6.jpg'
import './../../scss/style.css'

import WidgetsBrand from '../widgets/WidgetsBrand'
import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const [totalOrders, setTotalOrders] = useState(0)

  useEffect(() => {
    axios
      .get('https://localhost:7014/api/SanPham/ToTalQuantityOrder')
      .then((response) => {
        const data = response.data
        setTotalOrders(data.totalOrders)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])

  const [totalRevenue, setTotalRevenue] = useState(0)

  useEffect(() => {
    axios
      .get('https://localhost:7014/api/SanPham/TotalPriceOrder')
      .then((response) => {
        setTotalRevenue(response.data.totalRevenue)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
  }

  const [totalReviewOrder, setTotalReviewOrder] = useState(0)

  useEffect(() => {
    axios
      .get('https://localhost:7014/api/SanPham/ToTalReviewAllProduct')
      .then((response) => {
        setTotalReviewOrder(response.data.toTalReviewOrder)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }, [])
  return (
    <>
      <div className="root">
        <div>
          <h3 className="title">THỐNG KÊ DOANH THU</h3>
        </div>
        <div className="col-9">
          <div className="col-3">
            {' '}
            <span>
              Tổng số đơn hàng: <span>{totalOrders}</span>
            </span>
            <span>
              <img id="image_cart" src={CartImage} alt="My Image" />
            </span>
          </div>
          <div className="col-3">
            {' '}
            <span>
              <p>
                Doanh thu: <span>{formatCurrency(totalRevenue)}</span>
              </p>{' '}
            </span>
            <span>
              <img id="image_cart" src={doanhthu} alt="My Image" />
            </span>
          </div>
          <div className="col-3">
            {' '}
            <span>
              <p>
                Lượt đánh giá: <span>{totalReviewOrder}</span>
              </p>{' '}
            </span>
            <span>
              <img id="image_cart" src={review} alt="My Image" />
            </span>
          </div>
        </div>
        <div className="ProductBestOrder"></div>
      </div>
    </>
  )
}

export default Dashboard
