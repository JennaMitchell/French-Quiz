import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newPracticeSheetsPopupActive: true,
  vocabSelectPopupActive: false,
  practiceSheetGeneratorVocabQuestionSetup: {
    numberOfTotalVocabQuestions: 0,
    numberOfVocabMultipleChoiceQuestions: 0,
    numberOfVocabMatchingQuestions: 0,
    numberOfVocabFillInTheBlankQuestions: 0,
  },
  practiceSheetGeneratorVocabQuestions: {
    vocabMultipleChoiceQuestions: [],
    vocabMatchingQuestions: [],
    vocabFillInTheBlankQuestions: [],
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
    numberOfPhraseFillInTheBlankQuestions: 0,
  },
  practiceSheetGeneratorPhraseQuestions: {
    phraseMultipleChoiceQuestions: [],
    phraseMatchingQuestions: [],
    phraseFillInTheBlankQuestions: [],
  },
  phrasesSelectionPopupActive: false,
  userSelectedPhrases: [],
  userSelectedPhrasesTestType: "",
  selectedVocabTestType: " ",

  practiceSheetsMultipleChoiceVocabAnswers: [],
  practiceSheetsMultipleChoicePhrasesAnswers: [],
  practiceSheetSetupComplete: false,
  practiceSheetsFillInTheBlankVocabAnswers: [],
  practiceSheetsFillInTheBlankPhrasesAnswers: [],
  practiceSheetsMatchingVocabAnswers: [],
  practiceSheetsMatchingPhrasesAnswers: [],

  conjugationAnswerKey: [],
  phrasesMultipleChoiceAnswerKey: [],
  vocabMultipleChoiceAnswerKey: [],
  phrasesMatchingAnswerKey: [],
  vocabMatchingAnswerKey: [],
  phrasesFillInTheBlankAnswerKey: [],
  vocabFillInTheBlankAnswerKey: [],
};
export const sheetGeneratorStoreSlice = createSlice({
  name: "French Quiz Database",
  initialState: initialState,
  reducers: {
    setNewPracticeSheetsPopupActive(state, { payload }) {
      state.newPracticeSheetsPopupActive = payload;
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
    setPracticeSheetsMatchingVocabAnswers(state, { payload }) {
      state.practiceSheetsMatchingVocabAnswers = payload;
    },
    setPracticeSheetsMatchingPhrasesAnswers(state, { payload }) {
      state.practiceSheetsMatchingPhrasesAnswers = payload;
    },
    setPracticeSheetGeneratorVocabQuestions(state, { payload }) {
      state.practiceSheetGeneratorVocabQuestions = payload;
    },
    setPracticeSheetGeneratorPhraseQuestions(state, { payload }) {
      state.practiceSheetGeneratorPhraseQuestions = payload;
    },

    setConjugationAnswerKey(state, { payload }) {
      state.conjugationAnswerKey = payload;
    },
    setPhrasesMultipleChoiceAnswerKey(state, { payload }) {
      state.phrasesMultipleChoiceAnswerKey = payload;
    },
    setVocabMultipleChoiceAnswerKey(state, { payload }) {
      state.vocabMultipleChoiceAnswerKey = payload;
    },
    setPhrasesMatchingAnswerKey(state, { payload }) {
      state.phrasesMatchingAnswerKey = payload;
    },
    setVocabMatchingAnswerKey(state, { payload }) {
      state.vocabMatchingAnswerKey = payload;
    },
    setPhrasesFillInTheBlankAnswerKey(state, { payload }) {
      state.phrasesFillInTheBlankAnswerKey = payload;
    },
    setVocabFillInTheBlankAnswerKey(state, { payload }) {
      state.vocabFillInTheBlankAnswerKey = payload;
    },
  },
});

type PracticeSheetGeneratorVocabQuestionSetup = {
  numberOfTotalVocabQuestions: number;
  numberOfVocabMultipleChoiceQuestions: number;
  numberOfVocabMatchingQuestions: number;
  numberOfVocabFillInTheBlankQuestions: number;
};
type PracticeSheetGeneratorPhrasesQuestionSetup = {
  numberOfTotalPhraseQuestions: number;
  numberOfPhraseMultipleChoiceQuestions: number;
  numberOfPhraseMatchingQuestions: number;
  numberOfPhraseFillInTheBlankQuestions: number;
};
type PracticeSheetGeneratorVocabQuestions = {
  vocabMultipleChoiceQuestions: [];
  vocabMatchingQuestions: [];
  vocabFillInTheBlankQuestions: [];
};
type PracticeSheetGeneratorPhraseQuestions = {
  phraseMultipleChoiceQuestions: [];
  phraseMatchingQuestions: [];
  phraseFillInTheBlankQuestions: [];
};
interface UserSelectedData {
  [french: string]: string;
  english: string;
}

interface AnswerKey {
  questionNumber: number;
  answer: string;
}

// interface ConjugationTable {
//   [key: string]: {
//     [key: string]: string;
//   };
// }

/// pSG = Practice Sheet Generator

export interface SheetGeneratorDatabaseStates {
  newPracticeSheetsPopupActive: boolean;
  vocabSelectPopupActive: boolean;
  practiceSheetGeneratorVocabQuestionSetup: PracticeSheetGeneratorVocabQuestionSetup;
  userSelectedVocab: UserSelectedData[];
  numberOfConjugationPopupActive: boolean;
  numberOfConjugationQuestions: number;
  conjugationVerbChoicePopup: boolean;
  userSelectedConjugations: UserSelectedData[];
  userSelectedConjugationGrouping: string;
  numberOfPhraseQuestionsPopupActive: boolean;
  practiceSheetGeneratorPhrasesQuestionSetup: PracticeSheetGeneratorPhrasesQuestionSetup;
  phrasesSelectionPopupActive: boolean;
  userSelectedPhrases: UserSelectedData[];
  userSelectedPhrasesTestType: string;
  selectedVocabTestType: string;
  practiceSheetsMultipleChoiceVocabAnswer: AnswerKey[];
  practiceSheetsMultipleChoicePhrasesAnswers: AnswerKey[];
  practiceSheetSetupComplete: boolean;
  practiceSheetsFillInTheBlankVocabAnswers: string[];
  practiceSheetsFillInTheBlankPhrasesAnswers: string[];
  practiceSheetsMatchingVocabAnswers: string[];
  practiceSheetsMatchingPhrasesAnswers: string[];
  practiceSheetGeneratorVocabQuestions: PracticeSheetGeneratorVocabQuestions;
  practiceSheetGeneratorPhraseQuestions: PracticeSheetGeneratorPhraseQuestions;
  conjugationAnswerKey: string[] | { [key: string]: string[] };
  phrasesMultipleChoiceAnswerKey: string[];
  vocabMultipleChoiceAnswerKey: string[];
  phrasesMatchingAnswerKey: string[];
  vocabMatchingAnswerKey: string[];
  phrasesFillInTheBlankAnswerKey: string[];
  vocabFillInTheBlankAnswerKey: string[];
}

export const sheetGeneratorStoreSliceActions = sheetGeneratorStoreSlice.actions;
