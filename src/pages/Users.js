import React from "react";
import "../App.css"
import TopBar from "../components/TopBar";
import UserTable from "../components/UserTable";

const Users = ()=>{
    return<div className="users">
        <h1 className="text-center mt-5 text-2xl text-teal-50" >User Table</h1>
        <TopBar/>
        <UserTable/>
    </div>
}

export default Users