import React, { useEffect, useState } from "react";
import "../App.css";
import { DataGrid } from "@mui/x-data-grid";
import Switch from "@mui/material/Switch";
import {
  getFirestore,
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  where,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  IconButton,
  Popover,
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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

const UserTable = (props) => {
  const { search } = props;
  const [userList, setUserList] = useState([]);
  const [currentRow, setCurrentRow] = useState(null);
  const [editPopoverAnchor, setEditPopoverAnchor] = useState(null);
  const [editValues, setEditValues] = useState({ Phone: "", DOB: "" });
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [switchRow, setSwitchRow] = useState(null);

  const columns = [
    { field: "Name", headerName: "Username", width: 170 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "Phone", headerName: "Phone", width: 170 },
    { field: "DOB", headerName: "DOB", width: 170 },
    {
      field: "isActive",
      headerName: "Active",
      width: 120,
      renderCell: (params) => (
        <Switch
          checked={params.value}
          size="small"
          onChange={() => handleSwitchChange(params.row)}
          sx={{
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "seagreen",
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "seagreen",
            },
            "& .MuiSwitch-switchBase": {
              color: "crimson",
            },
            "& .MuiSwitch-switchBase + .MuiSwitch-track": {
              backgroundColor: "crimson",
            },
          }}
        />
      ),
    },
    {
      field: "actions",
      headerName: "Edit",
      width: 70,
      renderCell: (params) => (
        <div>
          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={(event) => handleEdit(event, params.row)}
          >
            <EditIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const q = query(
      collection(db, "Users"),
      where("Name", ">=", search),
      where("Name", "<=", search + "\uf8ff")
    );
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
  }, [search]);

  const handleSwitchChange = (row) => {
    setSwitchRow(row);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
    setSwitchRow(null);
  };

  const handleSwitchConfirm = async () => {
    if (switchRow) {
      const docRef = doc(db, "Users", switchRow.id);
      await updateDoc(docRef, {
        isActive: !switchRow.isActive,
      });
    }
    handleConfirmDialogClose();
  };

  const handleEdit = (event, row) => {
    setEditPopoverAnchor(event.currentTarget);
    setCurrentRow(row);
    setEditValues({ Phone: row.Phone, DOB: row.DOB });
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditSave}
            sx={{
              backgroundColor: "#009688",
              "&:hover": {
                backgroundColor: "#00796b",
              },
            }}
          >
            Save
          </Button>
        </div>
      </Popover>
      <Dialog
        open={confirmDialogOpen}
        onClose={handleConfirmDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>{"Confirm Change"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to change the active status?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="inherit">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSwitchConfirm}
            sx={{
              backgroundColor: "teal",
              "&:hover": {
                backgroundColor: "#00796b", 
              },
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UserTable;
