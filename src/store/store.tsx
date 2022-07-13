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
  newPracticeSheetsPopupActive: true,
  adjectivesDB: [],
  nounsDB: [],
  verbsDB: [],
  vocabSelectPopupActive: false,
  practiceSheetGeneratorUserData: {
    numberOfTotalVocabQuestions: 0,
    numberOfVocabMultipleChoiceQuestions: 0,
    numberOfVocabMatchingQuestions: 0,
    numberOfVocabFillInTheBlankQuesations: 0,
  },
  userSelectedVocab: [],
  conjugationPopupActive: false,
  numberOfConjugationQuestions: 0,
  conjugationVerbChoicePopup: false,
  userSelectedConjugation: [],
  numberOfPhraseQuestionsPopupActive: false,
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
    setNewPracticeSheetsPopupActive(state, { payload }) {
      state.newPracticeSheetsPopupActive = payload;
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
    setVocabSelectPopupActive(state, { payload }) {
      state.vocabSelectPopupActive = payload;
    },
    setPracticeSheetGeneratorUserData(state, { payload }) {
      state.practiceSheetGeneratorUserData = payload;
    },
    setUserSelectedVocab(state, { payload }) {
      state.userSelectedVocab = payload;
    },
    setConjugationPopupActive(state, { payload }) {
      state.conjugationPopupActive = payload;
    },
    setNumberOfConjugationQuestions(state, { payload }) {
      state.numberOfConjugationQuestions = payload;
    },
    setConjugationVerbChoicePopup(state, { payload }) {
      state.conjugationVerbChoicePopup = payload;
    },
    setUserSelectedConjugation(state, { payload }) {
      state.userSelectedConjugation = payload;
    },
    setNumberOfPhraseQuestionsPopupActive(state, { payload }) {
      state.numberOfPhraseQuestionsPopupActive = payload;
    },
  },
});
const store = configureStore({ reducer: storeSlice.reducer });
type FlashcardDatabaseTypes = {
  answer: string;
  question: string;
};
type PracticeSheetGeneratorUserData = {
  numberOfTotalVocabQuestions: number;
  numberOfVocabMultipleChoiceQuestions: number;
  numberOfVocabMatchingQuestions: number;
  numberOfVocabFillInTheBlankQuesations: number;
};
interface UserSelectedVocab {
  french: string;
  english: string;
}
export interface DatabaseStates {
  homepageFeatureDatabase: {
    [key: string]: { title: string; description: string };
  };
  adjectivesDB: { [key: string]: string }[];
  nounsDB: { [key: string]: string }[];
  verbsDB: { [key: string]: string }[];
  homepageSelectedSection: string;
  activePage: string;
  flashcardsDB: FlashcardDatabaseTypes[];
  firebaseDataLoaded: boolean;
  newPracticeSheetsPopupActive: boolean;
  vocabSelectPopupActive: boolean;
  practiceSheetGeneratorUserData: PracticeSheetGeneratorUserData;
  userSelectedVocab: UserSelectedVocab[];
  conjugationPopupActive: boolean;
  numberOfConjugationQuestions: number;
  conjugationVerbChoicePopup: boolean;
  userSelectedConjugation: UserSelectedVocab[];
  numberOfPhraseQuestionsPopupActive: boolean;
}

export const storeActions = storeSlice.actions;

export default store;
