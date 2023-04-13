import React from 'react'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import './../../../scss/_Order.scss'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { NavItem } from 'react-bootstrap'

const FormControl = () => {
  // Hook quản lý data Orders
  const [orders, setOrders] = useState([])
  // Phân trang
  const [currentPage, setCurrentPage] = useState(0)
  const PER_PAGE = 10
  //
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage)
  }
  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:7014/api/Order/GetAllOrderAdmin')
      setOrders(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Đơn hàng</strong>
          </CCardHeader>
          <CCardBody>
            <Table striped bordered hover>
              <thead>
                <tr style={{ fontSize: '14px' }}>
                  <th>Số thứ tự</th>
                  <th>Khách hàng</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                  <th>Email</th>
                  <th>Ngày đặt</th>
                  <th>Trạng thái</th>
                  <th>Sản phẩm mua</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders
                  .slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE)
                  .map((order, index) => (
                    <tr style={{ fontSize: '13px' }} key={order.orderID}>
                      <td>{currentPage * PER_PAGE + index + 1}</td>
                      <td>{order.customerName}</td>
                      <td>{order.customerPhone}</td>
                      <td>{order.customerAddress}</td>
                      <td>{order.customerEmail}</td>
                      <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
                      <td>{order.orderStatusName}</td>
                      <td>Xem chi tiết</td>
                      <td>
                        {/* {order.OrderDetails.map(
          (detail, index) => `${detail.ProductName} (${detail.Quantity})`,
        ).join(', ')} */}
                      </td>
                      <td>
                        {/* <button onClick={() => handleShowDetails(order)}>Chi tiết</button> */}
                      </td>
                    </tr>
                  ))}

                {/* {orders.map((order, index) => (
                  <tr style={{ fontSize: '13px' }} key={order.orderID}>
                    <td>{index + 1}</td>
                    <td>{order.customerName}</td>
                    <td>{order.customerPhone}</td>
                    <td>{order.customerAddress}</td>
                    <td>{order.customerEmail}</td>
                    <td>{new Date(order.orderDate).toLocaleDateString('vi-VN')}</td>
                    <td>{order.orderStatusName}</td>
                    <td>{order.OrderStatusName}</td>
                    <td>
                      
                    </td>
                    <td>
                    </td>
                  </tr>
                ))} */}
              </tbody>
            </Table>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              pageCount={Math.ceil(orders.length / PER_PAGE)}
              onPageChange={handlePageClick}
              containerClassName={'pagination'}
              previousLinkClassName={'page-link'}
              nextLinkClassName={'page-link'}
              disabledClassName={'disabled'}
              activeClassName={'active'}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
