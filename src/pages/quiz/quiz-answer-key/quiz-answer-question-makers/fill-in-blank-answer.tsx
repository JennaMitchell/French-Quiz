import { useAppSelector } from "../../../../store/hooks";

import { UserQuizQuestionSetup } from "../../../../store/quiz-store-slice";
import {
  QuestionNumberBox,
  TopContainer,
  QuestionContainer,
  QuestionTypography,
  TitleText,
  StyledTextField,
} from "../../quiz-question-creators/shared-styles/quiz-shared-styled-components";
import { styled } from "@mui/material";
import { arrayComparer } from "../../../../components/functions/generic-functions";
const CorrectAnswerText = styled("p", {
  name: "IncorrectAnswerText",
  slot: "Wrapper",
})(({ theme }) => ({
  backgroundColor: "inherit",
  color: "rgb(67, 239, 76)",
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  height: "max-content",
  padding: "10px",
  textAlign: "center",
  position: "absolute",
  top: "-2.5%",
  right: "20px",
  translate: "0% -50%",
  fontSize: "24px",

  zIndex: "2",
}));

const FillInBlankAnswer = () => {
  const userQuizQuestionSetup: UserQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const numberOfMultipleChoiceQuestions = userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions;
  const numberOfFillInBlankQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions;

  const totalNumberOfQuestions = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );
  const startingQuestionValue =
    userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions + 1;
  const endingQuestionValue =
    startingQuestionValue - 1 + numberOfFillInBlankQuestions;

  const userSelectedQuizVocabQuestionTypes: string = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabQuestionTypes
  );
  const vocabPhraseQuizFillInBlankAnswerKey = useAppSelector(
    (state) => state.quizStore.vocabPhraseQuizFillInBlankAnswerKey
  );
  const userSelectedFillInBlankAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedFillInBlankAnswers
  );
  const fillInTheBlankTestTerms = useAppSelector(
    (state) => state.quizStore.fillInTheBlankTestTerms
  );

  const comparedResponsesArray = arrayComparer(
    vocabPhraseQuizFillInBlankAnswerKey,
    userSelectedFillInBlankAnswers
  );

  let renderReadyItems: any[] = [];
  //// Generating the Data

  renderReadyItems = comparedResponsesArray.map(
    (correct: boolean, questionIndex: number) => {
      return (
        <QuestionContainer key={questionIndex} id = {`question ${questionIndex + numberOfMultipleChoiceQuestions}`}>
          <QuestionTypography>
            {fillInTheBlankTestTerms[questionIndex]}
          </QuestionTypography>
          {!correct && (
            <CorrectAnswerText>
              {vocabPhraseQuizFillInBlankAnswerKey[questionIndex]}
            </CorrectAnswerText>
          )}

          <StyledTextField
            id={`answer-${questionIndex + startingQuestionValue}`}
            label={`answer-${questionIndex + startingQuestionValue}`}
            variant="outlined"
            multiline
            disabled
            value={userSelectedFillInBlankAnswers[questionIndex]}
            sx={{
              ".css-itfxkg-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: `${
                    correct ? "rgb(67, 239, 76)" : "rgb(255, 17, 0)"
                  }`,
                },
              ".MuiOutlinedInput-root .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
                {
                  color: `${correct ? "rgb(67, 239, 76)" : "rgb(255, 17, 0)"}`,
                  WebkitTextFillColor: `${
                    correct ? "rgb(67, 239, 76)" : "rgb(255, 17, 0)"
                  }`,
                  textDecoration: `${!correct && "line-through"}`,
                  textDecorationColor: `${!correct && "rgb(255, 17, 0)"}`,
                  textDecorationThickness: `${!correct && "2px"}`,
                },

              ".MuiOutlinedInput-root ": {
                "&:hover fieldset": {
                  borderColor: `${
                    correct ? "rgb(67, 239, 76)" : "rgb(255, 17, 0)"
                  }`,
                },
              },
              "&.MuiTextField-root .MuiInputLabel-root": {
                color: `${correct ? "rgb(67, 239, 76)" : "rgb(255, 17, 0)"}`,
              },
            }}
          />
        </QuestionContainer>
      );
    }
  );

  let title = "";
  if (userSelectedQuizVocabQuestionTypes === "French") {
    title = "Translate the Terms into English";
  } else if (userSelectedQuizVocabQuestionTypes === "English") {
    title = "Translate the Terms into French";
  } else {
    title = "Translate into the Corresponding English/French Term";
  }

  return (
    <TopContainer>
      <QuestionNumberBox>
        {startingQuestionValue} - {endingQuestionValue} of{"  "}
        {totalNumberOfQuestions}
      </QuestionNumberBox>
      <TitleText>{title}</TitleText>
      {renderReadyItems}
    </TopContainer>
  );
};
export default FillInBlankAnswer;
