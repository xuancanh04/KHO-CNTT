# 🏥 HỆ THỐNG QUẢN LÝ KHO CNTT - BỆNH VIỆN QUÂN Y 7A

## 📋 Mô tả hệ thống

Hệ thống quản lý kho CNTT được thiết kế để quản lý thiết bị, linh kiện và mực in của Bệnh viện Quân Y 7A. Hệ thống hỗ trợ 3 vai trò người dùng với các quyền truy cập khác nhau.

## 👥 Vai trò người dùng

### 👑 Admin/CNTT
- **Quyền hạn**: Toàn quyền hệ thống
- **Chức năng chính**:
  - Quản lý người dùng (thêm, sửa, xóa tài khoản)
  - Nhập/xuất kho
  - Cập nhật thiết bị
  - Sửa chữa, thay mực
  - Xem tất cả báo cáo

### 👔 Quản lý (Manager)
- **Quyền hạn**: Quản lý và giám sát
- **Chức năng chính**:
  - Xem báo cáo hệ thống
  - Duyệt đề xuất nhập linh kiện/mực in
  - Quản lý kho
  - Xem thiết bị CNTT
  - Tạo yêu cầu bảo trì/sửa chữa

### 👤 Nhân viên (Staff)
- **Quyền hạn**: Thực hiện công việc hàng ngày
- **Chức năng chính**:
  - Xem tổng quan hệ thống
  - Xem thiết bị CNTT
  - Tạo yêu cầu sửa chữa/thay mực
  - Ký xác nhận
  - Theo dõi vị trí thiết bị

## 🔐 Tài khoản mẫu để test

| Vai trò | Username | Password | Mô tả |
|---------|----------|----------|-------|
| 👑 Admin | `admin001` | `123456` | Quản trị viên hệ thống |
| 👔 Quản lý | `manager001` | `123456` | Quản lý kho Y tế |
| 👔 Quản lý | `manager002` | `123456` | Quản lý kho Kế toán |
| 👤 Nhân viên | `staff001` | `123456` | Nhân viên Hành chính |
| 👤 Nhân viên | `staff002` | `123456` | Kỹ thuật viên CNTT |

## 🚀 Cách sử dụng

### 1. Đăng nhập
- Truy cập trang web
- Nhập username và password
- Chọn "Ghi nhớ đăng nhập" nếu muốn
- Nhấn "ĐĂNG NHẬP"

### 2. Quản lý người dùng (Admin)
- Vào menu "Quản lý người dùng"
- Nhấn "➕ Thêm người dùng" để tạo tài khoản mới
- Điền thông tin bắt buộc: Username, Họ tên, Email
- Chọn vai trò và phòng ban
- Nhấn "Thêm người dùng"

### 3. Xem báo cáo (Manager)
- Vào menu "Báo cáo"
- Chọn loại báo cáo: Kho hoặc Bảo trì
- Chọn khoảng thời gian
- Nhấn "Tạo báo cáo"
- Xuất Excel nếu cần

### 4. Quản lý kho (Admin/Manager)
- Vào menu "Quản lý kho"
- Thêm sản phẩm mới
- Nhập/xuất kho
- Kiểm tra tồn kho

### 5. Quản lý thiết bị
- Vào menu "Thiết bị CNTT"
- Xem danh sách thiết bị
- Cập nhật thông tin
- Theo dõi vị trí

## 🛠️ Cài đặt và chạy

```bash
# Cài đặt dependencies
npm install

# Chạy development server
npm run dev

# Build cho production
npm run build
```

## 📱 Responsive Design

Hệ thống được thiết kế responsive, hoạt động tốt trên:
- Desktop (1920px+)
- Tablet (768px - 1024px)
- Mobile (320px - 767px)

## 🔒 Bảo mật

- Mật khẩu được mã hóa (trong thực tế)
- Phân quyền theo vai trò
- Session management
- Log hoạt động người dùng

## 📞 Hỗ trợ

- **Phòng CNTT**: Ext: 1234
- **Email**: cntt@bv7a.vn
- **Địa chỉ**: 466 Nguyễn Trãi, P.8, Q.5, TP.HCM

## 🔄 Cập nhật

- **Phiên bản**: 1.0.0
- **Ngày cập nhật**: 2024-01-15
- **Tính năng mới**:
  - Giao diện đăng nhập cải tiến
  - Hỗ trợ đa vai trò
  - Báo cáo chi tiết
  - Quản lý người dùng

---

**© 2024 Bệnh viện Quân Y 7A. Tất cả quyền được bảo lưu.**
