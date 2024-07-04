import React from "react";
import "../App.css"

const DataSquares = ()=>{
    return(
    <div className="flex flex-row gap-10 justify-around h-15 mt-5 ">
        <div className="rounded-xl text-teal-950 text-lg flex flex-col h-36 w-1/5 p-4 justify-around content-centre bg-teal-50">
            <h4>Total Users</h4>
            <h2 className="text-4xl">100</h2>
        </div>
        <div className="rounded-xl text-teal-950 text-lg flex flex-col h-36 w-1/5 p-4 justify-around content-centre bg-teal-50">
            <h4>Current Users</h4>
            <h2 className="text-4xl">50</h2>
        </div>
        <div className="rounded-xl text-teal-950 text-lg flex flex-col h-36 w-1/5 p-4 justify-around content-centre bg-teal-50">
            <h4>Total Chats</h4>
            <h2 className="text-4xl">150</h2>
        </div>
        <div className="rounded-xl text-teal-950 text-lg flex flex-col h-36 w-1/5 p-4 justify-around content-centre bg-teal-50">
            <h4>Total Messages</h4>
            <h2 className="text-4xl">1000</h2>
        </div>
    </div>)
}

export default DataSquares;