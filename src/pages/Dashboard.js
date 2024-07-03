import React from "react";
import DataSquares from "../components/DataSquares";
import DataGraphs from "../components/DataGraphs";



const Dashboard = ()=>{
    return<div className="flex-col justify-around h-fit">
        <DataSquares/>
        <DataGraphs/>
    </div>
}

export default Dashboard