import {
  TopContainer,
  ResetButton,
} from "./practice-sheets-generator-styled-components";
import NumberOfVocabQuestionsPopup from "./popups/number-of-vocab-questions/number-of-vocab-questions-popup";
import { mainStoreSliceActions } from "../../store/store";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import VocabSelectionPopup from "./popups/vocab-selection-popup/vocab-selection-popup";
import NumberOfConjugationQuestionsPopup from "./popups/number-of-conjugation-questions-popup/number-of-conjugation-questions-popup";
import ConjugationSelectionPopup from "./popups/conjugation-selection-popup/conjugation-selection-popup";
import NumberOfPhraseQuestionsPopup from "./popups/number-of-phrase-question-popup/number-of-phrase-question-popup";
import PhraseSelectionPopup from "./popups/phrase-selection-popup/phrase-selection-popup";
import SheetGenerator from "./sheet-generator/sheet-generator";
// import { useBeforeunload } from "react-beforeunload";
import { useEffect, useState } from "react";
import { practiceSheetReset } from "../../components/functions/practice-sheet-reset-function";

const PracticeSheetsGenerator = () => {
  const dispatch = useAppDispatch();
  const resetButtonHandler = () => {
    practiceSheetReset(true, dispatch);
  };
  const activePage = useAppSelector((state) => state.mainStore.activePage);
  // useEffect
  useEffect(() => {
    if (activePage !== "Practice Sheet Generator") {
      dispatch(mainStoreSliceActions.setActivePage("Practice Sheet Generator"));
    }
  });
  const [initialPopupActive, setInitialPopupActive] = useState(false);

  // // Handeling use Data on refresh
  const newPracticeSheetsPopupActive = useAppSelector(
    (state) => state.sheetGenerator.newPracticeSheetsPopupActive
  );
  const vocabSelectPopupActive = useAppSelector(
    (state) => state.sheetGenerator.vocabSelectPopupActive
  );
  // const practiceSheetGeneratorVocabQuestionSetup = useAppSelector(
  //   (state: DatabaseStates) => state.practiceSheetGeneratorVocabQuestionSetup
  // );
  // const userSelectedVocab = useAppSelector(
  //   (state: DatabaseStates) => state.userSelectedVocab
  // );
  // const selectedVocabTestType = useAppSelector(
  //   (state: DatabaseStates) => state.selectedVocabTestType
  // );
  // const numberOfConjugationQuestions = useAppSelector(
  //   (state: DatabaseStates) => state.numberOfConjugationQuestions
  // );
  const numberOfConjugationPopupActive = useAppSelector(
    (state) => state.sheetGenerator.numberOfConjugationPopupActive
  );
  const conjugationVerbChoicePopup = useAppSelector(
    (state) => state.sheetGenerator.conjugationVerbChoicePopup
  );
  // const userSelectedConjugations = useAppSelector(
  //   (state: DatabaseStates) => state.userSelectedConjugations
  // );
  // const userSelectedConjugationGrouping = useAppSelector(
  //   (state: DatabaseStates) => state.userSelectedConjugationGrouping
  // );
  const numberOfPhraseQuestionsPopupActive = useAppSelector(
    (state) => state.sheetGenerator.numberOfPhraseQuestionsPopupActive
  );
  // const practiceSheetGeneratorPhrasesQuestionSetup = useAppSelector(
  //   (state: DatabaseStates) => state.practiceSheetGeneratorPhrasesQuestionSetup
  // );
  const phrasesSelectionPopupActive = useAppSelector(
    (state) => state.sheetGenerator.phrasesSelectionPopupActive
  );
  // const userSelectedPhrases = useAppSelector(
  //   (state: DatabaseStates) => state.userSelectedPhrases
  // );
  // const userSelectedPhrasesTestType = useAppSelector(
  //   (state: DatabaseStates) => state.userSelectedPhrasesTestType
  // );
  const firebaseDataLoaded = useAppSelector(
    (state) => state.mainStore.firebaseDataLoaded
  );

  // let refreshed: boolean = JSON.parse(
  //   localStorage.getItem("refreshed") ?? "false"
  // );
  // useBeforeunload(() => {
  //   localStorage.setItem("refreshed", "true");
  //   localStorage.setItem(
  //     "vocabSelectPopupActive",
  //     JSON.stringify(vocabSelectPopupActive)
  //   );
  //   localStorage.setItem(
  //     "practiceSheetGeneratorVocabQuestionSetup",
  //     JSON.stringify(practiceSheetGeneratorVocabQuestionSetup)
  //   );
  //   localStorage.setItem(
  //     "userSelectedVocab",
  //     JSON.stringify(userSelectedVocab)
  //   );
  //   localStorage.setItem(
  //     "selectedVocabTestType",
  //     JSON.stringify(selectedVocabTestType)
  //   );
  //   localStorage.setItem(
  //     "numberOfConjugationQuestions",
  //     JSON.stringify(numberOfConjugationQuestions)
  //   );
  //   localStorage.setItem(
  //     "numberOfConjugationPopupActive",
  //     JSON.stringify(numberOfConjugationPopupActive)
  //   );
  //   localStorage.setItem(
  //     "conjugationVerbChoicePopup",
  //     JSON.stringify(conjugationVerbChoicePopup)
  //   );
  //   localStorage.setItem(
  //     "userSelectedConjugations",
  //     JSON.stringify(userSelectedConjugations)
  //   );
  //   localStorage.setItem(
  //     "userSelectedConjugationGrouping",
  //     JSON.stringify(userSelectedConjugationGrouping)
  //   );
  //   localStorage.setItem(
  //     "numberOfPhraseQuestionsPopupActive",
  //     JSON.stringify(numberOfPhraseQuestionsPopupActive)
  //   );
  //   localStorage.setItem(
  //     "practiceSheetGeneratorPhrasesQuestionSetup",
  //     JSON.stringify(practiceSheetGeneratorPhrasesQuestionSetup)
  //   );
  //   localStorage.setItem(
  //     "phrasesSelectionPopupActive",
  //     JSON.stringify(phrasesSelectionPopupActive)
  //   );
  //   localStorage.setItem(
  //     "userSelectedPhrases",
  //     JSON.stringify(userSelectedPhrases)
  //   );
  //   localStorage.setItem(
  //     "userSelectedPhrasesTestType",
  //     JSON.stringify(userSelectedPhrasesTestType)
  //   );
  // });
  // console.log(refreshed);
  // if (refreshed) {
  //   const defaultPracticeSheetGeneratorPhrasesQuestionSetup = JSON.stringify({
  //     numberOfTotalPhraseQuestions: 0,
  //     numberOfPhraseMultipleChoiceQuestions: 0,
  //     numberOfPhraseMatchingQuestions: 0,
  //     numberOfPhraseFillInTheBlankQuesations: 0,
  //   });
  //   const defualtpracticeSheetGeneratorVocabQuestionSetup = JSON.stringify({
  //     numberOfTotalVocabQuestions: 0,
  //     numberOfVocabMultipleChoiceQuestions: 0,
  //     numberOfVocabMatchingQuestions: 0,
  //     numberOfVocabFillInTheBlankQuestions: 0,
  //   });
  //   // Setting the Items
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setVocabSelectPopupActive(
  //       localStorage.getItem("vocabSelectPopupActive") ?? "false"
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorVocabQuestionSetup(
  //       JSON.parse(
  //         localStorage.getItem("practiceSheetGeneratorVocabQuestionSetup") ??
  //           defualtpracticeSheetGeneratorVocabQuestionSetup
  //       )
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setUserSelectedVocab(
  //       JSON.parse(localStorage.getItem("userSelectedVocab") ?? "[]")
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setSelectedVocabTestType(
  //       JSON.parse(localStorage.getItem("selectedVocabTestType") ?? "")
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setNumberOfConjugationQuestions(
  //       JSON.parse(localStorage.getItem("numberOfConjugationQuestions") ?? "0")
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setNumberOfConjugationPopupActive(
  //       JSON.parse(
  //         localStorage.getItem("numberOfConjugationPopupActive") ?? "false"
  //       )
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setConjugationVerbChoicePopup(
  //       JSON.parse(
  //         localStorage.getItem("conjugationVerbChoicePopup") ?? "false"
  //       )
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setUserSelectedConjugations(
  //       JSON.parse(localStorage.getItem("userSelectedConjugations") ?? "[]")
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setUserSelectedConjugationGrouping(
  //       JSON.parse(
  //         localStorage.getItem("userSelectedConjugationGrouping") ?? " "
  //       )
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setNumberOfPhraseQuestionsPopupActive(
  //       JSON.parse(
  //         localStorage.getItem("numberOfPhraseQuestionsPopupActive") ?? "0"
  //       )
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorPhrasesQuestionSetup(
  //       JSON.parse(
  //         localStorage.getItem("practiceSheetGeneratorPhrasesQuestionSetup") ??
  //           defaultPracticeSheetGeneratorPhrasesQuestionSetup
  //       )
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setPhrasesSelectionPopupActive(
  //       JSON.parse(
  //         localStorage.getItem("phrasesSelectionPopupActive") ?? "false"
  //       )
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setUserSelectedPhrases(
  //       JSON.parse(localStorage.getItem("userSelectedPhrases") ?? "[]")
  //     )
  //   );
  //   dispatch(
  //     sheetGeneratorStoreSliceActions.setUserSelectedPhrasesTestType(
  //       JSON.parse(localStorage.getItem("userSelectedPhrasesTestType") ?? "[]")
  //     )
  //   );
  //   // removing Items
  //   localStorage.setItem("refreshed", "false");
  //   localStorage.removeItem("vocabSelectPopupActive");
  //   localStorage.removeItem("practiceSheetGeneratorVocabQuestionSetup");
  //   localStorage.removeItem("userSelectedVocab");
  //   localStorage.removeItem("selectedVocabTestType");
  //   localStorage.removeItem("numberOfConjugationQuestions");
  //   localStorage.removeItem("numberOfConjugationPopupActive");
  //   localStorage.removeItem("conjugationVerbChoicePopup");
  //   localStorage.removeItem("userSelectedConjugations");
  //   localStorage.removeItem("userSelectedConjugationGrouping");
  //   localStorage.removeItem("numberOfPhraseQuestionsPopupActive");
  //   localStorage.removeItem("practiceSheetGeneratorPhrasesQuestionSetup");
  //   localStorage.removeItem("phrasesSelectionPopupActive");
  //   localStorage.removeItem("userSelectedPhrases");
  //   localStorage.removeItem("userSelectedPhrasesTestType");
  // }

  // Handeling double ocmpoonent updat error
  // "finished question set up"
  useEffect(() => {
    if (firebaseDataLoaded && newPracticeSheetsPopupActive) {
      setInitialPopupActive(true);
    }
  }, [firebaseDataLoaded, newPracticeSheetsPopupActive]);

  return (
    <TopContainer>
      {/* <AddIconButton>
        <AddIconHolder />
      </AddIconButton> */}
      <ResetButton onClick={resetButtonHandler}>New / Reset</ResetButton>
      {initialPopupActive && <NumberOfVocabQuestionsPopup />}
      {vocabSelectPopupActive && <VocabSelectionPopup />}
      {numberOfConjugationPopupActive && <NumberOfConjugationQuestionsPopup />}
      {conjugationVerbChoicePopup && <ConjugationSelectionPopup />}
      {numberOfPhraseQuestionsPopupActive && <NumberOfPhraseQuestionsPopup />}
      {phrasesSelectionPopupActive && <PhraseSelectionPopup />}
      <SheetGenerator />
    </TopContainer>
  );
};
export default PracticeSheetsGenerator;
//added the popup active requiremetn so taht when the popup is et to false insid e of it / it wil lsimply clsoe and not rerender while updating the main page
