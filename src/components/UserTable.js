import React from "react";
import "../App.css"

const UserTable = ()=>{
    const users = [{username:"art",email:"art@gmail.com",phone:"1234567890",id:1},
        {username:"abe",email:"abe@gmail.com",phone:"1234517890",id:2},
        {username:"v15",email:"v15@gmail.com",phone:"1234547890",id:3},
        {username:"panda",email:"panda@gmail.com",phone:"1734567890",id:4},
        {username:"gurk",email:"gurk@gmail.com",phone:"1232567890",id:5}
    ]
    return<div className="bg-teal-50 mx-12 rounded-md w-9/12 align mx-auto bg-teal-950 border-solid border-teal-50 border-2 mt-5 flex flex-col divide-y">
        {users.map((x)=>{
            return <div className="flex items-center justify-start  justify-between px-4 text-teal-50 py-2" id={x.id}>
                <p className="w-3/12">{x.username}</p>
                <p className="w-4/12">{x.email}</p>
                <p className="w-2/12">{x.phone}</p>
                <button className="w-1/12 bg-teal-700 rounded-sm hover:bg-teal-800">edit</button>
                <button className="w-1/12 bg-red-700 rounded-sm hover:bg-red-800">delete</button>
            </div>
        })}
    </div>
}

export default UserTable