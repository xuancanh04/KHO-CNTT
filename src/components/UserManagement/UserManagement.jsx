import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = ({ userRole, addNotification }) => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newUser, setNewUser] = useState({
    username: '',
    fullName: '',
    email: '',
    role: 'staff',
    department: '',
    phone: '',
    isActive: true
  });

  const roles = ['admin', 'manager', 'staff'];
  const departments = ['CNTT', 'Y tế', 'Hành chính', 'Kế toán', 'Kho', 'Bảo trì'];

  useEffect(() => {
    // Mock data
    const mockUsers = [
      {
        id: 1,
        username: 'admin001',
        fullName: 'Nguyễn Văn Admin',
        email: 'admin@bv7a.vn',
        role: 'admin',
        department: 'CNTT',
        phone: '0123456789',
        isActive: true,
        lastLogin: '2024-01-15 09:30:00',
        createdAt: '2023-01-01'
      },
      {
        id: 2,
        username: 'manager001',
        fullName: 'Trần Thị Quản Lý',
        email: 'manager@bv7a.vn',
        role: 'manager',
        department: 'Y tế',
        phone: '0123456790',
        isActive: true,
        lastLogin: '2024-01-14 14:20:00',
        createdAt: '2023-02-01'
      },
      {
        id: 3,
        username: 'staff001',
        fullName: 'Lê Văn Nhân Viên',
        email: 'staff@bv7a.vn',
        role: 'staff',
        department: 'Hành chính',
        phone: '0123456791',
        isActive: true,
        lastLogin: '2024-01-13 16:45:00',
        createdAt: '2023-03-01'
      },
      {
        id: 4,
        username: 'manager002',
        fullName: 'Phạm Thị Quản Lý Kho',
        email: 'manager2@bv7a.vn',
        role: 'manager',
        department: 'Kế toán',
        phone: '0123456792',
        isActive: true,
        lastLogin: '2024-01-12 10:15:00',
        createdAt: '2023-04-01'
      },
      {
        id: 5,
        username: 'staff002',
        fullName: 'Vũ Văn Kỹ Thuật',
        email: 'staff2@bv7a.vn',
        role: 'staff',
        department: 'CNTT',
        phone: '0123456793',
        isActive: true,
        lastLogin: '2024-01-11 15:30:00',
        createdAt: '2023-05-01'
      }
    ];
    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
  }, []);

  useEffect(() => {
    const filtered = users.filter(user => {
      const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      const matchesDepartment = departmentFilter === 'all' || user.department === departmentFilter;
      
      return matchesSearch && matchesRole && matchesDepartment;
    });
    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter, departmentFilter]);

  const handleAddUser = () => {
    if (!newUser.username || !newUser.fullName || !newUser.email) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    const userExists = users.find(u => u.username === newUser.username || u.email === newUser.email);
    if (userExists) {
      addNotification('Username hoặc email đã tồn tại', 'error');
      return;
    }

    const newUserWithId = {
      ...newUser,
      id: users.length + 1,
      lastLogin: '-',
      createdAt: new Date().toISOString().split('T')[0]
    };

    setUsers([...users, newUserWithId]);
    setNewUser({
      username: '',
      fullName: '',
      email: '',
      role: 'staff',
      department: '',
      phone: '',
      isActive: true
    });
    setShowAddModal(false);
    addNotification('Thêm người dùng thành công', 'success');
  };

  const handleEditUser = () => {
    if (!selectedUser.username || !selectedUser.fullName || !selectedUser.email) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    const updatedUsers = users.map(user => 
      user.id === selectedUser.id ? selectedUser : user
    );
    setUsers(updatedUsers);
    setShowEditModal(false);
    setSelectedUser(null);
    addNotification('Cập nhật người dùng thành công', 'success');
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      const updatedUsers = users.filter(user => user.id !== userId);
      setUsers(updatedUsers);
      addNotification('Xóa người dùng thành công', 'success');
    }
  };

  const handleStatusChange = (userId) => {
    const updatedUsers = users.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);
    addNotification('Cập nhật trạng thái thành công', 'success');
  };

  const getRoleInfo = (role) => {
    const roleInfo = {
      admin: { label: 'Admin/CNTT', color: '#e53e3e', icon: '👑' },
      manager: { label: 'Quản lý', color: '#3182ce', icon: '👔' },
      staff: { label: 'Nhân viên', color: '#38a169', icon: '👤' }
    };
    return roleInfo[role] || roleInfo.staff;
  };

  const getDepartmentColor = (department) => {
    const colors = {
      'CNTT': '#667eea',
      'Y tế': '#48bb78',
      'Hành chính': '#ed8936',
      'Kế toán': '#9f7aea',
      'Kho': '#f56565',
      'Bảo trì': '#38b2ac'
    };
    return colors[department] || '#718096';
  };

  return (
    <div className="user-management">
      <div className="user-header">
        <h1>Quản lý người dùng</h1>
        <p>Quản lý tài khoản, phân quyền và truy cập hệ thống</p>
      </div>

      <div className="user-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Tìm kiếm theo tên, username hoặc email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-controls">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="all">Tất cả vai trò</option>
            {roles.map(role => (
              <option key={role} value={role}>
                {getRoleInfo(role).label}
              </option>
            ))}
          </select>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
          >
            <option value="all">Tất cả phòng ban</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {userRole === 'admin' && (
          <button
            className="add-user-btn"
            onClick={() => setShowAddModal(true)}
          >
            <span className="button-icon">➕</span>
            <span className="button-text">Thêm người dùng</span>
          </button>
        )}
      </div>

      <div className="user-table-container">
        <table className="user-table">
          <thead>
            <tr>
              <th>Thông tin</th>
              <th>Vai trò</th>
              <th>Phòng ban</th>
              <th>Trạng thái</th>
              <th>Hoạt động gần nhất</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className={!user.isActive ? 'inactive-user' : ''}>
                <td className="user-info">
                  <div className="user-avatar">
                    <span className="avatar-text">
                      {user.fullName.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user.fullName}</div>
                    <div className="user-username">@{user.username}</div>
                    <div className="user-email">{user.email}</div>
                    <div className="user-phone">{user.phone}</div>
                  </div>
                </td>
                <td>
                  <div className="role-badge" style={{ backgroundColor: getRoleInfo(user.role).color + '20', color: getRoleInfo(user.role).color }}>
                    <span className="role-icon">{getRoleInfo(user.role).icon}</span>
                    {getRoleInfo(user.role).label}
                  </div>
                </td>
                <td>
                  <div className="department-badge" style={{ backgroundColor: getDepartmentColor(user.department) + '20', color: getDepartmentColor(user.department) }}>
                    {user.department}
                  </div>
                </td>
                <td>
                  <div className={`status-badge ${user.isActive ? 'status-active' : 'status-inactive'}`}>
                    {user.isActive ? 'Hoạt động' : 'Không hoạt động'}
                  </div>
                </td>
                <td>
                  <div className="last-activity">
                    <div className="last-login">{user.lastLogin}</div>
                    <div className="created-date">Tạo: {user.createdAt}</div>
                  </div>
                </td>
                <td>
                  <div className="user-actions">
                    <button
                      className="action-btn view-btn"
                      onClick={() => setSelectedUser(user)}
                      title="Xem chi tiết"
                    >
                      👁️
                    </button>
                    {userRole === 'admin' && (
                      <>
                        <button
                          className="action-btn edit-btn"
                          onClick={() => {
                            setSelectedUser({ ...user });
                            setShowEditModal(true);
                          }}
                          title="Chỉnh sửa"
                        >
                          ✏️
                        </button>
                        <button
                          className="action-btn status-btn"
                          onClick={() => handleStatusChange(user.id)}
                          title={user.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                        >
                          {user.isActive ? '🚫' : '✅'}
                        </button>
                        <button
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Xóa"
                        >
                          🗑️
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Thêm người dùng mới</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                value={newUser.username}
                onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                placeholder="Nhập username"
              />
            </div>

            <div className="form-group">
              <label>Họ và tên *</label>
              <input
                type="text"
                value={newUser.fullName}
                onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                placeholder="Nhập email"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Vai trò</label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>
                      {getRoleInfo(role).label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Phòng ban</label>
                <select
                  value={newUser.department}
                  onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
                >
                  <option value="">Chọn phòng ban</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                value={newUser.phone}
                onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={newUser.isActive}
                  onChange={(e) => setNewUser({ ...newUser, isActive: e.target.checked })}
                />
                Tài khoản hoạt động
              </label>
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleAddUser}>
                <span className="button-icon">💾</span>
                Thêm người dùng
              </button>
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                <span className="button-icon">❌</span>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Chỉnh sửa người dùng</h3>
              <button className="close-btn" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            
            <div className="form-group">
              <label>Username *</label>
              <input
                type="text"
                value={selectedUser.username}
                onChange={(e) => setSelectedUser({ ...selectedUser, username: e.target.value })}
                placeholder="Nhập username"
              />
            </div>

            <div className="form-group">
              <label>Họ và tên *</label>
              <input
                type="text"
                value={selectedUser.fullName}
                onChange={(e) => setSelectedUser({ ...selectedUser, fullName: e.target.value })}
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={selectedUser.email}
                onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                placeholder="Nhập email"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Vai trò</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                >
                  {roles.map(role => (
                    <option key={role} value={role}>
                      {getRoleInfo(role).label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Phòng ban</label>
                <select
                  value={selectedUser.department}
                  onChange={(e) => setSelectedUser({ ...selectedUser, department: e.target.value })}
                >
                  <option value="">Chọn phòng ban</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Số điện thoại</label>
              <input
                type="tel"
                value={selectedUser.phone}
                onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                placeholder="Nhập số điện thoại"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={selectedUser.isActive}
                  onChange={(e) => setSelectedUser({ ...selectedUser, isActive: e.target.checked })}
                />
                Tài khoản hoạt động
              </label>
            </div>

            <div className="modal-actions">
              <button className="save-btn" onClick={handleEditUser}>
                <span className="button-icon">💾</span>
                Cập nhật
              </button>
              <button className="cancel-btn" onClick={() => setShowEditModal(false)}>
                <span className="button-icon">❌</span>
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Detail Modal */}
      {selectedUser && !showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content user-detail">
            <div className="modal-header">
              <h3>Chi tiết người dùng</h3>
              <button className="close-btn" onClick={() => setSelectedUser(null)}>×</button>
            </div>
            
            <div className="user-detail-header">
              <div className="user-detail-avatar">
                <span className="avatar-text-large">
                  {selectedUser.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div className="user-detail-info">
                <h4>{selectedUser.fullName}</h4>
                <p>@{selectedUser.username}</p>
                <div className="role-badge-large" style={{ backgroundColor: getRoleInfo(selectedUser.role).color + '20', color: getRoleInfo(selectedUser.role).color }}>
                  <span className="role-icon">{getRoleInfo(selectedUser.role).icon}</span>
                  {getRoleInfo(selectedUser.role).label}
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Thông tin liên hệ</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Email</label>
                  <div className="value">{selectedUser.email}</div>
                </div>
                <div className="detail-item">
                  <label>Số điện thoại</label>
                  <div className="value">{selectedUser.phone}</div>
                </div>
                <div className="detail-item">
                  <label>Phòng ban</label>
                  <div className="value">{selectedUser.department}</div>
                </div>
                <div className="detail-item">
                  <label>Trạng thái</label>
                  <div className="value">
                    <span className={`status-badge ${selectedUser.isActive ? 'status-active' : 'status-inactive'}`}>
                      {selectedUser.isActive ? 'Hoạt động' : 'Không hoạt động'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h4>Hoạt động hệ thống</h4>
              <div className="detail-grid">
                <div className="detail-item">
                  <label>Lần đăng nhập cuối</label>
                  <div className="value">{selectedUser.lastLogin}</div>
                </div>
                <div className="detail-item">
                  <label>Ngày tạo tài khoản</label>
                  <div className="value">{selectedUser.createdAt}</div>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button className="cancel-btn" onClick={() => setSelectedUser(null)}>
                <span className="button-icon">❌</span>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
