import { useAppSelector } from "../../../../store/hooks";
import { letterAnswerKeyCreator } from "../../../../components/functions/generic-functions";

import {
  MatchingTopContainer,
  StyledSelect,
  StyledOption,
  MatchingRowContainer,
  StyledTypography,
} from "../../quiz-question-creators/matching-choice-creator/quiz-matching-creator-styled-components";
import { QuestionNumberBox } from "../../quiz-question-creators/shared-styles/quiz-shared-styled-components";

import { styled } from "@mui/material";
import { arrayComparer } from "../../../../components/functions/generic-functions";
const CorrectAnswer = styled("p", {
  name: "CorrectAnswer",
  slot: "Wrapper",
})(({ theme }) => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  padding: "2.5px",
  backgroundColor: theme.palette.primary.dark,
  color: "rgb(67, 239, 76)",
  border: "none",
  position: "absolute",
  top: "50%",
  left: "50%",
  translateX: "-50%",
  translateY: "-50%",
}));


const QuizMatchingAnswered = () => {
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );

  const totalNumberOfQuestions = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );
  const vocabPhraseQuizMatchingAnswerKey = useAppSelector(
    (state) => state.quizStore.vocabPhraseQuizMatchingAnswerKey
  );
  const userSelectedMatchingAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedMatchingAnswers
  );
  const matchingTestTerms = useAppSelector((state)=>state.quizStore.matchingTestTerms);
  const matchingPromptTerms = useAppSelector(
    (state) => state.quizStore.matchingPromptTerms
  );
  const comparedMatchingArray = arrayComparer(
    vocabPhraseQuizMatchingAnswerKey,
    userSelectedMatchingAnswers
  );

  const numberOfMatchingQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions;
  const numberOfMultipleChoiceQuestion =
    userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions;
  const numberOfFillInBlankQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions;
  const startingQuestionValue =
    numberOfMultipleChoiceQuestion + numberOfFillInBlankQuestions + 1;
  const endingQuestionValue =
    numberOfMatchingQuestions +
    numberOfFillInBlankQuestions +
    numberOfMultipleChoiceQuestion;

  //Creating drop down Options
  const answerLettersArray = letterAnswerKeyCreator(numberOfMatchingQuestions);
  const renderReadyQuestionItems: JSX.Element[] = [];
  const renderReadyStyledOptions: JSX.Element[] = [];
  for (
    let letterIndex = 0;
    letterIndex < numberOfMatchingQuestions;
    letterIndex++
  ) {
    // select drop down handler

    renderReadyStyledOptions[letterIndex] = (
      <StyledOption key={`${letterIndex} letterIndex`}>
        {answerLettersArray[letterIndex]}
      </StyledOption>
    );
  }
  renderReadyStyledOptions.unshift(
    <StyledOption key={`${-1} letterIndex`}>{""}</StyledOption>
  );

  for (
    let questionIndex = 0;
    questionIndex < comparedMatchingArray.length;
    questionIndex++
  ) {
    renderReadyQuestionItems[questionIndex] = (
      <MatchingRowContainer key={`${questionIndex} Question Index`}>
        <StyledTypography sx={{ textAlign: "left" }} key={`${questionIndex} A`}>
          {matchingPromptTerms[questionIndex]}
        </StyledTypography>
        {!comparedMatchingArray[questionIndex] && (
          <CorrectAnswer>{comparedMatchingArray[questionIndex]}</CorrectAnswer>
        )}
        <StyledSelect
          disabled
          value={
            comparedMatchingArray[questionIndex]
              ? vocabPhraseQuizMatchingAnswerKey[questionIndex]
              : userSelectedMatchingAnswers[questionIndex]
          }
          sx={{
            border: `${
              comparedMatchingArray[questionIndex] ? "1px solid" : "1px solid"
            }`,
            borderColor: `${
              comparedMatchingArray[questionIndex]
                ? "rgb(67, 239, 76)"
                : "rgb(255, 17, 0)"
            }`,
            borderRadius: `${comparedMatchingArray[questionIndex] ? "5px" : "5px"}`,
          }}
        >
          {renderReadyStyledOptions}
        </StyledSelect>
        <StyledTypography
          sx={{ textAlign: "right" }}
          key={`${questionIndex} B`}
        >
          {answerLettersArray[questionIndex]}.{"  "}
          {matchingTestTerms[questionIndex]}
        </StyledTypography>
      </MatchingRowContainer>
    );
  }

  return (
    <MatchingTopContainer>
      <QuestionNumberBox>
        {startingQuestionValue}
        {"   "}-{"   "}
        {endingQuestionValue}
        {"   "} of {"   "}
        {totalNumberOfQuestions}
      </QuestionNumberBox>
      {renderReadyQuestionItems}
    </MatchingTopContainer>
  );
};
export default QuizMatchingAnswered;
