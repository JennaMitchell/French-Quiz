import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { styled } from "@mui/material/styles";
import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import CheckIcon from "@mui/icons-material/Check";
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
  gridTemplateColumns: "max-content max-content",
  alignContent: "center",
  justifyContent: "space-between",
  position: "relative",
  padding: "10px",
  borderRadius: "5px",
  boxShadow: "none",
  border: "none",
  fontSize: "16px",
  textAlign: "left",

  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.secondary.light,
  },
}));

const StyledText = styled("p", {
  name: "StyledText",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  backgroundColor: "inherit",
  fontSize: "16px",
  textAlign: "left",
}));
const StyledCheckIcon = styled(CheckIcon, {
  name: "StyledCheckIcon",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(20px,20px)",
  height: "max(20px,20px)",
  color: "inherit",
  backgroundColor: "inherit",
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
  rowGap: "5px",
  alignContent: "flex-start",
  justifyContent: "center",
  position: "fixed",
  top: "105px",

  padding: "20px",
}));
interface Props {
  // Step 1. Comparing users Answers to what is actualy there
  comparedMultipleChoiceArray: boolean[];
  comparedFillInBlankArray: boolean[];
  comparedConjugationsArray: boolean[];
  comparedMatchingArray: boolean[];
}
const QuizQuestionAnsweredDropDown = ({
  comparedMultipleChoiceArray,
  comparedFillInBlankArray,
  comparedConjugationsArray,
  comparedMatchingArray,
}: Props) => {
  // const questionListActive = useAppSelector(
  //   (state) => state.quizStore.questionListActive
  // );
  const userSelectedQuizConjugationGrouping = useAppSelector(
    (state) => state.quizStore.userSelectedQuizConjugationGrouping
  );

  const dispatch = useAppDispatch();

  const numberOfMultipleChoiceQuestions = comparedMultipleChoiceArray.length;
  const numberOfMatchingQuestions = comparedFillInBlankArray.length;
  const numberOfFillInBlankQuestions = comparedConjugationsArray.length;
  const numberOfVocabQuestions = comparedMatchingArray.length;
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
        <QuestionButton key={multipleChoiceQuestionIndex}>
          <StyledText>{multipleChoiceQuestionIndex + 1}</StyledText>
          {comparedMultipleChoiceArray[multipleChoiceQuestionIndex] ? (
            <StyledCheckIcon sx={{ color: "rgb(67, 239, 76)" }} />
          ) : (
            <StyledCheckIcon sx={{ color: "rgb(255, 17, 0)" }} />
          )}
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
        <QuestionButton key={fillInBlankIndex}>
          <StyledText>
            {fillInBlankIndex + 1 + numberOfQuizConjugationQuestions}
          </StyledText>
          {comparedFillInBlankArray[fillInBlankIndex] ? (
            <StyledCheckIcon sx={{ color: "rgb(67, 239, 76)" }} />
          ) : (
            <StyledCheckIcon sx={{ color: "rgb(255, 17, 0)" }} />
          )}
        </QuestionButton>
      );
    }
  }
  //
  if (numberOfMatchingQuestions !== 0) {
    for (
      let matchingQuestionIndex = 0;
      matchingQuestionIndex < numberOfMatchingQuestions;
      matchingQuestionIndex++
    ) {
      renderReadyMatchingQuestions.push(
        <QuestionButton key={matchingQuestionIndex}>
          <StyledText>
            {matchingQuestionIndex +
              1 +
              numberOfQuizConjugationQuestions +
              numberOfFillInBlankQuestions}
          </StyledText>
          {comparedMatchingArray[matchingQuestionIndex] ? (
            <StyledCheckIcon sx={{ color: "rgb(67, 239, 76)" }} />
          ) : (
            <StyledCheckIcon sx={{ color: "rgb(255, 17, 0)" }} />
          )}
        </QuestionButton>
      );
    }
  }

  //Handeling Conjugations

  if (numberOfQuizConjugationQuestions !== 0) {
    if (userSelectedQuizConjugationGrouping === "By Verb") {
      let arrayOfAnsweredQuestions: string[] = [];
      for (
        let indexOfConjugation = 0;
        indexOfConjugation < numberOfQuizConjugationQuestions * 8;
        indexOfConjugation++
      ) {
        arrayOfAnsweredQuestions.push(
          `${comparedConjugationsArray[indexOfConjugation]}`
        );

        if ((indexOfConjugation + 1) % 8 === 0) {
          // 8 is number of prefixes
          if (arrayOfAnsweredQuestions.includes(`false`)) {
            renderReadyConjugationQuestions.push(
              <QuestionButton key={indexOfConjugation}>
                <StyledText>
                  {numberOfVocabQuestions + indexOfConjugation - 6} -{" "}
                  {numberOfVocabQuestions + indexOfConjugation + 1}
                </StyledText>
              </QuestionButton>
            );
          } else {
            renderReadyConjugationQuestions.push(
              <QuestionButton key={indexOfConjugation}>
                <StyledText>
                  {numberOfVocabQuestions + indexOfConjugation - 6} -{" "}
                  {numberOfVocabQuestions + indexOfConjugation + 1}
                </StyledText>
                <StyledCheckIcon />
              </QuestionButton>
            );
          }
        }
      }
    } else {
      const stringifiedAnswerArray = comparedConjugationsArray.map(
        (string) => `${string}`
      );
      if (stringifiedAnswerArray.includes("false")) {
        renderReadyConjugationQuestions.push(
          <QuestionButton key={"all"}>
            <StyledText>
              {numberOfVocabQuestions + 1} -{" "}
              {numberOfVocabQuestions + numberOfQuizConjugationQuestions * 8}
            </StyledText>
            <StyledCheckIcon sx={{ color: "rgb(255, 17, 0)" }} />
          </QuestionButton>
        );
      } else {
        renderReadyConjugationQuestions.push(
          <QuestionButton key={"all"}>
            <StyledText>
              {numberOfVocabQuestions + 1} -{" "}
              {numberOfVocabQuestions + numberOfQuizConjugationQuestions * 8}
            </StyledText>
            <StyledCheckIcon sx={{ color: "rgb(67, 239, 76)" }} />
          </QuestionButton>
        );
      }
    }
  }

  const hideQuestionHandler = () => {
    dispatch(quizStoreSliceActions.setQuestionListActive(false));
  };

  return (
    <QuestionMenuContainer>
      <QuestionButton onClick={hideQuestionHandler}>
        <StyledText sx={{ gridColumn: "1/span 2", textAlign: "center" }}>
          Hide Question List
        </StyledText>
      </QuestionButton>
      {renderReadyMultipleChoiceQuestions.length !== 0 && (
        <QuestionTitle> Multiple Choice</QuestionTitle>
      )}
      {renderReadyMultipleChoiceQuestions}
      {renderReadyFillInBlankQuestions.length !== 0 && (
        <QuestionTitle>Fill in the Blank</QuestionTitle>
      )}
      {renderReadyFillInBlankQuestions}
      {renderReadyMatchingQuestions.length !== 0 && (
        <QuestionTitle>Matching</QuestionTitle>
      )}

      {renderReadyMatchingQuestions}

      {renderReadyConjugationQuestions.length !== 0 && (
        <QuestionTitle>Conjugation</QuestionTitle>
      )}
      {renderReadyConjugationQuestions}
    </QuestionMenuContainer>
  );
};
export default QuizQuestionAnsweredDropDown;
