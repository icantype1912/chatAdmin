import React from "react";
import "../App.css"
import { DataGrid } from "@mui/x-data-grid";

const UserTable = ()=>{
    const columns = [
        { field: 'username', headerName: 'Username', width: 330 },
        { field: 'email', headerName: 'Email', width: 330 },
        { field: 'phone', headerName: 'Phone Number', width: 230 },
      ];

    const users = [{username:"art",email:"art@gmail.com",phone:"1234567890",id:1},
        {username:"abe",email:"abe@gmail.com",phone:"1234517890",id:2},
        {username:"v15",email:"v15@gmail.com",phone:"1234547890",id:3},
        {username:"panda",email:"panda@gmail.com",phone:"1734567890",id:4},
        {username:"gurk",email:"gurk@gmail.com",phone:"1232567890",id:5}
    ]
    return<div className="bg-teal-50 mx-12 rounded-md w-9/12 align mx-auto border-solid border-teal-50 border-2 mt-5 mb-10 flex flex-col divide-y ">
        <DataGrid
            rows={users}
            columns={columns}
        />
    </div>
}

export default UserTable