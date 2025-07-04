import React from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from "../../Context/AdminAuthContext";

const AdminNavbar = () => {
  console.log("nav called successfully");

  const { user, logout } = useAdminAuth();
  const displayName = user?.name || "Admin User";
  const profileImage = user?.profileImage || `${process.env.PUBLIC_URL}/assets/images/faces/face15.jpg`;

  return (
    <>
      <nav className="navbar p-0 fixed-top d-flex flex-row w-auto" style={{ maxWidth: "200rem" }}>
        {/* <nav className="navbar fixed-top d-flex flex-row w-100 px-0 mx-0"> */}

        <div className="navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo-mini" to="/">
            <img src={`${process.env.PUBLIC_URL}/assets/images/logo-mini.svg`} alt="logo" />
          </Link>
        </div>

        <div className="navbar-menu-wrapper flex-grow d-flex align-items-stretch">
          <button className="navbar-toggler navbar-toggler align-self-center" type="button" data-toggle="minimize">
            <span className="mdi mdi-menu"></span>
          </button>

          <ul className="navbar-nav w-100" style={{ marginTop: "0px" }}>
            <li className="nav-item w-100">
              <form className="nav-link mt-2 mt-md-0 d-none d-lg-flex search">
                {/* <input type="text" className="form-control" placeholder="Search products" /> */}
              </form>
            </li>
          </ul>

          <ul className="navbar-nav navbar-nav-right">

            {/* Create New Project */}
            {/* <li className="nav-item dropdown d-none d-lg-block">
            <a className="nav-link btn btn-success create-new-button" id="createbuttonDropdown" data-bs-toggle="dropdown" href="/admin">
              + Create New Project
            </a>
            <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="createbuttonDropdown">
              <h6 className="p-3 mb-0">Projects</h6>
              <div className="dropdown-divider"></div>

              {[
                { icon: 'mdi-file-outline text-primary', label: 'Software Development' },
                { icon: 'mdi-web text-info', label: 'UI Development' },
                { icon: 'mdi-layers text-danger', label: 'Software Testing' },
              ].map((item, index) => (
                <React.Fragment key={index}>
                  <a className="dropdown-item preview-item" href='/admin'>
                    <div className="preview-thumbnail">
                      <div className="preview-icon bg-dark rounded-circle">
                        <i className={`mdi ${item.icon}`}></i>
                      </div>
                    </div>
                    <div className="preview-item-content">
                      <p className="preview-subject ellipsis mb-1">{item.label}</p>
                    </div>
                  </a>
                  <div className="dropdown-divider"></div>
                </React.Fragment>
              ))}

              <p className="p-3 mb-0 text-center">See all projects</p>
            </div>
          </li> */}

            {/* Grid Icon */}
            {/* <li className="nav-item nav-settings d-none d-lg-block">
            <a className="nav-link" href="/admin">
              <i className="mdi mdi-view-grid"></i>
            </a>
          </li> */}

            {/* Messages Dropdown */}
            <li className="nav-item dropdown border-left">
              <a className="nav-link count-indicator dropdown-toggle" id="messageDropdown" href="/admin/dashboard" data-bs-toggle="dropdown">
                <i className="mdi mdi-email"></i>
                <span className="count bg-success"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="messageDropdown">
                <h6 className="p-3 mb-0">Messages</h6>
                <div className="dropdown-divider"></div>

                {[
                  { img: 'face4.jpg', message: 'Mark send you a message', time: '1 Minute ago' },
                  { img: 'face2.jpg', message: 'Cregh send you a message', time: '15 Minutes ago' },
                  { img: 'face3.jpg', message: 'Profile picture updated', time: '18 Minutes ago' },
                ].map((msg, index) => (
                  <React.Fragment key={index}>
                    <a className="dropdown-item preview-item" href='/admin/dashboard'>
                      <div className="preview-thumbnail">
                        <img src={`${process.env.PUBLIC_URL}/assets/images/faces/${msg.img}`}
                          alt="user" className="rounded-circle profile-pic" />
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject ellipsis mb-1">{msg.message}</p>
                        <p className="text-muted mb-0">{msg.time}</p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                  </React.Fragment>
                ))}

                <p className="p-3 mb-0 text-center">4 new messages</p>
              </div>
            </li>

            {/* Notifications Dropdown */}
            <li className="nav-item dropdown border-left">
              <a className="nav-link count-indicator dropdown-toggle" id="notificationDropdown" href="/admin/dashboard" data-bs-toggle="dropdown">
                <i className="mdi mdi-bell"></i>
                <span className="count bg-danger"></span>
              </a>
              <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
                <h6 className="p-3 mb-0">Notifications</h6>
                <div className="dropdown-divider"></div>

                {[
                  { icon: 'mdi-calendar text-success', label: 'Event today', detail: 'Just a reminder that you have an event today' },
                  { icon: 'mdi-cog text-danger', label: 'Settings', detail: 'Update dashboard' },
                  { icon: 'mdi-link-variant text-warning', label: 'Launch Admin', detail: 'New admin wow!' },
                ].map((note, index) => (
                  <React.Fragment key={index}>
                    <a className="dropdown-item preview-item" href='/admin/dashboard'>
                      <div className="preview-thumbnail">
                        <div className="preview-icon bg-dark rounded-circle">
                          <i className={`mdi ${note.icon}`}></i>
                        </div>
                      </div>
                      <div className="preview-item-content">
                        <p className="preview-subject mb-1">{note.label}</p>
                        <p className="text-muted ellipsis mb-0">{note.detail}</p>
                      </div>
                    </a>
                    <div className="dropdown-divider"></div>
                  </React.Fragment>
                ))}

                <p className="p-3 mb-0 text-center">See all notifications</p>
              </div>
            </li>

            {/* Profile Dropdown */}
            <li className="nav-item dropdown">
              <a className="nav-link" id="profileDropdown" href="/admin/dashboard" data-bs-toggle="dropdown">
                <div className="navbar-profile">
                  <img className="img-xs rounded-circle" src={profileImage ? `${process.env.PUBLIC_URL}${profileImage}` : `${process.env.PUBLIC_URL}/assets/images/faces/face115.jpg`} alt="profile" />

                  <p className="mb-0 d-none d-sm-block navbar-profile-name">{displayName || "Henry Klein"}</p>
                  <i className="mdi mdi-menu-down d-none d-sm-block"></i>
                </div>
              </a>
              <div className="dropdown-menu dropdown-menu-end navbar-dropdown preview-list" aria-labelledby="profileDropdown">
                <h6 className="p-3 mb-0">Profile</h6>
                <div className="dropdown-divider"></div>

                <a className="dropdown-item preview-item" href='/admin/dashboard'>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-cog text-success"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Settings</p>
                  </div>
                </a>

                <a className="dropdown-item preview-item" href='/admin/dashboard'>
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-onepassword text-info"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Change password</p>
                  </div>
                </a>

                <div className="dropdown-divider"></div>
                {/* 
              <a className="dropdown-item preview-item" href='/logout'>
                <div className="preview-thumbnail">
                  <div className="preview-icon bg-dark rounded-circle">
                    <i className="mdi mdi-logout text-danger"></i>
                  </div>
                </div>
                <div className="preview-item-content">
                  <p className="preview-subject mb-1">Log out</p>
                </div>
              </a> */}

                <div
                  className="dropdown-item preview-item"
                  onClick={() => {
                    if (window.confirm("Are you sure you want to log out?")) {
                      logout();
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="preview-thumbnail">
                    <div className="preview-icon bg-dark rounded-circle">
                      <i className="mdi mdi-logout text-danger"></i>
                    </div>
                  </div>
                  <div className="preview-item-content">
                    <p className="preview-subject mb-1">Log out</p>
                  </div>
                </div>

                <div className="dropdown-divider"></div>
                <p className="p-3 mb-0 text-center">Advanced settings</p>
              </div>
            </li>
          </ul>

          <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
            <span className="mdi mdi-format-line-spacing"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
