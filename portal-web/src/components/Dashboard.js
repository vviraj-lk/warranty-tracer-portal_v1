import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchDashboard = async () => {
      try {
        await axios.get('/dashboard');
        // Dashboard data can be used later when implementing functionality
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 403) {
          // Email not verified
          alert('Please verify your email address first.');
          navigate('/login');
        } else {
          console.error('Failed to fetch dashboard:', error);
        }
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    document.title = 'Warranty Tracer - Dashboard';
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Don't close if clicking on dropdown containers or their children
      const isDropdownClick = event.target.closest('.dropdown-container');
      const isDropdownMenu = event.target.closest('.dropdown-menu');
      const isAvatarDropdown = event.target.closest('.avatar-dropdown');

      if (!isDropdownClick && !isDropdownMenu && !isAvatarDropdown) {
        setShowNewDropdown(false);
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const menuItems = ['Dashboard', 'Products', 'Claims', 'Messages', 'Support'];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page min-h-screen relative">
      {/* Top Navigation Bar */}
      <header className="topbar">
        <div className="topbar-inner glass">
          {/* Left side navigation */}
          <div className="nav-left">
            {/* Desktop navigation links */}
            <nav className="nav-links">
              {menuItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveMenu(item)}
                  className={`nav-link ${activeMenu === item ? 'active' : ''}`}
                >
                  {item === 'Dashboard' && <i className="fas fa-home"></i>}
                  {item === 'Products' && <i className="fas fa-box"></i>}
                  {item === 'Claims' && <i className="fas fa-file-alt"></i>}
                  {item === 'Messages' && <i className="fas fa-envelope"></i>}
                  {item === 'Support' && <i className="fas fa-life-ring"></i>}
                  {' '}{item}
                </button>
              ))}
            </nav>
          </div>

          {/* Right side actions */}
          <div className="nav-actions">
            <button className="badge-btn" data-tooltip="Notifications">
              <i className="fas fa-bell"></i>
              <span>Notifications</span>
            </button>
            
            <div className="avatar-container dropdown-container">
              <button
                onClick={() => setShowNewDropdown(!showNewDropdown)}
                className="badge-btn"
                data-tooltip="New"
              >
                <i className="fas fa-plus"></i>
                <span>New</span>
              </button>
              
              {showNewDropdown && (
                <div className="dropdown-menu glass">
                  <div className="py-1">
                    <button className="dropdown-item">
                      <i className="fas fa-plus"></i> Register Product
                    </button>
                    <button className="dropdown-item">
                      <i className="fas fa-tools"></i> New Claim
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="avatar-container dropdown-container">
              <div
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="avatar"
                id="avatarBtn"
              >
                <i className="fas fa-user"></i>
              </div>
              
              {showProfileDropdown && (
                <div className="avatar-dropdown show" id="avatarDropdown">
                  <button className="dropdown-item">
                    <i className="fas fa-user-circle"></i> My Profile
                  </button>
                  <button className="dropdown-item">
                    <i className="fas fa-cog"></i> Settings
                  </button>
                  <hr />
                  <button
                    onClick={handleLogout}
                    className="dropdown-item logout"
                  >
                    <i className="fas fa-sign-out-alt"></i> Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="mobile-bottom-nav glass">
        {menuItems.slice(0, 4).map((item) => (
          <button
            key={item}
            onClick={() => setActiveMenu(item)}
            className={`mobile-nav-item ${activeMenu === item ? 'active' : ''}`}
          >
            {item === 'Dashboard' && <i className="fas fa-home"></i>}
            {item === 'Products' && <i className="fas fa-box"></i>}
            {item === 'Claims' && <i className="fas fa-file-alt"></i>}
            {item === 'Messages' && <i className="fas fa-envelope"></i>}
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
          className={`mobile-nav-item ${showProfileDropdown ? 'active' : ''}`}
        >
          <i className="fas fa-user"></i>
          <span>Profile</span>
        </button>
      </nav>

      {/* Dashboard Content */}
      <main className="dashboard-container">
        {/* Welcome Card */}
        <section className="glass welcome">
          <h1>Hello, {user?.name || 'User'} 👋</h1>
          <p>Here's the status of your warranties today.</p>
        </section>

        {/* STAT CARDS */}
        <section className="stats-row">
          <div className="glass stat-card">
            <h2>12</h2>
            <p>All Products</p>
          </div>

          <div className="glass stat-card">
            <h2>8</h2>
            <p>In Warranty</p>
          </div>

          <div className="glass stat-card">
            <h2>4</h2>
            <p>Expired</p>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="glass actions-card">
          <h3>Quick Actions</h3>
          <div className="quick-actions">
            <button className="btn ghost">
              <i className="fas fa-plus"></i> Register Product
            </button>
            <button className="btn ghost">
              <i className="fas fa-tools"></i> New Claim
            </button>
            <button className="btn ghost">
              <i className="fas fa-receipt"></i> Upload invoice for Sony TV
            </button>
            <button className="btn ghost">
              <i className="fas fa-file-signature"></i> Claim submitted for Dell Laptop
            </button>
          </div>
        </section>

        {/* EXPIRING SOON */}
        <section className="glass expiring-card">
          <h3>Expiring Soon</h3>

          <div className="exp-item">
            <div>
              <strong>Samsung AC</strong>
              <p>Warranty ends in 5 days</p>
            </div>
            <button className="btn ghost">Renew</button>
          </div>

          <div className="exp-item">
            <div>
              <strong>Philips Blender</strong>
              <p>Warranty ends in 12 days</p>
            </div>
            <button className="btn ghost">Claim</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;