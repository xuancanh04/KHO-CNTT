import { CONTACT_INFO, FIXED_TEXT } from '../../constants/navigation'
import './Header.css'
import { useState } from 'react'
import ChangePasswordModal from '../UserManagement/ChangePasswordModal'

const Header = ({ userData, onLogout, isLoggedIn }) => {
  const [showChangePassword, setShowChangePassword] = useState(false)

  return (
    <header className="header">
      <div className="header-left">
        <div className="logo-section">
          <img 
            src="/logo2.png" 
            alt="Bệnh Viện Quân Y 7A Logo" 
            className="hospital-logo"
          />
        </div>
      </div>
      
      <div className="header-right">
        {isLoggedIn && userData ? (
          <div className="user-account-section">
            <div className="user-info">
              <div className="user-avatar">
                {userData?.fullName?.charAt(0) || userData?.username?.charAt(0) || 'U'}
              </div>
              <div className="user-details">
                <span className="user-name">{userData?.fullName || userData?.username}</span>
                <span className="user-role">
                  {userData?.role === 'admin' ? 'Quản trị viên' : 
                   userData?.role === 'manager' ? 'Quản lý' : 'Nhân viên'}
                </span>
              </div>
            </div>
            <div className="user-actions">
              <button className="logout-button" onClick={() => setShowChangePassword(true)}>
                <span className="logout-icon">🔑</span>
                <span>Đổi mật khẩu</span>
              </button>
              <button className="logout-button" onClick={onLogout}>
              <span className="logout-icon">🚪</span>
              <span>Đăng xuất</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="contact-info">
            <div className="contact-item">
              <span className="icon">🏥</span>
              <span className="fixed-text">{FIXED_TEXT.address} <strong className="address-bold">{FIXED_TEXT.addressDetail}</strong></span>
            </div>
            <div className="contact-item">
              <span className="icon">☎️</span>
              <span className="fixed-text">{FIXED_TEXT.hotline} <strong className="phone-bold">{FIXED_TEXT.phoneNumber}</strong></span>
            </div>
          </div>
        )}
      </div>
      {showChangePassword && (
        <ChangePasswordModal 
          username={userData?.username}
          onClose={() => setShowChangePassword(false)}
          onSuccess={() => setShowChangePassword(false)}
        />
      )}
    </header>
  )
}

export default Header
