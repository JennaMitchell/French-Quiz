import {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
  QuestionTypography,
} from "../../quiz-question-creators/quiz-multiple-choice-creator/child-components/quiz-multiple-choice-question-styled-components";
import { useAppSelector } from "../../../../store/hooks";

import { capitalizeFirstLetter } from "../../../../components/functions/generic-functions";
import { QuestionNumberBox } from "../../../quiz/quiz-question-creators/shared-styles/quiz-shared-styled-components";
import { styled } from "@mui/material";

const WrongAnswerText = styled("p", {
  name: "WrongAnswerText",
  slot: "Wrapper",
})(() => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  padding: "10px",
  backgroundColor: "inherit",
  color: "rgb(255, 17, 0)",
  fontSize: "14px",
  position: "absolute",
  top: "20px",
  right: "20px",
}));

const CorrectAnswerText = styled("p", {
  name: "CorrectAnswerText",
  slot: "Wrapper",
})(() => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  padding: "10px",
  backgroundColor: "inherit",
  color: "rgb(67, 239, 76)",
  fontSize: "14px",
  position: "absolute",
  top: "20px",
  right: "20px",
}));

interface Props {
  arrayOfAnswers: string[];
  questionIndex: number;
  title: string;
  correctUserAnswer: string;
  usersAnswer: string;
  correct: boolean;
}
const AnsweredQuizMultipleChoiceQuestion = ({
  arrayOfAnswers,
  questionIndex,
  title,
  correctUserAnswer,
  usersAnswer,
  correct,
}: Props) => {
  const totalNumberOfQuestions: number = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );
  const letterArray = ["A", "B", "C", "D"];
  let answerStatus = "normal";

  const questAnswers = arrayOfAnswers.map((answer: string, i: number) => {
    if (usersAnswer === answer && correct) {
      answerStatus = "correct";
    }
    if (!correct && usersAnswer === answer) {
      answerStatus = "wrong";
    }
    if (!correct && correctUserAnswer === answer) {
      answerStatus = "correct";
    }
    return (
      <QuestionAnswer
        key={i}
        sx={{
          borderColor: `${
            answerStatus !== "normal" &&
            `${answerStatus === "correct" ? "green" : "red"}`
          }`,
        }}
      >
        {answerStatus === "wrong" && <WrongAnswerText>Wrong</WrongAnswerText>}\
        {answerStatus === "correct" && (
          <CorrectAnswerText>Correct</CorrectAnswerText>
        )}
        <QuestionTypography>{letterArray[i]}.</QuestionTypography>
        <QuestionTypography>{capitalizeFirstLetter(answer)}</QuestionTypography>
      </QuestionAnswer>
    );
  });

  return (
    <QuestionContainer>
      <QuestionNumberBox>
        {questionIndex + 1} of {totalNumberOfQuestions}
      </QuestionNumberBox>
      <QuestionTitle>{title}</QuestionTitle>
      <QuestionAnswerBlock>{questAnswers}</QuestionAnswerBlock>
    </QuestionContainer>
  );
};
export default AnsweredQuizMultipleChoiceQuestion;
