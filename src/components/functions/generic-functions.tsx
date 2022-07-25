import { storeActions } from "../../store/store";

export const randomNumberGenerator = (
  min: number,
  max: number,
  notThisNumber: number
) => {
  let randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
  while (randomNumberGenerated === notThisNumber) {
    randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return randomNumberGenerated;
};
export const randomNumberGeneratorWithNumberArrayRestriction = (
  min: number,
  max: number,
  notTheseNumber: number[]
) => {
  let randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
  while (notTheseNumber.includes(randomNumberGenerated)) {
    randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return randomNumberGenerated;
};
interface SelectedItemsTypes {
  french?: string;
  english?: string;
}
export const questionAnswerCreator = (
  numberOfQuestionsOne: number,
  numberOfQuestionsTwo: number,
  numberOfQuestionsThree: number,
  inputArray: SelectedItemsTypes[]
) => {
  const inputLength = inputArray.length;

  const arrayOfUsedNumbers: number[] = [inputLength];
  const arrayOfDataOne: SelectedItemsTypes[] = [];
  const arrayOfDataTwo: SelectedItemsTypes[] = [];
  const arrayOfDataThree: SelectedItemsTypes[] = [];

  let randomNumber = randomNumberGenerator(0, inputLength - 1, inputLength);

  for (let a = 0; a < numberOfQuestionsOne; a++) {
    while (arrayOfUsedNumbers.includes(randomNumber)) {
      randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
        0,
        inputLength - 1,
        arrayOfUsedNumbers
      );
    }
    arrayOfUsedNumbers.push(randomNumber);
    arrayOfDataOne.push(inputArray[randomNumber]);
  }

  for (let b = 0; b < numberOfQuestionsTwo; b++) {
    while (arrayOfUsedNumbers.includes(randomNumber)) {
      randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
        0,
        inputLength - 1,
        arrayOfUsedNumbers
      );
    }
    arrayOfUsedNumbers.push(randomNumber);
    arrayOfDataTwo.push(inputArray[randomNumber]);
  }

  for (let c = 0; c < numberOfQuestionsThree; c++) {
    while (arrayOfUsedNumbers.includes(randomNumber)) {
      randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
        0,
        inputLength - 1,
        arrayOfUsedNumbers
      );
    }
    arrayOfUsedNumbers.push(randomNumber);
    arrayOfDataThree.push(inputArray[randomNumber]);
  }

  return [arrayOfDataOne, arrayOfDataTwo, arrayOfDataThree];
};

export const practiceSheetReset = (
  newButtonClicked: boolean,
  dispatch: any
) => {
  if (newButtonClicked) {
    dispatch(storeActions.setNewPracticeSheetsPopupActive(true));
  } else {
    dispatch(storeActions.setNewPracticeSheetsPopupActive(false));
  }
  dispatch(storeActions.setVocabSelectPopupActive(false));
  dispatch(
    storeActions.setPracticeSheetGeneratorVocabQuestionSetup({
      numberOfTotalVocabQuestions: 0,
      numberOfVocabMultipleChoiceQuestions: 0,
      numberOfVocabMatchingQuestions: 0,
      numberOfVocabFillInTheBlankQuestions: 0,
    })
  );

  dispatch(
    storeActions.setPracticeSheetGeneratorVocabQuestions({
      vocabMultipleChoiceQuestions: [],
      vocabMatchingQuestions: [],
      vocabFillInTheBlankQuestions: [],
    })
  );
  dispatch(storeActions.setUserSelectedVocab([]));
  dispatch(storeActions.setNumberOfConjugationPopupActive(false));
  dispatch(storeActions.setNumberOfConjugationQuestions(0));
  dispatch(storeActions.setConjugationVerbChoicePopup(false));
  dispatch(storeActions.setUserSelectedConjugations([]));
  dispatch(storeActions.setUserSelectedConjugationGrouping(""));
  dispatch(storeActions.setNumberOfPhraseQuestionsPopupActive(false));
  dispatch(
    storeActions.setPracticeSheetGeneratorPhrasesQuestionSetup({
      numberOfTotalPhraseQuestions: 0,
      numberOfPhraseMultipleChoiceQuestions: 0,
      numberOfPhraseMatchingQuestions: 0,
      numberOfPhraseFillInTheBlankQuestions: 0,
    })
  );
  dispatch(
    storeActions.setPracticeSheetGeneratorPhraseQuestions({
      phraseMultipleChoiceQuestions: [],
      phraseMatchingQuestions: [],
      phraseFillInTheBlankQuestions: [],
    })
  );

  dispatch(storeActions.setPhrasesSelectionPopupActive(false));
  dispatch(storeActions.setUserSelectedPhrases([]));
  dispatch(storeActions.setUserSelectedPhrasesTestType(""));
  dispatch(storeActions.setSelectedVocabTestType(""));
  dispatch(storeActions.setPracticeSheetsMultipleChoiceVocabAnswers([]));
  dispatch(storeActions.setPracticeSheetsMultipleChoicePhrasesAnswers([]));
  dispatch(storeActions.setPracticeSheetSetupComplete(false));

  dispatch(storeActions.setPracticeSheetsFillInTheBlankVocabAnswers([]));
  dispatch(storeActions.setPracticeSheetsFillInTheBlankPhrasesAnswers([]));
  dispatch(storeActions.setPracticeSheetsMatchingVocabAnswers([]));
  dispatch(storeActions.setPracticeSheetsMatchingPhrasesAnswers([]));
  dispatch(storeActions.setConjugationAnswerKey([]));
  dispatch(storeActions.setPhrasesMultipleChoiceAnswerKey([]));
  dispatch(storeActions.setVocabMultipleChoiceAnswerKey([]));
  dispatch(storeActions.setPhrasesMatchingAnswerKey([]));
  dispatch(storeActions.setVocabMatchingAnswerKey([]));
  dispatch(storeActions.setPhrasesFillInTheBlankAnswerKey([]));
  dispatch(storeActions.setVocabFillInTheBlankAnswerKey([]));
};
