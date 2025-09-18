import React, { useState, useEffect } from 'react';
import './Inventory.css';

const Inventory = ({ userRole, addNotification }) => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    quantity: 0,
    unit: '',
    price: 0,
    supplier: '',
    location: '',
    minStock: 0,
    description: ''
  });

  const [importData, setImportData] = useState({
    itemId: '',
    quantity: 0,
    supplier: '',
    invoice: '',
    notes: ''
  });

  const [exportData, setExportData] = useState({
    itemId: '',
    quantity: 0,
    department: '',
    requester: '',
    purpose: '',
    notes: ''
  });

  useEffect(() => {
    // Giả lập dữ liệu kho
    const mockInventory = [
      {
        id: 1,
        name: 'Mực in HP 26A (Đen)',
        category: 'Mực in',
        quantity: 45,
        unit: 'Hộp',
        price: 250000,
        supplier: 'Công ty TNHH ABC',
        location: 'Kệ A1',
        minStock: 10,
        description: 'Mực in laser cho máy in HP LaserJet Pro M404n',
        lastUpdated: '2024-01-15'
      },
      {
        id: 2,
        name: 'Mực in Canon 051 (Đen)',
        category: 'Mực in',
        quantity: 32,
        unit: 'Hộp',
        price: 280000,
        supplier: 'Công ty TNHH XYZ',
        location: 'Kệ A2',
        minStock: 8,
        description: 'Mực in laser cho máy in Canon LBP6030w',
        lastUpdated: '2024-01-14'
      },
      {
        id: 3,
        name: 'RAM DDR4 8GB',
        category: 'Linh kiện',
        quantity: 15,
        unit: 'Thanh',
        price: 850000,
        supplier: 'Công ty TNHH DEF',
        location: 'Kệ B1',
        minStock: 5,
        description: 'RAM DDR4 8GB 2666MHz cho máy tính',
        lastUpdated: '2024-01-13'
      },
      {
        id: 4,
        name: 'Ổ cứng SSD 256GB',
        category: 'Linh kiện',
        quantity: 8,
        unit: 'Cái',
        price: 1200000,
        supplier: 'Công ty TNHH GHI',
        location: 'Kệ B2',
        minStock: 3,
        description: 'Ổ cứng SSD SATA 256GB',
        lastUpdated: '2024-01-12'
      },
      {
        id: 5,
        name: 'Cáp mạng Cat6',
        category: 'Phụ kiện',
        quantity: 120,
        unit: 'Mét',
        price: 15000,
        supplier: 'Công ty TNHH JKL',
        location: 'Kệ C1',
        minStock: 50,
        description: 'Cáp mạng Cat6 UTP',
        lastUpdated: '2024-01-11'
      }
    ];

    setInventory(mockInventory);
    setFilteredInventory(mockInventory);
  }, []);

  useEffect(() => {
    let filtered = inventory;
    
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }
    
    setFilteredInventory(filtered);
  }, [searchTerm, categoryFilter, inventory]);

  const categories = ['Mực in', 'Linh kiện', 'Phụ kiện', 'Thiết bị'];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || newItem.quantity <= 0) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    const item = {
      ...newItem,
      id: Date.now(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setInventory(prev => [...prev, item]);
    setNewItem({
      name: '', category: '', quantity: 0, unit: '', price: 0,
      supplier: '', location: '', minStock: 0, description: ''
    });
    setShowAddModal(false);
    addNotification('Thêm sản phẩm mới thành công!', 'success');
  };

  const openAddModal = () => {
    setShowAddModal(true);
    // Scroll lên đầu trang khi mở modal
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openImportModal = () => {
    setShowImportModal(true);
    // Scroll lên đầu trang khi mở modal
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openExportModal = () => {
    setShowExportModal(true);
    // Scroll lên đầu trang khi mở modal
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImport = () => {
    if (!importData.itemId || importData.quantity <= 0) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    setInventory(prev => prev.map(item => 
      item.id === parseInt(importData.itemId) 
        ? { ...item, quantity: item.quantity + importData.quantity }
        : item
    ));

    setImportData({
      itemId: '', quantity: 0, supplier: '', invoice: '', notes: ''
    });
    setShowImportModal(false);
    addNotification('Nhập kho thành công!', 'success');
  };

  const handleExport = () => {
    if (!exportData.itemId || exportData.quantity <= 0) {
      addNotification('Vui lòng điền đầy đủ thông tin bắt buộc', 'error');
      return;
    }

    const item = inventory.find(i => i.id === parseInt(exportData.itemId));
    if (item.quantity < exportData.quantity) {
      addNotification('Số lượng xuất vượt quá tồn kho!', 'error');
      return;
    }

    setInventory(prev => prev.map(i => 
      i.id === parseInt(exportData.itemId) 
        ? { ...i, quantity: i.quantity - exportData.quantity }
        : i
    ));

    setExportData({
      itemId: '', quantity: 0, department: '', requester: '', purpose: '', notes: ''
    });
    setShowExportModal(false);
    addNotification('Xuất kho thành công!', 'success');
  };

  const getStockStatus = (quantity, minStock) => {
    if (quantity === 0) return { status: 'out', text: 'Hết hàng', color: '#e74c3c' };
    if (quantity <= minStock) return { status: 'low', text: 'Sắp hết', color: '#f39c12' };
    return { status: 'normal', text: 'Có sẵn', color: '#27ae60' };
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="inventory">
      <div className="inventory-header">
        <h1>📦 QUẢN LÝ KHO CNTT</h1>
        <p>Quản lý xuất nhập tồn kho các thiết bị và linh kiện CNTT</p>
      </div>

      {/* Controls */}
      <div className="inventory-controls">
        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="category-filter"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div className="action-buttons">
          {userRole === 'admin' && (
            <button 
              className="btn btn-primary"
              onClick={openAddModal}
            >
              ➕ Thêm sản phẩm
            </button>
          )}
          <button 
            className="btn btn-success"
            onClick={openImportModal}
          >
            📥 Nhập kho
          </button>
          <button 
            className="btn btn-warning"
            onClick={openExportModal}
          >
            📤 Xuất kho
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="inventory-table-container">
        <table className="inventory-table">
          <thead>
            <tr>
              <th>Tên sản phẩm</th>
              <th>Danh mục</th>
              <th>Số lượng</th>
              <th>Đơn vị</th>
              <th>Giá</th>
              <th>Nhà cung cấp</th>
              <th>Vị trí</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => {
              const stockStatus = getStockStatus(item.quantity, item.minStock);
              return (
                <tr key={item.id}>
                  <td>
                    <div className="item-info">
                      <strong>{item.name}</strong>
                      <small>{item.description}</small>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{item.category}</span>
                  </td>
                  <td>
                    <span className={`quantity ${stockStatus.status}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td>{item.unit}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{item.supplier}</td>
                  <td>{item.location}</td>
                  <td>
                    <span 
                      className="stock-status"
                      style={{ backgroundColor: stockStatus.color }}
                    >
                      {stockStatus.text}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons-small">
                      <button 
                        className="btn-small btn-info"
                        onClick={() => setSelectedItem(item)}
                        title="Xem chi tiết"
                      >
                        📋
                      </button>
                      {userRole === 'admin' && (
                        <button 
                          className="btn-small btn-warning"
                          onClick={() => {
                            setSelectedItem(item);
                            setShowImportModal(true);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          title="Nhập kho"
                        >
                          📥
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>➕ Thêm sản phẩm mới</h3>
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
                  <label>Tên sản phẩm *</label>
                  <input
                    type="text"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    placeholder="Nhập tên sản phẩm"
                  />
                </div>
                <div className="form-group">
                  <label>Danh mục *</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Số lượng *</label>
                  <input
                    type="number"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Đơn vị</label>
                  <input
                    type="text"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    placeholder="Hộp, Cái, Mét..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Giá (VNĐ)</label>
                  <input
                    type="number"
                    value={newItem.price}
                    onChange={(e) => setNewItem({...newItem, price: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Nhà cung cấp</label>
                  <input
                    type="text"
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    placeholder="Tên nhà cung cấp"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Vị trí trong kho</label>
                  <input
                    type="text"
                    value={newItem.location}
                    onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    placeholder="Kệ A1, B2..."
                  />
                </div>
                <div className="form-group">
                  <label>Tồn kho tối thiểu</label>
                  <input
                    type="number"
                    value={newItem.minStock}
                    onChange={(e) => setNewItem({...newItem, minStock: parseInt(e.target.value)})}
                    min="0"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Mô tả</label>
                <textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  placeholder="Mô tả chi tiết sản phẩm..."
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
                onClick={handleAddItem}
              >
                Thêm sản phẩm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {showImportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>📥 Nhập kho</h3>
              <button 
                className="modal-close"
                onClick={() => setShowImportModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Sản phẩm *</label>
                <select
                  value={importData.itemId}
                  onChange={(e) => setImportData({...importData, itemId: e.target.value})}
                >
                  <option value="">Chọn sản phẩm</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} (Hiện tại: {item.quantity} {item.unit})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Số lượng nhập *</label>
                  <input
                    type="number"
                    value={importData.quantity}
                    onChange={(e) => setImportData({...importData, quantity: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Nhà cung cấp</label>
                  <input
                    type="text"
                    value={importData.supplier}
                    onChange={(e) => setImportData({...importData, supplier: e.target.value})}
                    placeholder="Tên nhà cung cấp"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Số hóa đơn</label>
                  <input
                    type="text"
                    value={importData.invoice}
                    onChange={(e) => setImportData({...importData, invoice: e.target.value})}
                    placeholder="Số hóa đơn"
                  />
                </div>
                <div className="form-group">
                  <label>Ghi chú</label>
                  <input
                    type="text"
                    value={importData.notes}
                    onChange={(e) => setImportData({...importData, notes: e.target.value})}
                    placeholder="Ghi chú"
                  />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowImportModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn btn-success"
                onClick={handleImport}
              >
                Nhập kho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>📤 Xuất kho</h3>
              <button 
                className="modal-close"
                onClick={() => setShowExportModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Sản phẩm *</label>
                <select
                  value={exportData.itemId}
                  onChange={(e) => setExportData({...exportData, itemId: e.target.value})}
                >
                  <option value="">Chọn sản phẩm</option>
                  {inventory.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} (Hiện tại: {item.quantity} {item.unit})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Số lượng xuất *</label>
                  <input
                    type="number"
                    value={exportData.quantity}
                    onChange={(e) => setExportData({...exportData, quantity: parseInt(e.target.value)})}
                    min="1"
                  />
                </div>
                <div className="form-group">
                  <label>Phòng ban</label>
                  <input
                    type="text"
                    value={exportData.department}
                    onChange={(e) => setExportData({...exportData, department: e.target.value})}
                    placeholder="Tên phòng ban"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Người yêu cầu</label>
                  <input
                    type="text"
                    value={exportData.requester}
                    onChange={(e) => setExportData({...exportData, requester: e.target.value})}
                    placeholder="Tên người yêu cầu"
                  />
                </div>
                <div className="form-group">
                  <label>Mục đích sử dụng</label>
                  <input
                    type="text"
                    value={exportData.purpose}
                    onChange={(e) => setExportData({...exportData, purpose: e.target.value})}
                    placeholder="Mục đích sử dụng"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Ghi chú</label>
                <textarea
                  value={exportData.notes}
                  onChange={(e) => setExportData({...exportData, notes: e.target.value})}
                  placeholder="Ghi chú"
                  rows="3"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowExportModal(false)}
              >
                Hủy
              </button>
              <button 
                className="btn btn-warning"
                onClick={handleExport}
              >
                Xuất kho
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Item Detail Modal */}
      {selectedItem && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>📋 Chi tiết sản phẩm</h3>
              <button 
                className="modal-close"
                onClick={() => setSelectedItem(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="item-detail">
                <h4>{selectedItem.name}</h4>
                <p className="item-description">{selectedItem.description}</p>
                
                <div className="detail-grid">
                  <div className="detail-item">
                    <label>Danh mục:</label>
                    <span>{selectedItem.category}</span>
                  </div>
                  <div className="detail-item">
                    <label>Số lượng hiện tại:</label>
                    <span className={`quantity ${getStockStatus(selectedItem.quantity, selectedItem.minStock).status}`}>
                      {selectedItem.quantity} {selectedItem.unit}
                    </span>
                  </div>
                  <div className="detail-item">
                    <label>Đơn giá:</label>
                    <span>{formatCurrency(selectedItem.price)}</span>
                  </div>
                  <div className="detail-item">
                    <label>Nhà cung cấp:</label>
                    <span>{selectedItem.supplier}</span>
                  </div>
                  <div className="detail-item">
                    <label>Vị trí trong kho:</label>
                    <span>{selectedItem.location}</span>
                  </div>
                  <div className="detail-item">
                    <label>Tồn kho tối thiểu:</label>
                    <span>{selectedItem.minStock} {selectedItem.unit}</span>
                  </div>
                  <div className="detail-item">
                    <label>Cập nhật lần cuối:</label>
                    <span>{selectedItem.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button 
                className="btn btn-primary"
                onClick={() => setSelectedItem(null)}
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

export default Inventory;
