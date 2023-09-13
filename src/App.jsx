import React, { useState, useEffect } from "react";
import Logo from "./components/Logo";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { populateFirestore, populateRealtime } from "./populate";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import GitHubIcon from "@mui/icons-material/GitHub";
import IconButton from "@mui/material/IconButton";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function SlideTransition(props) {
  return <Slide {...props} direction="up" />;
}

function App() {
  const [firebaseConfigStr, setFirebaseConfigStr] = useState("");
  const [firebaseConfigErrorMsg, setFirebaseConfigErrorMsg] = useState(false);

  const [dummyDataStr, setDummyDataStr] = useState("");
  const [dummyDataErrorMsg, setDummyDataErrorMsg] = useState("");

  const [collection, setCollection] = useState("");
  const [collectionErrorMsg, setCollectionErrorMsg] = useState("");

  const [dbType, setDbType] = useState("Firestore");

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    setFirebaseConfigErrorMsg("");
  }, [firebaseConfigStr]);

  useEffect(() => {
    setDummyDataErrorMsg("");
  }, [dummyDataStr]);

  useEffect(() => {
    setCollectionErrorMsg("");
  }, [collection]);

  useEffect(() => {
    if (collectionErrorMsg.length === 0) return;
    const required = dbType === "Firestore" ? "Collection Name" : "Node Path";
    setCollectionErrorMsg(required + " is required");
  }, [dbType]);

  const checkNotEmpty = () => {
    let notEmpty = true;
    if (firebaseConfigStr.length === 0) {
      setFirebaseConfigErrorMsg("Firebase Config Object is required");
      notEmpty = false;
    }

    if (dummyDataStr.length === 0) {
      setDummyDataErrorMsg("Dummy Data is required");
      notEmpty = false;
    }

    if (collection.length === 0) {
      setCollectionErrorMsg(
        dbType === "Firestore"
          ? "Collection Name"
          : "Node Path" + " is required"
      );
      notEmpty = false;
    }

    return notEmpty;
  };

  const parseDummyData = () => {
    try {
      const dummyData = JSON.parse(dummyDataStr);
      return dummyData;
    } catch (error) {
      setDummyDataErrorMsg("Error parsing Dummy Data: " + error.message);
    }
  };

  const parseFirebaseConfig = () => {
    try {
      const firebaseConfig = JSON.parse(firebaseConfigStr);
      return firebaseConfig;
    } catch (error) {
      setFirebaseConfigErrorMsg(
        "Error parsing Firebase Config Object: " + error.message
      );
    }
  };

  const handlePopulate = () => {
    if (!checkNotEmpty()) return;
    const dummyData = parseDummyData();
    const firebaseConfig = parseFirebaseConfig();
    if (!dummyData || !firebaseConfig) return;

    if (dbType === "Firestore") {
      populateFirestore(
        dummyData,
        collection,
        firebaseConfig,
        handleSuccess,
        handleError
      );
    } else if (dbType === "Realtime") {
      populateRealtime(
        dummyData,
        collection,
        firebaseConfig,
        handleSuccess,
        handleError
      );
    }
  };

  const handleSuccess = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
  };

  const handleError = (msg) => {
    setSnackbarMsg(msg);
    setSnackbarSeverity("error");
    setSnackbarOpen(true);
  };

  return (
    <>
      <Logo />
      <p style={{ textAlign: "justify", marginTop: -12 }}>
        FirePopulate helps you test your app by quickly populating dummy data to
        your Firebase backend. You can generate dummy JSON data through a free
        service like <a href="https://www.mockaroo.com/">Mockaroo</a>. Once you
        have your dummy JSON array, simply input it in the specified field, as
        well as your firebase config (as valid JSON). Then choose which database
        you want to populate, and which collection / node you want to populate
        it to. Click Populate and you're done!
        <br />
        <br />
        <b>OBS</b>: If you choose to populate your <b>RealtimeDB</b>, the
        specified node will be <b>replaced</b> with the provided JSON data.
      </p>
      <TextField
        label="Firebase Config JSON Object"
        multiline
        rows={9}
        placeholder={`{\n    "apiKey": "YOUR_API_KEY",
    "authDomain": "YOUR_AUTH_DOMAIN",
    "projectId": "YOUR_PROJECT_ID",
    "storageBucket": "YOUR_STORAGE_BUCKET",
    "messagingSenderId": "YOUR_MESSAGING_SENDER_ID",
    "appId": "YOUR_APP_ID",
    "measurementId": "YOUR_MEASUREMENT_ID"\n}`}
        value={firebaseConfigStr}
        onChange={(e) => setFirebaseConfigStr(e.target.value)}
        fullWidth
        error={firebaseConfigErrorMsg.length > 0}
        helperText={firebaseConfigErrorMsg}
      />

      <TextField
        label="JSON Array of Dummy Data"
        multiline
        rows={9}
        placeholder={`[\n    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "name": "John Doe"
    },
    {
      "id": 2,
      "username": "jane_smith",
      "email": "jane@example.com",
      "name": "Jane Smith"
    }\n]`}
        value={dummyDataStr}
        onChange={(e) => setDummyDataStr(e.target.value)}
        fullWidth
        error={dummyDataErrorMsg.length > 0}
        helperText={dummyDataErrorMsg}
      />

      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={dbType}
        onChange={(e) => setDbType(e.target.value)}
        row
      >
        <FormControlLabel
          value="Firestore"
          control={<Radio />}
          label="FirestoreDB"
        />
        <FormControlLabel
          value="Realtime"
          control={<Radio />}
          label="RealtimeDB"
        />
      </RadioGroup>

      <TextField
        label={dbType === "Firestore" ? "Collection Name" : "Node Path"}
        variant="outlined"
        placeholder={
          dbType === "Firestore"
            ? "E.g. users"
            : "E.g. someNode/someNestedNode/users"
        }
        value={collection}
        onChange={(e) => setCollection(e.target.value)}
        fullWidth
        error={collectionErrorMsg.length > 0}
        helperText={collectionErrorMsg}
      />

      <Button
        variant="contained"
        endIcon={<CloudUploadIcon />}
        style={{
          borderRadius: 25,
          backgroundColor: "#00bcd4",
          padding: "10px 30px",
        }}
        onClick={handlePopulate}
      >
        Populate
      </Button>

      <IconButton
        aria-label="github"
        href="https://github.com/salesp07/firepopulate"
      >
        <GitHubIcon sx={{ fontSize: 50, color: "#333333" }} />
      </IconButton>

      <Snackbar
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        TransitionComponent={SlideTransition}
        draggable
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={4000}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;
