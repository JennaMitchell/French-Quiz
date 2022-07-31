import { createSlice, configureStore } from "@reduxjs/toolkit";
// PayloadAction
import { quizStoreSlice } from "./quiz-store-slice";
import { sheetGeneratorStoreSlice } from "./sheet-generator-slice";
const initialState = {
  activePage: "Home",

  homepageFeatureDatabase: {
    Flashcards: {
      title: "Flashcards",
      description: "Practice your vocab with traditional flashcard.",
    },
    "Practice Sheets": {
      title: "Practice Sheets",
      description:
        "Create a computer generated practice sheets to practice offline.",
    },
    Quizes: {
      title: "Quizes",
      description: "Practice your knowledge with a vocab quizes.",
    },
    "Grammar Test": {
      title: "Grammar Test",
      description: "Test your grammar knowledge with a generated grammar quiz.",
    },
  },
  homepageSelectedSection: "Flashcards",
  flashcardsDB: [],
  firebaseDataLoaded: false,
  adjectivesDB: [],
  nounsDB: [],
  verbsDB: [],
  phrasesDB: [],
  overAllVocabDB: [],
  conjugationTableDB: [],
};

// setHomepageSelectedSection(state, action: PayloadAction<string>) {
//     state.homepageSelectedSection = action.payload;
//   },

const mainStoreSlice = createSlice({
  name: "French Quiz Database",
  initialState: initialState,
  reducers: {
    setHomepageSelectedSection(state, { payload }) {
      state.homepageSelectedSection = payload;
    },
    setActivePage(state, { payload }) {
      state.activePage = payload;
    },
    setFlashcardsDB(state, { payload }) {
      state.flashcardsDB = payload;
    },
    setFirebaseDataLoaded(state, { payload }) {
      state.firebaseDataLoaded = payload;
    },

    setAdjectivesDB(state, { payload }) {
      state.adjectivesDB = payload;
    },
    setNounsDB(state, { payload }) {
      state.nounsDB = payload;
    },
    setVerbsDB(state, { payload }) {
      state.verbsDB = payload;
    },
    setPhrasesDB(state, { payload }) {
      state.phrasesDB = payload;
    },

    setOverAllVocabDB(state, { payload }) {
      state.overAllVocabDB = payload;
    },
    setConjugationTableDB(state, { payload }) {
      state.conjugationTableDB = payload;
    },
  },
});
const store = configureStore({
  reducer: {
    mainStore: mainStoreSlice.reducer,
    quizStore: quizStoreSlice.reducer,
    sheetGenerator: sheetGeneratorStoreSlice.reducer,
  },
});
type FlashcardDatabaseTypes = {
  answer: string;
  question: string;
};

interface DatabaseType {
  [french: string]: string;
  english: string;
  id: string;
}

export interface MainStoreDatabaseStates {
  homepageFeatureDatabase: {
    [key: string]: { title: string; description: string };
  };
  adjectivesDB: DatabaseType[];
  nounsDB: DatabaseType[];
  verbsDB: DatabaseType[];
  phrasesDB: DatabaseType[];
  overAllVocabDB: DatabaseType[];
  homepageSelectedSection: string;
  activePage: string;
  flashcardsDB: FlashcardDatabaseTypes[];
  firebaseDataLoaded: boolean;
  conjugationTableDB: any;
}
export type RootState = ReturnType<typeof store.getState>;
// used to set it so our usestate perfectly match what is in the store
export type AppDispatch = typeof store.dispatch;
// dispatch is sued to type or dispatch actions

export const mainStoreSliceActions = mainStoreSlice.actions;

export default store;
