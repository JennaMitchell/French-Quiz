import {
  TopContainer,
  MainContentContainer,
  TestContainer,
  TestSectionTitle,
  TestSectionDescription,
} from "./sheet-generator-styled-components";

import { useAppSelector } from "../../../store/hooks";
import MultipleChoiceCreator from "../practice-sheet-questions-creators/multiple-choice-creator/multiple-choice-creator";
import { useRef } from "react";
import MatchingCreator from "../practice-sheet-questions-creators/matching-creator/matching-creator";
import FillInBlankCreator from "../practice-sheet-questions-creators/fill-in-blank-creator/fill-in-blank-creator";
import ConjugationTableCreator from "../practice-sheet-questions-creators/conjugation-table-creator/conjugation-table-creator";
import { useEffect, useState } from "react";
import AnswerKey from "../practice-sheet-questions-creators/answer-key/answer-key";

const SheetGenerator = () => {
  // Handeling use Data on refresh
  // const vocabSelectPopupActive = useAppSelector(
  //   (state: DatabaseStates) => state.vocabSelectPopupActive
  // );
  const practiceSheetGeneratorVocabQuestionSetup = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetGeneratorVocabQuestionSetup
  );

  const selectedVocabTestType = useAppSelector(
    (state) => state.sheetGenerator.selectedVocabTestType
  );
  const practiceSheetGeneratorPhraseQuestions = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetGeneratorPhraseQuestions
  );
  const practiceSheetGeneratorVocabQuestions = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetGeneratorVocabQuestions
  );

  const numberOfConjugationQuestions = useAppSelector(
    (state) => state.sheetGenerator.numberOfConjugationQuestions
  );

  const userSelectedConjugations = useAppSelector(
    (state) => state.sheetGenerator.userSelectedConjugations
  );
  const userSelectedConjugationGrouping = useAppSelector(
    (state) => state.sheetGenerator.userSelectedConjugationGrouping
  );

  const practiceSheetGeneratorPhrasesQuestionSetup = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetGeneratorPhrasesQuestionSetup
  );

  const userSelectedPhrasesTestType = useAppSelector(
    (state) => state.sheetGenerator.userSelectedPhrasesTestType
  );
  const practiceSheetSetupComplete = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetSetupComplete
  );
  const testContainerRef = useRef(null);
  //  console.log(testContainerRef.current.clientHeight);
  // .clientHeight
  // Handeling new Page Section 1680px is the max height
  const [
    vocabMultipleChoiceQuestionsActive,
    setVocabMultipleChoiceQuestionsActive,
  ] = useState(false);
  const [vocabMatchingQuestionsActive, setVocabMatchingQuestionsActive] =
    useState(false);
  const [
    vocabFillInTheBlankQuestionsActive,
    setVocabFillInTheBlankQuestionsActive,
  ] = useState(false);

  //

  useEffect(() => {
    if (
      practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMultipleChoiceQuestions !==
        0 &&
      practiceSheetGeneratorVocabQuestions.vocabMultipleChoiceQuestions
        .length !== 0
    ) {
      setVocabMultipleChoiceQuestionsActive(true);
    } else {
      if (vocabMultipleChoiceQuestionsActive) {
        setVocabMultipleChoiceQuestionsActive(false);
      }
    }
    if (
      practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMatchingQuestions !==
        0 &&
      practiceSheetGeneratorVocabQuestions.vocabMatchingQuestions.length !== 0
    ) {
      setVocabMatchingQuestionsActive(true);
    } else {
      if (vocabMatchingQuestionsActive) {
        setVocabMatchingQuestionsActive(false);
      }
    }
    if (
      practiceSheetGeneratorVocabQuestionSetup.numberOfVocabFillInTheBlankQuestions !==
        0 &&
      practiceSheetGeneratorVocabQuestions.vocabFillInTheBlankQuestions
        .length !== 0
    ) {
      setVocabFillInTheBlankQuestionsActive(true);
    } else {
      if (vocabFillInTheBlankQuestionsActive) {
        setVocabFillInTheBlankQuestionsActive(false);
      }
    }
  }, [
    practiceSheetGeneratorVocabQuestions.vocabMultipleChoiceQuestions.length,
    practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMultipleChoiceQuestions,
    vocabMultipleChoiceQuestionsActive,
    practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMatchingQuestions,
    practiceSheetGeneratorVocabQuestions.vocabMatchingQuestions.length,
    vocabMatchingQuestionsActive,
    practiceSheetGeneratorVocabQuestionSetup.numberOfVocabFillInTheBlankQuestions,
    practiceSheetGeneratorVocabQuestions.vocabFillInTheBlankQuestions.length,
    vocabFillInTheBlankQuestionsActive,
  ]);

  /// Answer Key Active

  return (
    <TopContainer>
      <MainContentContainer>
        <>
          {/* Vocab Multiple Choice */}

          {vocabMultipleChoiceQuestionsActive && practiceSheetSetupComplete && (
            <TestContainer
              ref={testContainerRef}
              sx={{ justifyContent: "space-evenly" }}
            >
              <TestSectionTitle
                variant="h4"
                sx={{
                  "@media(max-width:1280px)": {
                    gridColumn: "1 / span 2",
                  },
                  "@media(max-width:880px)": {
                    gridColumn: "1 / span 1",
                  },
                }}
              >
                Vocab Multiple Choice Questions
              </TestSectionTitle>
              <TestSectionDescription
                variant="h6"
                sx={{
                  "@media(max-width:1280px)": {
                    gridColumn: "1 / span 2",
                  },
                  "@media(max-width:880px)": {
                    gridColumn: "1 / span 1",
                  },
                }}
              >
                Select the correct {selectedVocabTestType.toLowerCase()}{" "}
                translation
              </TestSectionDescription>

              <MultipleChoiceCreator
                inputArray={
                  practiceSheetGeneratorVocabQuestions.vocabMultipleChoiceQuestions
                }
                databaseType="Vocab"
                testOn={selectedVocabTestType}
              />
            </TestContainer>
          )}
        </>
        {/* Vocab Matching Choice */}

        {vocabMatchingQuestionsActive && practiceSheetSetupComplete && (
          <TestContainer
            ref={testContainerRef}
            sx={{
              marginTop: "10px",
              gridTemplateColumn: "100%",
              justifyContent: "center",
            }}
          >
            <TestSectionTitle
              variant="h4"
              sx={{ gridColumn: "1/span 3", textAlign: "center" }}
            >
              Vocab Matching Questions
            </TestSectionTitle>
            <TestSectionDescription
              variant="h6"
              sx={{ gridColumn: "1/span 3" }}
            >
              Match the correct {selectedVocabTestType.toLowerCase()} term
            </TestSectionDescription>
            <MatchingCreator
              inputArray={
                practiceSheetGeneratorVocabQuestions.vocabMatchingQuestions
              }
              databaseType="Vocab"
              testOn={selectedVocabTestType}
            />
          </TestContainer>
        )}
        {/* Vocab Fill In the Blank Choice */}
        {vocabFillInTheBlankQuestionsActive && practiceSheetSetupComplete && (
          <TestContainer
            ref={testContainerRef}
            sx={{
              marginTop: "10px",
              gridTemplateColumns: "max-content",
              justifyContent: "center",
              rowGap: "10px",
            }}
          >
            <TestSectionTitle variant="h4">
              Vocab Fill in the Blank
            </TestSectionTitle>
            <TestSectionDescription variant="h6" sx={{ marginTop: "0px" }}>
              Translate the terms into {selectedVocabTestType.toLowerCase()}
            </TestSectionDescription>
            <FillInBlankCreator
              inputArray={
                practiceSheetGeneratorVocabQuestions.vocabFillInTheBlankQuestions
              }
              databaseType="Vocab"
              testOn={selectedVocabTestType}
            />
          </TestContainer>
        )}
        {/* Conjugation */}
        {numberOfConjugationQuestions !== 0 &&
          userSelectedConjugations.length !== 0 &&
          practiceSheetSetupComplete && (
            <TestContainer
              ref={testContainerRef}
              sx={{
                gridTemplateColumns: "repeat(2,max-content)",
                justifyContent: "center",
                columnGap: "20px",
                paddingLeft: "20px",
              }}
            >
              <TestSectionTitle variant="h4">
                Conjugation Practice
              </TestSectionTitle>
              <TestSectionDescription variant="h6">
                Conjugation the following verbs
              </TestSectionDescription>
              <ConjugationTableCreator
                inputArray={userSelectedConjugations}
                groupBy={userSelectedConjugationGrouping}
              />
            </TestContainer>
          )}
        {/* Phrases Multiple Choice */}
        {practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseMultipleChoiceQuestions !==
          0 &&
          practiceSheetGeneratorPhraseQuestions.phraseMultipleChoiceQuestions
            .length !== 0 &&
          practiceSheetSetupComplete && (
            <TestContainer
              ref={testContainerRef}
              sx={{
                marginTop: "10px",
                gridTemplateColumn: "100%",
                justifyContent: "center",
              }}
            >
              <TestSectionTitle variant="h4">
                Phrases Multiple Choice
              </TestSectionTitle>
              <TestSectionDescription variant="h6">
                Select the correct {userSelectedPhrasesTestType.toLowerCase()}{" "}
                translation
              </TestSectionDescription>
              <MultipleChoiceCreator
                inputArray={
                  practiceSheetGeneratorPhraseQuestions.phraseMultipleChoiceQuestions
                }
                databaseType="Phrases"
                testOn={userSelectedPhrasesTestType}
              />
            </TestContainer>
          )}
        {/* Phrases Matching Choice */}
        {practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseMatchingQuestions !==
          0 &&
          practiceSheetGeneratorPhraseQuestions.phraseMatchingQuestions
            .length !== 0 &&
          practiceSheetSetupComplete && (
            <TestContainer
              ref={testContainerRef}
              sx={{
                marginTop: "10px",
                justifyContent: "center",
                columnGap: "10px",
              }}
            >
              <TestSectionTitle variant="h4" sx={{ width: "max-content" }}>
                Phrases Matching Questions
              </TestSectionTitle>
              <TestSectionDescription
                variant="h6"
                sx={{
                  gridColumn: "1/span 3",
                  width: "max-content",
                  justifySelf: "center",
                }}
              >
                Match the correct {userSelectedPhrasesTestType.toLowerCase()}{" "}
                term
              </TestSectionDescription>
              <MatchingCreator
                inputArray={
                  practiceSheetGeneratorPhraseQuestions.phraseMatchingQuestions
                }
                databaseType="Phrases"
                testOn={userSelectedPhrasesTestType}
              />
            </TestContainer>
          )}
        {/* Phrases Fill In the Blank Choice */}

        {practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseFillInTheBlankQuestions !==
          0 &&
          practiceSheetGeneratorPhraseQuestions.phraseFillInTheBlankQuestions
            .length !== 0 &&
          practiceSheetSetupComplete && (
            <TestContainer
              ref={testContainerRef}
              sx={{
                marginTop: "10px",
                gridTemplateColumns: "max-content max-content",

                display: "grid",
                width: "max(100%,100%)",

                "media(max-width:560)": {
                  width: "max(max-content,max-content)",
                  gridTemplateColumns: "max-content",
                  justifySelf: "center",
                },
              }}
            >
              <TestSectionTitle variant="h4">
                Fill in the Blank Phrase Questions
              </TestSectionTitle>
              <TestSectionDescription
                variant="h6"
                sx={{
                  marginTop: "0px",
                  "media(max-width:560)": { width: "max(300px,300px)" },
                }}
              >
                Translate the terms into{" "}
                {userSelectedPhrasesTestType.toLowerCase()}
              </TestSectionDescription>
              <FillInBlankCreator
                inputArray={
                  practiceSheetGeneratorPhraseQuestions.phraseFillInTheBlankQuestions
                }
                databaseType="Phrases"
                testOn={userSelectedPhrasesTestType}
              />
            </TestContainer>
          )}
        {practiceSheetSetupComplete && <AnswerKey />}
      </MainContentContainer>
    </TopContainer>
  );
};
export default SheetGenerator;
