import React, { useEffect, useState } from "react";
import "../App.css";
import { DataGrid } from "@mui/x-data-grid";
import {
  getFirestore,
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  IconButton,
  Menu,
  MenuItem,
  Popover,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

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

const UserTable = () => {
  const [userList, setUserList] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentRow, setCurrentRow] = useState(null);
  const [editPopoverAnchor, setEditPopoverAnchor] = useState(null);
  const [editValues, setEditValues] = useState({ Phone: "", DOB: "" });

  const columns = [
    { field: "Name", headerName: "Username", width: 170 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "Phone", headerName: "Phone", width: 170 },
    { field: "DOB", headerName: "DOB", width: 170 },
    { field: "isActive",headerName: "Active",width:120},
    {
      field: "actions",
      headerName: "Actions",
      width: 70,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(event) => handleMenuClick(event, params.row)}
          >
            <MoreVertIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const q = query(collection(db, "Users"));
    const unsub = onSnapshot(q, (snapshot) => {
      let tasks = [];
      snapshot.docs.forEach((doc) => {
        if (doc.data().Name !== "groupchat") {
          tasks.push({ ...doc.data(), id: doc.id });
        }
      });
      setUserList(tasks);
      console.log(tasks);
    });
    return () => unsub();
  }, []);

  const handleMenuClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setCurrentRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = async()=>{
    if (currentRow) {
        const docRef = doc(db, "Users", currentRow.id);
        await updateDoc(docRef, {
          isActive:false
        });
      }
  };

  const handleEdit = (event) => {
    setEditPopoverAnchor(event.currentTarget);
    setEditValues({ Phone: currentRow.Phone, DOB: currentRow.DOB });
    handleMenuClose();
  };

  const handlePopoverClose = () => {
    setEditPopoverAnchor(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    if (currentRow) {
      const docRef = doc(db, "Users", currentRow.id);
      await updateDoc(docRef, {
        Phone: editValues.Phone,
        DOB: editValues.DOB,
      });
    }
    handlePopoverClose();
  };

  return (
    <div className="bg-teal-50 mx-12 rounded-md w-9/12 align mx-auto border-solid border-teal-50 border-2 mt-5 mb-10 flex flex-col divide-y h-96">
      <DataGrid rows={userList} columns={columns} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>Update</MenuItem>
        <MenuItem onClick = {handleDelete}>Delete</MenuItem>
      </Menu>
      <Popover
        open={Boolean(editPopoverAnchor)}
        anchorEl={editPopoverAnchor}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <div style={{ padding: 20 }}>
          <TextField
            label="Phone"
            name="Phone"
            value={editValues.Phone}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
            sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#009688",
                  },
                  "&:hover fieldset": {
                    borderColor: "#009688",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#009688",
                  },
                },
              }}
          />
          
          <TextField
            label="DOB"
            name="DOB"
            type="date"
            value={editValues.DOB}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#009688",
                },
                "&:hover fieldset": {
                  borderColor: "#009688",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#009688",
                },
              },
            }}
          />
          <Button variant="contained" color="primary" onClick={handleEditSave}
          sx=
            {{
              backgroundColor: "#009688",
              "&:hover": {
                backgroundColor: "#00796b",
              },
            }}>
            Save
          </Button>
        </div>
      </Popover>
    </div>
  );
};

export default UserTable;
