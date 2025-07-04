import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import "./MyRides.css";

function MyRides() {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3034/api/v1/user/myRides", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api_key": "123456789",
        "token": localStorage.getItem("token_carRental") || "",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch rides");
        }
        return res.json();
      })
      .then((data) => {
        const allRides = data.data?.response || [];
        setRides(allRides);
        setFilteredRides(allRides);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (statusFilter === "all") {
      setFilteredRides(rides);
    } else {
      setFilteredRides(rides.filter((ride) => ride.status === statusFilter));
    }
  }, [statusFilter, rides]);

  const handleFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  return (
    <>
      <section className="my-rides-page">
        <HeroPages name="My Rides" />
        <div className="container">
          {loading && <p>Loading rides...</p>}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {!loading && !error && filteredRides.length === 0 && <p>No rides found.</p>}

          <div className="rides-list">
            <div className="filter">
              <label htmlFor="statusFilter">Filter by status:&nbsp;</label>
              <select id="statusFilter" value={statusFilter} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="in_progress">In Progress</option>
                <option value="accepted">Accepted</option>
              </select>
            </div>

            {filteredRides.map((ride) => (
              <div
                key={ride.id}
                className="ride-card"
                onClick={() => navigate(`/ride/${ride.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="ride-card__info">
                  <p>Date: {ride.start_time ? new Date(ride.start_time).toLocaleString() : "No date available"}</p>
                  <p>
                    Pickup: {ride.pickup_address?.trim() || "No data available"} &nbsp;&nbsp;
                    Drop: {ride.dropoff_address?.trim() || "No data available"}
                  </p>
                  <p>
                    Type: {ride.ride_type} &nbsp;&nbsp; Fare: {ride.fare} /-
                  </p>
                  <p>Status: {ride.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default MyRides;
