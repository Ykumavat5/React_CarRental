import { useState, useEffect } from "react";
import Select from "react-select";
import { io } from "socket.io-client";
import "./BookCar.css";

function BookCar() {
  const [modal, setModal] = useState(false);
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [pickupaddress, setPickAddress] = useState("");
  const [pickuplat, setPickLat] = useState("");
  const [pickuplong, setPickLong] = useState("");
  const [dropaddress, setDropAddress] = useState("");
  const [dropofflat, setDropLat] = useState("");
  const [dropofflong, setDropLong] = useState("");
  const [availableRides, setAvailableRides] = useState([]);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);
  const [noDriversFound, setNoDriversFound] = useState(false);
  const [cityOptions, setCityOptions] = useState([]);
  const [socket, setSocket] = useState(null);

  // --- SOCKET.IO Setup ---
  useEffect(() => {
    const newSocket = io("http://localhost:3034", {
      auth: {
        token: localStorage.getItem("token_carRental") || "",
      },
    });
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // --- Handle booking events from server ---
  useEffect(() => {
    if (!socket) return;

    socket.on("ride_accepted", ({ booking_id }) => {
      window.location.href = `/ride/${booking_id}`;
    });

    socket.on("booking_timeout", () => {
      setBookingInProgress(false);
      setNoDriversFound(true);
    });

    return () => {
      socket.off("ride_accepted");
      socket.off("booking_timeout");
    };
  }, [socket]);

  // --- Ride Selection ---
  const handleRideSelect = async (rideId) => {
    setBookingInProgress(true);
    setProgressPercent(0);
    setNoDriversFound(false);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setProgressPercent(progress);
      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 1200); // ~2 min

    try {
      const response = await fetch("http://localhost:3034/api/v1/user/requestRide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: "123456789",
          token: localStorage.getItem("token_carRental") || "",
        },
        body: JSON.stringify({
          pickup_address: pickupaddress,
          dropoff_address: dropaddress,
          pickup_time: pickTime,
          pickup_lat: pickuplat,
          pickup_lng: pickuplong,
          dropoff_lat: dropofflat,
          dropoff_lng: dropofflong,
          ride_type_id: rideId,
          is_scheduled: "1",
        }),
      });

      const data = await response.json();

      if (response.status === 201 && data.ride_id) {
        socket.emit("request_ride", { booking_id: data.ride_id });
        setModal(false);
        setBookingSuccess(true);
      } else {
        clearInterval(interval);
        setBookingInProgress(false);
        setNoDriversFound(true);
      }
    } catch (error) {
      clearInterval(interval);
      setBookingInProgress(false);
      setNoDriversFound(true);
      console.error("Booking failed:", error);
    }
  };

  // --- Input handlers ---
  const handlePickTime = (e) => setPickTime(e.target.value);
  const handleDropTime = (e) => setDropTime(e.target.value);
  const handlePickLat = (e) => setPickLat(e.target.value);
  const handlePickLong = (e) => setPickLong(e.target.value);
  const handleDropLat = (e) => setDropLat(e.target.value);
  const handleDropLong = (e) => setDropLong(e.target.value);
  const handlePickAddress = (e) => setPickAddress(e.target.value);
  const handleDropAddress = (e) => setDropAddress(e.target.value);

  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    if (doneMsg) doneMsg.style.display = "none";
  };

  // --- Fetch cities ---
  useEffect(() => {
    fetch("http://localhost:3034/api/v1/user/cities", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        api_key: "123456789",
        token: localStorage.getItem("token_carRental") || "",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const options = (data.data?.results || []).map((city) => ({
          value: city.city,
          label: city.city,
        }));
        setCityOptions(options);
      })
      .catch((err) => console.error("Error fetching cities:", err));
  }, []);

  // --- Handle search ---
  const handleSearch = async (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");

    if (!pickUp || !dropOff || !pickTime || !dropTime || !pickuplat || !pickuplong || !dropofflat || !dropofflong) {
      errorMsg.style.display = "flex";
      return;
    }

    try {
      const response = await fetch("http://localhost:3034/api/v1/user/searchRide", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          api_key: "123456789",
          token: localStorage.getItem("token_carRental") || "",
        },
        body: JSON.stringify({
          pickup_lat: parseFloat(pickuplat),
          pickup_lng: parseFloat(pickuplong),
          dropoff_lat: parseFloat(dropofflat),
          dropoff_lng: parseFloat(dropofflong),
        }),
      });

      const data = await response.json();
      setAvailableRides(data.data || []);
      setModal(true);
    } catch (error) {
      console.error("API error:", error);
    }
  };

  // --- Block scroll when modal is open ---
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "auto";
  }, [modal]);

  return (
    <section id="booking-section" className="book-section">
      <div className="container">
        <div className="book-content">
          <div className="book-content__box">
            {bookingSuccess && (
              <p className="booking-done">
                Booking successful! Check your email.
                <i onClick={() => setBookingSuccess(false)} className="fa-solid fa-xmark"></i>
              </p>
            )}
            <p className="error-message">
              All fields required! <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
            </p>

            <h2>Book a car</h2>
            <form className="box-form">
              <div className="box-form__car-time">
                <label htmlFor="picktime">
                  <i className="fa-regular fa-calendar-days"></i> &nbsp;
                  Pick-up <b>*</b>
                </label>
                <input
                  id="picktime"
                  value={pickTime}
                  onChange={handlePickTime}
                  type="datetime-local"
                />
              </div>

              <div className="box-form__car-time">
                <label htmlFor="droptime">
                  <i className="fa-regular fa-calendar-days"></i> &nbsp;
                  Drop-off <b>*</b>
                </label>
                <input
                  id="droptime"
                  value={dropTime}
                  onChange={handleDropTime}
                  type="datetime-local"
                ></input>
              </div>

              <br></br>
              <div className="box-form__car-time">
                <label htmlFor="pickupaddress">
                  <i className="fa-regular fa-calendar-days "></i> &nbsp;
                  Pickup address <b>*</b>
                </label>
                <textarea
                  id="pickupaddress"
                  placeholder="Pickup address" value={pickupaddress} onChange={handlePickAddress}
                  type="text" style={{ padding: "10px", borderRadius: "5px" }}
                ></textarea>
              </div>

              <div className="box-form__car-type">

                <label>Pick-up city <b>*</b></label>
                <Select
                  options={cityOptions}
                  value={cityOptions.find((opt) => opt.value === pickUp)}
                  onChange={(selected) => setPickUp(selected.value)}
                  placeholder="Select pick-up city..."
                />
              </div>

              <br></br>

              <div className="box-form__car-time">
                <label htmlFor="pickuplat">
                  <i className="fa-regular fa-calendar-days "></i> &nbsp;
                  Pickup latitude <b>*</b>
                </label>
                <input
                  id="pickuplat"
                  placeholder="Pickup latitude" value={pickuplat} onChange={handlePickLat}
                  type="text" style={{ padding: "10px", borderRadius: "5px" }}
                ></input>
              </div>
              <div className="box-form__car-time">
                <label htmlFor="pickuplong">
                  <i className="fa-regular fa-calendar-days "></i> &nbsp;
                  Pickup longitude <b>*</b>
                </label>
                <input
                  id="pickuplong"
                  placeholder="Pickup longitude" value={pickuplong} onChange={handlePickLong}
                  type="text" style={{ padding: "10px", borderRadius: "5px" }}
                ></input>
              </div>

              <br></br>

              <div className="box-form__car-time">
                <label htmlFor="dropaddress">
                  <i className="fa-regular fa-calendar-days "></i> &nbsp;
                  Drop off address <b>*</b>
                </label>
                <textarea
                  id="dropaddress"
                  placeholder="drop off address" value={dropaddress} onChange={handleDropAddress}
                  type="textarea" style={{ padding: "10px", borderRadius: "5px" }}
                ></textarea>
              </div>

              <div className="box-form__car-type">
                <label>Drop-off city <b>*</b></label>
                <Select
                  options={cityOptions}
                  value={cityOptions.find((opt) => opt.value === dropOff)}
                  onChange={(selected) => setDropOff(selected.value)}
                  placeholder="Select drop-off city..."
                />
              </div>

              <br></br>

              <div className="box-form__car-time">
                <label htmlFor="dropofflat">
                  <i className="fa-regular fa-calendar-days "></i> &nbsp;
                  Dropoff latitude <b>*</b>
                </label>
                <input
                  id="dropofflat"
                  placeholder="Drop off latitude" value={dropofflat} onChange={handleDropLat}
                  type="text" style={{ padding: "10px", borderRadius: "5px" }}
                ></input>
              </div>

              <div className="box-form__car-time">
                <label htmlFor="dropofflong">
                  <i className="fa-regular fa-calendar-days "></i> &nbsp;
                  Drop off longitude <b>*</b>
                </label>
                <input
                  id="dropofflong"
                  placeholder="Drop off longitude" value={dropofflong} onChange={handleDropLong}
                  type="text" style={{ padding: "10px", borderRadius: "5px" }}
                ></input>
              </div>

              <br></br>

              <button onClick={handleSearch} type="button">Search</button>

            </form>

            {modal && (
              <div className="ride-modal-overlay">
                <div className="ride-modal-content">
                  <button className="ride-modal-close" onClick={() => setModal(false)}>×</button>
                  <h2 className="ride-modal-title">Available Rides</h2>

                  {availableRides.length > 0 && availableRides[0]?.estimated_distance_km && (
                    <h4>Estimated Distance: {availableRides[0].estimated_distance_km} km</h4>
                  )}

                  {availableRides.length > 0 ? (
                    <div className="ride-list">
                      {availableRides.map((ride) => (
                        <div className="ride-card" key={ride.ride_type_id}>
                          <div className="ride-info">
                            <h3>{ride.name}</h3>
                            <h4>Estimated Price: ${ride.estimated_price}</h4>
                          </div>
                          <button
                            className="ride-book-btn"
                            onClick={(e) => {
                              e.preventDefault();
                              handleRideSelect(ride.ride_type_id);
                            }}
                          >
                            Book Ride
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No rides found.</p>
                  )}

                  {bookingInProgress && (
                    <div className="booking-progress">
                      <p>Searching for drivers...</p>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {noDriversFound && (
                    <div className="no-drivers">
                      <p>No drivers found. Please try again later or modify your request.</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookCar;
