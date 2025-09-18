import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({ userRole, addNotification, onNavigate }) => {
  const [stats, setStats] = useState({
    totalEquipment: 0,
    activeEquipment: 0,
    maintenanceNeeded: 0,
    lowStock: 0,
    totalValue: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('today');

  useEffect(() => {
    // Giả lập dữ liệu thống kê
    setStats({
      totalEquipment: 156,
      activeEquipment: 142,
      maintenanceNeeded: 8,
      lowStock: 12,
      totalValue: 2450000000
    });

    // Giả lập hoạt động gần đây
    setRecentActivities([
      {
        id: 1,
        type: 'maintenance',
        message: 'Máy in HP LaserJet Pro M404n cần thay mực',
        department: 'Phòng Kế toán',
        time: '2 giờ trước',
        status: 'pending',
        priority: 'high'
      },
      {
        id: 2,
        type: 'inventory',
        message: 'Nhập kho 50 bộ mực in HP 26A',
        department: 'Kho CNTT',
        time: '4 giờ trước',
        status: 'completed',
        priority: 'medium'
      },
      {
        id: 3,
        type: 'equipment',
        message: 'Cấp máy tính Dell OptiPlex 7090 cho Phòng Y tế',
        department: 'Phòng Y tế',
        time: '1 ngày trước',
        status: 'completed',
        priority: 'low'
      },
      {
        id: 4,
        type: 'repair',
        message: 'Sửa chữa máy in Canon LBP6030w',
        department: 'Phòng Hành chính',
        time: '2 ngày trước',
        status: 'in-progress',
        priority: 'high'
      }
    ]);

    // Thiết lập quick actions dựa trên role
    const actions = [
      {
        id: 'add-equipment',
        label: 'Thêm thiết bị',
        icon: '➕',
        action: () => onNavigate ? onNavigate('equipment') : addNotification('Chuyển đến trang Quản lý thiết bị', 'info'),
        access: ['admin'],
        color: '#27ae60'
      },
      {
        id: 'create-request',
        label: 'Tạo yêu cầu',
        icon: '📝',
        action: () => onNavigate ? onNavigate('maintenance') : addNotification('Chuyển đến trang Bảo trì/Sửa chữa', 'info'),
        access: ['admin', 'staff'],
        color: '#3498db'
      },
      {
        id: 'view-reports',
        label: 'Xem báo cáo',
        icon: '📊',
        action: () => onNavigate ? onNavigate('reports') : addNotification('Chuyển đến trang Báo cáo', 'info'),
        access: ['manager'],
        color: '#9b59b6'
      },
      {
        id: 'check-inventory',
        label: 'Kiểm tra kho',
        icon: '🔍',
        action: () => onNavigate ? onNavigate('inventory') : addNotification('Chuyển đến trang Quản lý kho', 'info'),
        access: ['admin', 'manager'],
        color: '#f39c12'
      }
    ];

    setQuickActions(actions.filter(action => action.access.includes(userRole)));
  }, [userRole, addNotification]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return '#27ae60';
      case 'pending':
        return '#f39c12';
      case 'in-progress':
        return '#3498db';
      default:
        return '#95a5a6';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Chờ xử lý';
      case 'in-progress':
        return 'Đang xử lý';
      default:
        return 'Không xác định';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'maintenance':
        return '🔧';
      case 'inventory':
        return '📦';
      case 'equipment':
        return '💻';
      case 'repair':
        return '🛠️';
      default:
        return '📋';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#e74c3c';
      case 'medium':
        return '#f39c12';
      case 'low':
        return '#27ae60';
      default:
        return '#95a5a6';
    }
  };

  const getRoleSpecificContent = () => {
    switch (userRole) {
      case 'admin':
        return {
          title: 'Quản trị viên',
          subtitle: 'Bạn có toàn quyền quản lý hệ thống',
          features: ['Quản lý thiết bị', 'Nhập xuất kho', 'Bảo trì sửa chữa', 'Quản lý người dùng']
        };
      case 'manager':
        return {
          title: 'Quản lý',
          subtitle: 'Bạn có quyền quản lý và báo cáo',
          features: ['Xem báo cáo', 'Duyệt yêu cầu', 'Quản lý kho', 'Theo dõi thiết bị']
        };
      case 'staff':
        return {
          title: 'Nhân viên',
          subtitle: 'Bạn có quyền tạo yêu cầu và ký xác nhận',
          features: ['Tạo yêu cầu', 'Ký xác nhận', 'Xem thiết bị', 'Báo cáo sự cố']
        };
      default:
        return {
          title: 'Người dùng',
          subtitle: 'Chào mừng bạn đến với hệ thống',
          features: []
        };
    }
  };

  const roleContent = getRoleSpecificContent();

  return (
    <div className="dashboard">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1>Chào mừng trở lại!</h1>
            <p>Hệ thống Quản lý Kho CNTT - Bệnh viện Quân Y 7A</p>
          </div>
          <div className="welcome-role">
            <div className="role-badge" style={{ backgroundColor: '#3399FF' }}>
              <span className="role-icon">
                {userRole === 'admin' ? '👑' : userRole === 'manager' ? '📋' : '👤'}
              </span>
              <span className="role-title">{roleContent.title}</span>
            </div>
          </div>
        </div>
        <div className="period-selector">
          <button 
            className={`period-btn ${selectedPeriod === 'today' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('today')}
          >
            Hôm nay
          </button>
          <button 
            className={`period-btn ${selectedPeriod === 'week' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('week')}
          >
            Tuần này
          </button>
          <button 
            className={`period-btn ${selectedPeriod === 'month' ? 'active' : ''}`}
            onClick={() => setSelectedPeriod('month')}
          >
            Tháng này
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-section">
        <h2>📊 Thống kê tổng quan</h2>
        <div className="stats-grid">
          <div className="stat-card primary">
            <div className="stat-icon">💻</div>
            <div className="stat-content">
              <h3>Tổng thiết bị</h3>
              <p className="stat-number">{stats.totalEquipment}</p>
              <span className="stat-label">thiết bị</span>
            </div>
            <div className="stat-trend positive">
              <span>+5%</span>
              <span className="trend-icon">↗</span>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">✅</div>
            <div className="stat-content">
              <h3>Đang hoạt động</h3>
              <p className="stat-number">{stats.activeEquipment}</p>
              <span className="stat-label">thiết bị</span>
            </div>
            <div className="stat-trend positive">
              <span>+2%</span>
              <span className="trend-icon">↗</span>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">🔧</div>
            <div className="stat-content">
              <h3>Cần bảo trì</h3>
              <p className="stat-number">{stats.maintenanceNeeded}</p>
              <span className="stat-label">thiết bị</span>
            </div>
            <div className="stat-trend negative">
              <span>-3%</span>
              <span className="trend-icon">↘</span>
            </div>
          </div>

          <div className="stat-card danger">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h3>Sắp hết hàng</h3>
              <p className="stat-number">{stats.lowStock}</p>
              <span className="stat-label">mặt hàng</span>
            </div>
            <div className="stat-trend negative">
              <span>+2</span>
              <span className="trend-icon">↗</span>
            </div>
          </div>

          <div className="stat-card info wide">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Tổng giá trị</h3>
              <p className="stat-number">{formatCurrency(stats.totalValue)}</p>
              <span className="stat-label">Tổng tài sản CNTT</span>
            </div>
            <div className="stat-trend positive">
              <span>+8%</span>
              <span className="trend-icon">↗</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2>⚡ Thao tác nhanh</h2>
        <div className="quick-actions-grid">
          {quickActions.map(action => (
            <button
              key={action.id}
              className="quick-action-btn"
              onClick={action.action}
              style={{ '--action-color': action.color }}
            >
              <div className="action-icon">{action.icon}</div>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activities */}
      <div className="recent-activities-section">
        <div className="section-header">
          <h2>🕒 Hoạt động gần đây</h2>
        </div>
        <div className="activities-list">
          {recentActivities.map(activity => (
            <div key={activity.id} className="activity-item">
              <div className="activity-icon">
                {getActivityIcon(activity.type)}
              </div>
              <div className="activity-content">
                <p className="activity-message">{activity.message}</p>
                <div className="activity-meta">
                  <span className="activity-department">{activity.department}</span>
                  <span className="activity-time">{activity.time}</span>
                </div>
              </div>
              <div className="activity-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(activity.status) }}
                >
                  {getStatusText(activity.status)}
                </span>
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(activity.priority) }}
                >
                  {activity.priority === 'high' ? 'Cao' : activity.priority === 'medium' ? 'Trung bình' : 'Thấp'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Role Information */}
      <div className="role-info-section">
        <div className="role-info-card">
          <div className="role-info-header">
            <h3>🔐 Thông tin quyền truy cập</h3>
            <span className="role-subtitle">{roleContent.subtitle}</span>
          </div>
          <div className="role-features">
            {roleContent.features.map((feature, index) => (
              <div key={index} className="feature-item">
                <span className="feature-icon">✓</span>
                <span className="feature-text">{feature}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="support-card">
          <h3>📞 Hỗ trợ kỹ thuật</h3>
          <div className="support-info">
            <div className="support-item">
              <span className="support-icon">📞</span>
              <div className="support-details">
                <span className="support-label">Điện thoại</span>
                <span className="support-value">Ext: 028 38366789 </span>
              </div>
            </div>
            <div className="support-item">
              <span className="support-icon">📧</span>
              <div className="support-details">
                <span className="support-label">Email</span>
                <span className="support-value">cntt@bv7a.vn</span>
              </div>
            </div>
            <div className="support-item">
              <span className="support-icon">🏢</span>
              <div className="support-details">
                <span className="support-label">Vị trí</span>
                <span className="support-value">Phòng CNTT - Tầng 2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
