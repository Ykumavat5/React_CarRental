import React, { useEffect, useState } from 'react';
import Footer from './Footer';

const Main = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token_admin");

        const response = await fetch("http://localhost:3034/api/v1/admin/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "token": token,
            "api_key": "123456789",
          },
        });

        const data = await response.json();

        if (response.ok && data.code === 200) {
          setDashboardData(data.data);
        } else {
          console.error("Dashboard fetch failed:", data.message);
        }
      } catch (err) {
        console.error("Error fetching dashboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="main-panel">
      <div className="content-wrapper">
        <div className="row">
          {loading ? (
            <p>Loading dashboard...</p>
          ) : (
            <>
              {/* Metrics Cards */}
              {[
                { label: 'Total Users', value: dashboardData.total_users, icon: 'account', color: 'info' },
                { label: 'Total Drivers', value: dashboardData.total_drivers, icon: 'car', color: 'warning' },
                { label: 'Total Rides', value: dashboardData.total_rides, icon: 'road-variant', color: 'primary' },
                { label: 'Completed Rides', value: dashboardData.completed_rides, icon: 'check', color: 'success' },
                // { label: 'Today Revenue', value: `₹${dashboardData.today_revenue}`, icon: 'currency-inr', color: 'danger' },
              ].map((item, index) => (
                <div className="col-xl-3 col-sm-6 grid-margin stretch-card" key={index}>
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-9">
                          <div className="d-flex align-items-center align-self-start">
                            <h3 className="mb-0">{item.value}</h3>
                          </div>
                        </div>
                        <div className="col-3">
                          <div className={`icon icon-box-${item.color}`}>
                            <span className={`mdi mdi-${item.icon} icon-item`}></span>
                          </div>
                        </div>
                      </div>
                      <h6 className="text-muted font-weight-normal">{item.label}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Transaction History and Open Projects */}
        <div className="row">
          {/* Left Card */}
          <div className="col-md-3 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">Payment Type</h4>
                <div className="position-relative">
                  <div className="daoughnutchart-wrapper">
                    <canvas id="transaction-history" className="transaction-chart"></canvas>
                  </div>
                  <div className="custom-value">$1200  <span>Total</span></div> 
                </div>

                {/* Transaction Items */}
                {[
                  { title: 'Cash payment', amount: '$500' },
                  { title: 'Online payment',  amount: '$700' }
                ].map((tx, idx) => (
                  <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3" key={idx}>
                    <div className="text-md-center text-xl-left">
                      <h6 className="mb-1">{tx.title}</h6>
                    </div>
                    <div className="align-self-center flex-grow text-end text-md-center text-xl-right py-md-2 py-xl-0">
                      <h6 className="font-weight-bold mb-0">{tx.amount}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Card */}
          <div className="col-md-8 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">

                <div className="d-flex flex-row justify-content-between">
                  <h4 className="card-title mb-1">Open Promos</h4>
                  <p className="text-muted mb-1">Your data status</p>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="preview-list">
                      {[
                        { title: '50% off your first 2 trips (new users only)', desc: 'Availability may depend on your city or region', time: 'Expires July 3, 2025', color: 'primary' },
                        { title: '10% off every ride (no minimum fare)', desc: 'May require minimum ride activity to unlock ', time: 'No fixed expiry (ongoing offer)', color: 'success' },
                        { title: '₹100 off on intercity rides (no minimum spend)', desc: 'Check in-app if the route qualifies', time: 'Active until June 30, 2025', color: 'info' },
                      ].map((proj, i) => (
                        <div className="preview-item border-bottom" key={i}>

                          <div className="preview-item-content d-sm-flex flex-grow">
                            <div className="flex-grow">
                              <h6 className="preview-subject">{proj.title}</h6>
                              <p className="text-muted mb-0">{proj.desc}</p>
                            </div>
                            <div className="mr-auto text-sm-right pt-2 pt-sm-0">
                              <p className="text-muted">{proj.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Revenue, Sales, Purchase Row */}
        <div className="row">
          {[
            { title: 'Revenue', amount: '$32123', change: '+3.5%', info: '11.38% Since last month', icon: 'codepen', color: 'primary' },
            // { title: 'Sales', amount: '$45850', change: '+8.3%', info: '9.61% Since last month', icon: 'wallet-travel', color: 'danger' },
            // { title: 'Purchase', amount: '$2039', change: '-2.1%', info: '2.27% Since last month', icon: 'monitor', color: 'success' },
          ].map((stat, index) => (
            <div className="col-sm-3 grid-margin" key={index}>
              <div className="card">
                <div className="card-body">
                  <h5>{stat.title}</h5>
                  <div className="row">
                    <div className="col-8 col-sm-12 col-xl-8 my-auto">
                      <div className="d-flex d-sm-block d-md-flex align-items-center">
                        <h2 className="mb-0">{stat.amount}</h2>
                        <p className={`text-${stat.change.startsWith('-') ? 'danger' : 'success'} ms-2 mb-0 font-weight-medium`}>
                          {stat.change}
                        </p>
                      </div>
                      <h6 className="text-muted font-weight-normal">{stat.info}</h6>
                    </div>
                    <div className="col-4 col-sm-12 col-xl-4 text-center text-xl-right">
                      <i className={`icon-lg mdi mdi-${stat.icon} text-${stat.color} ml-auto`}></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>


      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Main;
