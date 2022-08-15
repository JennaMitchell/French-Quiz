import { useAppSelector } from "../../../../store/hooks";
import { letterAnswerKeyCreator } from "../../../../components/functions/generic-functions";
import {
  StyledPopupSelect,
  StyledPopupOption,
} from "../../../../components/generic-components/generic-popup-components";
import {
  MatchingTopContainer,
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
  padding: "0px",
  backgroundColor: theme.palette.primary.dark,
  color: "rgb(67, 239, 76)",
  border: "none",
  position: "absolute",
  top: "50%",
  left: "52.25%",
  translate: "-50% -50%",
  zIndex: "2",
  fontSize: "16px",
  lineHeight: "16px",
  "@media(max-width:480px)": {
    fontSize: "16px",
  },
  "@media(max-width:375px)": {
    fontSize: "12px",
  },
}));

const QuizMatchingAnswered = () => {
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );

  const totalNumberOfQuestions = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );
  const matchingAnswerKey = useAppSelector(
    (state) => state.quizStore.matchingAnswerKey
  );
  const userSelectedMatchingAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedMatchingAnswers
  );

  const matchingTestTerms = useAppSelector(
    (state) => state.quizStore.matchingTestTerms
  );
  const matchingPromptTerms = useAppSelector(
    (state) => state.quizStore.matchingPromptTerms
  );
  const comparedMatchingArray = arrayComparer(
    matchingAnswerKey,
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
      <StyledPopupOption key={`${letterIndex} letterIndex`}>
        {answerLettersArray[letterIndex]}
      </StyledPopupOption>
    );
  }
  renderReadyStyledOptions.unshift(
    <StyledPopupOption key={`${-1} letterIndex`}>{""}</StyledPopupOption>
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
          <CorrectAnswer>{matchingAnswerKey[questionIndex]}</CorrectAnswer>
        )}
        <StyledPopupSelect
          disabled
          value={
            comparedMatchingArray[questionIndex]
              ? matchingAnswerKey[questionIndex]
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
            borderRadius: `${
              comparedMatchingArray[questionIndex] ? "5px" : "5px"
            }`,
            textDecoration: `${
              !comparedMatchingArray[questionIndex] && "line-through"
            }`,
            textDecorationColor: `${
              !comparedMatchingArray[questionIndex] && "rgb(255, 17, 0)"
            }`,
            textDecorationThickness: `${
              !comparedMatchingArray[questionIndex] && "2px"
            }`,
          }}
        >
          {renderReadyStyledOptions}
        </StyledPopupSelect>
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
