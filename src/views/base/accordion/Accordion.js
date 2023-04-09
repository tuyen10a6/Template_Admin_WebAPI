import React from 'react'
import { useState, useEffect } from 'react'
import './../../../scss/_Product.scss'
// Import React Icon
import { GrUpdate } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { ErrorResponse } from '@remix-run/router'
import { func } from 'prop-types'

const Accordion = () => {
  const [DataProduct, setDataProduct] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [totalPages, setTotalPages] = useState(1)

  //
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  // Tạo state lưu trữ toàn bộ loại sản phẩm

  const [category, setcategory] = useState([])
  useEffect(() => {
    fetch('https://localhost:7014/apiUser/Categories/GetAllCategories')
      .then((res) => res.json())
      .then((data) => {
        setcategory(data)
        console.log('Call Api GetAllCategory Successfully')
      })
  }, [])

  const [selectedProduct, setSelectedProduct] = useState(null)
  const handleShow = (product) => {
    setSelectedProduct(product)
    setShow(true)
  }

  useEffect(() => {
    async function fetchDataProduct() {
      const response = await fetch(
        `https://localhost:7014/api/SanPham/GetAllSanPham/${pageNumber}/${pageSize}`,
      )
      const data = await response.json()
      setDataProduct(data)
      setTotalPages(data.totalPages)
    }
    fetchDataProduct()
  }, [pageNumber, pageSize])

  /// Image Product Change
  const [imageSrc, setImageSrc] = useState(null)
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = (event) => {
      setImageSrc(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  function handlePageChange(page) {
    if (page !== totalPages) {
      setPageNumber(page)
    }
  }
  function handleDeleteProduct(productId) {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này? Xóa sẽ bị mất toàn bộ dữ liệu')) {
      fetch(`https://localhost:7014/api/SanPham/DeleteSanPham/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            // Update the list of products or perform other actions as needed
            console.log(`Product with ID ${productId} deleted successfully`)
            alert('Thành công')
            setDataProduct((prevData) => prevData.filter((item) => item.productID !== productId))
          } else {
            console.error(`Failed to delete product with ID ${productId}`)
            alert('Không thể xóa sản phẩm này vì đã sản phẩm đã có trong đơn hàng')
          }
        })
        .catch((error) => {
          console.error(`Không thể xóa sản phẩm có mã ${productId}:`, error)
        })
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sản phẩm</strong>
          </CCardHeader>
          <CCardBody>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th className="product_name">Tên sản phẩm</th>
                  <th>Loại sản phẩm</th>
                  <th>Ghi chú</th>
                  <th>Hình ảnh</th>
                  <th>Ngày tạo</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {DataProduct.map((item, index) => {
                  const counter = (pageNumber - 1) * pageSize + index + 1
                  return (
                    <tr key={item.productID}>
                      <td>{counter}</td>
                      <td style={{ width: '30%' }}>{item.productName}</td>
                      <td>{item.categoryName}</td>
                      <td>{item.description}</td>
                      <td>
                        <img src={item.imageURL} />
                      </td>
                      <td> {new Date(item.dateCreated).toLocaleDateString('vi-VN')}</td>

                      <td>
                        <GrUpdate
                          variant="primary"
                          onClick={() => handleShow(item)}
                          className="Icon-update"
                        />
                        <Modal style={{ background: 'none' }} show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Sửa sản phẩm</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tên sản phẩm</Form.Label>
                                <Form.Control
                                  id="Text_ProductName"
                                  type="text"
                                  placeholder=""
                                  autoFocus
                                  value={item.productName}
                                />
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Miêu tả</Form.Label>
                                <Form.Control
                                  id="Text_
description"
                                  as="textarea"
                                  rows={1}
                                  value={item.description}
                                />
                              </Form.Group>
                              {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Loại sản phẩm</Form.Label>
                                <Form.Control
                                  value={item.categoryName}
                                  id="Text_Brand"
                                  as="select"
                                  rows={1}
                                />
                              </Form.Group> */}
                              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                                <Form.Label>Loại sản phẩm</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={selectedProduct ? selectedProduct.categoryName : ''}
                                  onChange={(e) =>
                                    setSelectedProduct({
                                      ...selectedProduct,
                                      categoryName: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Chọn loại sản phẩm</option>
                                  {category.map((category) => (
                                    <option key={category.categoryID} value={category.categoryName}>
                                      {category.categoryName}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>

                              {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Nhãn hiệu</Form.Label>
                                <Form.Control  id="Text_Category" as="textarea" rows={1} />
                              </Form.Group> */}
                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Hình ảnh</Form.Label>
                                <Form.Control
                                  onChange={handleImageChange}
                                  id="File_image"
                                  type="file"
                                />
                              </Form.Group>
                              {imageSrc && (
                                <img
                                  src={imageSrc}
                                  style={{ width: '100px', height: '70px' }}
                                  alt="product"
                                />
                              )}
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Đóng
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                              Lưu
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <AiFillDelete
                          className="Icon-delete"
                          onClick={() => handleDeleteProduct(item.productID)}
                        />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </Table>
            <Pagination>
              <Pagination.First onClick={() => setPageNumber(1)} disabled={pageNumber === 1} />
              <Pagination.Prev
                onClick={() => setPageNumber(pageNumber - 1)}
                disabled={pageNumber === 1}
              />
              {Array.from({ length: totalPages }, (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={pageNumber === index + 1}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => setPageNumber(pageNumber + 1)}
                disabled={pageNumber === totalPages}
              />
              <Pagination.Last
                onClick={() => handlePageChange(totalPages)}
                disabled={pageNumber === totalPages}
              />
            </Pagination>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion
