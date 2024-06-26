import React from "react";
import "../App.css"
import Button from '@mui/material/Button'

const UserTable = ()=>{
    const users = [{username:"art",email:"art@gmail.com",phone:"1234567890",id:1},
        {username:"abe",email:"abe@gmail.com",phone:"1234517890",id:2},
        {username:"v15",email:"v15@gmail.com",phone:"1234547890",id:3},
        {username:"panda",email:"panda@gmail.com",phone:"1734567890",id:4},
        {username:"gurk",email:"gurk@gmail.com",phone:"1232567890",id:5}
    ]
    return<div className="userTable">
        {users.map((x)=>{
            return <div className="table-row" id={x.id}>
                <p>{x.username}</p>
                <p>{x.email}</p>
                <p>{x.phone}</p>
                <Button variant="contained">edit</Button>
                <Button variant="contained">delete</Button>
            </div>
        })}
    </div>
}

export default UserTable