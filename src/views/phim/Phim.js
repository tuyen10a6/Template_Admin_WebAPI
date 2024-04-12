import React, { useState, useEffect } from 'react'

const Phim = () => {
  const [danhSachPhim, setDanhSachPhim] = useState([])
  const [danhMuc, setDanhMuc] = useState([])
  const [newPhim, setNewPhim] = useState({
    ten_phim: '',
    dao_dien: '',
    ngay_phat_hanh: '',
    thoi_luong: '',
    tom_tat: '',
    danhmuc_id: '', // Thêm trường để lưu ID của danh mục
  })
  const [editingId, setEditingId] = useState(null)

  const [editingPhim, setEditingPhim] = useState({
    ten_phim: '',
    dao_dien: '',
    ngay_phat_hanh: '',
    thoi_luong: '',
    tom_tat: '',
    danhmuc_id: '',
  })
  const [isEditing, setIsEditing] = useState(false) // State để kiểm soát việc hiển thị form sửa
  const token = localStorage.getItem('token')

  useEffect(() => {
    fetch('http://localhost:3000/v1/api/phim')
      .then((response) => response.json())
      .then((data) => setDanhSachPhim(data.data))
      .catch((error) => console.error('Error fetching danh sách phim:', error))

    fetch('http://localhost:3000/v1/api/danhmuc')
      .then((response) => response.json())
      .then((data) => setDanhMuc(data.data))
      .catch((error) => console.error('Error fetching danh sách danh mục:', error))
  }, [])

  const handleAddPhim = () => {
    console.log(newPhim)
    fetch('http://localhost:3000/v1/api/addPhim', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newPhim),
    })
      .then((response) => response.json())
      .then((data) => {
        setDanhSachPhim([...danhSachPhim, data])
        setNewPhim({
          ten_phim: '',
          dao_dien: '',
          ngay_phat_hanh: '',
          thoi_luong: '',
          tom_tat: '',
          danhmuc_id: '',
        })
        window.location.reload()
      })
      .catch((error) => console.error('Lỗi khi thêm phim:', error))
  }

  const handleEdit = (id, phim) => {
    setIsEditing(true) // Chuyển sang chế độ sửa
    setEditingId(id)
    setEditingPhim(phim)
  }

  const handleUpdatePhim = () => {
    console.log(editingPhim)
    fetch(`http://localhost:3000/v1/api/updatePhim/${editingId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editingPhim),
    })
      .then(() => {
        const updatedDanhSachPhim = danhSachPhim.map((item) =>
          item.id === editingId ? editingPhim : item,
        )
        setDanhSachPhim(updatedDanhSachPhim)
        setEditingId(null)
        setEditingPhim({
          ten_phim: '',
          dao_dien: '',
          ngay_phat_hanh: '',
          thoi_luong: '',
          tom_tat: '',
          danhmuc_id: '',
        })
        setIsEditing(false) // Chuyển về chế độ thêm
      })
      .catch((error) => console.error('Error updating phim:', error))
  }

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/v1/api/deletePhim/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(() => {
        const updatedDanhSachPhim = danhSachPhim.filter((item) => item.id !== id)
        setDanhSachPhim(updatedDanhSachPhim)
      })
      .catch((error) => console.error('Error deleting phim:', error))
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Danh sách các bộ phim</h1>
      <div>
        <input
          type="text"
          value={newPhim.ten_phim}
          onChange={(e) => setNewPhim({ ...newPhim, ten_phim: e.target.value })}
          placeholder="Tên phim"
          style={inputStyle}
        />
        <input
          type="text"
          value={newPhim.dao_dien}
          onChange={(e) => setNewPhim({ ...newPhim, dao_dien: e.target.value })}
          placeholder="Đạo diễn"
          style={{ ...inputStyle, marginLeft: '10px' }}
        />
        <input
          type="date"
          value={newPhim.ngay_phat_hanh}
          onChange={(e) => setNewPhim({ ...newPhim, ngay_phat_hanh: e.target.value })}
          placeholder="Ngày phát hành"
          style={{ ...inputStyle, marginLeft: '10px' }}
        />
        <input
          type="text"
          value={newPhim.thoi_luong}
          onChange={(e) => setNewPhim({ ...newPhim, thoi_luong: e.target.value })}
          placeholder="Thời lượng"
          style={{ ...inputStyle, marginLeft: '0px', marginTop: '10px' }}
        />
        <input
          type="text"
          value={newPhim.tom_tat}
          onChange={(e) => setNewPhim({ ...newPhim, tom_tat: e.target.value })}
          placeholder="Tóm tắt"
          style={{ ...inputStyle, marginLeft: '10px' }}
        />
        {/* Thêm select để chọn danh mục */}
        <select
          value={newPhim.danhmuc_id}
          onChange={(e) => setNewPhim({ ...newPhim, danhmuc_id: e.target.value })}
          style={{ ...inputStyle, marginLeft: '10px' }}
        >
          <option value="">Chọn danh mục</option>
          {danhMuc.map((item) => (
            <option key={item.id} value={item.id}>
              {item.loai_phim}
            </option>
          ))}
        </select>
        <button style={{ marginLeft: '20px' }} onClick={handleAddPhim}>
          Thêm
        </button>
      </div>
      <table style={{ width: '120%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Tên phim</th>
            <th style={tableHeaderStyle}>Đạo diễn</th>
            <th style={tableHeaderStyle}>Ngày phát hành</th>
            <th style={tableHeaderStyle}>Thời lượng</th>
            <th style={tableHeaderStyle}>Tóm tắt</th>
            <th style={tableHeaderStyle}>Danh mục</th>
            <th style={tableHeaderStyle}>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {danhSachPhim.map((phim) => (
            <tr key={phim.id} style={tableRowStyle}>
              <td style={tableCellStyle}>{phim.id}</td>
              <td style={tableCellStyle}>{phim.ten_phim}</td>
              <td style={tableCellStyle}>{phim.dao_dien}</td>
              <td style={tableCellStyle}>{phim.ngay_phat_hanh}</td>
              <td style={tableCellStyle}>{phim.thoi_luong}</td>
              <td style={tableCellStyle}>{phim.tom_tat}</td>
              <td style={tableCellStyle}>
                {danhMuc.find((item) => item.id === phim.danhmuc_id)?.loai_phim || 'N/A'}
              </td>
              <td style={tableCellStyle}>
                <button onClick={() => handleEdit(phim.id, phim)}>Sửa</button>
                <button style={{ marginTop: '5px' }} onClick={() => handleDelete(phim.id)}>
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditing && (
        <div style={{ marginTop: '20px' }}>
          <h2>Form sửa</h2>
          {/* Input để sửa thông tin của phim */}
          <input
            type="text"
            value={editingPhim.ten_phim}
            onChange={(e) => setEditingPhim({ ...editingPhim, ten_phim: e.target.value })}
            placeholder="Tên phim"
            style={inputStyle}
          />
          <input
            type="text"
            value={editingPhim.dao_dien}
            onChange={(e) => setEditingPhim({ ...editingPhim, dao_dien: e.target.value })}
            placeholder="Đạo diễn"
            style={{ ...inputStyle, marginLeft: '10px' }}
          />
          <input
            type="date"
            value={editingPhim.ngay_phat_hanh}
            onChange={(e) => setEditingPhim({ ...editingPhim, ngay_phat_hanh: e.target.value })}
            placeholder="Ngày phát hành"
            style={{ ...inputStyle, marginLeft: '10px' }}
          />
          <input
            type="text"
            value={editingPhim.thoi_luong}
            onChange={(e) => setEditingPhim({ ...editingPhim, thoi_luong: e.target.value })}
            placeholder="Thời lượng"
            style={{ ...inputStyle, marginLeft: '0px', marginTop: '10px' }}
          />
          <input
            type="text"
            value={editingPhim.tom_tat}
            onChange={(e) => setEditingPhim({ ...editingPhim, tom_tat: e.target.value })}
            placeholder="Tóm tắt"
            style={{ ...inputStyle, marginLeft: '10px' }}
          />
          {/* Thêm select để sửa danh mục */}
          <select
            value={editingPhim.danh_muc_id}
            onChange={(e) => setEditingPhim({ ...editingPhim, danh_muc_id: e.target.value })}
            style={{ ...inputStyle, marginLeft: '10px' }}
          >
            <option value="">Chọn danh mục</option>
            {danhMuc.map((item) => (
              <option key={item.id} value={item.id}>
                {item.loai_phim}
              </option>
            ))}
          </select>
          <button style={{ marginLeft: '20px' }} onClick={handleUpdatePhim}>
            Lưu
          </button>
        </div>
      )}
    </div>
  )
}

const tableHeaderStyle = {
  background: '#333',
  color: '#fff',
  padding: '10px',
  textAlign: 'left',
}

const tableRowStyle = {
  borderBottom: '1px solid #ccc',
}

const tableCellStyle = {
  padding: '10px',
}

const inputStyle = {
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
}

export default Phim
