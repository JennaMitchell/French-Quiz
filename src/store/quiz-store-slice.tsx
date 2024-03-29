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
  fillInBlankQuestionAnsweredArray: [],
  matchingAnswerKey: [],
  matchingQuestionAnsweredArray: [],
  conjugationAnswerKey: [],
  conjugationQuestionAnsweredArray: [],
  userSelectedMultipleChoiceQuizAnswers: [],
  totalNumberOfQuestions: 0,
  questionListActive: false,
  userSelectedConjugationAnswers: [],
  quizSubmitButtonClicked: false,
  userSelectedMatchingAnswers: [],
  userSelectedFillInBlankAnswers: [],
  multipleChoiceQuestionAnswers: [],
  multipleChoiceQuestionTitles: [],
  fillInTheBlankTestTerms: [],
  matchingTestTerms: [],
  matchingPromptTerms: [],
  quizConjugationTerms: [],
  userAnswerRetrieved: false,
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

    setFillInBlankQuestionAnsweredArray(state, { payload }) {
      state.fillInBlankQuestionAnsweredArray = payload;
    },
    setMatchingAnswerKey(state, { payload }) {
      state.matchingAnswerKey = payload;
    },
    setMatchingQuestionAnsweredArray(state, { payload }) {
      state.matchingQuestionAnsweredArray = payload;
    },
    setConjugationAnswerKey(state, { payload }) {
      state.conjugationAnswerKey = payload;
    },
    setConjugationQuestionAnsweredArray(state, { payload }) {
      state.conjugationQuestionAnsweredArray = payload;
    },
    setUserSelectedMultipleChoiceQuizAnswers(state, { payload }) {
      state.userSelectedMultipleChoiceQuizAnswers = payload;
    },
    setTotalNumberOfQuestions(state, { payload }) {
      state.totalNumberOfQuestions = payload;
    },
    setQuestionListActive(state, { payload }) {
      state.questionListActive = payload;
    },
    setUserSelectedConjugationAnswers(state, { payload }) {
      state.userSelectedConjugationAnswers = payload;
    },
    setQuizSubmitButtonClicked(state, { payload }) {
      state.quizSubmitButtonClicked = payload;
    },
    setUserSelectedMatchingAnswers(state, { payload }) {
      state.userSelectedMatchingAnswers = payload;
    },
    setUserSelectedFillInBlankAnswers(state, { payload }) {
      state.userSelectedFillInBlankAnswers = payload;
    },
    setMultipleChoiceQuestionAnswers(state, { payload }) {
      state.multipleChoiceQuestionAnswers = payload;
    },
    setMultipleChoiceQuestionTitles(state, { payload }) {
      state.multipleChoiceQuestionTitles = payload;
    },
    setFillInTheBlankTestTerms(state, { payload }) {
      state.fillInTheBlankTestTerms = payload;
    },
    setMatchingTestTerms(state, { payload }) {
      state.matchingTestTerms = payload;
    },
    setMatchingPromptTerms(state, { payload }) {
      state.matchingPromptTerms = payload;
    },
    setQuizConjugationTerms(state, { payload }) {
      state.quizConjugationTerms = payload;
    },
    setUserAnswerRetrieved(state, { payload }) {
      state.userAnswerRetrieved = payload;
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
  matchingQuestionAnsweredArray: boolean[];
  conjugationAnswerKey: string[];
  conjugationQuestionAnsweredArray: boolean[];
  userSelectedMultipleChoiceQuizAnswers: string[];
  totalNumberOfQuestions: number;
  userSelectedConjugationAnswers: string[];
  quizSubmitButtonClicked: boolean;
  userSelectedMatchingAnswers: string[];
  userSelectedFillInBlankAnswers: string[];
  muiltipleChoiceQuestionTitles: string[];
  multipleChoiceQuestionAnswers: string[];
  fillInTheBlankTestTerms: string[];
  matchingTestTerms: string[];
  quizConjugationTerms: string[];
  userAnswerRetrieved: boolean;
}
export const quizStoreSliceActions = quizStoreSlice.actions;
