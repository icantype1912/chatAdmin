import React from "react";
import { useEffect,useState } from "react";
import "../App.css"
import { DataGrid } from "@mui/x-data-grid";
import {  getFirestore, query, collection, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyCWPADseIx3PRGx3j4Tgh6TS9JOuwt2GE4",
    authDomain: "chatapp-c4efb.firebaseapp.com",
    databaseURL: "https://chatapp-c4efb-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chatapp-c4efb",
    storageBucket: "chatapp-c4efb.appspot.com",
    messagingSenderId: "636388695939",
    appId: "1:636388695939:web:de30f9ca7481f56d8560b6",
    measurementId: "G-8TQXCRZKGK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const UserTable = ()=>{
    const [userList,setUserList] = useState([])
    const columns = [
        { field: 'Name', headerName: 'Username', width: 330 },
        { field: 'email', headerName: 'Email', width: 330 },
        {field: "id", headerName: 'id',width:230}
      ];


    useEffect(()=>{
        const q = query(collection(db,"Users"))
        const unsub = onSnapshot(q,(snapshot)=>{
            let tasks = [];
            snapshot.docs.forEach((doc)=>{
                tasks.push({...doc.data(),id:doc.id});
            })
            setUserList(tasks)
            console.log(tasks)
        })
        return ()=> unsub();
    },[])
    return<div className="bg-teal-50 mx-12 rounded-md w-9/12 align mx-auto border-solid border-teal-50 border-2 mt-5 mb-10 flex flex-col divide-y h-96">
        <DataGrid
            rows={userList}
            columns={columns}
        />
    </div>
}

export default UserTable