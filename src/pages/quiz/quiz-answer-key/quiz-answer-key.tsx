import { useAppSelector } from "../../../store/hooks";
import AnsweredQuizMultipleChoiceQuestion from "./quiz-answer-question-makers/multiple-choice-answer";
import FillInBlankAnswer from "./quiz-answer-question-makers/fill-in-blank-answer";
import QuizMatchingAnswered from "./quiz-answer-question-makers/quiz-matching-answered";
import QuizConjugationAnswered from "./quiz-answer-question-makers/quiz-conjugation-answer";
import { arrayComparer } from "../../../components/functions/generic-functions";

const QuizAnswerKeyMain = () => {
  const userSelectedMultipleChoiceQuizAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedMultipleChoiceQuizAnswers
  );
  // Answer Keys
  const vocabPhraseQuizMultipleChoiceAnswerKey = useAppSelector(
    (state) => state.quizStore.vocabPhraseQuizMultipleChoiceAnswerKey
  );
  const conjugationAnswerKey = useAppSelector(
    (state) => state.quizStore.conjugationAnswerKey
  );
  const vocabPhraseQuizMatchingAnswerKey = useAppSelector(
    (state) => state.quizStore.vocabPhraseQuizMatchingAnswerKey
  );
  const vocabPhraseQuizFillInBlankAnswerKey = useAppSelector(
    (state) => state.quizStore.vocabPhraseQuizFillInBlankAnswerKey
  );
  // const quizSubmitButtonClicked = useAppSelector(
  //   (state) => state.quizStore.quizSubmitButtonClicked
  // );

  const multipleChoiceQuestionAnswers = useAppSelector(
    (state) => state.quizStore.multipleChoiceQuestionAnswers
  );

  const multipleChoiceQuestionTitles = useAppSelector(
    (state) => state.quizStore.multipleChoiceQuestionTitles
  );

  // Step 1. Comparing users Answers to what is actualy there

  const comparedMultipleChoiceArray = arrayComparer(
    vocabPhraseQuizMultipleChoiceAnswerKey,
    userSelectedMultipleChoiceQuizAnswers
  );

  // Step 2. Recreating the questions with the highlted right and wrong anwers
  // Multiple Choice Questions
  const renderReadyComparedMultipleChoice = comparedMultipleChoiceArray.map(
    (correct: boolean, questionIndex: number) => {
      return (
        <AnsweredQuizMultipleChoiceQuestion
          key={questionIndex}
          arrayOfAnswers={multipleChoiceQuestionAnswers[questionIndex]}
          questionIndex={questionIndex}
          title={multipleChoiceQuestionTitles[questionIndex]}
          correctUserAnswer={
            vocabPhraseQuizMultipleChoiceAnswerKey[questionIndex]
          }
          usersAnswer={userSelectedMultipleChoiceQuizAnswers[questionIndex]}
          correct={correct}
        />
      );
    }
  );

  return (
    <>
      {vocabPhraseQuizMultipleChoiceAnswerKey.length !== 0 &&
        renderReadyComparedMultipleChoice}
      {vocabPhraseQuizFillInBlankAnswerKey.length !== 0 && (
        <FillInBlankAnswer />
      )}
      {vocabPhraseQuizMatchingAnswerKey.length !== 0 && (
        <QuizMatchingAnswered />
      )}
      {conjugationAnswerKey.length !== 0 && <QuizConjugationAnswered />}
    </>
  );

  // Conjugations
};
export default QuizAnswerKeyMain;
