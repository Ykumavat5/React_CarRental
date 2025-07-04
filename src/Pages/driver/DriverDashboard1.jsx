import React, { useEffect, useState } from "react";
// import { io } from "socket.io-client";
import "./DriverDashboard.css";
import Head from "../../layout/WebsiteHead";

// const socket = io("http://localhost:3034", {
//   auth: {
//     token: localStorage.getItem("token_carRental"),
//   },
// });

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

  // Connect socket
  useEffect(() => {
    console.log("Driver dashboard");
    console.log("Set connect changes to true",setConnected);
    
    // socket.on("connect", () => {
    //   setConnected(true);
    // });

    // socket.on("ride_accepted", (data) => {
    //   console.log("Ride accepted by someone:", data);
    // });

    // return () => socket.disconnect();
  }, []);

  // Fetch new rides after location is available
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

  // Accept ride
  const handleAcceptRide = (ride) => {
    console.log("In driver dashboard handle accept ride");
    
    // const driverId = "driver_123";// Replace with actual ID
    // socket.emit("join_ride_room", {
    //   booking_id: ride.request_id,
    //   driver_id: driverId,
    // });

    // socket.emit("accept_ride", {
    //   booking_id: ride.request_id,
    //   driver_id: driverId,
    // });

    console.log("Accepted ride:", ride.request_id);
  };

  const handleRejectRide = (ride) => {
    console.log("handle reject ride");
    
    // const driverId = "driver_123";
    // socket.emit("join_ride_room", {
    //   booking_id: ride.request_id,
    //   driver_id: driverId,
    // });

    // socket.emit("reject_ride", {
    //   booking_id: ride.request_id,
    //   driver_id: driverId,
    // });

    console.log("rejected ride:", ride.request_id);
  };


  return (
    <>
      <Head />
      {/* <Navbar /> */}
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
              <li key={ride.request_id}>
                <div className="ride-info">
                  <strong>Pickup:</strong> {ride.pickup_address}<br />
                  <strong>Drop-off:</strong> {ride.dropoff_address}<br />
                  <strong>
                    {ride.is_scheduled === 1 && ride.pickup_time && (
                      <p><strong>Pickup Time:</strong> {new Date(ride.pickup_time).toLocaleString()}</p>
                    )}
                  </strong>
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
