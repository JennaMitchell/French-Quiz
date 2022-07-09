import { ref, child, get } from "firebase/database";
import exportObject from "./firebase-initialization";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { useSelector } from "react-redux";
import { storeActions, DatabaseStates } from "../store/store";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import LoadingAnimation from "../components/loading-logo/loading-logo";

const LoadingScreenBackdrop = styled("div", {
  name: "LoadingScreenBackdrop ",
  slot: "Wrapper",
})({
  position: "fixed",
  height: "max(100vh,100vh)",
  width: "max(100vw,100vw)",
  display: "grid",

  gridTemplateRows: "repeat(2,max-content)",
  gridTemplateColumns: "max-content",
  alignContent: "center",
  justifyContent: "center",
  gap: "10px",
  top: 0,
  left: 0,
  overflow: "hidden",
  backgroundColor: "black",
  color: "white",
  zIndex: "12",
});

const LocalDataBaseSetup = () => {
  const firebaseDataLoaded = useSelector(
    (state: DatabaseStates) => state.firebaseDataLoaded
  );
  const databaseRef = ref(exportObject[0]);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  let httpError = "";
  let renderText = "";

  const flashcardsDB = useSelector(
    (state: DatabaseStates) => state.flashcardsDB
  );

  const awaitDatabaseData = async () => {
    const flashcardsDB = await get(child(databaseRef, "Flashcards/"));

    const takeDatabaseSnapshot = (snapShot: any, databaseType: any) => {
      try {
        if (snapShot.exists()) {
          const val = snapShot.val();
          const loadedCards = [];
          for (const key in val) {
            loadedCards.push({
              id: key,
              answer: val[key].answer,
              question: val[key].question,
            });
          }
          if (databaseType === "flashcards") {
            dispatch(storeActions.setFlashcardsDB(loadedCards));
            dispatch(storeActions.setFirebaseDataLoaded(true));
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        httpError = error.message;
      }
    };
    takeDatabaseSnapshot(flashcardsDB, "flashcards");
  };

  if (flashcardsDB.length === 0) {
    awaitDatabaseData();
  }

  if (isLoading) {
    renderText = "Loading...";
  }
  if (httpError) {
    renderText = httpError;
  }

  return (
    <>
      {!firebaseDataLoaded && (
        <LoadingScreenBackdrop>
          <LoadingAnimation />
          <Typography sx={{ fontSize: "26px", textAlign: "center" }}>
            {renderText}
          </Typography>
        </LoadingScreenBackdrop>
      )}
    </>
  );
};

export default LocalDataBaseSetup;
