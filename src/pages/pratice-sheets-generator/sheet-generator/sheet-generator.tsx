import {
  TopContainer,
  MainContentContainer,
  TestContainer,
} from "./sheet-generator-styled-components";
import { useSelector } from "react-redux";
import { DatabaseStates } from "../../../store/store";
import MultipleChoiceCreator from "../practice-sheet-questions-creators/multiple-choice-creator/multiple-choice-creator";
import { Typography } from "@mui/material";
import { useRef } from "react";
import MatchingCreator from "../practice-sheet-questions-creators/matching-creator/matching-creator";

const SheetGenerator = () => {
  // Handeling use Data on refresh
  // const vocabSelectPopupActive = useSelector(
  //   (state: DatabaseStates) => state.vocabSelectPopupActive
  // );
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

  const userSelectedConjugations = useSelector(
    (state: DatabaseStates) => state.userSelectedConjugations
  );
  const userSelectedConjugationGrouping = useSelector(
    (state: DatabaseStates) => state.userSelectedConjugationGrouping
  );

  const practiceSheetGeneratorPhrasesQuestionSetup = useSelector(
    (state: DatabaseStates) => state.practiceSheetGeneratorPhrasesQuestionSetup
  );

  const userSelectedPhrases = useSelector(
    (state: DatabaseStates) => state.userSelectedPhrases
  );
  const userSelectedPhrasesTestType = useSelector(
    (state: DatabaseStates) => state.userSelectedPhrasesTestType
  );
  const testContainerRef = useRef(null);
  //  console.log(testContainerRef.current.clientHeight);
  // .clientHeight
  // Handeling new Page Section 1680px is the max height

  return (
    <TopContainer>
      <MainContentContainer>
        <>
          {/* Vocab Multiple Choice */}

          {practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMultipleChoiceQuestions !==
            0 && (
            <TestContainer ref={testContainerRef}>
              <Typography
                variant="h4"
                sx={{ marginTop: "10px", gridColumn: "1 /span 3" }}
              >
                Vocab Multiple Choice Questions
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  gridColumn: "1 /span 3",
                }}
              >
                Select the correct {selectedVocabTestType.toLowerCase()} term
              </Typography>

              <MultipleChoiceCreator
                inputArray={userSelectedVocab}
                databaseType="Vocab"
                testOn={selectedVocabTestType}
              />
            </TestContainer>
          )}
        </>
        {/* Vocab Matching Choice */}

        {practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMatchingQuestions !==
          0 && (
          <TestContainer ref={testContainerRef} sx={{ marginTop: "10px" }}>
            <Typography
              variant="h4"
              sx={{ marginTop: "10px", gridColumn: "1 /span 3" }}
            >
              Vocab Matching Questions
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                gridColumn: "1 /span 3",
              }}
            >
              Select the correct {selectedVocabTestType.toLowerCase()} term
            </Typography>
            <MatchingCreator
              inputArray={userSelectedVocab}
              databaseType="Vocab"
              testOn={selectedVocabTestType}
            />
          </TestContainer>
        )}
        {/* Vocab Fill In the Blank Choice */}
        {/* Conjugation */}
        {/* Phrases Multiple Choice */}
        {practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseMultipleChoiceQuestions !==
          0 && (
          <TestContainer ref={testContainerRef} sx={{ marginTop: "10px" }}>
            <Typography
              variant="h4"
              sx={{ marginTop: "10px", gridColumn: "1 /span 3" }}
            >
              Phrases Matching Questions
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                gridColumn: "1 /span 3",
              }}
            >
              Select the correct {userSelectedPhrasesTestType.toLowerCase()}{" "}
              term
            </Typography>
            <MultipleChoiceCreator
              inputArray={userSelectedPhrases}
              databaseType="Phrases"
              testOn={userSelectedPhrasesTestType}
            />
          </TestContainer>
        )}
        {/* Phrases Matching Choice */}
        {practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseFillInTheBlankQuestions !==
          0 && (
          <TestContainer ref={testContainerRef} sx={{ marginTop: "10px" }}>
            <Typography
              variant="h4"
              sx={{ marginTop: "10px", gridColumn: "1 /span 3" }}
            >
              Phrases Matching Questions
            </Typography>
            <Typography
              variant="h6"
              sx={{
                marginTop: "10px",
                marginBottom: "10px",
                gridColumn: "1 /span 3",
              }}
            >
              Select the correct {userSelectedPhrasesTestType.toLowerCase()}{" "}
              term
            </Typography>
            <MatchingCreator
              inputArray={userSelectedPhrases}
              databaseType="Vocab"
              testOn={userSelectedPhrasesTestType}
            />
          </TestContainer>
        )}
        {/* Phrases Fill In the Blank Choice */}
      </MainContentContainer>
    </TopContainer>
  );
};
export default SheetGenerator;
