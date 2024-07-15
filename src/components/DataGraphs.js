import React from "react";
import { useEffect,useState } from "react";
import "../App.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { PieChart, Pie, ResponsiveContainer } from 'recharts';
import { getFirestore, query, where, collection,onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";

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




const DataGraphs = () => {

    
    const [userMsgCount,setUserMsgCount] = useState({})
    const [receiverMsgCount,setReceiverMsgCount] = useState({})
    const [userList,setUserList] = useState([]) 
    useEffect(()=>{
            const time = new Date()
        const coll = collection(db, "Chat");
            const now = time.getTime()
            const oneDayAgo = now - 24 * 60 * 60 * 1000;
            const q = query(coll, where("time", ">=", oneDayAgo));
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

    useEffect(() => {
        let msgCount = [];
        let tally = [];
        userList.forEach(user => {
            if(!(tally.includes(user.user))){
                tally.push(user.user)
                msgCount.push({name:user.user,msgCnt:1})
            }
            else{
                msgCount.forEach(x=>{
                    if(x.name === user.user){
                        x.msgCnt = x.msgCnt + 1
                    }
                })
            }
        });
        setUserMsgCount(msgCount);
        console.log("This is the ",msgCount)
      }, [userList]);


      useEffect(() => {
        let msgCount = [];
        let tally = [];
        userList.forEach(user => {
            if(!(tally.includes(user.receiver))){
                tally.push(user.receiver)
                msgCount.push({name:user.receiver,ActiveReceivers:1})
            }
            else{
                msgCount.forEach(x=>{
                    if(x.name === user.receiver){
                        x.ActiveReceivers = x.ActiveReceivers + 1
                    }
                })
            }
        });
        setReceiverMsgCount(msgCount);
        console.log("This is the ",msgCount)
      }, [userList]);

 

      

    return (
        <div className="flex flex-row justify-around h-80 mt-8">
            <div className="rounded-lg border-2 w-8/12 bg-teal-50 h-5/6 flex justify-start items-start pt-3 ">
            {receiverMsgCount?
                <BarChart width={800} height={255} data={receiverMsgCount} >
                    <Bar type="monotone" dataKey="ActiveReceivers" fill="#004D40" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </BarChart>:<h1 className="ml-72 mt-24 text-3xl text-teal-950">No Activity Today</h1>}
            </div>
        <div className="rounded-lg border-2 w-3/12 bg-teal-50 h-5/6">
        {userMsgCount?
        <ResponsiveContainer width="100%" height="90%">
        <PieChart width={400} height={400}>
          <Pie
            dataKey="msgCnt"
            isAnimationActive={false}
            data={userMsgCount}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#004D40"
            label
          />
          <Tooltip />
        </PieChart>
      <h1 className="ml-20 text-teal-950">Active users for the day</h1>
      </ResponsiveContainer>:<h1 className="ml-16 mt-28 text-2xl">No Activity Today</h1>}
            </div>
        </div>
    );
};

export default DataGraphs;
