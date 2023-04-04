import React from 'react'
import { useState, useEffect } from 'react'
import './../../../scss/_Product.scss'
// Import React Icon
import { GrUpdate } from 'react-icons/gr'
import { AiFillDelete } from 'react-icons/ai'
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
  // Khởi tạo biến đếm giá trị = 1
  const [counter, setCounter] = useState(1)
  useEffect(() => {
    async function fetchDataProduct() {
      const response = await fetch('https://localhost:7014/api/SanPham/GetAllSanPham')
      const data = await response.json()
      setDataProduct(data)
    }
    fetchDataProduct()
  }, [])
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
                  const counter = index + 1
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion
