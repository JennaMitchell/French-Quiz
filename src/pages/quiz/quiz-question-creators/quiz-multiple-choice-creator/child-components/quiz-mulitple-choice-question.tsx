import {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
  QuestionTypography,
} from "./quiz-multiple-choice-question-styled-components";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { quizStoreSliceActions } from "../../../../../store/quiz-store-slice";
import { capitalizeFirstLetter } from "../../../../../components/functions/generic-functions";
import { QuestionNumberBox } from "../../shared-styles/quiz-shared-styled-components";
import { scrollToHandler } from "../../../../../components/functions/generic-functions";
interface Props {
  arrayOfAnswers: string[];
  questionIndex: number;
  title: string;
}
const QuizMultipleChoiceQuestion = ({
  arrayOfAnswers,
  questionIndex,
  title,
}: Props) => {
  const letterArray = ["A", "B", "C", "D"];

  const userSelectedMultipleChoiceQuizAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedMultipleChoiceQuizAnswers
  );
  const totalNumberOfQuestions: number = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );
  const dispatch = useAppDispatch();
  const questAnswers = arrayOfAnswers.map((answer: string, i: number) => {
    let activeAnswer = false;
    const answerClickedHandler = () => {
      const deepCopyOfCurrentAnwerKey = JSON.parse(
        JSON.stringify(userSelectedMultipleChoiceQuizAnswers)
      );
      deepCopyOfCurrentAnwerKey[questionIndex] = letterArray[i];
      dispatch(
        quizStoreSliceActions.setUserSelectedMultipleChoiceQuizAnswers(
          deepCopyOfCurrentAnwerKey
        )
      );
      scrollToHandler(`question-${questionIndex + 1}`);
    };
    if (
      userSelectedMultipleChoiceQuizAnswers[questionIndex] === letterArray[i]
    ) {
      activeAnswer = true;
    }
    return (
      <QuestionAnswer
        key={i}
        onClick={answerClickedHandler}
        sx={{ borderColor: `${activeAnswer && "secondary.light"}` }}
      >
        <QuestionTypography>{letterArray[i]}.</QuestionTypography>
        <QuestionTypography>{capitalizeFirstLetter(answer)}</QuestionTypography>
      </QuestionAnswer>
    );
  });

  return (
    <QuestionContainer
      id={`question-${questionIndex}`}
      sx={{
        "@media(max-width:1450px)": {
          marginTop: `${questionIndex === 0 && "90px"}`,
        },
        "@media(max-width:560px)": {
          marginTop: `${questionIndex === 0 && "50px"}`,
        },
      }}
    >
      <QuestionNumberBox>
        {questionIndex + 1} of {totalNumberOfQuestions}
      </QuestionNumberBox>
      <QuestionTitle>{title}</QuestionTitle>
      <QuestionAnswerBlock>{questAnswers}</QuestionAnswerBlock>
    </QuestionContainer>
  );
};
export default QuizMultipleChoiceQuestion;
