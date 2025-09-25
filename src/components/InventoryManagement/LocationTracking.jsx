import React, { useState, useEffect } from 'react';
import '../LocationTracking/LocationTracking.css';

const LocationTracking = ({ userRole, addNotification }) => {
  const [equipmentLocations, setEquipmentLocations] = useState([]);
  const [filteredLocations, setFilteredLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showMoveModal, setShowMoveModal] = useState(false);
  const [moveForm, setMoveForm] = useState({
    department: '',
    location: ''
  });

  const [newLocation, setNewLocation] = useState({
    equipmentId: '',
    equipmentName: '',
    department: '',
    location: '',
    assignedTo: '',
    status: 'active',
    notes: ''
  });

  useEffect(() => {
    // Giả lập dữ liệu vị trí thiết bị
    const mockLocations = [
      {
        id: 1,
        equipmentId: 'EQ001',
        equipmentName: 'Máy tính Dell OptiPlex 7090',
        type: 'Máy tính để bàn',
        department: 'Phòng Y tế',
        location: 'Tầng 2 - Phòng 201',
        assignedTo: 'Nguyễn Văn A',
        status: 'active',
        lastMoved: '2024-01-10',
        notes: 'Máy tính chính của phòng khám'
      },
      {
        id: 2,
        equipmentId: 'EQ002',
        equipmentName: 'Máy in HP LaserJet Pro M404n',
        type: 'Máy in',
        department: 'Phòng Kế toán',
        location: 'Tầng 1 - Phòng 105',
        assignedTo: 'Trần Thị B',
        status: 'maintenance',
        lastMoved: '2024-01-05',
        notes: 'Đang bảo trì, tạm thời không sử dụng'
      },
      {
        id: 3,
        equipmentId: 'EQ003',
        equipmentName: 'Laptop Dell Latitude 5520',
        type: 'Laptop',
        department: 'Phòng Hành chính',
        location: 'Tầng 1 - Phòng 101',
        assignedTo: 'Lê Văn C',
        status: 'active',
        lastMoved: '2024-01-15',
        notes: 'Laptop di động cho họp'
      },
      {
        id: 4,
        equipmentId: 'EQ004',
        equipmentName: 'Máy chiếu Epson EB-X41',
        type: 'Máy chiếu',
        department: 'Phòng Họp',
        location: 'Tầng 3 - Phòng 301',
        assignedTo: 'Phạm Thị D',
        status: 'repair',
        lastMoved: '2024-01-08',
        notes: 'Đang sửa chữa, tạm thời không sử dụng'
      },
      {
        id: 5,
        equipmentId: 'EQ005',
        equipmentName: 'Switch Cisco Catalyst 2960',
        type: 'Thiết bị mạng',
        department: 'Phòng CNTT',
        location: 'Tầng 1 - Phòng Server',
        assignedTo: 'Vũ Văn E',
        status: 'active',
        lastMoved: '2024-01-01',
        notes: 'Switch chính của hệ thống mạng'
      },
      {
        id: 6,
        equipmentId: 'EQ006',
        equipmentName: 'Máy tính HP ProDesk 600',
        type: 'Máy tính để bàn',
        department: 'Phòng Khám bệnh',
        location: 'Tầng 1 - Phòng 110',
        assignedTo: 'Hoàng Thị F',
        status: 'active',
        lastMoved: '2024-01-12',
        notes: 'Máy tính phòng khám bệnh'
      },
      {
        id: 7,
        equipmentId: 'EQ007',
        equipmentName: 'Máy in Canon LBP6030w',
        type: 'Máy in',
        department: 'Phòng Hành chính',
        location: 'Tầng 1 - Phòng 101',
        assignedTo: 'Lê Văn C',
        status: 'active',
        lastMoved: '2024-01-14',
        notes: 'Máy in chung của phòng'
      },
      {
        id: 8,
        equipmentId: 'EQ008',
        equipmentName: 'Máy chủ Dell PowerEdge R740',
        type: 'Máy chủ',
        department: 'Phòng CNTT',
        location: 'Tầng 1 - Phòng Server',
        assignedTo: 'Vũ Văn E',
        status: 'active',
        lastMoved: '2023-12-20',
        notes: 'Máy chủ chính của hệ thống'
      }
    ];

    setEquipmentLocations(mockLocations);
    setFilteredLocations(mockLocations);
  }, []);

  useEffect(() => {
    let filtered = equipmentLocations;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.equipmentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(item => item.department === departmentFilter);
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    setFilteredLocations(filtered);
  }, [searchTerm, departmentFilter, statusFilter, equipmentLocations]);

  const departments = ['Phòng Y tế', 'Phòng Kế toán', 'Phòng Hành chính', 'Phòng Họp', 'Phòng CNTT', 'Phòng Khám bệnh'];
  const statuses = ['active', 'maintenance', 'repair', 'retired', 'lost'];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'active':
        return { text: 'Đang hoạt động', color: '#27ae60', icon: '✅' };
      case 'maintenance':
        return { text: 'Bảo trì', color: '#f39c12', icon: '🔧' };
      case 'repair':
        return { text: 'Sửa chữa', color: '#e74c3c', icon: '🛠️' };
      case 'retired':
        return { text: 'Đã nghỉ hưu', color: '#95a5a6', icon: '📴' };
      case 'lost':
        return { text: 'Mất/Thất lạc', color: '#9b59b6', icon: '❓' };
      default:
        return { text: 'Không xác định', color: '#95a5a6', icon: '❓' };
    }
  };

  const getEquipmentIcon = (type) => {
    switch (type) {
      case 'Máy tính để bàn':
        return '🖥️';
      case 'Laptop':
        return '💻';
      case 'Máy in':
        return '🖨️';
      case 'Máy chiếu':
        return '📽️';
      case 'Thiết bị mạng':
        return '🌐';
      case 'Máy chủ':
        return '🖥️';
      default:
        return '🔌';
    }
  };

  const handleUpdateLocation = () => {
    if (!newLocation.equipmentId || !newLocation.location || !newLocation.department) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    const updatedLocation = {
      ...newLocation,
      id: Date.now(),
      lastMoved: new Date().toISOString().split('T')[0]
    };

    setEquipmentLocations(prev => [...prev, updatedLocation]);
    setNewLocation({
      equipmentId: '', equipmentName: '', department: '', location: '',
      assignedTo: '', status: 'active', notes: ''
    });
    setShowLocationModal(false);
    addNotification('Cập nhật vị trí thiết bị thành công!', 'success');
  };

  const handleMoveEquipment = (equipmentId, newLocation, newDepartment) => {
    setEquipmentLocations(prev => prev.map(item => 
      item.id === equipmentId ? {
        ...item,
        location: newLocation,
        department: newDepartment,
        lastMoved: new Date().toISOString().split('T')[0]
      } : item
    ));
    addNotification('Di chuyển thiết bị thành công!', 'success');
  };

  const openMoveModal = (equipment) => {
    setSelectedEquipment(equipment)
    setMoveForm({
      department: equipment.department || '',
      location: equipment.location || ''
    })
    setShowMoveModal(true)
  }

  const submitMove = () => {
    if (!moveForm.location || !moveForm.department) {
      addNotification('Vui lòng nhập đầy đủ vị trí và phòng ban', 'error');
      return;
    }
    handleMoveEquipment(selectedEquipment.id, moveForm.location, moveForm.department)
    setShowMoveModal(false)
    setSelectedEquipment(null)
  }

  const handleStatusChange = (equipmentId, newStatus) => {
    setEquipmentLocations(prev => prev.map(item => 
      item.id === equipmentId ? { ...item, status: newStatus } : item
    ));
    addNotification('Cập nhật trạng thái thiết bị thành công!', 'success');
  };

  return (
    <div className="location-tracking">
      <div className="location-header">
        <h1>📍 THEO DÕI VỊ TRÍ THIẾT BỊ</h1>
        <p>Quản lý vị trí các thiết bị CNTT trong toàn bệnh viện</p>
      </div>

      {/* Controls */}
      <div className="location-controls">
        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm thiết bị..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="department-filter"
          >
            <option value="all">Tất cả phòng ban</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">Tất cả trạng thái</option>
            {statuses.map(status => (
              <option key={status} value={status}>
                {getStatusInfo(status).text}
              </option>
            ))}
          </select>
        </div>

        <div className="action-buttons">
          {userRole === 'admin' && (
            <button 
              className="btn btn-primary"
              onClick={() => setShowLocationModal(true)}
            >
              📍 Cập nhật vị trí
            </button>
          )}
        </div>
      </div>

      {/* Location Grid */}
      <div className="location-grid">
        {filteredLocations.map(item => {
          const statusInfo = getStatusInfo(item.status);
          return (
            <div key={item.id} className="location-card">
              <div className="location-header-card">
                <div className="equipment-icon">
                  {getEquipmentIcon(item.type)}
                </div>
                <div className="equipment-info">
                  <h3 className="equipment-name">{item.equipmentName}</h3>
                  <p className="equipment-id">ID: {item.equipmentId}</p>
                </div>
                <div className="status-badge-container">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: statusInfo.color }}
                  >
                    {statusInfo.icon} {statusInfo.text}
                  </span>
                </div>
              </div>

              <div className="location-content">
                <div className="location-details">
                  <div className="detail-row">
                    <span className="detail-label">Phòng ban:</span>
                    <span className="detail-value">{item.department}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Vị trí:</span>
                    <span className="detail-value location-highlight">{item.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Người sử dụng:</span>
                    <span className="detail-value">{item.assignedTo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Di chuyển lần cuối:</span>
                    <span className="detail-value">{item.lastMoved}</span>
                  </div>
                  {item.notes && (
                    <div className="detail-row">
                      <span className="detail-label">Ghi chú:</span>
                      <span className="detail-value notes">{item.notes}</span>
                    </div>
                  )}
                </div>

                <div className="location-actions">
                  <button 
                    className="btn-small btn-info"
                    onClick={() => setSelectedEquipment(item)}
                    title="Xem chi tiết"
                  >
                    📋 Chi tiết
                  </button>
                  
                  {userRole === 'admin' && (
                    <>
                      <button 
                        className="btn-small btn-warning"
                        onClick={() => openMoveModal(item)}
                        title="Di chuyển thiết bị"
                      >
                        🚚 Di chuyển
                      </button>
                      
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value)}
                        className="status-select"
                      >
                        {statuses.map(status => (
                          <option key={status} value={status}>
                            {getStatusInfo(status).text}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Overview */}
      <div className="department-overview">
        <h2>🏢 Tổng quan theo phòng ban</h2>
        <div className="department-stats">
          {departments.map(dept => {
            const deptEquipment = equipmentLocations.filter(item => item.department === dept);
            const activeEquipment = deptEquipment.filter(item => item.status === 'active').length;
            const totalEquipment = deptEquipment.length;
            
            return (
              <div key={dept} className="dept-stat-card">
                <div className="dept-header">
                  <h3>{dept}</h3>
                  <span className="equipment-count">{totalEquipment} thiết bị</span>
                </div>
                <div className="dept-stats">
                  <div className="stat-item">
                    <span className="stat-label">Đang hoạt động:</span>
                    <span className="stat-value active">{activeEquipment}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Bảo trì/Sửa chữa:</span>
                    <span className="stat-value maintenance">{totalEquipment - activeEquipment}</span>
                  </div>
                </div>
                <div className="dept-equipment-list">
                  {deptEquipment.slice(0, 3).map(item => (
                    <div key={item.id} className="dept-equipment-item">
                      <span className="equipment-icon-small">{getEquipmentIcon(item.type)}</span>
                      <span className="equipment-name-small">{item.equipmentName}</span>
                    </div>
                  ))}
                  {deptEquipment.length > 3 && (
                    <div className="more-equipment">
                      +{deptEquipment.length - 3} thiết bị khác
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Update Location Modal */}
      {showLocationModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>📍 Cập nhật vị trí thiết bị</h3>
              <button 
                className="modal-close"
                onClick={() => setShowLocationModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>ID thiết bị *</label>
                  <input
                    type="text"
                    value={newLocation.equipmentId}
                    onChange={(e) => setNewLocation({...newLocation, equipmentId: e.target.value})}
                    placeholder="Nhập ID thiết bị"
                  />
                </div>
                <div className="form-group">
                  <label>Tên thiết bị *</label>
                  <input
                    type="text"
                    value={newLocation.equipmentName}
                    onChange={(e) => setNewLocation({...newLocation, equipmentName: e.target.value})}
                    placeholder="Nhập tên thiết bị"
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Phòng ban *</label>
                  <select
                    value={newLocation.department}
                    onChange={(e) => setNewLocation({...newLocation, department: e.target.value})}
                  >
                    <option value="">Chọn phòng ban</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Vị trí cụ thể *</label>
                  <input
                    type="text"
                    value={newLocation.location}
                    onChange={(e) => setNewLocation({...newLocation, location: e.target.value})}
                    placeholder="Ví dụ: Tầng 1 - Phòng 101"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Người sử dụng</label>
                  <input
                    type="text"
                    value={newLocation.assignedTo}
                    onChange={(e) => setNewLocation({...newLocation, assignedTo: e.target.value})}
                    placeholder="Tên người sử dụng"
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={newLocation.status}
                    onChange={(e) => setNewLocation({...newLocation, status: e.target.value})}
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {getStatusInfo(status).text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  value={newLocation.notes}
                  onChange={(e) => setNewLocation({...newLocation, notes: e.target.value})}
                  placeholder="Ghi chú về vị trí hoặc tình trạng thiết bị..."
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowLocationModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleUpdateLocation}
              >
                Cập nhật vị trí
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Move Equipment Modal */}
      {showMoveModal && selectedEquipment && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>🚚 Di chuyển thiết bị</h3>
              <button 
                className="modal-close"
                onClick={() => { setShowMoveModal(false); setSelectedEquipment(null); }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Thiết bị</label>
                <input type="text" value={`${selectedEquipment.equipmentName} (ID: ${selectedEquipment.equipmentId})`} disabled />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Phòng ban mới *</label>
                  <select
                    value={moveForm.department}
                    onChange={(e) => setMoveForm({ ...moveForm, department: e.target.value })}
                  >
                    <option value="">Chọn phòng ban</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Vị trí mới *</label>
                  <input
                    type="text"
                    value={moveForm.location}
                    onChange={(e) => setMoveForm({ ...moveForm, location: e.target.value })}
                    placeholder="Ví dụ: Tầng 2 - Phòng 205"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => { setShowMoveModal(false); setSelectedEquipment(null); }}>Hủy</button>
              <button className="btn btn-primary" onClick={submitMove}>Xác nhận di chuyển</button>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Detail Modal */}
      {selectedEquipment && !showMoveModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>📋 Chi tiết vị trí thiết bị</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedEquipment(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="equipment-detail">
                <h4>{selectedEquipment.equipmentName}</h4>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>ID thiết bị:</label>
                    <span>{selectedEquipment.equipmentId}</span>
                  </div>
                  <div className="detail-item">
                    <label>Loại thiết bị:</label>
                    <span>{selectedEquipment.type}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phòng ban:</label>
                    <span>{selectedEquipment.department}</span>
                  </div>
                  <div className="detail-item">
                    <label>Vị trí hiện tại:</label>
                    <span className="location-highlight">{selectedEquipment.location}</span>
                  </div>
                  <div className="detail-item">
                    <label>Người sử dụng:</label>
                    <span>{selectedEquipment.assignedTo}</span>
                  </div>
                  <div className="detail-item">
                    <label>Trạng thái:</label>
                    <span 
                      className={`status ${selectedEquipment.status}`}
                      style={{ backgroundColor: getStatusInfo(selectedEquipment.status).color }}
                    >
                      {getStatusInfo(selectedEquipment.status).text}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Di chuyển lần cuối:</label>
                    <span>{selectedEquipment.lastMoved}</span>
                  </div>
                  {selectedEquipment.notes && (
                    <div className="detail-item full-width">
                      <label>Ghi chú:</label>
                      <span>{selectedEquipment.notes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedEquipment(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationTracking;
