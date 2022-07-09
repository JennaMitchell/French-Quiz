import { createSlice, configureStore } from "@reduxjs/toolkit";
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
};
const storeSlice = createSlice({
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
  },
});
const store = configureStore({ reducer: storeSlice.reducer });
type FlashcardDatabaseTypes = {
  answer: string;
  question: string;
};
export interface DatabaseStates {
  homepageFeatureDatabase: {
    [key: string]: { title: string; description: string };
  };
  homepageSelectedSection: string;
  activePage: string;
  flashcardsDB: FlashcardDatabaseTypes[];
  firebaseDataLoaded: boolean;
}

export const storeActions = storeSlice.actions;

export default store;
