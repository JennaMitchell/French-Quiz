import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  numberOfQuizQuestionsPopupActive: true,
  userQuizQuestionSetup: {
    numberOfTotalVocabNPhraseQuestions: 0,
    numberOfVocabNPhraseMultipleChoiceQuestions: 0,
    numberOfVocabNPhraseMatchingQuestions: 0,
    numberOfVocabNPhraseFillInTheBlankQuestions: 0,
  },
  userSelectedQuizVocabQuestionTypes: "",
  quizVocabSelectionPopupActive: false,
  quizConjugationNumberOfQuestionsPopup: false,
  userSelectedQuizVocabNPhrases: [],
  quizConjugationVerbSelectionPopupActive: false,
  numberOfQuizConjugationQuestions: 0,
  quizSetupComplete: false,
  userSelectedQuizConjugations: [],
  userSelectedQuizConjugationGrouping: "",
  vocabPhraseQuizMultipleChoiceAnswerKey: [],
  vocabPhraseQuizFillInBlankAnswerKey: [],
  vocabPhraseQuizMatchingAnswerKey: [],
  fillInBlankQuestionAnsweredArray: [],
  multipleChoiceQuestionsCreated: false,
  fillInBlankQuestionsCreated: false,
  matchingAnswerKey: [],
};
export const quizStoreSlice = createSlice({
  name: "French Quiz Database",
  initialState: initialState,
  reducers: {
    setNumberOfQuizQuestionsPopupActive(state, { payload }) {
      state.numberOfQuizQuestionsPopupActive = payload;
    },
    setUserQuizQuestionSetup(state, { payload }) {
      state.userQuizQuestionSetup = payload;
    },
    setQuizConjugationNumberOfQuestionsPopup(state, { payload }) {
      state.quizConjugationNumberOfQuestionsPopup = payload;
    },
    setUserSelectedQuizVocabQuestionTypes(state, { payload }) {
      state.userSelectedQuizVocabQuestionTypes = payload;
    },
    setQuizVocabSelectionPopupActive(state, { payload }) {
      state.quizVocabSelectionPopupActive = payload;
    },
    setUserSelectedQuizVocabNPhrases(state, { payload }) {
      state.userSelectedQuizVocabNPhrases = payload;
    },
    setQuizConjugationVerbSelectionPopupActive(state, { payload }) {
      state.quizConjugationVerbSelectionPopupActive = payload;
    },
    setNumberOfQuizConjugationQuestions(state, { payload }) {
      state.numberOfQuizConjugationQuestions = payload;
    },
    setQuizSetupComplete(state, { payload }) {
      state.quizSetupComplete = payload;
    },
    setUserSelectedQuizConjugations(state, { payload }) {
      state.userSelectedQuizConjugations = payload;
    },
    setUserSelectedQuizConjugationGrouping(state, { payload }) {
      state.userSelectedQuizConjugationGrouping = payload;
    },
    setVocabPhraseQuizMultipleChoiceAnswerKey(state, { payload }) {
      state.vocabPhraseQuizMultipleChoiceAnswerKey = payload;
    },
    setVocabPhraseQuizFillInBlankAnswerKey(state, { payload }) {
      state.vocabPhraseQuizFillInBlankAnswerKey = payload;
    },
    setVocabPhraseQuizMatchingAnswerKey(state, { payload }) {
      state.vocabPhraseQuizMatchingAnswerKey = payload;
    },
    setFillInBlankQuestionAnsweredArray(state, { payload }) {
      state.fillInBlankQuestionAnsweredArray = payload;
    },
    setMatchingAnswerKey(state, { payload }) {
      state.matchingAnswerKey = payload;
    },
  },
});

// setHomepageSelectedSection(state, action: PayloadAction<string>) {
//     state.homepageSelectedSection = action.payload;
//   },

export interface UserQuizQuestionSetup {
  numberOfTotalVocabNPhraseQuestions: number;
  numberOfVocabNPhraseMultipleChoiceQuestions: number;
  numberOfVocabNPhraseMatchingQuestions: number;
  numberOfVocabNPhraseFillInTheBlankQuestions: number;
}
export interface UserSelectedData {
  [french: string]: string;
  english: string;
}
interface VocabPhraseAnswerKey {
  multipleChoiceAnswerKey: string[];
  fillInBlankAnswerKey: string[];
  matchingAnswerKey: string[];
}
export interface QuizDatabaseStates {
  numberOfQuestionsPopupActive: boolean;
  userQuizQuestionSetup: UserQuizQuestionSetup;
  userSelectedQuizVocabQuestionTypes: "";
  quizVocabSelectionPopupActive: boolean;
  quizConjugationNumberOfQuestionsPopup: boolean;
  vocabPhraseQuizMultipleChoiceAnswerKey: string[];
  vocabPhraseQuizFillInBlankAnswerKey: string[];
  vocabPhraseQuizMatchingAnswerKey: string[];
  quizConjugationVerbSelectionPopupActive: boolean;
  numberOfQuizConjugationQuestions: number;
  quizSetupComplete: boolean;
  userSelectedQuizConjugations: UserSelectedData[];
  userSelectedQuizConjugationGrouping: string;
  vocabPhraseQuizAnswerKey: VocabPhraseAnswerKey;
  fillInBlankQuestionAnsweredArray: boolean[];
  matchingAnswerKey: string[];
}
export const quizStoreSliceActions = quizStoreSlice.actions;
