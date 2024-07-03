import React from "react";
import { useNavigate } from "react-router-dom";

const Navlink = ()=>{
    const Navigate = useNavigate()
    const handleUsers = ()=>{
        Navigate("/users")
    }
    const handleDash = ()=>{
        Navigate("/")
    }
    return<div className="flex gap-10 pl-8 pr-4 bg-teal-50 h-12 text-teal-950">
        <button onClick={handleDash}>Dashboard</button>
        <button onClick={handleUsers}>Users</button>
    </div>
}

export default Navlink