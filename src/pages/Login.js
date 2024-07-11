import React from "react";
import { useState } from "react";
import {initializeApp} from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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

initializeApp(firebaseConfig)
const auth = getAuth()

const Login = (props)=>{
    const {setToggle} = props
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [err,setErr] = useState("")
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    const handleEmail = (e)=>{
        setEmail(e.target.value)
    }
    const handlePassword = (e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        handleLogin()
    }
    const handleLogin = ()=>{
        if(!email.match(emailRegex))
            {
                setErr("Invalid Email")
                return
            }
        signInWithEmailAndPassword(auth,email, password)
        .then((userCred)=>{
            setToggle((prev)=>{ return prev+1})
        })
        .catch((err)=>{
            setErr(err.message)
        });

    }
    return <div className="m-auto w-5/12 bg-teal-50 rounded-lg my-20 p-8"
    >
        <h2 className="text-center text-4xl mb-5">Login</h2>
        <form onSubmit = {handleSubmit} className="flex flex-col gap-5 items-center">
            <input value = {email} onChange = {handleEmail} placeholder="Email" className="rounded-md border-solid border-teal-950 border-2 p-3 w-11/12"></input>
            <input onChange = {handlePassword} type = "password" placeholder="Password" className="rounded-md border-solid border-teal-950 border-2 p-3 w-11/12"></input>
            <p className="text-rose-700">{err}</p>
            <button className="bg-teal-600 text-teal-50 w-11/12 h-11 hover:bg-teal-50 hover:border-teal-600 hover:border-2 hover:text-teal-600 rounded-md">Login</button>
        </form>
    </div>
}

export default Login