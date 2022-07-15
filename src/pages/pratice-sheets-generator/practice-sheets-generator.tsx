import {
  TopContainer,
  AddIconButton,
  AddIconHolder,
  ResetButton,
} from "./practice-sheetes-generator-styled-components";
import NumberOfVocabQuestionsPopup from "./popups/number-of-vocab-questions/number-of-vocab-questions-popup";
import { useDispatch, useSelector } from "react-redux";
import { storeActions, DatabaseStates } from "../../store/store";
import VocabSelectionPopup from "./popups/vocab-selection-popup/vocab-selection-popup";
import NumberOfConjugationQuestionsPopup from "./popups/number-of-conjugation-questions-popup/number-of-conjugation-questions-popup";
import ConjugationSelectionPopup from "./popups/conjugation-selection-popup/conjugation-selection-popup";
import NumberOfPhraseQuestionsPopup from "./popups/number-of-phrase-question-popup/number-of-phrase-question-popup";
import PhraseSelectionPopup from "./popups/phrase-selection-popup/phrase-selection-popup";
import SheetGenerator from "./sheet-generator/sheet-generator";
import { useBeforeunload } from "react-beforeunload";

const PracticeSheetsGenerator = () => {
  const dispatch = useDispatch();
  const resetButtonHandler = () => {
    dispatch(storeActions.setNewPracticeSheetsPopupActive(true));
  };

  // Handeling use Data on refresh
  const vocabSelectPopupActive = useSelector(
    (state: DatabaseStates) => state.vocabSelectPopupActive
  );
  const practiceSheetGeneratorVocabQuestionSetup = useSelector(
    (state: DatabaseStates) => state.practiceSheetGeneratorVocabQuestionSetup
  );
  const userSelectedVocab = useSelector(
    (state: DatabaseStates) => state.userSelectedVocab
  );
  const selectedVocabTestType = useSelector(
    (state: DatabaseStates) => state.selectedVocabTestType
  );
  const numberOfConjugationQuestions = useSelector(
    (state: DatabaseStates) => state.numberOfConjugationQuestions
  );
  const numberOfConjugationPopupActive = useSelector(
    (state: DatabaseStates) => state.numberOfConjugationPopupActive
  );
  const conjugationVerbChoicePopup = useSelector(
    (state: DatabaseStates) => state.conjugationVerbChoicePopup
  );
  const userSelectedConjugations = useSelector(
    (state: DatabaseStates) => state.userSelectedConjugations
  );
  const userSelectedConjugationGrouping = useSelector(
    (state: DatabaseStates) => state.userSelectedConjugationGrouping
  );
  const numberOfPhraseQuestionsPopupActive = useSelector(
    (state: DatabaseStates) => state.numberOfPhraseQuestionsPopupActive
  );
  const practiceSheetGeneratorPhrasesQuestionSetup = useSelector(
    (state: DatabaseStates) => state.practiceSheetGeneratorPhrasesQuestionSetup
  );
  const phrasesSelectionPopupActive = useSelector(
    (state: DatabaseStates) => state.phrasesSelectionPopupActive
  );
  const userSelectedPhrases = useSelector(
    (state: DatabaseStates) => state.userSelectedPhrases
  );
  const userSelectedPhrasesTestType = useSelector(
    (state: DatabaseStates) => state.userSelectedPhrasesTestType
  );
  let refreshed: string = JSON.parse(
    localStorage.getItem("refreshed") ?? "false"
  );
  useBeforeunload(() => {
    localStorage.setItem("refreshed", "true");
    localStorage.setItem(
      "vocabSelectPopupActive",
      JSON.stringify(vocabSelectPopupActive)
    );
    localStorage.setItem(
      "practiceSheetGeneratorVocabQuestionSetup",
      JSON.stringify(practiceSheetGeneratorVocabQuestionSetup)
    );
    localStorage.setItem(
      "userSelectedVocab",
      JSON.stringify(userSelectedVocab)
    );
    localStorage.setItem(
      "selectedVocabTestType",
      JSON.stringify(selectedVocabTestType)
    );
    localStorage.setItem(
      "numberOfConjugationQuestions",
      JSON.stringify(numberOfConjugationQuestions)
    );
    localStorage.setItem(
      "numberOfConjugationPopupActive",
      JSON.stringify(numberOfConjugationPopupActive)
    );
    localStorage.setItem(
      "conjugationVerbChoicePopup",
      JSON.stringify(conjugationVerbChoicePopup)
    );
    localStorage.setItem(
      "userSelectedConjugations",
      JSON.stringify(userSelectedConjugations)
    );
    localStorage.setItem(
      "userSelectedConjugationGrouping",
      JSON.stringify(userSelectedConjugationGrouping)
    );
    localStorage.setItem(
      "numberOfPhraseQuestionsPopupActive",
      JSON.stringify(numberOfPhraseQuestionsPopupActive)
    );
    localStorage.setItem(
      "practiceSheetGeneratorPhrasesQuestionSetup",
      JSON.stringify(practiceSheetGeneratorPhrasesQuestionSetup)
    );
    localStorage.setItem(
      "phrasesSelectionPopupActive",
      JSON.stringify(phrasesSelectionPopupActive)
    );
    localStorage.setItem(
      "userSelectedPhrases",
      JSON.stringify(userSelectedPhrases)
    );
    localStorage.setItem(
      "userSelectedPhrasesTestType",
      JSON.stringify(userSelectedPhrasesTestType)
    );
  });

  if (refreshed) {
    const defaultPracticeSheetGeneratorPhrasesQuestionSetup = JSON.stringify({
      numberOfTotalPhraseQuestions: 0,
      numberOfPhraseMultipleChoiceQuestions: 0,
      numberOfPhraseMatchingQuestions: 0,
      numberOfPhraseFillInTheBlankQuesations: 0,
    });
    const defualtpracticeSheetGeneratorVocabQuestionSetup = JSON.stringify({
      numberOfTotalVocabQuestions: 0,
      numberOfVocabMultipleChoiceQuestions: 0,
      numberOfVocabMatchingQuestions: 0,
      numberOfVocabFillInTheBlankQuestions: 0,
    });
    // Setting the Items
    dispatch(
      storeActions.setVocabSelectPopupActive(
        localStorage.getItem("vocabSelectPopupActive") ?? "false"
      )
    );
    dispatch(
      storeActions.setPracticeSheetGeneratorVocabQuestionSetup(
        JSON.parse(
          localStorage.getItem("practiceSheetGeneratorVocabQuestionSetup") ??
            defualtpracticeSheetGeneratorVocabQuestionSetup
        )
      )
    );
    dispatch(
      storeActions.setUserSelectedVocab(
        JSON.parse(localStorage.getItem("userSelectedVocab") ?? "[]")
      )
    );
    dispatch(
      storeActions.setSelectedVocabTestType(
        JSON.parse(localStorage.getItem("selectedVocabTestType") ?? "")
      )
    );
    dispatch(
      storeActions.setNumberOfConjugationQuestions(
        JSON.parse(localStorage.getItem("numberOfConjugationQuestions") ?? "0")
      )
    );
    dispatch(
      storeActions.setNumberOfConjugationPopupActive(
        JSON.parse(
          localStorage.getItem("numberOfConjugationPopupActive") ?? "false"
        )
      )
    );
    dispatch(
      storeActions.setConjugationVerbChoicePopup(
        JSON.parse(
          localStorage.getItem("conjugationVerbChoicePopup") ?? "false"
        )
      )
    );
    dispatch(
      storeActions.setUserSelectedConjugations(
        JSON.parse(localStorage.getItem("userSelectedConjugations") ?? "[]")
      )
    );
    dispatch(
      storeActions.setUserSelectedConjugationGrouping(
        JSON.parse(
          localStorage.getItem("userSelectedConjugationGrouping") ?? " "
        )
      )
    );
    dispatch(
      storeActions.setNumberOfPhraseQuestionsPopupActive(
        JSON.parse(
          localStorage.getItem("numberOfPhraseQuestionsPopupActive") ?? "0"
        )
      )
    );
    dispatch(
      storeActions.setPracticeSheetGeneratorPhrasesQuestionSetup(
        JSON.parse(
          localStorage.getItem("practiceSheetGeneratorPhrasesQuestionSetup") ??
            defaultPracticeSheetGeneratorPhrasesQuestionSetup
        )
      )
    );
    dispatch(
      storeActions.setPhrasesSelectionPopupActive(
        JSON.parse(
          localStorage.getItem("phrasesSelectionPopupActive") ?? "false"
        )
      )
    );
    dispatch(
      storeActions.setUserSelectedPhrases(
        JSON.parse(localStorage.getItem("userSelectedPhrases") ?? "[]")
      )
    );
    dispatch(
      storeActions.setUserSelectedPhrasesTestType(
        JSON.parse(localStorage.getItem("userSelectedPhrasesTestType") ?? "[]")
      )
    );
    // removing Items
    localStorage.setItem("refreshed", "false");
    localStorage.removeItem("vocabSelectPopupActive");
    localStorage.removeItem("practiceSheetGeneratorVocabQuestionSetup");
    localStorage.removeItem("userSelectedVocab");
    localStorage.removeItem("selectedVocabTestType");
    localStorage.removeItem("numberOfConjugationQuestions");
    localStorage.removeItem("numberOfConjugationPopupActive");
    localStorage.removeItem("conjugationVerbChoicePopup");
    localStorage.removeItem("userSelectedConjugations");
    localStorage.removeItem("userSelectedConjugationGrouping");
    localStorage.removeItem("numberOfPhraseQuestionsPopupActive");
    localStorage.removeItem("practiceSheetGeneratorPhrasesQuestionSetup");
    localStorage.removeItem("phrasesSelectionPopupActive");
    localStorage.removeItem("userSelectedPhrases");
    localStorage.removeItem("userSelectedPhrasesTestType");
  }

  return (
    <TopContainer>
      <AddIconButton>
        <AddIconHolder />
      </AddIconButton>
      <ResetButton onClick={resetButtonHandler}>New / Reset</ResetButton>
      <NumberOfVocabQuestionsPopup />
      <VocabSelectionPopup />
      <NumberOfConjugationQuestionsPopup />
      <ConjugationSelectionPopup />
      <NumberOfPhraseQuestionsPopup />
      <PhraseSelectionPopup />
      <SheetGenerator />
    </TopContainer>
  );
};
export default PracticeSheetsGenerator;
