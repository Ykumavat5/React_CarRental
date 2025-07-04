import React from "react";
import AdminNavbar from "../components/Navbar";
import AdminSidebar from "../components/Sidebar";
import DriverListing from "../components/driver/DriverListing";
import AdminHead from "../../layout/AdminHead";

function DriverList() {

    return (
        <>
        <AdminHead />
            <div className="container-scroller" style={{marginBottom:"-7rem"}}>
                
                <AdminSidebar />

                <div className="container-fluid page-body-wrapper">
                    <AdminNavbar />
                    <DriverListing />
                </div>
            </div>
        </>
    );
}

export default DriverList;