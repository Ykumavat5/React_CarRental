import React from "react";
import AdminNavbar from "../components/Navbar";
import AdminSidebar from "../components/Sidebar";
import UserListing from "../components/user/UserListing";
import AdminHead from "../../layout/AdminHead";
// import Main from "../components/Main";

function UserList() {

    return (
        <>
            <AdminHead />
            <div className="container-scroller" style={{marginBottom:"-7rem"}}>

                <AdminSidebar />

                <div className="container-fluid page-body-wrapper">
                    <AdminNavbar />
                    <UserListing />
                    {/* <Main /> */}
                </div>
            </div>
        </>
    );
}

export default UserList;