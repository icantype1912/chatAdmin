import React, { useState } from "react";
import "../App.css";
import { Popover, Box, Typography, TextField, Button } from "@mui/material";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { validateEmail, validatePassword } from "../validator";

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

const auth = getAuth();

const TopBar = (props) => {
  const { search, setSearch } = props;
  const [errMsg, setErrMsg] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const addUser = async () => {
    try {
      await addDoc(collection(db, "Users"), {
        Name: username.toLowerCase(),
        email: email.toLowerCase(),
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

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrMsg("Invalid email");
      return;
    }
    if (!validatePassword(password)) {
      setErrMsg(
        "Password must have min characters 7 and must have digit, uppercase, lowercase, and symbol"
      );
      return;
    }
    if (username.length < 3) {
      setErrMsg("Username must be at least 3 chars");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: username.toLowerCase(),
      });
      await addUser();
    } catch (err) {
      console.log(err);
      if (err.code) {
        setErrMsg(err.code);
      }
    } finally {
      setEmail("");
      setPassword("");
      setUsername("");
    }
  };

  return (
    <div className="flex flex-row items-center justify-center mt-5">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search"
        className="w-2/3 h-9 rounded-sm p-3 bg-teal-50"
      />
      <Button
        variant="contained"
        onClick={handleClick}
        sx={{ ml: 2, backgroundColor: "#008080", "&:hover": { backgroundColor: "#006666" } }}
      >
        Add User
      </Button>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        sx={{
          ".MuiPopover-paper": {
            padding: "20px",
            backgroundColor: "#00695C",
            boxShadow: "0px 3px 6px rgba(0,0,0,0.1)",
            borderRadius: "8px",
            border: "#042F2E",
            borderStyle: "solid",
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h6" color="white" gutterBottom>
            Add New User
          </Typography>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={handleEmail}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#009688",
                },
                "&:hover fieldset": {
                  borderColor: "#00796b",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00574B",
                },
              },
              input: { color: "white" },
              label: { color: "white" },
            }}
          />
          <TextField
            label="Username"
            value={username}
            onChange={handleUsername}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#009688",
                },
                "&:hover fieldset": {
                  borderColor: "#00796b",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00574B",
                },
              },
              input: { color: "white" },
              label: { color: "white" },
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={handlePassword}
            fullWidth
            margin="normal"
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#009688",
                },
                "&:hover fieldset": {
                  borderColor: "#00796b",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#00574B",
                },
              },
              input: { color: "white" },
              label: { color: "white" },
            }}
          />
          {errMsg && (
            <Typography color="error" variant="body2" sx={{ mt: 1, mb: 1 }}>
              {errMsg}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#008080",
              "&:hover": { backgroundColor: "#00574B" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Popover>
    </div>
  );
};

export default TopBar;
