import React from "react";
import { useState } from "react";
import "../App.css"
import { Popover } from "@mui/material";
import { getAuth,createUserWithEmailAndPassword,updateProfile } from "firebase/auth";
import { addDoc,collection,getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { validateEmail,validatePassword } from "../validator";

import {
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
    projectId,
  } from "../firebaseconfig.js";
  
  const firebaseConfig = {
    apiKey: apiKey,
    authDomain: authDomain,
    databaseURL: databaseURL,
    projectId: projectId,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId,
    appId: appId,
    measurementId: measurementId,
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const auth = getAuth()
const TopBar = ()=>{
    const [errMsg,setErrMsg] = useState("")
    const [anchorEl,setAnchorEl] = useState(null)
    const [email,setEmail] = useState("")
    const [username,setUsername] = useState("")
    const [password,setPassword] = useState("")

    const addUser = async () => {
        try {
          await addDoc(collection(db, "Users"), {
            Name: username.toLowerCase(),
            email:email.toLowerCase()
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };

    const handleUsername = (e)=>{
        setUsername(e.target.value)
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(!validateEmail(email))
            {
                setErrMsg("Invalid email")
                return
            }
            if(!validatePassword(email))
            {
                setErrMsg("Password must have min charectars 7 and must have digit,uppercase,lowercase and symbol")
                return
            }
            if(username.length < 3)
            {
                setErrMsg("Username must be atleast 3 chars")
                return
            }

        try{
             await createUserWithEmailAndPassword(auth,email,password)
             await updateProfile(auth.currentUser, {
                displayName: username.toLowerCase(),
              });
             await addUser()
        }
        catch(err){
            console.log(err)
            if(err.code){
                setErrMsg(err.code)
            }
        }
        finally{
            setEmail("")
            setPassword("")
            setUsername("")
        }
    }
      
    return<div className="flex flex-row items-center justify-center mt-5 ">
            <input type="text" placeholder="Search" className="w-2/3 h-9 rounded-sm p-3 bg-teal-50"></input>
            <button className="ml-4 bg-teal-600 hover:bg-teal-700 p-2 rounded-sm text-teal-50" onClick={handleClick}>Add user</button>
            <Popover 
            open={anchorEl}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{vertical:'bottom',horizontal:'left'}}
            sx={{ 
                ".MuiPopover-paper": {
                  padding: '20px',
                  backgroundColor: '#00695C',
                  boxShadow: '0px 3px 6px rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  border:"#042F2E",
                  borderStyle:"solid"
                }
              }}
            ><form onSubmit={handleSubmit}>
                <div className="m-4">
                    <h3>Email: </h3>
                    <input onChange={handleEmail} value = {email} className="bg-teal-50 p-1"></input>
                </div>
                <div className="m-4">
                    <h3>Username: </h3>
                    <input onChange={handleUsername} value = {username} className="bg-teal-50 p-1"></input>
                </div>
                <div className="m-4">
                    <h3>Password: </h3>
                    <input onChange={handlePassword} value = {password} className="bg-teal-50 p-1"></input>
                </div>
                <p>{errMsg}</p>
                <button className="ml-20 bg-teal-50 text-teal-950 p-1 rounded-md border-teal-950 border hover:bg-teal-950 hover:text-teal-50" >Submit</button>
                </form></Popover>
    </div>
}

export default TopBar