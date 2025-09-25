import { useState } from 'react'
import { FIXED_TEXT } from '../../constants/navigation'
import { getEffectivePasswordForUser } from '../../utils/auth'
import './Banner.css'

const Banner = ({ onLogin }) => {
  // State management
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Event handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Giả lập API call (thay thế bằng API thật của bạn)
      const result = await simulateLoginAPI(formData)
      
      // Đăng nhập thành công
      console.log('Login successful:', result)
      
      // Lưu thông tin đăng nhập vào localStorage nếu cần
      if (formData.rememberMe) {
        localStorage.setItem('user', JSON.stringify(result))
      }
      
      // Gọi callback để thông báo đăng nhập thành công
      onLogin(result)
      
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error('Login failed:', error)
      alert('Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.')
    } finally {
      setIsLoading(false)
    }
  }

  // Giả lập API đăng nhập (thay thế bằng API thật)
  const simulateLoginAPI = (credentials) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Danh sách tài khoản mẫu (trong thực tế sẽ lấy từ database)
        const userDatabase = [
          {
            username: 'admin001',
            password: '123456',
            role: 'admin',
            fullName: 'Nguyễn Văn Admin',
            email: 'admin@bv7a.vn',
            department: 'CNTT',
            phone: '0123456789'
          },
          {
            username: 'manager001',
            password: '123456',
            role: 'manager',
            fullName: 'Trần Thị Quản Lý',
            email: 'manager@bv7a.vn',
            department: 'Y tế',
            phone: '0123456790'
          },
          {
            username: 'staff001',
            password: '123456',
            role: 'staff',
            fullName: 'Lê Văn Nhân Viên',
            email: 'staff@bv7a.vn',
            department: 'Hành chính',
            phone: '0123456791'
          },
          {
            username: 'manager002',
            password: '123456',
            role: 'manager',
            fullName: 'Phạm Thị Quản Lý Kho',
            email: 'manager2@bv7a.vn',
            department: 'Kế toán',
            phone: '0123456792'
          },
          {
            username: 'staff002',
            password: '123456',
            role: 'staff',
            fullName: 'Vũ Văn Kỹ Thuật',
            email: 'staff2@bv7a.vn',
            department: 'CNTT',
            phone: '0123456793'
          }
        ];

        // Tìm user trong database
        const user = userDatabase.find(u => u.username === credentials.username);

        if (user) {
          const effectivePassword = getEffectivePasswordForUser(user.username, user.password)
          if (effectivePassword !== credentials.password) {
            reject(new Error('Tên đăng nhập hoặc mật khẩu không chính xác'))
            return
          }
        }

        if (user) {
          resolve({ 
            success: true, 
            username: user.username,
            role: user.role,
            fullName: user.fullName,
            email: user.email,
            department: user.department,
            phone: user.phone
          })
        } else {
          reject(new Error('Tên đăng nhập hoặc mật khẩu không chính xác'))
        }
      }, 1000) // Giả lập delay 1 giây
    })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  const handleForgotPassword = (e) => {
    e.preventDefault()
    console.log('Reset password for email:', forgotPasswordEmail)
    alert('Email reset mật khẩu đã được gửi! Vui lòng kiểm tra hộp thư.')
    setShowForgotPassword(false)
    setForgotPasswordEmail('')
  }

  const openForgotPassword = () => {
    setShowForgotPassword(true)
  }

  const closeForgotPassword = () => {
    setShowForgotPassword(false)
    setForgotPasswordEmail('')
  }



  // Render methods
  const renderHeader = () => (
    <div className="login-header">
      <h1 className="fixed-text">{FIXED_TEXT.hospitalName}</h1>
      <h2 className="fixed-text">{FIXED_TEXT.systemName}</h2>
      <div className="login-subtitle">
        <p className="fixed-text">{FIXED_TEXT.loginPrompt}</p>
      </div>
    </div>
  )

  const renderLoginForm = () => (
    <div className="login-overlay">
      <div className="login-form">
        {renderHeader()}
        
        <form onSubmit={handleLogin}>
          {renderUsernameField()}
          {renderPasswordField()}
          {renderFormOptions()}
          {renderLoginButton()}
        </form>
      </div>
    </div>
  )

  const renderUsernameField = () => (
    <div className="input-group">
      <label htmlFor="username">Tên đăng nhập</label>
      <input
        id="username"
        type="text"
        placeholder="Nhập tên đăng nhập"
        value={formData.username}
        onChange={(e) => handleInputChange('username', e.target.value)}
        required
        disabled={isLoading}
      />
    </div>
  )

  const renderPasswordField = () => (
    <div className="input-group">
      <label htmlFor="password">Mật khẩu</label>
      <div className="password-input-container">
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Nhập mật khẩu"
          value={formData.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          required
          disabled={isLoading}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={togglePasswordVisibility}
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiển thị mật khẩu"}
          disabled={isLoading}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>
    </div>
  )

  const renderFormOptions = () => (
    <div className="form-options">
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={formData.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e.target.checked)}
          disabled={isLoading}
        />
        <span className="checkmark"></span>
        Ghi nhớ đăng nhập
      </label>
      <button 
        type="button" 
        className="forgot-password-btn"
        onClick={openForgotPassword}
        disabled={isLoading}
      >
        Quên mật khẩu?
      </button>
    </div>
  )

  const renderLoginButton = () => (
    <button 
      type="submit" 
      className="login-button"
      disabled={isLoading}
    >
      {isLoading ? 'ĐANG XỬ LÝ...' : 'ĐĂNG NHẬP'}
    </button>
  )

  const renderForgotPasswordForm = () => (
    <div className="forgot-password-overlay">
      <div className="forgot-password-form">
        <div className="forgot-password-header">
          <div className="header-icon">
            <span className="icon">🔐</span>
          </div>
          <h3>QUÊN MẬT KHẨU</h3>
          <p>Nhập email để nhận link reset mật khẩu</p>
        </div>
        
        <form onSubmit={handleForgotPassword}>
          <div className="input-group forgot-input-group">
            <label htmlFor="reset-email">
              <span className="label-icon">📧</span>
              Email
            </label>
            <div className="input-container">
              <input
                id="reset-email"
                type="email"
                placeholder="Nhập email của bạn"
                value={forgotPasswordEmail}
                onChange={(e) => setForgotPasswordEmail(e.target.value)}
                required
                className={forgotPasswordEmail ? 'has-value' : ''}
              />
              <div className="input-focus-border"></div>
            </div>
            {forgotPasswordEmail && (
              <div className="input-validation">
                <span className="validation-icon">✓</span>
                <span className="validation-text">Email hợp lệ</span>
              </div>
            )}
          </div>
          
          <div className="forgot-password-buttons">
            <button type="submit" className="reset-button">
              <span className="button-icon">📤</span>
              <span className="button-text">GỬI LINK RESET</span>
            </button>
            <button 
              type="button" 
              className="cancel-button"
              onClick={closeForgotPassword}
            >
              <span className="button-icon">❌</span>
              <span className="button-text">HỦY</span>
            </button>
          </div>
        </form>
        
        <div className="form-footer">
          <p>Bạn nhớ mật khẩu rồi? 
            <button 
              type="button" 
              className="back-to-login"
              onClick={closeForgotPassword}
            >
              Quay lại đăng nhập
            </button>
          </p>
        </div>
      </div>
    </div>
  )
  return ( 
    <div className="banner-container">
      {/* Form quên mật khẩu */}
      {showForgotPassword && renderForgotPasswordForm()}
      {/* Form đăng nhập */}
      {!showForgotPassword && renderLoginForm()}
    </div>
  )
}

export default Banner
