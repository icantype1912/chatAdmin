import React from "react";
import DataSquares from "../components/DataSquares";
import DataGraphs from "../components/DataGraphs";
import {motion} from "framer-motion"


const Dashboard = ()=>{
    const routeVariants = {
        initial: {
            x: '100vw'
        },
        final: {
            x: '0vw'
        }
    }
    return<motion.div 
    variants={routeVariants}
    initial="initial"
    animate="final"
    className="flex-col justify-around h-fit">
        <DataSquares/>
        <DataGraphs/>
    </motion.div>
}

export default Dashboard