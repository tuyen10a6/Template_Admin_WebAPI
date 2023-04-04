import React from 'react'
import { useState, useEffect } from 'react'
import './../../../scss/_Product.scss'
// Import React Icon
import { GrUpdate } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
import Pagination from 'react-bootstrap/Pagination'
import Table from 'react-bootstrap/Table'
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

  function handlePageChange(page) {
    if (page !== totalPages) {
      setPageNumber(page)
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
                        <GrUpdate className="Icon-update" />
                        <AiFillDelete className="Icon-delete" />
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
