import React from "react";
import { useEffect,useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate,useLocation } from "react-router-dom";
import Navlink from "./components/Navlink";
import { getAuth } from "firebase/auth";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";
import { AnimatePresence } from "framer-motion";

const App = () => {
  const auth = getAuth();
  const [toggle,setToggle] = useState(0)
  const [user,setUser] = useState(null)


  useEffect(()=>{
    setUser(auth.currentUser)
  },[toggle,auth.currentUser])
  return (
    <>
    <div className="h-screen overflow-hidden">
      
      <BrowserRouter>
      <Navlink/>
        <LocationProvider>
          <RoutesWithAnimation setToggle = {setToggle}/>
        </LocationProvider>
      </BrowserRouter>
      </div>
    </>
  );
};

const LocationProvider = ({children})=>{
  return <AnimatePresence>{children}</AnimatePresence>
}

const RoutesWithAnimation = (props)=>{
  const {setToggle} = props
  const location = useLocation()
   return <Routes location={location} key={location.key}>
   <Route path="/" element={<Dashboard/>}/>
   <Route path="/users" element={<Users/>}/>
    <Route path="/login" element={<Login setToggle = {setToggle}/>}/>
     <Route path="*" element={<Navigate to="/" />}/>
   </Routes>
}

export default App;
