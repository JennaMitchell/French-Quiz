import { quizStoreSliceActions } from "../../store/quiz-store-slice";

export const quizReset = (newButtonClicked: boolean, dispatch: any) => {
  if (newButtonClicked) {
    dispatch(quizStoreSliceActions.setNumberOfQuizQuestionsPopupActive(true));
  } else {
    dispatch(quizStoreSliceActions.setNumberOfQuizQuestionsPopupActive(false));
  }
  dispatch(
    quizStoreSliceActions.setUserQuizQuestionSetup({
      numberOfTotalVocabNPhraseQuestions: 0,
      numberOfVocabNPhraseMultipleChoiceQuestions: 0,
      numberOfVocabNPhraseMatchingQuestions: 0,
      numberOfVocabNPhraseFillInTheBlankQuestions: 0,
    })
  );

  dispatch(quizStoreSliceActions.setUserSelectedQuizVocabQuestionTypes(""));
  dispatch(quizStoreSliceActions.setQuizVocabSelectionPopupActive(false));
  dispatch(
    quizStoreSliceActions.setQuizConjugationNumberOfQuestionsPopup(false)
  );
  dispatch(quizStoreSliceActions.setUserSelectedQuizVocabNPhrases([]));
  dispatch(
    quizStoreSliceActions.setQuizConjugationVerbSelectionPopupActive(false)
  );
  dispatch(quizStoreSliceActions.setNumberOfQuizConjugationQuestions(0));
  dispatch(quizStoreSliceActions.setQuizSetupComplete(false));
  dispatch(quizStoreSliceActions.setUserSelectedQuizConjugations([]));
  dispatch(quizStoreSliceActions.setUserSelectedQuizConjugationGrouping(""));
  dispatch(quizStoreSliceActions.setVocabPhraseQuizMultipleChoiceAnswerKey([]));
  dispatch(quizStoreSliceActions.setVocabPhraseQuizFillInBlankAnswerKey([]));
  dispatch(quizStoreSliceActions.setFillInBlankQuestionAnsweredArray([]));
  dispatch(quizStoreSliceActions.setMatchingAnswerKey([]));
  dispatch(quizStoreSliceActions.setMatchingQuestionAnsweredArray([]));
  dispatch(quizStoreSliceActions.setConjugationAnswerKey([]));
  dispatch(quizStoreSliceActions.setConjugationQuestionAnsweredArray([]));
  dispatch(quizStoreSliceActions.setUserSelectedMultipleChoiceQuizAnswers([]));
  dispatch(quizStoreSliceActions.setTotalNumberOfQuestions(0));
  dispatch(quizStoreSliceActions.setQuestionListActive(false));
  dispatch(quizStoreSliceActions.setUserSelectedConjugationAnswers([]));
  dispatch(quizStoreSliceActions.setQuizSubmitButtonClicked(false));
  dispatch(quizStoreSliceActions.setUserSelectedMatchingAnswers([]));
  dispatch(quizStoreSliceActions.setUserSelectedFillInBlankAnswers([]));
  dispatch(quizStoreSliceActions.setMultipleChoiceQuestionAnswers([]));
  dispatch(quizStoreSliceActions.setMultipleChoiceQuestionTitles([]));
  dispatch(quizStoreSliceActions.setFillInTheBlankTestTerms([]));
  dispatch(quizStoreSliceActions.setMatchingTestTerms([]));
  dispatch(quizStoreSliceActions.setMatchingPromptTerms([]));
  dispatch(quizStoreSliceActions.setQuizConjugationTerms([]));
  dispatch(quizStoreSliceActions.setUserAnswerRetrieved(false));
};
