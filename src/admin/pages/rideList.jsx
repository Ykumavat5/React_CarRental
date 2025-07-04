import React from "react";
import AdminNavbar from "../components/Navbar";
import AdminSidebar from "../components/Sidebar";
import RideListing from "../components/ride/RideListing";
import AdminHead from "../../layout/AdminHead";

function RideList() {

    return (
        <>
        <AdminHead />
            <div className="container-scroller" style={{marginBottom:"-7rem"}}>
                
                <AdminSidebar />

                <div className="container-fluid page-body-wrapper" >
                    <AdminNavbar />
                    <RideListing />
                </div>
            </div>
        </>
    );
}

export default RideList;