import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  collection,
  query,
  where,
  getFirestore,
  getCountFromServer,
} from "firebase/firestore";
import { AreaChart, Area } from "recharts";
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
export const MessagesAreaGraph = () => {
  const [msgData, setMsgData] = useState([]);

  const loadData = async () => {
    const time = new Date();
    const coll = collection(db, "Chat");
    const now = time.getTime();
    const oneDay = 24 * 60 * 60 * 1000;
    const q = [];
    let msgscnt = [];
    const getCount = async (q) => {
      const snap = await getCountFromServer(q);
      return snap.data().count;
    };
    const tempRes = new Array(5).fill(0).map(async (_, i) => {
      q[i] = query(
        coll,
        where("time", ">=", now - (i + 1) * oneDay),
        where("time", "<", now - i * oneDay)
      );
      return { Name: 1, Count: await getCount(q[i]) }
    });
    msgscnt = await Promise.all(tempRes);
    console.log("App", msgscnt);
    setMsgData(msgscnt.reverse());
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
    
      <AreaChart
        width={150}
        height={80}
        data={msgData}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#009688" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#009688" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="Count"
          stroke="#009688"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};
