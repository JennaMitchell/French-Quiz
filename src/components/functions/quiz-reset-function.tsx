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
};
