import {
  TopContainer,
  AddIconButton,
  AddIconHolder,
  ResetButton,
} from "./practice-sheetes-generator-styled-components";
import VocabPopup from "./popups/vocab-popup/vocab-popup";
import { useDispatch } from "react-redux";
import { storeActions } from "../../store/store";
import VocabSelectionPopup from "./popups/vocab-selection-popup/vocab-selection-popup";
import NumberOfConjugationQuestionsPopup from "./popups/number-of-conjugation-questions-popup/number-of-conjugation-questions-popup";
import ConjugationSelectionPopup from "./popups/conjugation-selection-popup/conjugation-selection-popup";
const PracticeSheetsGenerator = () => {
  const dispatch = useDispatch();
  const resetButtonHandler = () => {
    dispatch(storeActions.setNewPracticeSheetsPopupActive(true));
  };

  return (
    <TopContainer>
      <AddIconButton>
        <AddIconHolder />
      </AddIconButton>
      <ResetButton onClick={resetButtonHandler}>Reset / New</ResetButton>
      <VocabPopup />
      <VocabSelectionPopup />
      <NumberOfConjugationQuestionsPopup />
      <ConjugationSelectionPopup />
    </TopContainer>
  );
};
export default PracticeSheetsGenerator;
