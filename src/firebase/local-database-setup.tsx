import { ref, child, get } from "firebase/database";
import exportObject from "./firebase-initialization";

import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";

import { mainStoreSliceActions } from "../store/store";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import LoadingAnimation from "../components/loading-logo/loading-logo";
import { useEffect } from "react";

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
  const firebaseDataLoaded = useAppSelector(
    (state) => state.mainStore.firebaseDataLoaded
  );
  const databaseRef = ref(exportObject[0]);
  const dispatch = useAppDispatch();

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
    const conjugationTable = await get(
      child(databaseRef, "Vocab/ConjugationTable/")
    );

    const takeDatabaseSnapshot = (snapShot: any, databaseType: any) => {
      try {
        if (snapShot.exists()) {
          const val = snapShot.val();
          const loadedCards = [];
          // Handeling Flashcards DB
          if (databaseType === "flashcards") {
            for (const key in val) {
              loadedCards.push({
                id: key.trim(),
                answer: val[key].answer.trim(),
                question: val[key].question.trim(),
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
                id: key.trim(),
                french: key.trim(),
                english: val[key].trim(),
              });
            }
          }

          if (databaseType === "flashcards") {
            dispatch(mainStoreSliceActions.setFlashcardsDB(loadedCards));
            setFlashcardsDBTemp(loadedCards);
          } else if (databaseType === "nouns") {
            dispatch(mainStoreSliceActions.setNounsDB(loadedCards));
            setNounsDBTemp(loadedCards);
          } else if (databaseType === "adjective") {
            dispatch(mainStoreSliceActions.setAdjectivesDB(loadedCards));
            setAdjectivesDBTemp(loadedCards);
          } else if (databaseType === "verbs") {
            dispatch(mainStoreSliceActions.setVerbsDB(loadedCards));
            setVerbsDBTemp(loadedCards);
          } else if (databaseType === "phrases") {
            dispatch(mainStoreSliceActions.setPhrasesDB(loadedCards));
            setPhrasesDBTemp(loadedCards);
          } else if (databaseType === "conjugation") {
            dispatch(mainStoreSliceActions.setConjugationTableDB(val));
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
    takeDatabaseSnapshot(conjugationTable, "conjugation");
    takeDatabaseSnapshot(phrasesDB, "phrases");
  };

  // Creating an overall Vocab Database

  useEffect(() => {
    const tempAllVocabDB: UserSelectedData[] = [];
    const pushToTempAllVocabFunction = (database: UserSelectedData[]) => {
      for (const key in database) {
        let tempObject: UserSelectedData = {
          id: `${database[key].french}`,
          english: `${database[key].english}`.trim(),
          french: `${database[key].french}`.trim(),
        };

        tempAllVocabDB.push(tempObject);
      }
    };

    if (phrasesDBTemp.length !== 0) {
      pushToTempAllVocabFunction(adjectivesDBTemp);
      pushToTempAllVocabFunction(verbsDBTemp);
      pushToTempAllVocabFunction(nounsDBTemp);
      dispatch(mainStoreSliceActions.setOverAllVocabDB(tempAllVocabDB));
      dispatch(mainStoreSliceActions.setFirebaseDataLoaded(true));
    }
  }, [phrasesDBTemp, adjectivesDBTemp, dispatch, nounsDBTemp, verbsDBTemp]);

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
