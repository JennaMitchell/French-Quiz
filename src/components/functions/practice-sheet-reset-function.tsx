import { sheetGeneratorStoreSliceActions } from "../../store/sheet-generator-slice";

export const practiceSheetReset = (
  newButtonClicked: boolean,
  dispatch: any
) => {
  if (newButtonClicked) {
    dispatch(
      sheetGeneratorStoreSliceActions.setNewPracticeSheetsPopupActive(true)
    );
  } else {
    dispatch(
      sheetGeneratorStoreSliceActions.setNewPracticeSheetsPopupActive(false)
    );
  }
  dispatch(sheetGeneratorStoreSliceActions.setVocabSelectPopupActive(false));
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorVocabQuestionSetup(
      {
        numberOfTotalVocabQuestions: 0,
        numberOfVocabMultipleChoiceQuestions: 0,
        numberOfVocabMatchingQuestions: 0,
        numberOfVocabFillInTheBlankQuestions: 0,
      }
    )
  );

  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorVocabQuestions({
      vocabMultipleChoiceQuestions: [],
      vocabMatchingQuestions: [],
      vocabFillInTheBlankQuestions: [],
    })
  );
  dispatch(sheetGeneratorStoreSliceActions.setUserSelectedVocab([]));
  dispatch(
    sheetGeneratorStoreSliceActions.setNumberOfConjugationPopupActive(false)
  );
  dispatch(sheetGeneratorStoreSliceActions.setNumberOfConjugationQuestions(0));
  dispatch(
    sheetGeneratorStoreSliceActions.setConjugationVerbChoicePopup(false)
  );
  dispatch(sheetGeneratorStoreSliceActions.setUserSelectedConjugations([]));
  dispatch(
    sheetGeneratorStoreSliceActions.setUserSelectedConjugationGrouping("")
  );
  dispatch(
    sheetGeneratorStoreSliceActions.setNumberOfPhraseQuestionsPopupActive(false)
  );
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorPhrasesQuestionSetup(
      {
        numberOfTotalPhraseQuestions: 0,
        numberOfPhraseMultipleChoiceQuestions: 0,
        numberOfPhraseMatchingQuestions: 0,
        numberOfPhraseFillInTheBlankQuestions: 0,
      }
    )
  );
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorPhraseQuestions({
      phraseMultipleChoiceQuestions: [],
      phraseMatchingQuestions: [],
      phraseFillInTheBlankQuestions: [],
    })
  );

  dispatch(
    sheetGeneratorStoreSliceActions.setPhrasesSelectionPopupActive(false)
  );
  dispatch(sheetGeneratorStoreSliceActions.setUserSelectedPhrases([]));
  dispatch(sheetGeneratorStoreSliceActions.setUserSelectedPhrasesTestType(""));
  dispatch(sheetGeneratorStoreSliceActions.setSelectedVocabTestType(""));
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetsMultipleChoiceVocabAnswers(
      []
    )
  );
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetsMultipleChoicePhrasesAnswers(
      []
    )
  );
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetSetupComplete(false)
  );

  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetsFillInTheBlankVocabAnswers(
      []
    )
  );
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetsFillInTheBlankPhrasesAnswers(
      []
    )
  );
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetsMatchingVocabAnswers([])
  );
  dispatch(
    sheetGeneratorStoreSliceActions.setPracticeSheetsMatchingPhrasesAnswers([])
  );
  dispatch(sheetGeneratorStoreSliceActions.setConjugationAnswerKey([]));
  dispatch(
    sheetGeneratorStoreSliceActions.setPhrasesMultipleChoiceAnswerKey([])
  );
  dispatch(sheetGeneratorStoreSliceActions.setVocabMultipleChoiceAnswerKey([]));
  dispatch(sheetGeneratorStoreSliceActions.setPhrasesMatchingAnswerKey([]));
  dispatch(sheetGeneratorStoreSliceActions.setVocabMatchingAnswerKey([]));
  dispatch(
    sheetGeneratorStoreSliceActions.setPhrasesFillInTheBlankAnswerKey([])
  );
  dispatch(sheetGeneratorStoreSliceActions.setVocabFillInTheBlankAnswerKey([]));
};
