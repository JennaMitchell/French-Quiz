import { useAppSelector } from "../../../store/hooks";
import AnsweredQuizMultipleChoiceQuestion from "./quiz-answer-question-makers/multiple-choice-answer";
import FillInBlankAnswer from "./quiz-answer-question-makers/fill-in-blank-answer";
import QuizMatchingAnswered from "./quiz-answer-question-makers/quiz-matching-answered";
import QuizConjugationAnswered from "./quiz-answer-question-makers/quiz-conjugation-answer";
import { arrayComparer } from "../../../components/functions/generic-functions";
import { styled } from "@mui/material";

const PercentCorrectContainer = styled("div", {
  name: "PercentCorrectContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  padding: "10px 20px",
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.primary.dark,
  textAlign: "center",
  display: "grid",
  placeItems: "center",
  fontSize: "32px",
  borderRadius: "10px",
  marginTop: "10px",
  boxShadow: "0 0 10px black",
  justifySelf: "center",
}));

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
  const matchingAnswerKey = useAppSelector(
    (state) => state.quizStore.matchingAnswerKey
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

  const userSelectedFillInBlankAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedFillInBlankAnswers
  );
  const userSelectedConjugationAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedConjugationAnswers
  );
  const userSelectedMatchingAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedMatchingAnswers
  );

  // Step 1. Comparing users Answers to what is actualy there

  const comparedMultipleChoiceArray = arrayComparer(
    vocabPhraseQuizMultipleChoiceAnswerKey,
    userSelectedMultipleChoiceQuizAnswers
  );
  const comparedFillInBlankArray = arrayComparer(
    vocabPhraseQuizFillInBlankAnswerKey,
    userSelectedFillInBlankAnswers
  );

  const comparedConjugationsArray = arrayComparer(
    conjugationAnswerKey,
    userSelectedConjugationAnswers
  );

  const comparedMatchingArray = arrayComparer(
    matchingAnswerKey,
    userSelectedMatchingAnswers
  );

  // Step 2. Totalling up thenumber of correct and incorrect responses
  const masterComparedAnswersArray = comparedMultipleChoiceArray
    .concat(comparedFillInBlankArray)
    .concat(comparedConjugationsArray)
    .concat(comparedMatchingArray);
  const totalNumberOfQuestions = masterComparedAnswersArray.length;

  const arrayOfCorrectResponses = masterComparedAnswersArray.filter(
    (boolean) => boolean !== false
  );
  const numberOfCorrectResponses = arrayOfCorrectResponses.length;

  const percentCorrect = Math.round(
    (numberOfCorrectResponses / totalNumberOfQuestions) * 100
  );

  // Step 3. Recreating the  Multiple Choice Questions with the hightlighted right and wrong anwers
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
      <PercentCorrectContainer>
        {numberOfCorrectResponses} / {totalNumberOfQuestions} - {percentCorrect}
        %
      </PercentCorrectContainer>
      {vocabPhraseQuizMultipleChoiceAnswerKey.length !== 0 &&
        renderReadyComparedMultipleChoice}
      {vocabPhraseQuizFillInBlankAnswerKey.length !== 0 && (
        <FillInBlankAnswer />
      )}
      {matchingAnswerKey.length !== 0 && <QuizMatchingAnswered />}
      {conjugationAnswerKey.length !== 0 && <QuizConjugationAnswered />}
    </>
  );

  // Conjugations
};
export default QuizAnswerKeyMain;
