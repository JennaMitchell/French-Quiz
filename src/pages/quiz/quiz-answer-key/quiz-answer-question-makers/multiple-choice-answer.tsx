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

const AnswerHelperText = styled("p", {
  name: "AnswerHelperText",
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
  top: "-20px",
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

  // users Answer is the letter array so  we need to covert it before we can compare it
  const indexOfUsersSelectedAnswer = letterArray.indexOf(usersAnswer);
  const usersConvertedAnswer = arrayOfAnswers[indexOfUsersSelectedAnswer];

  const indexOfCorrectAnswer = letterArray.indexOf(correctUserAnswer);
  const convertedCorrectAnswer = arrayOfAnswers[indexOfCorrectAnswer];
  const questAnswers = arrayOfAnswers.map((answer: string, i: number) => {
    let answerStatus = "normal";
    if (usersConvertedAnswer === answer && correct) {
      answerStatus = "correct";
    }
    if (!correct && usersConvertedAnswer === answer) {
      answerStatus = "wrong";
    }
    if (!correct && convertedCorrectAnswer === answer) {
      answerStatus = "correct";
    }

    return (
      <QuestionAnswer
        key={i}
        sx={{
          borderColor: `${
            answerStatus !== "normal" &&
            `${
              answerStatus === "correct"
                ? "rgb(67, 239, 76)"
                : "rgb(255, 17, 0)"
            }`
          }`,
          "&:hover": {
            borderColor: `${
              answerStatus !== "normal" &&
              `${
                answerStatus === "correct"
                  ? "rgb(67, 239, 76)"
                  : "rgb(255, 17, 0)"
              }`
            }`,
          },
        }}
      >
        {answerStatus === "wrong" && (
          <AnswerHelperText sx={{ color: "rgb(255, 17, 0)" }}>
            Wrong
          </AnswerHelperText>
        )}
        {answerStatus === "correct" && (
          <AnswerHelperText>Correct</AnswerHelperText>
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
