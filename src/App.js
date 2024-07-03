import React from "react";
import { useEffect,useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navlink from "./components/Navlink";
import { getAuth } from "firebase/auth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";

const App = () => {
  const auth = getAuth();
  const [toggle,setToggle] = useState(0)
  const [user,setUser] = useState(null)


  useEffect(()=>{
    setUser(auth.currentUser)
  },[toggle,auth.currentUser])
  return (
    <>
    <div className="h-screen">
      
      <BrowserRouter>
      <Navlink/>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/users" element={<Users/>}/>
            <Route path="/login" element={<Login setToggle = {setToggle}/>}/>
            <Route path="*" element={<Navigate to="/" />}/>
          </Routes>
      </BrowserRouter>
      </div>
    </>
  );
};

export default App;
