import React, { useState, useEffect } from 'react';
import './Maintenance.css';

const Maintenance = ({ userRole, addNotification }) => {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [newRequest, setNewRequest] = useState({
    equipmentId: '',
    equipmentName: '',
    department: '',
    issue: '',
    priority: 'medium',
    description: '',
    requester: '',
    contactPhone: ''
  });

  const [signatureData, setSignatureData] = useState({
    requestId: '',
    signatureName: '',
    signatureDate: '',
    signatureNote: '',
    workCompleted: '',
    materialsUsed: ''
  });

  useEffect(() => {
    // Giả lập dữ liệu yêu cầu bảo trì
    const mockRequests = [
      {
        id: 1,
        equipmentId: 'EQ001',
        equipmentName: 'Máy in HP LaserJet Pro M404n',
        department: 'Phòng Kế toán',
        issue: 'Thay mực in',
        priority: 'high',
        description: 'Máy in hết mực, cần thay mực HP 26A mới',
        requester: 'Trần Thị B',
        contactPhone: '0901234567',
        status: 'pending',
        requestDate: '2024-01-15',
        assignedTechnician: '',
        estimatedCost: 250000,
        actualCost: 0,
        startDate: '',
        completedDate: '',
        notes: ''
      },
      {
        id: 2,
        equipmentId: 'EQ002',
        equipmentName: 'Máy in Canon LBP6030w',
        department: 'Phòng Hành chính',
        issue: 'Sửa chữa khay giấy',
        priority: 'medium',
        description: 'Khay giấy bị kẹt, cần sửa chữa hoặc thay thế',
        requester: 'Lê Văn C',
        contactPhone: '0901234568',
        status: 'in-progress',
        requestDate: '2024-01-12',
        assignedTechnician: 'Nguyễn Văn Kỹ thuật',
        estimatedCost: 500000,
        actualCost: 0,
        startDate: '2024-01-14',
        completedDate: '',
        notes: 'Đang chờ linh kiện từ nhà cung cấp'
      },
      {
        id: 3,
        equipmentId: 'EQ003',
        equipmentName: 'Máy tính Dell OptiPlex 7090',
        department: 'Phòng Y tế',
        issue: 'Thay RAM',
        priority: 'high',
        description: 'Máy tính chạy chậm, cần nâng cấp RAM từ 8GB lên 16GB',
        requester: 'Phạm Thị D',
        contactPhone: '0901234569',
        status: 'completed',
        requestDate: '2024-01-10',
        assignedTechnician: 'Trần Thị Sửa chữa',
        estimatedCost: 850000,
        actualCost: 850000,
        startDate: '2024-01-11',
        completedDate: '2024-01-11',
        notes: 'Đã thay RAM thành công, máy tính hoạt động bình thường'
      },
      {
        id: 4,
        equipmentId: 'EQ004',
        equipmentName: 'Máy chiếu Epson EB-X41',
        department: 'Phòng Họp',
        issue: 'Thay bóng đèn',
        priority: 'medium',
        description: 'Bóng đèn máy chiếu bị mờ, cần thay thế',
        requester: 'Vũ Văn E',
        contactPhone: '0901234570',
        status: 'in-progress',
        requestDate: '2024-01-08',
        assignedTechnician: 'Lê Văn Linh kiện',
        estimatedCost: 2500000,
        actualCost: 0,
        startDate: '2024-01-09',
        completedDate: '',
        notes: 'Đang chờ bóng đèn từ nhà cung cấp'
      },
      {
        id: 5,
        equipmentId: 'EQ005',
        equipmentName: 'Switch Cisco Catalyst 2960',
        department: 'Phòng CNTT',
        issue: 'Kiểm tra định kỳ',
        priority: 'low',
        description: 'Kiểm tra định kỳ switch mạng theo lịch bảo trì',
        requester: 'Nguyễn Văn F',
        contactPhone: '0901234571',
        status: 'completed',
        requestDate: '2024-01-05',
        assignedTechnician: 'Phạm Thị Bảo trì',
        estimatedCost: 0,
        actualCost: 0,
        startDate: '2024-01-05',
        completedDate: '2024-01-05',
        notes: 'Switch hoạt động bình thường, không có vấn đề gì'
      }
    ];

    setMaintenanceRequests(mockRequests);
    setFilteredRequests(mockRequests);
  }, []);

  useEffect(() => {
    let filtered = maintenanceRequests;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.issue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.requester.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }
    
    if (departmentFilter !== 'all') {
      filtered = filtered.filter(item => item.department === departmentFilter);
    }
    
    setFilteredRequests(filtered);
  }, [searchTerm, statusFilter, departmentFilter, maintenanceRequests]);

  const departments = ['Phòng Y tế', 'Phòng Kế toán', 'Phòng Hành chính', 'Phòng Họp', 'Phòng CNTT', 'Phòng Khám bệnh'];
  const statuses = ['pending', 'in-progress', 'completed', 'cancelled'];
  const priorities = ['low', 'medium', 'high', 'urgent'];

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { text: 'Chờ xử lý', color: '#3498db', icon: '⏳' };
      case 'in-progress':
        return { text: 'Đang xử lý', color: '#f39c12', icon: '🔧' };
      case 'completed':
        return { text: 'Hoàn thành', color: '#27ae60', icon: '✅' };
      case 'cancelled':
        return { text: 'Đã hủy', color: '#e74c3c', icon: '❌' };
      default:
        return { text: 'Không xác định', color: '#95a5a6', icon: '❓' };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'low':
        return { text: 'Thấp', color: '#27ae60', icon: '🟢' };
      case 'medium':
        return { text: 'Trung bình', color: '#f39c12', icon: '🟡' };
      case 'high':
        return { text: 'Cao', color: '#e67e22', icon: '🟠' };
      case 'urgent':
        return { text: 'Khẩn cấp', color: '#e74c3c', icon: '🔴' };
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

  const handleCreateRequest = () => {
    if (!newRequest.equipmentName || !newRequest.issue || !newRequest.department) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    const request = {
      ...newRequest,
      id: Date.now(),
      equipmentId: `EQ${String(Date.now()).slice(-6)}`,
      status: 'pending',
      requestDate: new Date().toISOString().split('T')[0],
      assignedTechnician: '',
      estimatedCost: 0,
      actualCost: 0,
      startDate: '',
      completedDate: '',
      notes: ''
    };

    setMaintenanceRequests(prev => [request, ...prev]);
    setNewRequest({
      equipmentId: '', equipmentName: '', department: '', issue: '',
      priority: 'medium', description: '', requester: '', contactPhone: ''
    });
    setShowCreateModal(false);
    addNotification('Tạo yêu cầu bảo trì thành công!', 'success');
  };

  const handleStatusChange = (requestId, newStatus) => {
    setMaintenanceRequests(prev => prev.map(item => 
      item.id === requestId ? { ...item, status: newStatus } : item
    ));
    addNotification('Cập nhật trạng thái yêu cầu thành công!', 'success');
  };

  const handleAssignTechnician = (requestId, technician) => {
    setMaintenanceRequests(prev => prev.map(item => 
      item.id === requestId ? { ...item, assignedTechnician: technician } : item
    ));
    addNotification('Phân công kỹ thuật viên thành công!', 'success');
  };

  const handleUpdateCost = (requestId, actualCost) => {
    setMaintenanceRequests(prev => prev.map(item => 
      item.id === requestId ? { ...item, actualCost: parseInt(actualCost) } : item
    ));
    addNotification('Cập nhật chi phí thành công!', 'success');
  };

  const handleSignature = () => {
    if (!signatureData.signatureName || !signatureData.workCompleted) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    // Cập nhật trạng thái yêu cầu thành "completed" và thêm thông tin ký xác nhận
    setMaintenanceRequests(prev => prev.map(request => 
      request.id === parseInt(signatureData.requestId) 
        ? { 
            ...request, 
            status: 'completed',
            completedDate: new Date().toISOString().split('T')[0],
            signature: {
              name: signatureData.signatureName,
              date: signatureData.signatureDate,
              note: signatureData.signatureNote,
              workCompleted: signatureData.workCompleted,
              materialsUsed: signatureData.materialsUsed
            }
          }
        : request
    ));

    setSignatureData({
      requestId: '', signatureName: '', signatureDate: '', signatureNote: '',
      workCompleted: '', materialsUsed: ''
    });
    setShowSignatureModal(false);
    addNotification('Ký xác nhận hoàn thành thành công!', 'success');
  };

  const openSignatureModal = (requestId) => {
    setSignatureData({
      ...signatureData,
      requestId: requestId,
      signatureDate: new Date().toISOString().split('T')[0]
    });
    setShowSignatureModal(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteRequest = (requestId, notes) => {
    setMaintenanceRequests(prev => prev.map(item => 
      item.id === requestId ? { 
        ...item, 
        status: 'completed', 
        completedDate: new Date().toISOString().split('T')[0],
        notes: notes
      } : item
    ));
    addNotification('Hoàn thành yêu cầu bảo trì!', 'success');
  };

  return (
    <div className="maintenance">
      <div className="maintenance-header">
        <h1>🔧 BẢO TRÌ & SỬA CHỮA</h1>
        <p>Quản lý yêu cầu bảo trì, sửa chữa và thay mực thiết bị CNTT</p>
      </div>

      {/* Controls */}
      <div className="maintenance-controls">
        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm yêu cầu..."
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
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            📝 Tạo yêu cầu
          </button>
        </div>
      </div>

      {/* Maintenance Requests Grid */}
      <div className="maintenance-grid">
        {filteredRequests.map(request => {
          const statusInfo = getStatusInfo(request.status);
          const priorityInfo = getPriorityInfo(request.priority);
          return (
            <div key={request.id} className="maintenance-card">
              <div className="maintenance-header-card">
                <div className="request-info">
                  <h3 className="equipment-name">{request.equipmentName}</h3>
                  <p className="request-id">ID: {request.equipmentId}</p>
                </div>
                <div className="status-priority">
                  <span 
                    className="priority-badge"
                    style={{ backgroundColor: priorityInfo.color }}
                  >
                    {priorityInfo.icon} {priorityInfo.text}
                  </span>
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: statusInfo.color }}
                  >
                    {statusInfo.icon} {statusInfo.text}
                  </span>
                </div>
              </div>

              <div className="maintenance-content">
                <div className="request-details">
                  <div className="detail-row">
                    <span className="detail-label">Vấn đề:</span>
                    <span className="detail-value">{request.issue}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Phòng ban:</span>
                    <span className="detail-value">{request.department}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Người yêu cầu:</span>
                    <span className="detail-value">{request.requester}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Ngày yêu cầu:</span>
                    <span className="detail-value">{request.requestDate}</span>
                  </div>
                  {request.assignedTechnician && (
                    <div className="detail-row">
                      <span className="detail-label">Kỹ thuật viên:</span>
                      <span className="detail-value">{request.assignedTechnician}</span>
                    </div>
                  )}
                  {request.estimatedCost > 0 && (
                    <div className="detail-row">
                      <span className="detail-label">Chi phí dự kiến:</span>
                      <span className="detail-value">{formatCurrency(request.estimatedCost)}</span>
                    </div>
                  )}
                </div>

                <div className="maintenance-actions">
                  <button 
                    className="btn-small btn-info"
                    onClick={() => {
                      setSelectedRequest(request);
                      setShowDetailModal(true);
                    }}
                    title="Xem chi tiết"
                  >
                    📋 Chi tiết
                  </button>
                  
                  {userRole === 'admin' && request.status === 'pending' && (
                    <button 
                      className="btn-small btn-warning"
                      onClick={() => {
                        const technician = prompt('Nhập tên kỹ thuật viên:');
                        if (technician) {
                          handleAssignTechnician(request.id, technician);
                        }
                      }}
                      title="Phân công kỹ thuật viên"
                    >
                      👨‍🔧 Phân công
                    </button>
                  )}
                  
                  {userRole === 'admin' && request.status === 'in-progress' && (
                    <button 
                      className="btn-small btn-success"
                      onClick={() => {
                        const cost = prompt('Nhập chi phí thực tế:');
                        if (cost && !isNaN(cost)) {
                          handleUpdateCost(request.id, cost);
                        }
                      }}
                      title="Cập nhật chi phí"
                    >
                      💰 Chi phí
                    </button>
                  )}
                  
                  {userRole === 'admin' && request.status === 'in-progress' && (
                    <button 
                      className="btn-small btn-success"
                      onClick={() => {
                        const notes = prompt('Nhập ghi chú hoàn thành:');
                        if (notes) {
                          handleCompleteRequest(request.id, notes);
                        }
                      }}
                      title="Hoàn thành"
                    >
                      ✅ Hoàn thành
                    </button>
                  )}
                  
                  {userRole === 'staff' && request.status === 'in-progress' && (
                    <button 
                      className="btn-small btn-info"
                      onClick={() => openSignatureModal(request.id)}
                      title="Ký xác nhận hoàn thành"
                    >
                      ✍️ Ký xác nhận
                    </button>
                  )}
                  
                  {userRole === 'admin' && (
                    <select
                      value={request.status}
                      onChange={(e) => handleStatusChange(request.id, e.target.value)}
                      className="status-select"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>
                          {getStatusInfo(status).text}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>📝 Tạo yêu cầu bảo trì</h3>
              <button 
                className="modal-close"
                onClick={() => setShowCreateModal(false)}
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
                    value={newRequest.equipmentName}
                    onChange={(e) => setNewRequest({...newRequest, equipmentName: e.target.value})}
                    placeholder="Nhập tên thiết bị"
                  />
                </div>
                <div className="form-group">
                  <label>Phòng ban *</label>
                  <select
                    value={newRequest.department}
                    onChange={(e) => setNewRequest({...newRequest, department: e.target.value})}
                  >
                    <option value="">Chọn phòng ban</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Vấn đề *</label>
                  <input
                    type="text"
                    value={newRequest.issue}
                    onChange={(e) => setNewRequest({...newRequest, issue: e.target.value})}
                    placeholder="Mô tả vấn đề cần bảo trì/sửa chữa"
                  />
                </div>
                <div className="form-group">
                  <label>Mức độ ưu tiên</label>
                  <select
                    value={newRequest.priority}
                    onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>
                        {getPriorityInfo(priority).text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Người yêu cầu</label>
                  <input
                    type="text"
                    value={newRequest.requester}
                    onChange={(e) => setNewRequest({...newRequest, requester: e.target.value})}
                    placeholder="Tên người yêu cầu"
                  />
                </div>
                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    value={newRequest.contactPhone}
                    onChange={(e) => setNewRequest({...newRequest, contactPhone: e.target.value})}
                    placeholder="Số điện thoại liên hệ"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả chi tiết</label>
                <textarea
                  value={newRequest.description}
                  onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                  placeholder="Mô tả chi tiết vấn đề và yêu cầu..."
                  rows="4"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowCreateModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleCreateRequest}
              >
                Tạo yêu cầu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Request Detail Modal */}
      {showDetailModal && selectedRequest && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>📋 Chi tiết yêu cầu bảo trì</h3>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedRequest(null);
                }}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="request-detail">
                <h4>{selectedRequest.equipmentName}</h4>
                <p className="request-description">{selectedRequest.description}</p>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>ID yêu cầu:</label>
                    <span>{selectedRequest.equipmentId}</span>
                  </div>
                  <div className="detail-item">
                    <label>Phòng ban:</label>
                    <span>{selectedRequest.department}</span>
                  </div>
                  <div className="detail-item">
                    <label>Vấn đề:</label>
                    <span>{selectedRequest.issue}</span>
                  </div>
                  <div className="detail-item">
                    <label>Mức độ ưu tiên:</label>
                    <span 
                      className={`priority ${selectedRequest.priority}`}
                      style={{ backgroundColor: getPriorityInfo(selectedRequest.priority).color }}
                    >
                      {getPriorityInfo(selectedRequest.priority).text}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Người yêu cầu:</label>
                    <span>{selectedRequest.requester}</span>
                  </div>
                  <div className="detail-item">
                    <label>Số điện thoại:</label>
                    <span>{selectedRequest.contactPhone}</span>
                  </div>
                  <div className="detail-item">
                    <label>Trạng thái:</label>
                    <span 
                      className={`status ${selectedRequest.status}`}
                      style={{ backgroundColor: getStatusInfo(selectedRequest.status).color }}
                    >
                      {getStatusInfo(selectedRequest.status).text}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Ngày yêu cầu:</label>
                    <span>{selectedRequest.requestDate}</span>
                  </div>
                  {selectedRequest.assignedTechnician && (
                    <div className="detail-item">
                      <label>Kỹ thuật viên:</label>
                      <span>{selectedRequest.assignedTechnician}</span>
                    </div>
                  )}
                  {selectedRequest.startDate && (
                    <div className="detail-item">
                      <label>Ngày bắt đầu:</label>
                      <span>{selectedRequest.startDate}</span>
                    </div>
                  )}
                  {selectedRequest.completedDate && (
                    <div className="detail-item">
                      <label>Ngày hoàn thành:</label>
                      <span>{selectedRequest.completedDate}</span>
                    </div>
                  )}
                  {selectedRequest.estimatedCost > 0 && (
                    <div className="detail-item">
                      <label>Chi phí dự kiến:</label>
                      <span>{formatCurrency(selectedRequest.estimatedCost)}</span>
                    </div>
                  )}
                  {selectedRequest.actualCost > 0 && (
                    <div className="detail-item">
                      <label>Chi phí thực tế:</label>
                      <span>{formatCurrency(selectedRequest.actualCost)}</span>
                    </div>
                  )}
                  {selectedRequest.notes && (
                    <div className="detail-item full-width">
                      <label>Ghi chú:</label>
                      <span>{selectedRequest.notes}</span>
                    </div>
                  )}
                  {selectedRequest.signature && (
                    <>
                      <div className="detail-item full-width">
                        <label>Thông tin ký xác nhận:</label>
                        <div style={{ marginTop: '10px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Người ký:</strong> {selectedRequest.signature.name}
                          </div>
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Ngày ký:</strong> {selectedRequest.signature.date}
                          </div>
                          <div style={{ marginBottom: '8px' }}>
                            <strong>Công việc hoàn thành:</strong> {selectedRequest.signature.workCompleted}
                          </div>
                          {selectedRequest.signature.materialsUsed && (
                            <div style={{ marginBottom: '8px' }}>
                              <strong>Vật tư sử dụng:</strong> {selectedRequest.signature.materialsUsed}
                            </div>
                          )}
                          {selectedRequest.signature.note && (
                            <div>
                              <strong>Ghi chú:</strong> {selectedRequest.signature.note}
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  setShowDetailModal(false);
                  setSelectedRequest(null);
                }}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Signature Modal */}
      {showSignatureModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>✍️ Ký xác nhận hoàn thành</h3>
              <button 
                className="modal-close"
                onClick={() => setShowSignatureModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-row">
                <div className="form-group">
                  <label>Tên người ký xác nhận *</label>
                  <input
                    type="text"
                    value={signatureData.signatureName}
                    onChange={(e) => setSignatureData({...signatureData, signatureName: e.target.value})}
                    placeholder="Nhập tên người ký xác nhận"
                  />
                </div>
                <div className="form-group">
                  <label>Ngày ký xác nhận</label>
                  <input
                    type="date"
                    value={signatureData.signatureDate}
                    onChange={(e) => setSignatureData({...signatureData, signatureDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label>Công việc đã hoàn thành *</label>
                <textarea
                  value={signatureData.workCompleted}
                  onChange={(e) => setSignatureData({...signatureData, workCompleted: e.target.value})}
                  placeholder="Mô tả chi tiết công việc đã thực hiện (thay mực, sửa chữa, v.v.)"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Vật tư đã sử dụng</label>
                <textarea
                  value={signatureData.materialsUsed}
                  onChange={(e) => setSignatureData({...signatureData, materialsUsed: e.target.value})}
                  placeholder="Liệt kê các vật tư, linh kiện đã sử dụng"
                  rows="2"
                />
              </div>

              <div className="form-group">
                <label>Ghi chú bổ sung</label>
                <textarea
                  value={signatureData.signatureNote}
                  onChange={(e) => setSignatureData({...signatureData, signatureNote: e.target.value})}
                  placeholder="Ghi chú thêm về quá trình thực hiện"
                  rows="2"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowSignatureModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn btn-primary"
                onClick={handleSignature}
              >
                ✍️ Ký xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Maintenance;
