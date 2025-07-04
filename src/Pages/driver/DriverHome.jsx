import React from "react";
import DriverDashboard from "./DriverDashboard";
import Navbar from "../../driver/Navbar";
import "../../src/dist/styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

function DriverHome() {
    return (
        <>
            <Navbar />
            <DriverDashboard />
        </>
    );
}

export default DriverHome;