import {
  TopContainer,
  MainContentContainer,
} from "./sheet-generator-styled-components";
import { useSelector } from "react-redux";
import { DatabaseStates } from "../../../store/store";
import MultipleChoiceCreator from "../practice-sheet-questions-creators/multiple-choice-creator/multiple-choice-creator";

const SheetGenerator = () => {
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
  return (
    <TopContainer>
      <MainContentContainer>
        {/* Vocab Multiple Choice */}
        <MultipleChoiceCreator
          inputArray={userSelectedVocab}
          numberOfQuestions={
            practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMultipleChoiceQuestions
          }
          databaseType={"Vocab"}
          testOn={selectedVocabTestType}
        />
        {/* Vocab Matching Choice */}
        {/* Vocab Fill In the Blank Choice */}
        {/* Conjugation */}
        {/* Phrases Multiple Choice */}
        <MultipleChoiceCreator
          inputArray={userSelectedPhrases}
          numberOfQuestions={
            practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseMultipleChoiceQuestions
          }
          databaseType={"Phrases"}
          testOn={userSelectedPhrasesTestType}
        />
        {/* Phrases Matching Choice */}
        {/* Phrases Fill In the Blank Choice */}
      </MainContentContainer>
    </TopContainer>
  );
};
export default SheetGenerator;
