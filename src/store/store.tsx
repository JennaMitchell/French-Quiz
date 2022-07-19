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
  phrasesDB: [],
  vocabSelectPopupActive: false,
  practiceSheetGeneratorVocabQuestionSetup: {
    numberOfTotalVocabQuestions: 0,
    numberOfVocabMultipleChoiceQuestions: 0,
    numberOfVocabMatchingQuestions: 0,
    numberOfVocabFillInTheBlankQuestions: 0,
  },
  userSelectedVocab: [],
  numberOfConjugationPopupActive: false,
  numberOfConjugationQuestions: 0,
  conjugationVerbChoicePopup: false,
  userSelectedConjugations: [],
  userSelectedConjugationGrouping: "",
  numberOfPhraseQuestionsPopupActive: false,
  practiceSheetGeneratorPhrasesQuestionSetup: {
    numberOfTotalPhraseQuestions: 0,
    numberOfPhraseMultipleChoiceQuestions: 0,
    numberOfPhraseMatchingQuestions: 0,
    numberOfPhraseFillInTheBlankQuesations: 0,
  },
  phrasesSelectionPopupActive: false,
  userSelectedPhrases: [],
  userSelectedPhrasesTestType: "",
  selectedVocabTestType: " ",
  overAllVocabDB: [],
  practiceSheetsMultipleChoiceVocabAnswers: [],
  practiceSheetsMultipleChoicePhrasesAnswers: [],
  practiceSheetSetupComplete: false,
  practiceSheetsFillInTheBlankVocabAnswers: [],
  practiceSheetsFillInTheBlankPhrasesAnswers: [],
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
    setPhrasesDB(state, { payload }) {
      state.phrasesDB = payload;
    },
    setVocabSelectPopupActive(state, { payload }) {
      state.vocabSelectPopupActive = payload;
    },
    setPracticeSheetGeneratorVocabQuestionSetup(state, { payload }) {
      state.practiceSheetGeneratorVocabQuestionSetup = payload;
    },
    setUserSelectedVocab(state, { payload }) {
      state.userSelectedVocab = payload;
    },
    setNumberOfConjugationPopupActive(state, { payload }) {
      state.numberOfConjugationPopupActive = payload;
    },
    setNumberOfConjugationQuestions(state, { payload }) {
      state.numberOfConjugationQuestions = payload;
    },
    setConjugationVerbChoicePopup(state, { payload }) {
      state.conjugationVerbChoicePopup = payload;
    },
    setUserSelectedConjugations(state, { payload }) {
      state.userSelectedConjugations = payload;
    },
    setNumberOfPhraseQuestionsPopupActive(state, { payload }) {
      state.numberOfPhraseQuestionsPopupActive = payload;
    },
    setUserSelectedConjugationGrouping(state, { payload }) {
      state.userSelectedConjugationGrouping = payload;
    },
    setPhrasesSelectionPopupActive(state, { payload }) {
      state.phrasesSelectionPopupActive = payload;
    },
    setPracticeSheetGeneratorPhrasesQuestionSetup(state, { payload }) {
      state.practiceSheetGeneratorPhrasesQuestionSetup = payload;
    },
    setUserSelectedPhrases(state, { payload }) {
      state.userSelectedPhrases = payload;
    },
    setUserSelectedPhrasesTestType(state, { payload }) {
      state.userSelectedPhrasesTestType = payload;
    },
    setSelectedVocabTestType(state, { payload }) {
      state.selectedVocabTestType = payload;
    },
    setOverallVocabDB(state, { payload }) {
      state.overAllVocabDB = payload;
    },
    setPracticeSheetsMultipleChoiceVocabAnswers(state, { payload }) {
      state.practiceSheetsMultipleChoiceVocabAnswers = payload;
    },
    setPracticeSheetsMultipleChoicePhrasesAnswers(state, { payload }) {
      state.practiceSheetsMultipleChoicePhrasesAnswers = payload;
    },
    setPracticeSheetSetupComplete(state, { payload }) {
      state.practiceSheetSetupComplete = payload;
    },
    setPracticeSheetsFillInTheBlankVocabAnswers(state, { payload }) {
      state.practiceSheetsFillInTheBlankVocabAnswers = payload;
    },
    setPracticeSheetsFillInTheBlankPhrasesAnswers(state, { payload }) {
      state.practiceSheetsFillInTheBlankPhrasesAnswers = payload;
    },
  },
});
const store = configureStore({ reducer: storeSlice.reducer });
type FlashcardDatabaseTypes = {
  answer: string;
  question: string;
};
type PractiveSheetGeneratorVocabQuestionSetup = {
  numberOfTotalVocabQuestions: number;
  numberOfVocabMultipleChoiceQuestions: number;
  numberOfVocabMatchingQuestions: number;
  numberOfVocabFillInTheBlankQuestions: number;
};
type PractiveSheetGeneratorPhrasesQuestionSetup = {
  numberOfTotalPhraseQuestions: number;
  numberOfPhraseMultipleChoiceQuestions: number;
  numberOfPhraseMatchingQuestions: number;
  numberOfPhraseFillInTheBlankQuestions: number;
};
interface UserSelectedData {
  [french: string]: string;
  english: string;
}
interface DatabaseType {
  [french: string]: string;
  english: string;
  id: string;
}
interface AnswerKey {
  questionNumber: number;
  answer: string;
}

/// pSG = Practice Sheet Generator

export interface DatabaseStates {
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
  newPracticeSheetsPopupActive: boolean;
  vocabSelectPopupActive: boolean;
  practiceSheetGeneratorVocabQuestionSetup: PractiveSheetGeneratorVocabQuestionSetup;
  userSelectedVocab: UserSelectedData[];
  numberOfConjugationPopupActive: boolean;
  numberOfConjugationQuestions: number;
  conjugationVerbChoicePopup: boolean;
  userSelectedConjugations: UserSelectedData[];
  userSelectedConjugationGrouping: string;
  numberOfPhraseQuestionsPopupActive: boolean;
  practiceSheetGeneratorPhrasesQuestionSetup: PractiveSheetGeneratorPhrasesQuestionSetup;
  phrasesSelectionPopupActive: boolean;
  userSelectedPhrases: UserSelectedData[];
  userSelectedPhrasesTestType: string;
  selectedVocabTestType: string;
  practiceSheetsMultipleChoiceVocabAnswer: AnswerKey[];
  practiceSheetsMultipleChoicePhrasesAnswers: AnswerKey[];
  practiceSheetSetupComplete: boolean;
  practiceSheetsFillInTheBlankVocabAnswers: string[];
  practiceSheetsFillInTheBlankPhrasesAnswers: string[];
}

export const storeActions = storeSlice.actions;

export default store;
