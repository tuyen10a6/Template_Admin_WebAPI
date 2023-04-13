import React from 'react'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import './../../../scss/_Order.scss'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
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
  //
  const pagesToShow = 5 // số trang muốn hiển thị tối đa
  const totalPages = Math.ceil(orders.length / PER_PAGE)

  // tính toán số trang để hiển thị
  let startPage = Math.max(0, currentPage - Math.floor(pagesToShow / 2))
  let endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1)

  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(0, endPage - pagesToShow + 1)
  }

  const pageRange = [...Array(endPage - startPage + 1)].map((_, i) => startPage + i)

  const [showSecond, setShowSecond] = useState(false)

  const handleCloseSecond = () => setShowSecond(false)
  const handleShowSecond = () => setShowSecond(true)

  useEffect(() => {
    fetchOrders()
  }, [])
  // state mới để lưu trữ đơn hàng đang được chọn
  const [selectedOrder, setSelectedOrder] = useState(null)

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
                      <td
                        onClick={() => {
                          setSelectedOrder(order)
                          handleShowSecond()
                        }}
                      >
                        Xem chi tiết
                      </td>

                      <Modal
                        style={{ background: 'none' }}
                        show={showSecond}
                        onHide={handleCloseSecond}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Tên sản phẩm</th>
                                <th>Phiên bản</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                              </tr>
                            </thead>
                            <tbody>
                              {selectedOrder &&
                                selectedOrder.orderDetails &&
                                selectedOrder.orderDetails.map((detail) => (
                                  <tr key={detail.orderID}>
                                    <td>{detail.productName}</td>
                                    <td>{detail.varrianname}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{detail.price}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseSecond}>
                            Đóng
                          </Button>
                        </Modal.Footer>
                      </Modal>

                      {/* <Modal
                        style={{ background: 'none' }}
                        show={showSecond}
                        onHide={handleCloseSecond}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title>Chi tiết đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Table striped bordered hover>
                            <thead>
                              <tr>
                                <th>Tên sản phẩm</th>
                                <th>Phiên bản</th>
                                <th>Số lượng</th>
                                <th>Giá</th>
                              </tr>
                            </thead>
                            <tbody>
                              {order &&
                                order.orderDetails &&
                                order.orderDetails.map((detail) => (
                                  <tr key={detail.orderID}>
                                    <td>{detail.productName}</td>
                                    <td>{detail.varrianname}</td>
                                    <td>{detail.quantity}</td>
                                    <td>{detail.price}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseSecond}>
                            Đóng
                          </Button>
                        </Modal.Footer>
                      </Modal> */}

                      <td></td>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center my-3">
              <ReactPaginate
                //...
                pageCount={totalPages}
                initialPage={currentPage}
                pageRangeDisplayed={pagesToShow}
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                forcePage={currentPage}
                breakLabel="..."
                breakClassName="page-item disabled"
                containerClassName="pagination"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                activeClassName="active"
                previousClassName="page-item"
                nextClassName="page-item"
                previousLinkClassName="page-link"
                nextLinkClassName="page-link"
                disabledClassName="disabled"
                previousLabel="Previous"
                nextLabel="Next"
                renderPageNumbers={() => {
                  return pageRange.map((page) => {
                    return (
                      <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                      >
                        <a className="page-link" onClick={() => setCurrentPage(page)}>
                          {page + 1}
                        </a>
                      </li>
                    )
                  })
                }}
              />
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default FormControl
