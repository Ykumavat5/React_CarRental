import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Footer from '../Footer';
import '../pagination.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const getBadgeClass = (status) => {
    switch (status) {
      case 'Pending': return 'badge badge-danger';
      case 'Completed': return 'badge badge-success';
      default: return 'badge badge-secondary';
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token_admin");

        const response = await fetch("http://localhost:3034/api/v1/admin/users", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": token,
            "api_key": "123456789",
          },
        });

        const data = await response.json();
        if (response.ok && data.code === 200) {
          setUsers(data.data);
        } else {
          console.error("Failed to fetch users:", data.message);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    if (statusFilter === "all") return true;
    return statusFilter === "active"
      ? user.is_active === 1
      : user.is_active !== 1;
  });

  const offset = currentPage * itemsPerPage;
  const currentUsers = filteredUsers.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filteredUsers.length / itemsPerPage);

  const handlePageChange = ({ selected }) => setCurrentPage(selected);
  const applyFilter = () => setCurrentPage(0);

  return (
    <>
      {/* Styles */}
      <link rel="stylesheet" href="../../assets/vendors/mdi/css/materialdesignicons.min.css" />
      <link rel="stylesheet" href="../../assets/vendors/ti-icons/css/themify-icons.css" />
      <link rel="stylesheet" href="../../assets/vendors/css/vendor.bundle.base.css" />
      <link rel="stylesheet" href="../../assets/vendors/font-awesome/css/font-awesome.min.css" />
      <link rel="stylesheet" href="../../assets/css/style.css" />
      <link rel="shortcut icon" href="../../assets/images/favicon.png" />

      <div className="main-panel" style={{ marginTop: "-72px" }}>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">User List</h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Tables</a></li>
                <li className="breadcrumb-item active" aria-current="page">User List</li>
              </ol>
            </nav>
          </div>

          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Registered Users</h4>

                  {/* Filter */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <select
                      className="form-control w-25"
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <button className="btn btn-primary" onClick={applyFilter}>
                      Apply Filter
                    </button>
                  </div>

                  {/* Table */}
                  {loading ? (
                    <p>Loading users...</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Country code</th>
                            <th>Mobile number</th>
                            <th>User rating</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentUsers.length === 0 ? (
                            <tr>
                              <td colSpan="7" className="text-center">No users found.</td>
                            </tr>
                          ) : (
                            currentUsers.map((user, index) => (
                              <tr key={index}>
                                <td>{user.id || user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email || 'N/A'}</td>
                                <td>{user.country_code || 'N/A'}</td>
                                <td>{user.mobile_number || 'N/A'}</td>
                                <td>{user.avg_rating || '0.00'}</td>
                                <td>
                                  <label className={getBadgeClass(user.is_active === 1 ? 'Completed' : 'Pending')}>
                                    {user.is_active === 1 ? "Active" : "Inactive"}
                                  </label>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Pagination */}
                  {!loading && pageCount > 1 && (
                    <ReactPaginate
                      previousLabel={"← Previous"}
                      nextLabel={"Next →"}
                      pageCount={pageCount}
                      onPageChange={handlePageChange}
                      containerClassName={"pagination justify-content-end mt-3"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakLabel={"..."}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />

        {/* Scripts */}
        <script src="../../assets/vendors/js/vendor.bundle.base.js"></script>
        <script src="../../assets/js/off-canvas.js"></script>
        <script src="../../assets/js/misc.js"></script>
        <script src="../../assets/js/settings.js"></script>
        <script src="../../assets/js/todolist.js"></script>
      </div>
    </>
  );
};

export default UserList;
