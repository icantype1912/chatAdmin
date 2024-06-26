import React from "react";
import "../App.css"
import TopBar from "../components/TopBar";
import UserTable from "../components/UserTable";

const Users = ()=>{
    return<div className="users">
        <TopBar/>
        <UserTable/>
    </div>
}

export default Users