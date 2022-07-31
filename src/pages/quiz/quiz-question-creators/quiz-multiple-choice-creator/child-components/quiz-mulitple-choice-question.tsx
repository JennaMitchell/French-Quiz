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
  const vocabPhraseQuizMultipleChoiceAnswerKey = useAppSelector(
    (state) => state.quizStore.vocabPhraseQuizMultipleChoiceAnswerKey
  );

  const dispatch = useAppDispatch();
  const questAnswers = arrayOfAnswers.map((answer: string, i: number) => {
    const answerClickedHandler = () => {
      const deepCopyOfCurrentAnwerKey = JSON.parse(
        JSON.stringify(vocabPhraseQuizMultipleChoiceAnswerKey)
      );
      deepCopyOfCurrentAnwerKey[questionIndex] = letterArray[i];
      dispatch(
        quizStoreSliceActions.setVocabPhraseQuizMultipleChoiceAnswerKey(
          deepCopyOfCurrentAnwerKey
        )
      );
    };
    return (
      <QuestionAnswer key={i} onClick={answerClickedHandler}>
        <QuestionTypography>{letterArray[i]}.</QuestionTypography>
        <QuestionTypography>{capitalizeFirstLetter(answer)}</QuestionTypography>
      </QuestionAnswer>
    );
  });

  return (
    <QuestionContainer>
      <QuestionTitle>{title}</QuestionTitle>
      <QuestionAnswerBlock>{questAnswers}</QuestionAnswerBlock>
    </QuestionContainer>
  );
};
export default QuizMultipleChoiceQuestion;
