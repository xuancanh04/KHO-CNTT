import React, { useState, useEffect } from 'react';
import './Equipment.css';

const Equipment = ({ userRole, addNotification }) => {
  const [equipment, setEquipment] = useState([]);
  const [filteredEquipment, setFilteredEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);

  const [newEquipment, setNewEquipment] = useState({
    name: '',
    type: '',
    model: '',
    serialNumber: '',
    department: '',
    location: '',
    status: 'active',
    purchaseDate: '',
    warrantyExpiry: '',
    supplier: '',
    price: 0,
    description: '',
    assignedTo: ''
  });

  useEffect(() => {
    // Giả lập dữ liệu thiết bị
    const mockEquipment = [
      {
        id: 1,
        name: 'Máy tính Dell OptiPlex 7090',
        type: 'Máy tính để bàn',
        model: 'OptiPlex 7090',
        serialNumber: 'DL7090X001',
        department: 'Phòng Y tế',
        location: 'Tầng 2 - Phòng 201',
        status: 'active',
        purchaseDate: '2023-06-15',
        warrantyExpiry: '2026-06-15',
        supplier: 'Công ty TNHH ABC',
        price: 18500000,
        description: 'Máy tính Dell OptiPlex 7090, Intel Core i7, RAM 16GB, SSD 512GB',
        assignedTo: 'Nguyễn Văn A',
        lastMaintenance: '2024-01-10',
        nextMaintenance: '2024-04-10'
      },
      {
        id: 2,
        name: 'Máy in HP LaserJet Pro M404n',
        type: 'Máy in',
        model: 'LaserJet Pro M404n',
        serialNumber: 'HP404N001',
        department: 'Phòng Kế toán',
        location: 'Tầng 1 - Phòng 105',
        status: 'maintenance',
        purchaseDate: '2023-03-20',
        warrantyExpiry: '2026-03-20',
        supplier: 'Công ty TNHH XYZ',
        price: 8500000,
        description: 'Máy in laser đen trắng HP, tốc độ in 40 trang/phút',
        assignedTo: 'Trần Thị B',
        lastMaintenance: '2024-01-05',
        nextMaintenance: '2024-04-05'
      },
      {
        id: 3,
        name: 'Laptop Dell Latitude 5520',
        type: 'Laptop',
        model: 'Latitude 5520',
        serialNumber: 'DL5520X002',
        department: 'Phòng Hành chính',
        location: 'Tầng 1 - Phòng 101',
        status: 'active',
        purchaseDate: '2023-08-10',
        warrantyExpiry: '2026-08-10',
        supplier: 'Công ty TNHH DEF',
        price: 22500000,
        description: 'Laptop Dell Latitude 5520, Intel Core i5, RAM 8GB, SSD 256GB',
        assignedTo: 'Lê Văn C',
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-04-15'
      },
      {
        id: 4,
        name: 'Máy chiếu Epson EB-X41',
        type: 'Máy chiếu',
        model: 'EB-X41',
        serialNumber: 'EPX41X001',
        department: 'Phòng Họp',
        location: 'Tầng 3 - Phòng 301',
        status: 'repair',
        purchaseDate: '2022-12-05',
        warrantyExpiry: '2025-12-05',
        supplier: 'Công ty TNHH GHI',
        price: 12500000,
        description: 'Máy chiếu Epson EB-X41, độ phân giải XGA, độ sáng 3300 lumens',
        assignedTo: 'Phạm Thị D',
        lastMaintenance: '2023-12-20',
        nextMaintenance: '2024-03-20'
      },
      {
        id: 5,
        name: 'Switch Cisco Catalyst 2960',
        type: 'Thiết bị mạng',
        model: 'Catalyst 2960',
        serialNumber: 'CS2960X001',
        department: 'Phòng CNTT',
        location: 'Tầng 1 - Phòng Server',
        status: 'active',
        purchaseDate: '2023-01-15',
        warrantyExpiry: '2028-01-15',
        supplier: 'Công ty TNHH JKL',
        price: 8500000,
        description: 'Switch Cisco Catalyst 2960, 24 port Gigabit Ethernet',
        assignedTo: 'Vũ Văn E',
        lastMaintenance: '2024-01-01',
        nextMaintenance: '2024-04-01'
      }
    ];

    setEquipment(mockEquipment);
    setFilteredEquipment(mockEquipment);
  }, []);

  useEffect(() => {
    let filtered = equipment;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(item => item.department === departmentFilter);
    }
    
    setFilteredEquipment(filtered);
  }, [searchTerm, statusFilter, departmentFilter, equipment]);

  const equipmentTypes = ['Máy tính để bàn', 'Laptop', 'Máy in', 'Máy chiếu', 'Thiết bị mạng', 'Máy chủ', 'Khác'];
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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const handleAddEquipment = () => {
    if (!newEquipment.name || !newEquipment.type || !newEquipment.model) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    const equipment = {
      ...newEquipment,
      id: Date.now(),
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };

    setEquipment(prev => [...prev, equipment]);
    setNewEquipment({
      name: '', type: '', model: '', serialNumber: '', department: '',
      location: '', status: 'active', purchaseDate: '', warrantyExpiry: '',
      supplier: '', price: 0, description: '', assignedTo: ''
    });
    setShowAddModal(false);
    addNotification('Thêm thiết bị mới thành công!', 'success');
  };

  const handleEditEquipment = () => {
    if (!selectedEquipment.name || !selectedEquipment.type || !selectedEquipment.model) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    setEquipment(prev => prev.map(item => 
      item.id === selectedEquipment.id ? selectedEquipment : item
    ));
    setShowEditModal(false);
    setSelectedEquipment(null);
    addNotification('Cập nhật thiết bị thành công!', 'success');
  };

  const handleStatusChange = (equipmentId, newStatus) => {
    setEquipment(prev => prev.map(item => 
      item.id === equipmentId ? { ...item, status: newStatus } : item
    ));
    addNotification('Cập nhật trạng thái thiết bị thành công!', 'success');
  };

  return (
    <div className="equipment">
      <div className="equipment-header">
        <h1>💻 QUẢN LÝ THIẾT BỊ CNTT</h1>
        <p>Quản lý trang thiết bị CNTT trong toàn bệnh viện</p>
      </div>

      {/* Controls */}
      <div className="equipment-controls">
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
        </div>

        <div className="action-buttons">
          {userRole === 'admin' && (
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              ➕ Thêm thiết bị
            </button>
          )}
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="equipment-grid">
        {filteredEquipment.map(item => {
          const statusInfo = getStatusInfo(item.status);
          return (
            <div key={item.id} className="equipment-card">
              <div className="equipment-header-card">
                <div className="equipment-icon">
                  {item.type === 'Máy tính để bàn' || item.type === 'Laptop' ? '💻' :
                   item.type === 'Máy in' ? '🖨️' :
                   item.type === 'Máy chiếu' ? '📽️' :
                   item.type === 'Thiết bị mạng' ? '🌐' :
                   item.type === 'Máy chủ' ? '🖥️' : '🔌'}
                </div>
                <div className="equipment-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: statusInfo.color }}
                  >
                    {statusInfo.icon} {statusInfo.text}
                  </span>
                </div>
              </div>

              <div className="equipment-content">
                <h3 className="equipment-name">{item.name}</h3>
                <p className="equipment-model">{item.model}</p>
                
                <div className="equipment-details">
                  <div className="detail-row">
                    <span className="detail-label">Số serial:</span>
                    <span className="detail-value">{item.serialNumber}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phòng ban:</span>
                    <span className="detail-value">{item.department}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Vị trí:</span>
                    <span className="detail-value">{item.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Người sử dụng:</span>
                    <span className="detail-value">{item.assignedTo}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Bảo trì tiếp theo:</span>
                    <span className="detail-value">{item.nextMaintenance}</span>
                  </div>
                </div>

                <div className="equipment-actions">
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
                        onClick={() => {
                          setSelectedEquipment(item);
                          setShowEditModal(true);
                        }}
                        title="Chỉnh sửa"
                      >
                        ✏️ Sửa
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

      {/* Add Equipment Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>➕ Thêm thiết bị mới</h3>
              <button 
                className="modal-close"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Tên thiết bị *</label>
                  <input
                    type="text"
                    value={newEquipment.name}
                    onChange={(e) => setNewEquipment({...newEquipment, name: e.target.value})}
                    placeholder="Nhập tên thiết bị"
                  />
                </div>
                <div className="form-group">
                  <label>Loại thiết bị *</label>
                  <select
                    value={newEquipment.type}
                    onChange={(e) => setNewEquipment({...newEquipment, type: e.target.value})}
                  >
                    <option value="">Chọn loại thiết bị</option>
                    {equipmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Model *</label>
                  <input
                    type="text"
                    value={newEquipment.model}
                    onChange={(e) => setNewEquipment({...newEquipment, model: e.target.value})}
                    placeholder="Nhập model thiết bị"
                  />
                </div>
                <div className="form-group">
                  <label>Số serial</label>
                  <input
                    type="text"
                    value={newEquipment.serialNumber}
                    onChange={(e) => setNewEquipment({...newEquipment, serialNumber: e.target.value})}
                    placeholder="Nhập số serial"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phòng ban</label>
                  <select
                    value={newEquipment.department}
                    onChange={(e) => setNewEquipment({...newEquipment, department: e.target.value})}
                  >
                    <option value="">Chọn phòng ban</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Vị trí</label>
                  <input
                    type="text"
                    value={newEquipment.location}
                    onChange={(e) => setNewEquipment({...newEquipment, location: e.target.value})}
                    placeholder="Nhập vị trí cụ thể"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày mua</label>
                  <input
                    type="date"
                    value={newEquipment.purchaseDate}
                    onChange={(e) => setNewEquipment({...newEquipment, purchaseDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Hết hạn bảo hành</label>
                  <input
                    type="date"
                    value={newEquipment.warrantyExpiry}
                    onChange={(e) => setNewEquipment({...newEquipment, warrantyExpiry: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nhà cung cấp</label>
                  <input
                    type="text"
                    value={newEquipment.supplier}
                    onChange={(e) => setNewEquipment({...newEquipment, supplier: e.target.value})}
                    placeholder="Nhập tên nhà cung cấp"
                  />
                </div>
                <div className="form-group">
                  <label>Giá (VNĐ)</label>
                  <input
                    type="number"
                    value={newEquipment.price}
                    onChange={(e) => setNewEquipment({...newEquipment, price: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Người sử dụng</label>
                  <input
                    type="text"
                    value={newEquipment.assignedTo}
                    onChange={(e) => setNewEquipment({...newEquipment, assignedTo: e.target.value})}
                    placeholder="Nhập tên người sử dụng"
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={newEquipment.status}
                    onChange={(e) => setNewEquipment({...newEquipment, status: e.target.value})}
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
                <label>Mô tả</label>
                <textarea
                  value={newEquipment.description}
                  onChange={(e) => setNewEquipment({...newEquipment, description: e.target.value})}
                  placeholder="Mô tả chi tiết thiết bị..."
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleAddEquipment}
              >
                Thêm thiết bị
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Equipment Modal */}
      {showEditModal && selectedEquipment && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>✏️ Chỉnh sửa thiết bị</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedEquipment(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Tên thiết bị *</label>
                  <input
                    type="text"
                    value={selectedEquipment.name}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, name: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Loại thiết bị *</label>
                  <select
                    value={selectedEquipment.type}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, type: e.target.value})}
                  >
                    {equipmentTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Model *</label>
                  <input
                    type="text"
                    value={selectedEquipment.model}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, model: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Số serial</label>
                  <input
                    type="text"
                    value={selectedEquipment.serialNumber}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, serialNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phòng ban</label>
                  <select
                    value={selectedEquipment.department}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, department: e.target.value})}
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Vị trí</label>
                  <input
                    type="text"
                    value={selectedEquipment.location}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Ngày mua</label>
                  <input
                    type="date"
                    value={selectedEquipment.purchaseDate}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, purchaseDate: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Hết hạn bảo hành</label>
                  <input
                    type="date"
                    value={selectedEquipment.warrantyExpiry}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, warrantyExpiry: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Nhà cung cấp</label>
                  <input
                    type="text"
                    value={selectedEquipment.supplier}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, supplier: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Giá (VNĐ)</label>
                  <input
                    type="number"
                    value={selectedEquipment.price}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, price: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Người sử dụng</label>
                  <input
                    type="text"
                    value={selectedEquipment.assignedTo}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, assignedTo: e.target.value})}
                  />
                </div>
                <div className="form-group">
                  <label>Trạng thái</label>
                  <select
                    value={selectedEquipment.status}
                    onChange={(e) => setSelectedEquipment({...selectedEquipment, status: e.target.value})}
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
                <label>Mô tả</label>
                <textarea
                  value={selectedEquipment.description}
                  onChange={(e) => setSelectedEquipment({...selectedEquipment, description: e.target.value})}
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedEquipment(null);
                }}
              >
                Hủy
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleEditEquipment}
              >
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Equipment Detail Modal */}
      {selectedEquipment && !showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>📋 Chi tiết thiết bị</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedEquipment(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="equipment-detail">
                <h4>{selectedEquipment.name}</h4>
                <p className="equipment-description">{selectedEquipment.description}</p>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Loại thiết bị:</label>
                    <span>{selectedEquipment.type}</span>
                  </div>
                  <div className="detail-item">
                    <label>Model:</label>
                    <span>{selectedEquipment.model}</span>
                  </div>
                  <div className="detail-item">
                    <label>Số serial:</label>
                    <span>{selectedEquipment.serialNumber}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phòng ban:</label>
                    <span>{selectedEquipment.department}</span>
                  </div>
                  <div className="detail-item">
                    <label>Vị trí:</label>
                    <span>{selectedEquipment.location}</span>
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
                    <label>Ngày mua:</label>
                    <span>{selectedEquipment.purchaseDate}</span>
                  </div>
                  <div className="detail-item">
                    <label>Hết hạn bảo hành:</label>
                    <span>{selectedEquipment.warrantyExpiry}</span>
                  </div>
                  <div className="detail-item">
                    <label>Nhà cung cấp:</label>
                    <span>{selectedEquipment.supplier}</span>
                  </div>
                  <div className="detail-item">
                    <label>Giá:</label>
                    <span>{formatCurrency(selectedEquipment.price)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Bảo trì lần cuối:</label>
                    <span>{selectedEquipment.lastMaintenance}</span>
                  </div>
                  <div className="detail-item">
                    <label>Bảo trì tiếp theo:</label>
                    <span>{selectedEquipment.nextMaintenance}</span>
                  </div>
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

export default Equipment;
