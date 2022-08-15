import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { styled } from "@mui/material/styles";
import { quizStoreSliceActions } from "../../../store/quiz-store-slice";
import CheckIcon from "@mui/icons-material/Check";
import { scrollToHandler } from "../../../components/functions/generic-functions";
import useMediaQuery from "@mui/material/useMediaQuery";
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

const FullPageQuestionMenu = styled("div", {
  name: "FullPageQuestionMenu",
  slot: "Wrapper",
})(({ theme }) => ({
  backgroundColor: theme.palette.secondary.light,
  transition: "all 0.5s",
  width: "max(100vw,100vw)",
  minHeight: "100vh",
  height: "100vh",
  maxHeight: "100vh",
  zIndex: "10",
  position: "fixed",
  top: "0",
  left: "0",
  overflow: "hidden",
  display: "grid",
  gridTemplateColumns: "300px",
  gridTemplateRows: "max-content",
  rowGap: "5px",
  alignContent: "center",
  justifyContent: "center",
}));

const QuizQuestionsDropDown = () => {
  const fullPageQuestionDropDownActive = useMediaQuery("(max-width:1075px)");

  const userSelectedMultipleChoiceQuizAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedMultipleChoiceQuizAnswers
  );
  const fillInBlankQuestionAnsweredArray = useAppSelector(
    (state) => state.quizStore.fillInBlankQuestionAnsweredArray
  );
  const conjugationQuestionAnsweredArray = useAppSelector(
    (state) => state.quizStore.conjugationQuestionAnsweredArray
  );
  const dispatch = useAppDispatch();
  const userSelectedQuizConjugationGrouping = useAppSelector(
    (state) => state.quizStore.userSelectedQuizConjugationGrouping
  );
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const matchingQuestionAnsweredArray = useAppSelector(
    (state) => state.quizStore.matchingQuestionAnsweredArray
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
      const clickHandler = () => {
        scrollToHandler(`question-${multipleChoiceQuestionIndex}`);
      };

      renderReadyMultipleChoiceQuestions.push(
        <QuestionButton
          key={multipleChoiceQuestionIndex}
          onClick={clickHandler}
        >
          <StyledText>{multipleChoiceQuestionIndex + 1}</StyledText>
          {userSelectedMultipleChoiceQuizAnswers[
            multipleChoiceQuestionIndex
          ] && <StyledCheckIcon />}
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
      const clickHandler = () => {
        console.log(
          `question-${fillInBlankIndex + numberOfMultipleChoiceQuestions}`
        );
        scrollToHandler(
          `question-${fillInBlankIndex + numberOfMultipleChoiceQuestions}`
        );
      };

      renderReadyFillInBlankQuestions.push(
        <QuestionButton key={fillInBlankIndex} onClick={clickHandler}>
          <StyledText>
            {fillInBlankIndex + 1 + numberOfQuizConjugationQuestions}
          </StyledText>
          {fillInBlankQuestionAnsweredArray[fillInBlankIndex] && (
            <StyledCheckIcon />
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
      const clickHandler = () => {
        scrollToHandler(
          `question-${
            matchingQuestionIndex +
            numberOfMultipleChoiceQuestions +
            numberOfFillInBlankQuestions
          }`
        );
      };

      renderReadyMatchingQuestions.push(
        <QuestionButton key={matchingQuestionIndex} onClick={clickHandler}>
          <StyledText>
            {matchingQuestionIndex +
              1 +
              numberOfQuizConjugationQuestions +
              numberOfFillInBlankQuestions}
          </StyledText>
          {matchingQuestionAnsweredArray[matchingQuestionIndex] && (
            <StyledCheckIcon />
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
          `${conjugationQuestionAnsweredArray[indexOfConjugation]}`
        );

        if ((indexOfConjugation + 1) % 8 === 0) {
          // 8 is number of prefixes
          if (arrayOfAnsweredQuestions.includes(`false`)) {
            const clickHandler = () => {
              console.log(`grouping-${(indexOfConjugation + 1) / 8}`);
              scrollToHandler(`grouping-${(indexOfConjugation + 1) / 8}`);
            };

            renderReadyConjugationQuestions.push(
              <QuestionButton key={indexOfConjugation} onClick={clickHandler}>
                <StyledText>
                  {numberOfVocabQuestions + indexOfConjugation - 6} -{" "}
                  {numberOfVocabQuestions + indexOfConjugation + 1}
                </StyledText>
              </QuestionButton>
            );
          } else {
            const clickHandler = () => {
              console.log(`grouping-${(indexOfConjugation + 1) / 8}`);
              scrollToHandler(`grouping-${(indexOfConjugation + 1) / 8}`);
            };

            renderReadyConjugationQuestions.push(
              <QuestionButton key={indexOfConjugation} onClick={clickHandler}>
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
      const stringifiedAnswerArray = conjugationQuestionAnsweredArray.map(
        (string) => `${string}`
      );
      if (stringifiedAnswerArray.includes("false")) {
        const clickHandler = () => {
          scrollToHandler(`grouping-1`);
        };

        renderReadyConjugationQuestions.push(
          <QuestionButton key={"all"} onClick={clickHandler}>
            <StyledText>
              {numberOfVocabQuestions + 1} -{" "}
              {numberOfVocabQuestions + numberOfQuizConjugationQuestions * 8}
            </StyledText>
          </QuestionButton>
        );
      } else {
        const clickHandler = () => {
          scrollToHandler(`grouping-1`);
        };
        renderReadyConjugationQuestions.push(
          <QuestionButton key={"all"} onClick={clickHandler}>
            <StyledText>
              {numberOfVocabQuestions + 1} -{" "}
              {numberOfVocabQuestions + numberOfQuizConjugationQuestions * 8}
            </StyledText>
            <StyledCheckIcon />
          </QuestionButton>
        );
      }
    }
  }

  const hideQuestionHandler = () => {
    dispatch(quizStoreSliceActions.setQuestionListActive(false));
  };

  return (
    <>
      {!fullPageQuestionDropDownActive && (
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
      )}
      {fullPageQuestionDropDownActive && (
        <FullPageQuestionMenu>
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
        </FullPageQuestionMenu>
      )}
    </>
  );
};
export default QuizQuestionsDropDown;
