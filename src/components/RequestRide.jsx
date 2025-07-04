import React, { useEffect } from "react";
import socket from "./socket";

const RequestRide = () => {
  useEffect(() => {
    // Listen for socket events
    socket.on("booking_timeout", (data) => {
      console.log("Booking Timeout:", data);
    });

    socket.on("ride_accepted", (data) => {
      console.log("Ride Accepted:", data);
    });

    socket.on("ride_cancelled", (data) => {
      console.log("Ride Cancelled:", data);
    });

    socket.on("ride_retried", (data) => {
      console.log("Ride Retried:", data);
    });

    // Cleanup
    return () => {
      socket.off("booking_timeout");
      socket.off("ride_accepted");
      socket.off("ride_cancelled");
      socket.off("ride_retried");
    };
  }, []);

  const requestRide = () => {
    const booking_id = `ride_${Date.now()}`;
    socket.emit("request_ride", { booking_id });
  };

  return (
    <div>
      <button onClick={requestRide}>Request Ride</button>
    </div>
  );
};

export default RequestRide;
