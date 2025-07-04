import React from "react";
import AdminNavbar from "../components/Navbar";
import AdminSidebar from "../components/Sidebar";
import Main from "../components/Main";
import AdminHead from "../../layout/AdminHead";

function dashboard() {

    return (
        <>
        <AdminHead />
            <div className="container-scroller" >
            {/* style={{marginBottom:"-7rem"}} */}
                
                <AdminSidebar />

                <div className="container-fluid page-body-wrapper">
                    <AdminNavbar />
                    <Main />
                </div>
            </div>
        </>
    );
}

export default dashboard;