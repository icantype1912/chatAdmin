import React, { useEffect, useState } from "react";
import "../App.css";
import { getCountFromServer, getFirestore, query, where, collection,onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { MessagesAreaGraph } from "./MessagesAreaGraph.js";
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

const DataSquares = () => {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalMessages, setTotalMessages] = useState(0);
    const [totalMessagesToday, setTotalMessagesToday] = useState(0);
    const [totalUsersToday,setTotalUsersToday] = useState(0)
    const [userList,setUserList] = useState([])
    

    const getUserCount = async () => {
        try {
            const coll = collection(db, "Users");
            const snapshot = await getCountFromServer(coll);
            setTotalUsers(snapshot.data().count - 1);
        } catch (error) {
            console.error("Error fetching user count:", error);
        }
    };

    const getMessageCount = async () => {
        try {
            const coll = collection(db, "Chat");
            const snapshot = await getCountFromServer(coll);
            setTotalMessages(snapshot.data().count);
        } catch (error) {
            console.error("Error fetching total messages count:", error);
        }
    };

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
        setTotalUsersToday(msgCount.length);
      }, [userList]);
    


    useEffect(() => {
        const getMessageCountToday = async () => {
            try {
                const time = new Date()
                const coll = collection(db, "Chat");
                const now = time.getTime()
                const oneDayAgo = now - 24 * 60 * 60 * 1000;
                const q = query(coll, where("time", ">=", oneDayAgo));
                const snapshot = await getCountFromServer(q);
                setTotalMessagesToday(snapshot.data().count);
            } catch (error) {
                console.error("Error fetching messages count for today:", error);
            }
        };
        getUserCount();
        getMessageCount();
        getMessageCountToday();
    }, []);

    return (
        <div className="flex flex-row gap-10 justify-around h-15 mt-5">
            <div className="rounded-xl text-teal-950 text-lg flex flex-col h-36 w-1/5 p-4 justify-around content-centre bg-teal-50">
                <h4>Total Users</h4>
                <h2 className="text-4xl">{totalUsers}</h2>
            </div>
            <div className="rounded-xl text-teal-950 text-lg flex flex-col h-36 w-1/5 p-4 justify-around content-centre bg-teal-50">
                <h4>Active Users Today</h4>
                <h2 className="text-4xl">{totalUsersToday}</h2>
            </div>
            <div className="rounded-xl text-teal-950 text-lg flex flex-col h-36 w-1/5 p-4 justify-around content-centre bg-teal-50">
                <h4>Total Messages</h4>
                <div className="flex justify-between items-center">
                    <h2 className="text-4xl">{totalMessages}</h2>
                    <MessagesAreaGraph/>
                </div>
            </div>
            <div className="rounded-xl text-teal-950 text-lg flex flex-col h-36 w-1/5 p-4 justify-around content-centre bg-teal-50">
                <h4>Total messages sent today</h4>
                <h2 className="text-4xl">{totalMessagesToday}</h2>
            </div>
        </div>
    );
};

export default DataSquares;
