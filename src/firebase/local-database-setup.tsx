import { ref, child, get } from "firebase/database";
import exportObject from "./firebase-initialization";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { useSelector } from "react-redux";
import { storeActions, DatabaseStates } from "../store/store";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import LoadingAnimation from "../components/loading-logo/loading-logo";
interface UserSelectedData {
  french: string;
  english: string;
  id: string;
}
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
  const [flashcardsDBTemp, setFlashcardsDBTemp] = useState<any>([]);
  const [adjectivesDBTemp, setAdjectivesDBTemp] = useState<any>([]);
  const [nounsDBTemp, setNounsDBTemp] = useState<any>([]);
  const [verbsDBTemp, setVerbsDBTemp] = useState<any>([]);
  const [phrasesDBTemp, setPhrasesDBTemp] = useState<any>([]);
  let httpError = "";
  let renderText = "";

  // const phrasesDB = useSelector((state: DatabaseStates) => state.phrasesDB);

  const awaitDatabaseData = async () => {
    const flashcardsDB = await get(child(databaseRef, "Flashcards/"));
    const nounsDB = await get(child(databaseRef, "Vocab/Nouns/"));
    const adjectivesDB = await get(child(databaseRef, "Vocab/Adjectives/"));
    const verbsDB = await get(child(databaseRef, "Vocab/Verbs/"));
    const phrasesDB = await get(child(databaseRef, "Vocab/Phrases/"));

    const takeDatabaseSnapshot = (snapShot: any, databaseType: any) => {
      try {
        if (snapShot.exists()) {
          const val = snapShot.val();
          const loadedCards = [];
          // Handeling Flashcards DB
          if (databaseType === "flashcards") {
            for (const key in val) {
              loadedCards.push({
                id: key,
                answer: val[key].answer,
                question: val[key].question,
              });
            }
          }
          // Handeling Vocab
          if (
            databaseType === "nouns" ||
            databaseType === "adjective" ||
            databaseType === "verbs" ||
            databaseType === "phrases"
          ) {
            for (const key in val) {
              loadedCards.push({
                id: key,
                french: key,
                english: val[key],
              });
            }
          }

          if (databaseType === "flashcards") {
            dispatch(storeActions.setFlashcardsDB(loadedCards));
            setFlashcardsDBTemp(loadedCards);
          } else if (databaseType === "nouns") {
            dispatch(storeActions.setNounsDB(loadedCards));
            setNounsDBTemp(loadedCards);
          } else if (databaseType === "adjective") {
            dispatch(storeActions.setAdjectivesDB(loadedCards));
            setAdjectivesDBTemp(loadedCards);
          } else if (databaseType === "verbs") {
            dispatch(storeActions.setVerbsDB(loadedCards));
            setVerbsDBTemp(loadedCards);
          } else if (databaseType === "phrases") {
            dispatch(storeActions.setPhrasesDB(loadedCards));
            dispatch(storeActions.setFirebaseDataLoaded(true));
            setPhrasesDBTemp(loadedCards);
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        httpError = error.message;
      }
    };
    takeDatabaseSnapshot(flashcardsDB, "flashcards");
    takeDatabaseSnapshot(nounsDB, "nouns");
    takeDatabaseSnapshot(adjectivesDB, "adjective");
    takeDatabaseSnapshot(verbsDB, "verbs");
    takeDatabaseSnapshot(phrasesDB, "phrases");
  };

  // Creating an overall Vocab Database
  const tempAllVocabDB: UserSelectedData[] = [];

  const pushToTempAllVocabFunction = (database: UserSelectedData[]) => {
    for (const key in database) {
      let tempObject: UserSelectedData = {
        id: `${database[key].french}`,
        english: `${database[key].english}`,
        french: `${database[key].french}`,
      };

      tempAllVocabDB.push(tempObject);
    }
  };
  if (phrasesDBTemp.length !== 0) {
    pushToTempAllVocabFunction(adjectivesDBTemp);
    pushToTempAllVocabFunction(verbsDBTemp);
    pushToTempAllVocabFunction(nounsDBTemp);
    dispatch(storeActions.setOverallVocabDB(tempAllVocabDB));
  }

  if (flashcardsDBTemp.length === 0) {
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
