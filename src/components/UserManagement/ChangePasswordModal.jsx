import { useState } from 'react'
import './UserManagement.css'
import { validateCurrentPassword, setPasswordForUser } from '../../utils/auth'

const ChangePasswordModal = ({ username, onClose, onSuccess }) => {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ các trường.')
      return
    }
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Xác nhận mật khẩu không khớp.')
      return
    }
    if (!validateCurrentPassword(username, currentPassword)) {
      setError('Mật khẩu hiện tại không đúng.')
      return
    }

    setIsSaving(true)
    try {
      setPasswordForUser(username, newPassword)
      onSuccess?.()
      onClose?.()
      alert('Đổi mật khẩu thành công!')
    } catch (err) {
      setError('Có lỗi xảy ra. Vui lòng thử lại.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="um-modal-overlay">
      <div className="um-modal">
        <div className="um-modal-header">
          <h3>Đổi mật khẩu</h3>
          <button className="um-modal-close" onClick={onClose} disabled={isSaving}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="um-form">
          <div className="um-form-group">
            <label>Mật khẩu hiện tại</label>
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} disabled={isSaving} />
          </div>
          <div className="um-form-group">
            <label>Mật khẩu mới</label>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled={isSaving} />
          </div>
          <div className="um-form-group">
            <label>Xác nhận mật khẩu mới</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isSaving} />
          </div>
          {error && <div className="um-error">{error}</div>}
          <div className="um-modal-actions">
            <button type="button" className="um-btn secondary" onClick={onClose} disabled={isSaving}>Hủy</button>
            <button type="submit" className="um-btn primary" disabled={isSaving}>{isSaving ? 'Đang lưu...' : 'Lưu mật khẩu'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePasswordModal


