import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar">
      <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
        <Link className="sidebar-brand brand-logo" to="/admin/dashboard" style={{color:"whitesmoke", textAlign:"Center",textDecoration:"None"}}>
          Car Rental
        </Link>
        <Link className="sidebar-brand brand-logo-mini" to="/admin/dashboard">
          <img src={`${process.env.PUBLIC_URL}/assets/images/logo-mini.svg`} alt="logo" />
        </Link>
      </div>

      <ul className="nav">
        {/* Navigation Links */}
        <li className="nav-item nav-category">
          <span className="nav-link">Navigation</span>
        </li>

        <li className="nav-item menu-items">
          <Link className="nav-link" to="/admin/dashboard">
            <span className="menu-icon"><i className="mdi mdi-speedometer"></i></span>
            <span className="menu-title">Dashboard</span>
          </Link>
        </li>

        {/* Other Menu Items */}
        <li className="nav-item menu-items">
          <Link className="nav-link" to="/admin/users">
            <span className="menu-icon"><i className="mdi mdi-playlist-play"></i></span>
            <span className="menu-title">User listing</span>
          </Link>
        </li>

        <li className="nav-item menu-items">
          <Link className="nav-link" to="/admin/drivers">
            <span className="menu-icon"><i className="mdi mdi-chart-bar"></i></span>
            <span className="menu-title">Driver Listing</span>
          </Link>
        </li>

        <li className="nav-item menu-items">
          <Link className="nav-link" to="/admin/rides">
            <span className="menu-icon"><i className="mdi mdi-contacts"></i></span>
            <span className="menu-title">Ride Listing</span>
          </Link>
        </li>

        <li className="nav-item menu-items">
          <Link className="nav-link" to="/admin/promos">
            <span className="menu-icon"><i className="mdi mdi-contacts"></i></span>
            <span className="menu-title">Promo Listing</span>
          </Link>
        </li>

        {/* User Pages with Collapse */}
        <li className="nav-item menu-items">
          <a className="nav-link" data-bs-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
            <span className="menu-icon"><i className="mdi mdi-security"></i></span>
            <span className="menu-title">Additional listings</span>
            <i className="menu-arrow"></i>
          </a>
          <div className="collapse" id="auth">
            <ul className="nav flex-column sub-menu">
              <li className="nav-item"><Link className="nav-link" to="/admin/surplus">Surplus listings</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/admin/banner">Banner listings</Link></li>
            </ul>
          </div>
        </li>

        <li className="nav-item menu-items">
          <Link className="nav-link" to="/admin/notifications">
            <span className="menu-icon"><i className="mdi mdi-file-document"></i></span>
            <span className="menu-title">Notification listing</span>
          </Link>
        </li>

        <li className="nav-item menu-items">
          <Link className="nav-link" to="/admin/static">
            <span className="menu-icon"><i className="mdi mdi-file-document"></i></span>
            <span className="menu-title">Static pages listing</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default AdminSidebar;
