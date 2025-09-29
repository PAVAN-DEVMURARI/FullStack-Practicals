import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './SidebarNav.css';

// Mock user data for role-based access control
const mockUsers = {
  admin: {
    id: 1,
    name: 'Admin User',
    role: 'admin',
    avatar: '👨‍💼',
    permissions: ['dashboard', 'users', 'products', 'analytics', 'settings', 'reports']
  },
  manager: {
    id: 2,
    name: 'Manager User',
    role: 'manager',
    avatar: '👩‍💼',
    permissions: ['dashboard', 'products', 'analytics', 'reports']
  },
  user: {
    id: 3,
    name: 'Regular User',
    role: 'user',
    avatar: '👤',
    permissions: ['dashboard', 'products']
  }
};

// Navigation menu items with permissions
const menuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: '📊',
    path: '/',
    permission: 'dashboard'
  },
  {
    id: 'users',
    title: 'User Management',
    icon: '👥',
    path: '/users',
    permission: 'users'
  },
  {
    id: 'products',
    title: 'Products',
    icon: '📦',
    path: '/products',
    permission: 'products'
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: '📈',
    path: '/analytics',
    permission: 'analytics'
  },
  {
    id: 'reports',
    title: 'Reports',
    icon: '📋',
    path: '/reports',
    permission: 'reports'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: '⚙️',
    path: '/settings',
    permission: 'settings'
  }
];

// Sidebar Navigation Component
const SidebarNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(mockUsers.user);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(true); // Keep sidebar open on desktop
      } else {
        setIsOpen(false); // Keep sidebar closed on mobile by default
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Toggle sidebar
  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Close sidebar on mobile when clicking outside
  const closeSidebar = useCallback(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [isMobile]);

  // Switch user role for demonstration
  const switchUser = useCallback((userType) => {
    setCurrentUser(mockUsers[userType]);
  }, []);

  // Check if user has permission for menu item
  const hasPermission = useCallback((permission) => {
    return currentUser.permissions.includes(permission);
  }, [currentUser.permissions]);

  // Filter menu items based on user permissions
  const visibleMenuItems = menuItems.filter(item => hasPermission(item.permission));

  return (
    <div className="sidebar-app">
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div className="sidebar-overlay" onClick={closeSidebar}></div>
      )}

      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="nav-left">
          <button 
            className="menu-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
          >
            <span className="hamburger">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
          <h1 className="app-title">React Sidebar Nav</h1>
        </div>
        
        <div className="nav-right">
          <div className="user-switcher">
            <label>Switch Role:</label>
            <select 
              value={currentUser.role} 
              onChange={(e) => switchUser(e.target.value)}
              className="role-selector"
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div className="user-info">
            <span className="user-avatar">{currentUser.avatar}</span>
            <span className="user-name">{currentUser.name}</span>
            <span className="user-role">({currentUser.role})</span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <span className="logo-text">NavApp</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <ul className="nav-list">
            {visibleMenuItems.map((item) => (
              <li key={item.id} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                  onClick={closeSidebar}
                  title={item.title}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.title}</span>
                  {location.pathname === item.path && (
                    <span className="active-indicator"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div className="current-user">
            <div className="user-avatar-large">{currentUser.avatar}</div>
            <div className="user-details">
              <div className="user-name-small">{currentUser.name}</div>
              <div className="user-role-small">{currentUser.role}</div>
            </div>
          </div>
          
          <div className="permissions-info">
            <small>Permissions: {currentUser.permissions.length}</small>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/products" element={<Products />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

// Page Components
const Dashboard = () => (
  <div className="page">
    <div className="page-header">
      <h2>📊 Dashboard</h2>
      <p>Welcome to your dashboard overview</p>
    </div>
    <div className="page-content">
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Total Users</h3>
          <div className="metric">1,234</div>
        </div>
        <div className="dashboard-card">
          <h3>Products</h3>
          <div className="metric">567</div>
        </div>
        <div className="dashboard-card">
          <h3>Revenue</h3>
          <div className="metric">$89,012</div>
        </div>
        <div className="dashboard-card">
          <h3>Orders</h3>
          <div className="metric">345</div>
        </div>
      </div>
      
      <div className="info-section">
        <h3>Navigation Features Demonstrated:</h3>
        <ul>
          <li>✅ React Hooks (useState, useEffect, useCallback)</li>
          <li>✅ Responsive Design (Mobile & Desktop)</li>
          <li>✅ Smooth Animations & Transitions</li>
          <li>✅ Active Menu Item Highlighting</li>
          <li>✅ Role-Based Access Control</li>
          <li>✅ Mobile Overlay & Touch Support</li>
        </ul>
      </div>
    </div>
  </div>
);

const UserManagement = () => (
  <div className="page">
    <div className="page-header">
      <h2>👥 User Management</h2>
      <p>Manage system users and permissions</p>
    </div>
    <div className="page-content">
      <div className="feature-info">
        <h3>Admin Only Feature</h3>
        <p>This page is only visible to users with admin permissions.</p>
        <div className="user-table">
          <div className="table-header">
            <span>User</span>
            <span>Role</span>
            <span>Status</span>
          </div>
          <div className="table-row">
            <span>John Doe</span>
            <span>Manager</span>
            <span className="status active">Active</span>
          </div>
          <div className="table-row">
            <span>Jane Smith</span>
            <span>User</span>
            <span className="status active">Active</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Products = () => (
  <div className="page">
    <div className="page-header">
      <h2>📦 Products</h2>
      <p>Manage your product catalog</p>
    </div>
    <div className="page-content">
      <div className="products-grid">
        <div className="product-card">
          <div className="product-image">📱</div>
          <h4>Smartphone</h4>
          <p>$699.99</p>
        </div>
        <div className="product-card">
          <div className="product-image">💻</div>
          <h4>Laptop</h4>
          <p>$1,299.99</p>
        </div>
        <div className="product-card">
          <div className="product-image">🎧</div>
          <h4>Headphones</h4>
          <p>$199.99</p>
        </div>
      </div>
    </div>
  </div>
);

const Analytics = () => (
  <div className="page">
    <div className="page-header">
      <h2>📈 Analytics</h2>
      <p>Business insights and metrics</p>
    </div>
    <div className="page-content">
      <div className="analytics-section">
        <h3>Performance Metrics</h3>
        <div className="metric-bars">
          <div className="metric-bar">
            <label>User Engagement</label>
            <div className="bar">
              <div className="fill" style={{width: '85%'}}></div>
            </div>
            <span>85%</span>
          </div>
          <div className="metric-bar">
            <label>Conversion Rate</label>
            <div className="bar">
              <div className="fill" style={{width: '72%'}}></div>
            </div>
            <span>72%</span>
          </div>
          <div className="metric-bar">
            <label>Customer Satisfaction</label>
            <div className="bar">
              <div className="fill" style={{width: '91%'}}></div>
            </div>
            <span>91%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Reports = () => (
  <div className="page">
    <div className="page-header">
      <h2>📋 Reports</h2>
      <p>Generate and view reports</p>
    </div>
    <div className="page-content">
      <div className="reports-section">
        <h3>Available Reports</h3>
        <div className="report-list">
          <div className="report-item">
            <span className="report-icon">📊</span>
            <div className="report-info">
              <h4>Sales Report</h4>
              <p>Monthly sales performance</p>
            </div>
            <button className="generate-btn">Generate</button>
          </div>
          <div className="report-item">
            <span className="report-icon">👥</span>
            <div className="report-info">
              <h4>User Activity Report</h4>
              <p>User engagement metrics</p>
            </div>
            <button className="generate-btn">Generate</button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Settings = () => (
  <div className="page">
    <div className="page-header">
      <h2>⚙️ Settings</h2>
      <p>Application configuration</p>
    </div>
    <div className="page-content">
      <div className="settings-section">
        <h3>General Settings</h3>
        <div className="setting-item">
          <label>Theme</label>
          <select className="setting-input">
            <option>Light</option>
            <option>Dark</option>
            <option>Auto</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Language</label>
          <select className="setting-input">
            <option>English</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
        <div className="setting-item">
          <label>Notifications</label>
          <input type="checkbox" className="setting-checkbox" defaultChecked />
        </div>
      </div>
    </div>
  </div>
);

// Main App Component with Router
const SidebarNavApp = () => {
  return (
    <Router>
      <SidebarNav />
    </Router>
  );
};

export default SidebarNavApp;