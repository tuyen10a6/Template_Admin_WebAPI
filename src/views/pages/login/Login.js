import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const Login = () => {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')

  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://localhost:7014/api/CheckUser/CheckUser?UserName=${userName}&Password=${password}`,
  //     )

  //     const token = response.data // Giả sử API trả về mã thông báo JWT trong phần body response
  //     console.log(response.data)
  //     alert('Đăng nhập thành công')
  //     localStorage.setItem('token', token)
  //     navigate('/base/accordion')
  //     // Lưu mã thông báo vào state hoặc lưu trữ khác tùy thuộc vào yêu cầu của bạn
  //     setToken(token)
  //   } catch (error) {
  //     // Xử lý lỗi khi yêu cầu API thất bại
  //     console.error(error)
  //   }
  // }
  // const handleLogin = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://localhost:7014/api/CheckUser/CheckUser?UserName=${userName}&Password=${password}`,
  //     )

  //     const token = response.data // Giả sử API trả về mã thông báo JWT trong phần body response
  //     console.log(response.data)
  //     alert('Đăng nhập thành công')
  //     sessionStorage.setItem('token', token) // Sử dụng sessionStorage thay thế localStorage
  //     navigate('/Dashboard')
  //     // Lưu mã thông báo vào state hoặc lưu trữ khác tùy thuộc vào yêu cầu của bạn
  //     setToken(token)
  //   } catch (error) {
  //     // Xử lý lỗi khi yêu cầu API thất bại
  //     console.error(error)
  //   }
  // }
  const handleLogin = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7014/api/CheckUser/CheckUser?UserName=${userName}&Password=${password}`,
      )

      const token = response.data // Giả sử API trả về mã thông báo JWT trong phần body response
      console.log(response.data)
      alert('Đăng nhập thành công')
      sessionStorage.setItem('token', token) // Sử dụng sessionStorage thay thế localStorage
      navigate('/Dashboard')
      // Lưu mã thông báo vào state hoặc lưu trữ khác tùy thuộc vào yêu cầu của bạn
      setToken(token)
    } catch (error) {
      // Xử lý lỗi khi yêu cầu API thất bại
      console.error(error)
      if (error.response && error.response.status === 400) {
        alert('Tài khoản hoặc mật khẩu không chính xác')
      }
    }
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Đăng Nhập</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Username"
                        autoComplete="username"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleLogin} color="primary" className="px-4">
                          Đăng nhập
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Quên mật khẩu?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                      tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
