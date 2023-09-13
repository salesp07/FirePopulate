import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch, collection, doc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";

export const populateFirestore = (
  dummyData,
  collectionName,
  firebaseConfig,
  setSuccessMsg,
  setErrorMsg
) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const batch = writeBatch(db);
  dummyData.forEach((data) => {
    const ref = doc(collection(db, collectionName));
    batch.set(ref, data);
  });

  batch
    .commit()
    .then(() => {
      setSuccessMsg("FirestoreDB successfully populated");
    })
    .catch((err) => {
      setErrorMsg(err.message);
    });
};

export const populateRealtime = (
  dummyData,
  collectionName,
  firebaseConfig,
  setSuccessMsg,
  setErrorMsg
) => {
  const firebaseApp = initializeApp(firebaseConfig);
  const db = getDatabase(firebaseApp);
  const nodeRef = ref(db, collectionName);

  set(nodeRef, dummyData)
    .then(() => {
      setSuccessMsg("RealtimeDB successfully populated");
    })
    .catch((err) => {
      setErrorMsg(err.message);
    });
};
