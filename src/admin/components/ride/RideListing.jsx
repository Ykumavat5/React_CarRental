import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Footer from '../Footer';
import '../pagination.css'; 

const RideList = () => {
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const getBadgeClass = (status) => {
    switch (status) {
      case 'cancelled': return 'badge badge-danger';
      case 'accepted': return 'badge badge-warning';
      case 'in_progress': return 'badge badge-info';
      case 'completed': return 'badge badge-success';
      case 'scheduled': return 'badge badge-success';
      default: return 'badge badge-secondary';
    }
  };

  useEffect(() => {
    const fetchRides = async () => {
      try {
        const token = localStorage.getItem("token_admin");
        const response = await fetch("http://localhost:3034/api/v1/admin/rides", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": token,
            "api_key": "123456789",
          },
        });

        const data = await response.json();
        if (response.ok && data.code === 200) {
          setRides(data.data);
        } else {
          console.error("Failed to fetch rides:", data.message);
        }
      } catch (err) {
        console.error("Error fetching rides:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRides();
  }, []);

  const filteredRides = filterStatus === 'all'
    ? rides
    : rides.filter(ride => ride.status === filterStatus);

  const pageCount = Math.ceil(filteredRides.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentRides = filteredRides.slice(offset, offset + itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const applyFilter = () => {
    setCurrentPage(0); // Reset to first page on filter
  };

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
            <h3 className="page-title">Ride List</h3>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><a href="/admin/dashboard">Tables</a></li>
                <li className="breadcrumb-item active" aria-current="page">Rides</li>
              </ol>
            </nav>
          </div>

          <div className="row">
            <div className="col-lg-12 grid-margin stretch-card">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">All Rides</h4>

                  {/* Filter UI */}
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <select
                      className="form-control w-25"
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                    >
                      <option value="all">All</option>
                      <option value="accepted">Accepted</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="scheduled">Scheduled</option>
                    </select>
                    <button
                      className="btn btn-primary"
                      onClick={applyFilter}
                    >
                      Apply Filter
                    </button>
                  </div>

                  {/* Table */}
                  {loading ? (
                    <p>Loading rides...</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Ride ID</th>
                            <th>User</th>
                            <th>Driver</th>
                            <th>Pickup</th>
                            <th>Dropoff</th>
                            <th>Distance</th>
                            <th>Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentRides.length === 0 ? (
                            <tr>
                              <td colSpan="8" className="text-center">No rides found.</td>
                            </tr>
                          ) : (
                            currentRides.map((ride, index) => (
                              <tr key={index}>
                                <td>{ride.id || ride._id}</td>
                                <td>{ride.user_id || "N/A"}</td>
                                <td>{ride.driver_id || "N/A"}</td>
                                <td>{ride.pickup_address || "N/A"}</td>
                                <td>{ride.dropoff_address || "N/A"}</td>
                                <td>{ride.distance_km + ' km'}</td>
                                <td>{ride.start_time ? new Date(ride.start_time).toLocaleString('en-IN', {
                                  day: '2-digit',
                                  month: 'short',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true,
                                }) : "N/A"}</td>
                                <td>
                                  <label className={getBadgeClass(ride.status)} style={{ color: "black" }}>
                                    {ride.status}
                                  </label>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* React Pagination */}
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

export default RideList;
