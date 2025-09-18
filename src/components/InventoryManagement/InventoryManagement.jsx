import React, { useState, useEffect, useRef } from 'react';
import './InventoryManagement.css';
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import Equipment from './Equipment';
import Reports from './Reports';
import Maintenance from './Maintenance';
import LocationTracking from './LocationTracking';
import UserManagement from '../UserManagement/UserManagement';

const InventoryManagement = ({ userData, onLogout }) => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [userRole, setUserRole] = useState('admin'); // admin, staff, manager
  const [notifications, setNotifications] = useState([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const mainContentRef = useRef(null);
  const pageContentRef = useRef(null);

  useEffect(() => {
    // Xác định role của user dựa trên userData
    if (userData && userData.role) {
      setUserRole(userData.role);
    }
  }, [userData]);

  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [...prev, newNotification]);
    
    // Tự động xóa notification sau 5 giây
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleMenuClick = (viewId) => {
    setCurrentView(viewId);
    // Scroll to top khi click menu - sử dụng nhiều cách để đảm bảo hoạt động
    setTimeout(() => {
      // Cách 1: Scroll window
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Cách 2: Scroll main content container bằng ref
      if (mainContentRef.current) {
        mainContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Cách 3: Scroll page content bằng ref
      if (pageContentRef.current) {
        pageContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
      
      // Cách 4: Sử dụng scrollIntoView cho main content
      if (mainContentRef.current) {
        mainContentRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        });
      }
    }, 100);
  };

  const renderView = () => {
    const allowedIds = getMenuItems()
      .filter(i => i.access.includes(userRole))
      .map(i => i.id);
    const target = allowedIds.includes(currentView) ? currentView : 'dashboard';
  
    switch (target) {
      case 'dashboard':
        return <Dashboard userRole={userRole} addNotification={addNotification} onNavigate={handleMenuClick} />;
      case 'inventory':
        return <Inventory userRole={userRole} addNotification={addNotification} />;
      case 'equipment':
        return <Equipment userRole={userRole} addNotification={addNotification} />;
      case 'reports':
        return <Reports userRole={userRole} addNotification={addNotification} />;
      case 'maintenance':
        return <Maintenance userRole={userRole} addNotification={addNotification} />;
      case 'location':
        return <LocationTracking userRole={userRole} addNotification={addNotification} />;
      case 'users':
        return <UserManagement userRole={userRole} addNotification={addNotification} />;
      default:
        return <Dashboard userRole={userRole} addNotification={addNotification} />;
    }
  };

  const getMenuItems = () => {
    const baseItems = [
      { 
        id: 'dashboard', 
        label: 'Tổng quan', 
        icon: '📊', 
        access: ['admin', 'manager', 'staff'],
        description: 'Xem thống kê tổng quan hệ thống'
      },
      { 
        id: 'inventory', 
        label: 'Quản lý kho', 
        icon: '📦', 
        access: ['admin', 'manager'],
        description: 'Quản lý nhập xuất kho, kiểm kê'
      },
      { 
        id: 'equipment', 
        label: 'Thiết bị CNTT', 
        icon: '💻', 
        access: ['admin', 'manager', 'staff'],
        description: 'Quản lý thiết bị, cấu hình'
      },
      { 
        id: 'reports', 
        label: 'Báo cáo', 
        icon: '📋', 
        access: ['manager'],
        description: 'Xem báo cáo thống kê'
      },
      { 
        id: 'maintenance', 
        label: 'Bảo trì/Sửa chữa', 
        icon: '🔧', 
        access: ['admin', 'manager', 'staff'],
        description: 'Quản lý bảo trì, sửa chữa thiết bị'
      },
      { 
        id: 'location', 
        label: 'Vị trí thiết bị', 
        icon: '📍', 
        access: ['admin', 'manager', 'staff'],
        description: 'Theo dõi vị trí thiết bị'
      }
    ];
    if (userRole === 'admin') {
      baseItems.push({ 
        id: 'users', 
        label: 'Quản lý người dùng', 
        icon: '👥', 
        access: ['admin'],
        description: 'Quản lý tài khoản người dùng'
      });
    }
    return baseItems;
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return '#ffffff'; // Trắng cho admin
      case 'manager':
        return '#ffffff'; // Trắng cho manager
      case 'staff':
        return '#ffffff'; // Trắng cho staff
      default:
        return '#ffffff';
    }
  };

  const getRoleLabel = (role) => {
    switch (role) {
      case 'admin':
        return 'Quản trị viên';
      case 'manager':
        return 'Quản lý';
      case 'staff':
        return 'Nhân viên';
      default:
        return 'Người dùng';
    }
  };

  return (
    <div className="inventory-management">
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <img src="/logoo-removebg-preview.png" alt="Logo BV7A" />
            </div>
            {!sidebarCollapsed && (
              <div className="logo-text">
                <h3>BVQY7A</h3>
                <span>CNTT</span>
              </div>
            )}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '☰' : '☰'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {getMenuItems()
            .filter(item => item.access.includes(userRole))
            .map(item => (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
                title={sidebarCollapsed ? item.label : ''}
              >
                <span className="nav-icon">{item.icon}</span>
                {!sidebarCollapsed && (
                  <>
                    <span className="nav-label">{item.label}</span>
                    <span className="nav-description">{item.description}</span>
                  </>
                )}
              </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="main-content" ref={mainContentRef}>
        {/* Page Content */}
        <main className="page-content" ref={pageContentRef}>
          {renderView()}
        </main>
      </div>

      {/* Notifications */}
      <div className="notifications-container">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification ${notification.type}`}>
            <div className="notification-content">
              <span className="notification-icon">
                {notification.type === 'success' && '✅'}
                {notification.type === 'error' && '❌'}
                {notification.type === 'warning' && '⚠️'}
                {notification.type === 'info' && 'ℹ️'}
              </span>
              <span className="notification-message">{notification.message}</span>
            </div>
            <button 
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventoryManagement;
