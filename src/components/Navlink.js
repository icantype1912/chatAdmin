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
    return<div className="navlink">
        <div className="flex gap-10 justify-between pl-4 pr-8 bg-transparent h-16 text-teal-950">
            <h1 className="mt-2 text-4xl">ChatAdmin</h1>
            <div className="flex gap-10">
                <button onClick={handleDash}>DashBoard</button>
                <button onClick={handleUsers}>Users</button>
            </div>
        </div>
    </div>
}

export default Navlink