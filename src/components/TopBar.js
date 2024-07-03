import React from "react";
import "../App.css"

const TopBar = ()=>{
    return<div className="flex flex-row items-center justify-center mt-5 ">
        <input type="text" placeholder="Search" className="w-2/3 h-9 rounded-sm p-3"></input>
        <button className="ml-4 bg-teal-600 hover:bg-teal-700 p-2 rounded-sm text-teal-50">Add user</button>
    </div>
}

export default TopBar