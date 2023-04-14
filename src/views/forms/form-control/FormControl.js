import React from 'react'
import Table from 'react-bootstrap/Table'
import { useState, useEffect } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'
import './../../../scss/_Order.scss'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
// Import Icon
import { GrUpdate } from 'react-icons/gr'
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

  // Hook quản lý trạng thái của Modal Update
  const [showUpdate, setShowUpdate] = useState(false)
  const handleCloseUpdate = () => setShowUpdate(false)
  const handleOpenUpdate = () => setShowUpdate(true)
  useEffect(() => {
    fetchOrders()
  }, [])
  // state mới để lưu trữ đơn hàng đang được chọn
  const [selectedOrder, setSelectedOrder] = useState(null)
  //  Khởi tạo Hook state lưu trữ các trạng thái đơn hàng
  const [dataorderstatus, setdataorderstatus] = useState([])
  const fetchDataOrderStatus = async () => {
    try {
      const reponse = await axios('https://localhost:7014/api/Order/GetAllOrderStatus')
      setdataorderstatus(reponse.data)

      const idMap = {}
      reponse.data.forEach((order) => {
        idMap[order.orderStatusName] = order.orderStatusID
      })
      setOrderStatusIdMap(idMap)
      console.log('Call Api All OrderStatus')
    } catch (error) {
      console.log(error)
    }
  }
  // Useffect tải dữ liệu và cập nhật state
  useEffect(() => {
    fetchDataOrderStatus()
  }, [])

  // Api Update Product
  const updateOrder = () => {
    const orderID = document.getElementById('Text_OrderID_edit').value
    const customerID = document.getElementById('Text_CustomerID_edit').value
    const customerName = document.getElementById('Text_CustomerName_edit').value
    const customerPhone = document.getElementById('Text_CustomerPhone_edit').value
    const customerAddress = document.getElementById('Text_CustomerAdrress_edit').value
    const customerEmail = document.getElementById('Text_CustomerEmail_edit').value
    const orderStatusID = document.getElementById('Text_OrderStatusID').value
    console.log(orderID)
    console.log(customerID)
    console.log(customerName)
    console.log(customerPhone)
    console.log(customerAddress)
    console.log(customerEmail)
    console.log(orderStatusID)

    const data = {
      orderID,
      customerID,
      customerName,
      customerPhone,
      customerAddress,
      customerEmail,
      orderStatusID,
      orderStatusName: 'string',
      orderDetails: [],
    }

    fetch('https://localhost:7014/api/Order/UpdateOrder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        handleCloseUpdate()
        alert('Sửa thành công')
        fetchOrders()
      })
      .catch((error) => {
        // Xử lý lỗi khi gửi yêu cầu lên server
      })
  }
  //Api Fillter Orders By OrderStatus

  const [OrderStatusIdMap, setOrderStatusIdMap] = useState({})

  const handleOrderChange = async (OrderId) => {
    try {
      const response = await fetch(
        `https://localhost:7014/api/Order/GetOrdersByOrderStatus/${OrderId}`,
      )
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <div className="Title_Order">
              <strong>Đơn hàng</strong>
            </div>
            <div className="Select_OrderStatus">
              <Form.Control
                value={selectedOrder ? selectedOrder.orderStatusName : ''}
                onChange={(e) => {
                  const orderstatusId = OrderStatusIdMap[e.target.value]
                  setSelectedOrder({
                    ...selectedOrder,
                    orderStatusID: orderstatusId,
                    orderStatusName: e.target.value,
                  })
                  handleOrderChange(orderstatusId)
                }}
                style={{ width: '300px' }}
                as="select"
              >
                <option value="" disabled>
                  Select an order status
                </option>
                {dataorderstatus.map((item) => (
                  <option key={item.orderStatusID} value={item.orderStatusName}>
                    {item.orderStatusName}
                  </option>
                ))}
              </Form.Control>
            </div>
          </CCardHeader>
          <CCardBody>
            <Table striped bordered hover>
              <thead>
                <tr style={{ fontSize: '14px' }}>
                  <th>Số thứ tự</th>
                  <th> Tên khách hàng</th>
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
                                    <td style={{ fontSize: '13.5px' }}>{detail.productName}</td>
                                    <td style={{ fontSize: '13.5px' }}>{detail.varrianname}</td>
                                    <td>{detail.quantity}</td>
                                    <td>
                                      <td>
                                        {detail.price.toLocaleString('vi-VN', {
                                          style: 'currency',
                                          currency: 'VND',
                                        })}
                                      </td>
                                    </td>
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

                      <td
                        onClick={() => {
                          setSelectedOrder(order)
                          handleOpenUpdate()
                        }}
                        style={{ textAlign: 'center' }}
                      >
                        <GrUpdate />
                      </td>

                      <Modal
                        style={{ background: 'none' }}
                        show={showUpdate}
                        onHide={handleCloseUpdate}
                        backdrop="static"
                        keyboard={false}
                      >
                        <Modal.Header closeButton>
                          <Modal.Title> Sửa thông tin đơn hàng</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form.Control
                            id="Text_OrderID_edit"
                            type="hidden"
                            placeholder=""
                            defaultValue={selectedOrder?.orderID}
                            autoFocus
                          />
                          <Form.Control
                            id="Text_CustomerID_edit"
                            type="hidden"
                            placeholder=""
                            defaultValue={selectedOrder?.customerID}
                            autoFocus
                          />
                          <Form.Label> Tên khách hàng</Form.Label>
                          <Form.Control
                            id="Text_CustomerName_edit"
                            type="text"
                            placeholder=""
                            value={selectedOrder?.customerName}
                            onChange={(event) =>
                              setSelectedOrder({
                                ...selectedOrder,
                                customerName: event.target.value,
                              })
                            }
                            autoFocus
                          />

                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                              id="Text_CustomerPhone_edit"
                              type="text"
                              placeholder=""
                              value={selectedOrder?.customerPhone}
                              onChange={(event) =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  customerPhone: event.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                              id="Text_CustomerAdrress_edit"
                              type="text"
                              placeholder=""
                              value={selectedOrder?.customerAddress}
                              onChange={(event) =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  customerAddress: event.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              id="Text_CustomerEmail_edit"
                              type="text"
                              placeholder=""
                              value={selectedOrder?.customerEmail}
                              onChange={(event) =>
                                setSelectedOrder({
                                  ...selectedOrder,
                                  customerEmail: event.target.value,
                                })
                              }
                              autoFocus
                            />
                          </Form.Group>
                          {/* <Form.Control
                            style={{ width: '300px', textAlign: 'center', margin: '0px auto' }}
                            as="select"
                            id="Text_OrderStatusID"
                            value={selectedOrder?.orderStatusId}
                            onChange={(event) =>
                              setSelectedOrder({
                                ...selectedOrder,
                                orderStatusId: event.target.value,
                              })
                            }
                          >
                            {dataorderstatus.map((item) => (
                              <option key={item.orderStatusId} value={item.orderStatusID}>
                                {item.orderStatusName}
                              </option>
                            ))}
                          </Form.Control> */}
                          <Form.Control
                            style={{ width: '300px', textAlign: 'center', margin: '0px auto' }}
                            as="select"
                            id="Text_OrderStatusID"
                            value={selectedOrder?.orderStatusId}
                            onChange={(event) =>
                              setSelectedOrder({
                                ...selectedOrder,
                                orderStatusId: event.target.value,
                              })
                            }
                          >
                            {dataorderstatus.map((item) => (
                              <option
                                key={item.orderStatusId}
                                value={item.orderStatusID}
                                selected={selectedOrder?.orderStatusId === item.orderStatusID}
                              >
                                {item.orderStatusName}
                              </option>
                            ))}
                          </Form.Control>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleCloseUpdate}>
                            Đóng
                          </Button>
                          <Button onClick={updateOrder} variant="primary">
                            Thêm
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </tr>
                  ))}
              </tbody>
            </Table>

            <div className="d-flex justify-content-center my-3">
              {/* Phân trang */}
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
