import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { styled } from "@mui/material/styles";
import { quizStoreSliceActions } from "../../../store/quiz-store-slice";
const QuestionButton = styled("button", {
  name: "QuestionButton",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.secondary.light,
  transition: "all 0.5s",
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  alignContent: "center",
  justifyContent: "center",
  position: "relative",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "none",
  border: "none",
  fontSize: "16px",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
  },
}));

const QuestionTitle = styled("h6", {
  name: "QuestionTitle",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.primary.dark,
  backgroundColor: theme.palette.secondary.light,
  transition: "all 0.5s",
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "100%",
  maxHeight: "100%",
  display: "grid",
  placeItems: "center",
  position: "relative",

  borderRadius: "50%",
  fontSize: "18px",
}));

const QuestionMenuContainer = styled("div", {
  name: "QuestionMenuContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  transition: "all 0.5s",
  width: "max(225px,225px)",
  minHeight: "600px",
  height: "600px",
  maxHeight: "600px",
  display: "grid",
  gridTemplateColumns: "90%",
  gridTemplateRows: "max-content",
  rowGap: "20px",
  alignContent: "flex-start",
  justifyContent: "center",
  position: "fixed",
  top: "100px",
  left: "0px",
  padding: "20px",
}));

const QuizQuestionsDropDown = () => {
  // const userSelectedMultipleChoiceQuizAnswers = useAppSelector(
  //   (state) => state.quizStore.userSelectedMultipleChoiceQuizAnswers
  // );
  // const fillInBlankQuestionAnsweredArray = useAppSelector(
  //   (state) => state.quizStore.fillInBlankQuestionAnsweredArray
  // );
  // const conjugationQuestionAnsweredArray = useAppSelector(
  //   (state) => state.quizStore.conjugationQuestionAnsweredArray
  // );
  const dispatch = useAppDispatch();
  const userSelectedQuizConjugationGrouping = useAppSelector(
    (state) => state.quizStore.userSelectedQuizConjugationGrouping
  );
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  // const questionListActive = useAppSelector(
  //   (state) => state.quizStore.questionListActive
  // );
  const numberOfMultipleChoiceQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions;
  const numberOfMatchingQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions;
  const numberOfFillInBlankQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions;
  const numberOfVocabQuestions =
    userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions;
  // const numberOfQuestions =
  //   userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions;

  const numberOfQuizConjugationQuestions = useAppSelector(
    (state) => state.quizStore.numberOfQuizConjugationQuestions
  );

  const renderReadyMultipleChoiceQuestions = [];
  const renderReadyMatchingQuestions = [];
  const renderReadyFillInBlankQuestions = [];
  const renderReadyConjugationQuestions = [];

  if (numberOfMultipleChoiceQuestions !== 0) {
    for (
      let multipleChoiceQuestionIndex = 0;
      multipleChoiceQuestionIndex < numberOfMultipleChoiceQuestions;
      multipleChoiceQuestionIndex++
    ) {
      renderReadyMultipleChoiceQuestions.push(
        <QuestionButton>{multipleChoiceQuestionIndex + 1}</QuestionButton>
      );
    }
  }

  if (numberOfMatchingQuestions !== 0) {
    for (
      let matchingQuestionIndex = 0;
      matchingQuestionIndex < numberOfMatchingQuestions;
      matchingQuestionIndex++
    ) {
      renderReadyMatchingQuestions.push(
        <QuestionButton>
          {matchingQuestionIndex + 1 + numberOfQuizConjugationQuestions}
        </QuestionButton>
      );
    }
  }

  if (numberOfFillInBlankQuestions !== 0) {
    for (
      let fillInBlankIndex = 0;
      fillInBlankIndex < numberOfFillInBlankQuestions;
      fillInBlankIndex++
    ) {
      renderReadyFillInBlankQuestions.push(
        <QuestionButton>
          {fillInBlankIndex +
            1 +
            numberOfQuizConjugationQuestions +
            numberOfMatchingQuestions}
        </QuestionButton>
      );
    }
  }
  // Handeling Conjugations
  if (numberOfQuizConjugationQuestions !== 0) {
    if (userSelectedQuizConjugationGrouping === "By Verb") {
      for (
        let indexOfConjugation = 0;
        indexOfConjugation < numberOfQuizConjugationQuestions;
        indexOfConjugation++
      ) {
        <QuestionButton>
          {numberOfVocabQuestions + 1 + indexOfConjugation * 8} -{" "}
          {numberOfVocabQuestions + (indexOfConjugation + 1) * 8}
        </QuestionButton>;
      }
    } else {
      renderReadyConjugationQuestions.push(
        <QuestionButton>
          {numberOfVocabQuestions + 1} -{" "}
          {numberOfVocabQuestions + numberOfQuizConjugationQuestions * 8}
        </QuestionButton>
      );
    }
  }

  const hideQuestionHandler = () => {
    dispatch(quizStoreSliceActions.setQuestionListActive(false));
  };

  return (
    <QuestionMenuContainer>
      <QuestionButton onClick={hideQuestionHandler}>
        Hide Question List
      </QuestionButton>
      {renderReadyMultipleChoiceQuestions.length !== 0 && (
        <QuestionTitle> Multiple Choice</QuestionTitle>
      )}
      {renderReadyMultipleChoiceQuestions}
      {renderReadyMatchingQuestions.length !== 0 && (
        <QuestionTitle>Matching</QuestionTitle>
      )}

      {renderReadyMatchingQuestions}
      {renderReadyFillInBlankQuestions.length !== 0 && (
        <QuestionTitle>Fill in the Blank</QuestionTitle>
      )}
      {renderReadyFillInBlankQuestions}
      {renderReadyConjugationQuestions.length !== 0 && (
        <QuestionTitle>Conjugation</QuestionTitle>
      )}
      {renderReadyConjugationQuestions}
    </QuestionMenuContainer>
  );
};
export default QuizQuestionsDropDown;
