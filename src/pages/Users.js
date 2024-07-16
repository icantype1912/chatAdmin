import React,{useState} from "react";
import "../App.css"
import TopBar from "../components/TopBar";
import UserTable from "../components/UserTable";
import {motion} from "framer-motion"

const Users = ()=>{
    const routeVariants = {
        initial: {
            x: '100vw'
        },
        final: {
            x: '0vw'
        }
    }
    const [search,setSearch] = useState("")
    return<motion.div className="users"
    variants={routeVariants}
    initial="initial"
    animate="final"
    >
        <TopBar search = {search} setSearch = {setSearch}/>
        <UserTable search = {search} />
    </motion.div>
}

export default Users