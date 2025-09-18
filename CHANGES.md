# Thay đổi giao diện - Di chuyển tài khoản và đăng xuất lên Header

## Tổng quan
Đã thực hiện thay đổi để di chuyển phần tài khoản và đăng xuất từ sidebar footer lên góc trên phải của Header cho tất cả 3 roles (admin, manager, staff).

## Các thay đổi đã thực hiện

### 1. Header Component (`src/components/Header/Header.jsx`)
- Thêm props `userData`, `onLogout`, `isLoggedIn`
- Hiển thị phần tài khoản và đăng xuất khi đã đăng nhập
- Hiển thị thông tin liên hệ khi chưa đăng nhập
- Hiển thị avatar, tên người dùng, vai trò và nút đăng xuất

### 2. Header CSS (`src/components/Header/Header.css`)
- Thêm CSS cho `.user-account-section`
- Thêm CSS cho `.user-info`, `.user-avatar`, `.user-details`
- Thêm CSS cho `.logout-button` với gradient và hiệu ứng hover
- Cập nhật responsive design cho mobile

### 3. Home Component (`src/Home.jsx`)
- Truyền props `userData`, `onLogout`, `isLoggedIn` cho Header
- Header hiển thị ở cả trạng thái đăng nhập và chưa đăng nhập

### 4. InventoryManagement Component (`src/components/InventoryManagement/InventoryManagement.jsx`)
- Loại bỏ phần sidebar footer chứa user profile và logout button
- Giữ nguyên tất cả chức năng khác

### 5. InventoryManagement CSS (`src/components/InventoryManagement/InventoryManagement.css`)
- Xóa tất cả CSS liên quan đến `.sidebar-footer`
- Xóa CSS cho `.user-profile`, `.user-avatar`, `.logout-btn`
- Cập nhật padding của `.sidebar-nav` (bỏ padding-bottom 200px)
- Cập nhật responsive design

## Các roles được hỗ trợ

### Admin (Quản trị viên)
- Quyền truy cập tất cả chức năng
- Quản lý người dùng
- Quản lý kho, thiết bị, bảo trì

### Manager (Quản lý)
- Quyền truy cập hạn chế
- Quản lý kho, thiết bị, bảo trì
- Xem báo cáo

### Staff (Nhân viên)
- Quyền truy cập cơ bản
- Xem thông tin thiết bị
- Báo cáo bảo trì

## Giao diện mới

### Header khi chưa đăng nhập
- Logo bệnh viện bên trái
- Thông tin liên hệ bên phải (địa chỉ, hotline)

### Header khi đã đăng nhập
- Logo bệnh viện bên trái
- Thông tin tài khoản và nút đăng xuất bên phải
- Avatar người dùng với tên và vai trò
- Nút đăng xuất với gradient đỏ

### Sidebar
- Loại bỏ phần footer chứa user profile
- Giữ nguyên navigation menu
- Responsive design được cải thiện

## Responsive Design
- Mobile: Header chuyển thành layout dọc
- Tablet: Giữ nguyên layout ngang
- Desktop: Layout tối ưu với spacing phù hợp

## Lưu ý
- Tất cả chức năng khác giữ nguyên
- Chỉ thay đổi vị trí hiển thị user profile và logout
- Giao diện nhất quán cho tất cả 3 roles
- CSS được tối ưu hóa và dọn dẹp
