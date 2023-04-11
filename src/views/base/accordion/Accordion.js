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
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
  const [showSecond, setShowSecond] = useState(false)

  const handleCloseSecond = () => setShowSecond(false)
  const handleShowSecond = () => setShowSecond(true)

  // const handleClose = () => setShow(false)

  // Tạo state lưu trữ toàn bộ loại sản phẩm

  const [category, setCategory] = useState([])
  const [categoryIdMap, setCategoryIdMap] = useState({})
  const [brand, setbrand] = useState([])
  const [brandIdMap, setbrandIdMap] = useState({})

  useEffect(() => {
    fetch('https://localhost:7014/api/Brand/GetAllBrands')
      .then((res) => res.json())
      .then((data) => {
        setbrand(data)
        const idMap = {}
        data.forEach((brand) => {
          idMap[brand.brandName] = brand.brandID
        })
        setbrandIdMap(idMap)
        console.log('Call Api GetAllBrand Successfully')
      })
  }, [])
  useEffect(() => {
    fetch('https://localhost:7014/apiUser/Categories/GetAllCategories')
      .then((res) => res.json())
      .then((data) => {
        setCategory(data)
        const idMap = {}
        data.forEach((category) => {
          idMap[category.categoryName] = category.categoryID
        })
        setCategoryIdMap(idMap)
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

  // Hàm thêm

  const handleAdd = () => {
    const ProductName = document.getElementById('Text_ProductName').value.length
    const Description = document.getElementById('Text_description').value.length

    if (ProductName === 0 || Description === 0) {
      alert('Vui lòng nhập đầy đủ thông tin sản phẩm')
      console.log('ProductName Null')
      return
    }

    const fileInput = document.querySelector('#File_image')
    const file = fileInput.files[0]

    if (!file) {
      alert('Vui lòng chọn hình ảnh sản phẩm.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    fetch('https://localhost:7014/api/TestUpLoadFile/upload/product', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const imageURL = `https://localhost:7014${data.filePath}`

        fetch(`https://localhost:7014/api/SanPham/AddSanPham`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productID: 0,
            productName: selectedProduct.productName,
            description: selectedProduct.description,
            imageURL: imageURL,
            categoryID: selectedProduct.categoryID,
            brandID: selectedProduct.brandID,
            categoryName: 'string',
            price: 0,
            brandName: 'string',
          }),
        })
          .then((response) => {
            if (response.ok) {
              console.log('Product ADD successfully')
              handleCloseSecond()
              alert('Thêm sản phẩm thành công !')
            } else {
              console.log('Error Add product')
            }
          })
          .catch((error) => console.error(error))
      })
      .catch((error) => console.error(error))
  }

  // Hàm sửa
  const handleSave = () => {
    fetch(`https://localhost:7014/api/SanPham/EditSanPham`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productID: selectedProduct.productID,
        productName: selectedProduct.productName,
        description: selectedProduct.description,
        imageURL: selectedProduct.imageURL,
        categoryID: selectedProduct.categoryID,
        brandID: selectedProduct.brandID,
        categoryName: 'string',
        price: 0,
        brandName: 'string',
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log('Product updated successfully')
          handleClose()
          notify()
          setDataProduct(
            DataProduct.map((product) => {
              if (product.productID === selectedProduct.productID) {
                return selectedProduct
              }
              return product
            }),
          )
        } else {
          console.log('Error updating product')
        }
      })
      .catch((error) => console.error(error))
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
  function SaveUpdateProduct() {
    handleSave()
    notify()
  }
  // Notify
  const notify = () => {
    toast.success('Sửa thành công !', {
      position: toast.POSITION.TOP_RIGHT,
    })
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Sản phẩm</strong>

            <button
              onClick={handleShowSecond}
              style={{
                background: '#ccc',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '6px',
                marginLeft: '20px',
              }}
            >
              {' '}
              Thêm mới
            </button>
            <Modal show={showSecond} onHide={handleCloseSecond} backdrop="static" keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title>Thêm sản phẩm</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                  <Form.Label>Tên sản phẩm</Form.Label>
                  <Form.Control
                    id="Text_ProductName"
                    type="text"
                    placeholder=""
                    autoFocus
                    value={selectedProduct ? selectedProduct.productName : ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        productName: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Miêu tả</Form.Label>
                  <Form.Control
                    id="Text_description"
                    type="text"
                    placeholder=""
                    autoFocus
                    value={selectedProduct ? selectedProduct.description : ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                  <Form.Label>Loại sản phẩm</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedProduct ? selectedProduct.categoryName : ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        categoryID: categoryIdMap[e.target.value],
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
                <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                  <Form.Label>Thương Hiệu</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedProduct ? selectedProduct.brandName : ''}
                    onChange={(e) =>
                      setSelectedProduct({
                        ...selectedProduct,
                        brandID: brandIdMap[e.target.value],
                        brandName: e.target.value,
                      })
                    }
                  >
                    <option value="">Chọn thương hiệu</option>
                    {brand.map((brands) => (
                      <option key={brands.brandID} value={brands.brandName}>
                        {brands.brandName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Hình ảnh</Form.Label>
                  <Form.Control
                    // onChange={handleImageChange}
                    id="File_image"
                    required="required"
                    type="file"
                  />
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseSecond}>
                  Đóng
                </Button>
                <Button onClick={handleAdd} variant="primary">
                  Thêm
                </Button>
              </Modal.Footer>
            </Modal>
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
                        <Modal style={{ background: 'none' }} show={show}>
                          <Modal.Header onClick={handleClose} closeButton>
                            <Modal.Title>Sửa sản phẩm</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                              <Form.Control
                                id="Text_ProductId"
                                type="hidden"
                                placeholder=""
                                autoFocus
                                value={selectedProduct ? selectedProduct.productID : ''}
                                onChange={(e) =>
                                  setSelectedProduct({
                                    ...selectedProduct,
                                    productID: e.target.value,
                                  })
                                }
                              />
                            </Form.Group>
                            <Form>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Tên sản phẩm</Form.Label>
                                <Form.Control
                                  id="Text_ProductName"
                                  type="text"
                                  placeholder=""
                                  autoFocus
                                  value={selectedProduct ? selectedProduct.productName : ''}
                                  onChange={(e) =>
                                    setSelectedProduct({
                                      ...selectedProduct,
                                      productName: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>
                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Miêu tả</Form.Label>
                                <Form.Control
                                  id="Text_
  description"
                                  as="textarea"
                                  rows={1}
                                  value={selectedProduct ? selectedProduct.description : ''}
                                  onChange={(e) =>
                                    setSelectedProduct({
                                      ...selectedProduct,
                                      description: e.target.value,
                                    })
                                  }
                                />
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                                <Form.Label>Loại sản phẩm</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={selectedProduct ? selectedProduct.categoryName : ''}
                                  onChange={(e) =>
                                    setSelectedProduct({
                                      ...selectedProduct,
                                      categoryID: categoryIdMap[e.target.value],
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
                              <Form.Group className="mb-3" controlId="exampleForm.ControlSelect1">
                                <Form.Label>Thương Hiệu</Form.Label>
                                <Form.Control
                                  as="select"
                                  value={selectedProduct ? selectedProduct.brandName : ''}
                                  onChange={(e) =>
                                    setSelectedProduct({
                                      ...selectedProduct,
                                      brandID: brandIdMap[e.target.value],
                                      brandName: e.target.value,
                                    })
                                  }
                                >
                                  <option value="">Chọn thương hiệu</option>
                                  {brand.map((brands) => (
                                    <option key={brands.brandID} value={brands.brandName}>
                                      {brands.brandName}
                                    </option>
                                  ))}
                                </Form.Control>
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Hình ảnh</Form.Label>
                                <Form.Control
                                  // onChange={handleImageChange}
                                  id="File_image"
                                  required="required"
                                  type="file"
                                />
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={handleClose} variant="secondary">
                              Đóng
                            </Button>
                            <Button variant="primary" onClick={SaveUpdateProduct}>
                              Lưu
                            </Button>
                            <ToastContainer />
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
