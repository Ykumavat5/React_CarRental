import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./DriverDashboard.css";
import Head from "../../layout/WebsiteHead";

const socket = io("http://localhost:3034", {
  auth: {
    token: localStorage.getItem("token_driver"),
  },
});

function DriverDashboard() {
  const [rides, setRides] = useState([]);
  const [connected, setConnected] = useState(false);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  // Get driver's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Connect socket and listen for real-time ride requests
  useEffect(() => {
    socket.on("connect", () => {
      setConnected(true);
      const driverId = "driver_123"; // Replace with real driver ID from auth if needed
      socket.emit("register_driver", { driver_id: driverId });
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });

    socket.on("new_ride_request", (ride) => {
      setRides((prevRides) => {
        const alreadyExists = prevRides.some(r => r.request_id === ride.request_id);
        if (alreadyExists) return prevRides;

        const highlightedRide = { ...ride, is_new: true };
        return [highlightedRide, ...prevRides];
      });

      // Remove highlight after 10 seconds
      setTimeout(() => {
        setRides((prevRides) =>
          prevRides.map(r =>
            r.request_id === ride.request_id ? { ...r, is_new: false } : r
          )
        );
      }, 10000);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch initial ride list based on location
  useEffect(() => {
    if (!location.latitude || !location.longitude) return;

    const fetchRides = async () => {
      try {
        const response = await fetch("http://localhost:3034/api/v1/driver/viewNewRides", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            api_key: "123456789",
            token: localStorage.getItem("token_driver"),
          },
          body: JSON.stringify({
            latitude: location.latitude,
            longitude: location.longitude,
          }),
        });

        const result = await response.json();
        const ridesArray = result?.data?.results || [];
        setRides(ridesArray);
      } catch (error) {
        console.error("Failed to fetch rides:", error);
        setRides([]);
      }
    };

    fetchRides();
  }, [location]);

  const handleAcceptRide = (ride) => {
    const driverId = "driver_123"; // Replace with real driver ID
    socket.emit("accept_ride", {
      booking_id: ride.request_id,
      driver_id: driverId,
    });
    console.log("Accepted ride:", ride.request_id);

    // Optionally remove from list
    setRides((prevRides) =>
      prevRides.filter(r => r.request_id !== ride.request_id)
    );
  };

  const handleRejectRide = (ride) => {
    const driverId = "driver_123"; // Replace with real driver ID
    socket.emit("reject_ride", {
      booking_id: ride.request_id,
      driver_id: driverId,
    });
    console.log("Rejected ride:", ride.request_id);

    // Optionally remove from list
    setRides((prevRides) =>
      prevRides.filter(r => r.request_id !== ride.request_id)
    );
  };

  return (
    <>
      <Head />
      <section className="driver-dashboard">
        <h2>Driver Dashboard</h2>
        <div className="status-line">
          <p>Status: {connected ? "🟢 Connected" : "🔴 Connecting..."}</p>
          {location.latitude && location.longitude ? (
            <p>
              📍 Location: {location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}
            </p>
          ) : (
            <p>📍 Detecting location...</p>
          )}
        </div>

        {!Array.isArray(rides) && <p>Unexpected ride data format received.</p>}

        {Array.isArray(rides) && rides.length === 0 ? (
          <p>No available rides right now.</p>
        ) : (
          <ul className="ride-list">
            <p>Available ride requests</p>
            {rides.map((ride) => (
              <li
                key={ride.request_id}
                className={ride.is_new ? "ride-item new-ride" : "ride-item"}
              >
                <div className="ride-info">
                  <strong>Pickup:</strong> {ride.pickup_address}<br />
                  <strong>Drop-off:</strong> {ride.dropoff_address}<br />
                  {ride.is_scheduled === 1 && ride.pickup_time && (
                    <p><strong>Pickup Time:</strong> {new Date(ride.pickup_time).toLocaleString()}</p>
                  )}
                </div>
                <button className="accept-btn" onClick={() => handleAcceptRide(ride)}>
                  Accept Ride
                </button>
                <button className="reject-btn" onClick={() => handleRejectRide(ride)}>
                  Reject Ride
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default DriverDashboard;
