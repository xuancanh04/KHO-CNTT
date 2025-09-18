import React, { useState, useEffect } from 'react';
import './Reports.css';

const Reports = ({ userRole, addNotification }) => {
  const [activeTab, setActiveTab] = useState('inventory');
  const [dateRange, setDateRange] = useState({
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });

  const [inventoryReport, setInventoryReport] = useState([]);
  const [maintenanceReport, setMaintenanceReport] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    generateReports();
  }, [dateRange]);

  const generateReports = async () => {
    setLoading(true);
    
    // Giả lập API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Giả lập báo cáo kho
    const mockInventoryReport = [
      {
        id: 1,
        itemName: 'Mực in HP 26A (Đen)',
        category: 'Mực in',
        openingStock: 25,
        imported: 50,
        exported: 30,
        closingStock: 45,
        totalValue: 11250000
      },
      {
        id: 2,
        itemName: 'Mực in Canon 051 (Đen)',
        category: 'Mực in',
        openingStock: 20,
        imported: 40,
        exported: 28,
        closingStock: 32,
        totalValue: 8960000
      },
      {
        id: 3,
        itemName: 'RAM DDR4 8GB',
        category: 'Linh kiện',
        openingStock: 10,
        imported: 20,
        exported: 15,
        closingStock: 15,
        totalValue: 12750000
      },
      {
        id: 4,
        itemName: 'Ổ cứng SSD 256GB',
        category: 'Linh kiện',
        openingStock: 5,
        imported: 15,
        exported: 12,
        closingStock: 8,
        totalValue: 9600000
      },
      {
        id: 5,
        itemName: 'Cáp mạng Cat6',
        category: 'Phụ kiện',
        openingStock: 80,
        imported: 100,
        exported: 60,
        closingStock: 120,
        totalValue: 1800000
      }
    ];

    // Giả lập báo cáo bảo trì
    const mockMaintenanceReport = [
      {
        id: 1,
        equipmentName: 'Máy in HP LaserJet Pro M404n',
        department: 'Phòng Kế toán',
        issue: 'Thay mực in',
        requestDate: '2024-01-15',
        completedDate: '2024-01-16',
        technician: 'Nguyễn Văn Kỹ thuật',
        cost: 250000,
        status: 'completed'
      },
      {
        id: 2,
        equipmentName: 'Máy in Canon LBP6030w',
        department: 'Phòng Hành chính',
        issue: 'Sửa chữa khay giấy',
        requestDate: '2024-01-12',
        completedDate: '2024-01-14',
        technician: 'Trần Thị Sửa chữa',
        cost: 500000,
        status: 'completed'
      },
      {
        id: 3,
        equipmentName: 'Máy tính Dell OptiPlex 7090',
        department: 'Phòng Y tế',
        issue: 'Thay RAM',
        requestDate: '2024-01-10',
        completedDate: '2024-01-11',
        technician: 'Lê Văn Linh kiện',
        cost: 850000,
        status: 'completed'
      },
      {
        id: 4,
        equipmentName: 'Máy chiếu Epson EB-X41',
        department: 'Phòng Họp',
        issue: 'Thay bóng đèn',
        requestDate: '2024-01-08',
        completedDate: null,
        technician: 'Phạm Thị Bảo trì',
        cost: 2500000,
        status: 'in-progress'
      },
      {
        id: 5,
        equipmentName: 'Switch Cisco Catalyst 2960',
        department: 'Phòng CNTT',
        issue: 'Kiểm tra định kỳ',
        requestDate: '2024-01-05',
        completedDate: '2024-01-05',
        technician: 'Vũ Văn Mạng',
        cost: 0,
        status: 'completed'
      }
    ];

    setInventoryReport(mockInventoryReport);
    setMaintenanceReport(mockMaintenanceReport);
    setLoading(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'completed':
        return { text: 'Hoàn thành', color: '#27ae60', icon: '✅' };
      case 'in-progress':
        return { text: 'Đang xử lý', color: '#f39c12', icon: '🔧' };
      case 'pending':
        return { text: 'Chờ xử lý', color: '#3498db', icon: '⏳' };
      default:
        return { text: 'Không xác định', color: '#95a5a6', icon: '❓' };
    }
  };

  const exportToExcel = (data, filename) => {
    // Giả lập export Excel
    addNotification(`Đã xuất báo cáo ${filename} thành công!`, 'success');
  };

  const calculateTotals = (data) => {
    return data.reduce((acc, item) => {
      acc.totalImported += item.imported || 0;
      acc.totalExported += item.exported || 0;
      acc.totalValue += item.totalValue || 0;
      return acc;
    }, { totalImported: 0, totalExported: 0, totalValue: 0 });
  };

  const calculateMaintenanceTotals = (data) => {
    return data.reduce((acc, item) => {
      acc.totalCost += item.cost || 0;
      acc.completedCount += item.status === 'completed' ? 1 : 0;
      acc.pendingCount += item.status !== 'completed' ? 1 : 0;
      return acc;
    }, { totalCost: 0, completedCount: 0, pendingCount: 0 });
  };

  const inventoryTotals = calculateTotals(inventoryReport);
  const maintenanceTotals = calculateMaintenanceTotals(maintenanceReport);

  // Kiểm tra quyền truy cập - chỉ manager mới được xem báo cáo
  if (userRole !== 'manager') {
    return (
      <div className="reports">
        <div className="reports-header">
          <h1>🚫 KHÔNG CÓ QUYỀN TRUY CẬP</h1>
          <p>Bạn không có quyền xem báo cáo hệ thống. Chỉ Quản lý mới được phép truy cập.</p>
        </div>
        <div className="access-denied">
          <div className="access-denied-content">
            <h2>🔒 Quyền truy cập bị từ chối</h2>
            <p>Trang báo cáo chỉ dành cho vai trò Quản lý (Manager).</p>
            <p>Vui lòng liên hệ quản trị viên nếu bạn cần quyền truy cập.</p>
            <div className="contact-info">
              <p>📞 Liên hệ: Phòng CNTT - Ext: 1234</p>
              <p>📧 Email: cntt@bv7a.vn</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reports">
      <div className="reports-header">
        <h1>📋 BÁO CÁO HỆ THỐNG</h1>
        <p>Xem báo cáo xuất nhập tồn kho và bảo trì sửa chữa</p>
      </div>

      {/* Date Range Selector */}
      <div className="date-range-selector">
        <div className="date-inputs">
          <div className="date-input">
            <label>Từ ngày:</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
            />
          </div>
          <div className="date-input">
            <label>Đến ngày:</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
            />
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="reports-tabs">
        <button
          className={`tab-button ${activeTab === 'inventory' ? 'active' : ''}`}
          onClick={() => setActiveTab('inventory')}
        >
          📦 Báo cáo kho
        </button>
        <button
          className={`tab-button ${activeTab === 'maintenance' ? 'active' : ''}`}
          onClick={() => setActiveTab('maintenance')}
        >
          🔧 Báo cáo bảo trì
        </button>
      </div>

      {/* Inventory Report Tab */}
      {activeTab === 'inventory' && (
        <div className="report-content">
          <div className="report-summary">
            <div className="summary-card">
              <div className="summary-icon">📥</div>
              <div className="summary-content">
                <h3>Tổng nhập kho</h3>
                <p className="summary-number">{inventoryTotals.totalImported}</p>
                <span className="summary-label">đơn vị</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">📤</div>
              <div className="summary-content">
                <h3>Tổng xuất kho</h3>
                <p className="summary-number">{inventoryTotals.totalExported}</p>
                <span className="summary-label">đơn vị</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">💰</div>
              <div className="summary-content">
                <h3>Tổng giá trị</h3>
                <p className="summary-number">{formatCurrency(inventoryTotals.totalValue)}</p>
                <span className="summary-label">VNĐ</span>
              </div>
            </div>
          </div>

          <div className="report-table-container">
            <div className="table-header">
              <h3>Báo cáo xuất nhập tồn kho</h3>
              <button 
                className="btn btn-success"
                onClick={() => exportToExcel(inventoryReport, 'Bao-cao-kho')}
              >
                📊 Xuất Excel
              </button>
            </div>
            
            <table className="report-table">
              <thead>
                <tr>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Tồn đầu</th>
                  <th>Nhập kho</th>
                  <th>Xuất kho</th>
                  <th>Tồn cuối</th>
                  <th>Giá trị</th>
                </tr>
              </thead>
              <tbody>
                {inventoryReport.map(item => (
                  <tr key={item.id}>
                    <td>{item.itemName}</td>
                    <td>
                      <span className="category-badge">{item.category}</span>
                    </td>
                    <td className="number-cell">{item.openingStock}</td>
                    <td className="number-cell positive">{item.imported}</td>
                    <td className="number-cell negative">{item.exported}</td>
                    <td className="number-cell">{item.closingStock}</td>
                    <td className="number-cell">{formatCurrency(item.totalValue)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Maintenance Report Tab */}
      {activeTab === 'maintenance' && (
        <div className="report-content">
          <div className="report-summary">
            <div className="summary-card">
              <div className="summary-icon">🔧</div>
              <div className="summary-content">
                <h3>Đã hoàn thành</h3>
                <p className="summary-number">{maintenanceTotals.completedCount}</p>
                <span className="summary-label">yêu cầu</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">⏳</div>
              <div className="summary-content">
                <h3>Đang xử lý</h3>
                <p className="summary-number">{maintenanceTotals.pendingCount}</p>
                <span className="summary-label">yêu cầu</span>
              </div>
            </div>
            
            <div className="summary-card">
              <div className="summary-icon">💰</div>
              <div className="summary-content">
                <h3>Tổng chi phí</h3>
                <p className="summary-number">{formatCurrency(maintenanceTotals.totalCost)}</p>
                <span className="summary-label">VNĐ</span>
              </div>
            </div>
          </div>

          <div className="report-table-container">
            <div className="table-header">
              <h3>Báo cáo bảo trì sửa chữa</h3>
              <button 
                className="btn btn-success"
                onClick={() => exportToExcel(maintenanceReport, 'Bao-cao-bao-tri')}
              >
                📊 Xuất Excel
              </button>
            </div>
            
            <table className="report-table">
              <thead>
                <tr>
                  <th>Thiết bị</th>
                  <th>Phòng ban</th>
                  <th>Vấn đề</th>
                  <th>Ngày yêu cầu</th>
                  <th>Ngày hoàn thành</th>
                  <th>Kỹ thuật viên</th>
                  <th>Chi phí</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceReport.map(item => {
                  const statusInfo = getStatusInfo(item.status);
                  return (
                    <tr key={item.id}>
                      <td>{item.equipmentName}</td>
                      <td>{item.department}</td>
                      <td>{item.issue}</td>
                      <td>{item.requestDate}</td>
                      <td>{item.completedDate || '-'}</td>
                      <td>{item.technician}</td>
                      <td className="number-cell">
                        {item.cost > 0 ? formatCurrency(item.cost) : 'Miễn phí'}
                      </td>
                      <td>
                        <span 
                          className="status-badge"
                          style={{ backgroundColor: statusInfo.color }}
                        >
                          {statusInfo.icon} {statusInfo.text}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Charts Section */}
      <div className="charts-section">
        <h2>📈 Biểu đồ thống kê</h2>
        <div className="charts-grid">
          <div className="chart-card">
            <h3>📊 Thống kê theo danh mục</h3>
            <div className="chart-placeholder">
              <p>Biểu đồ cột thể hiện số lượng sản phẩm theo danh mục</p>
              <span className="chart-icon">📊</span>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>📈 Xu hướng xuất nhập kho</h3>
            <div className="chart-placeholder">
              <p>Biểu đồ đường thể hiện xu hướng xuất nhập kho theo thời gian</p>
              <span className="chart-icon">📈</span>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>🔄 Trạng thái bảo trì</h3>
            <div className="chart-placeholder">
              <p>Biểu đồ tròn thể hiện tỷ lệ trạng thái bảo trì</p>
              <span className="chart-icon">🔄</span>
            </div>
          </div>
          
          <div className="chart-card">
            <h3>💰 Chi phí theo tháng</h3>
            <div className="chart-placeholder">
              <p>Biểu đồ cột thể hiện chi phí bảo trì theo tháng</p>
              <span className="chart-icon">💰</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
