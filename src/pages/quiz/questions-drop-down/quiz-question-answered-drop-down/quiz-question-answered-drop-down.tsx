import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { styled } from "@mui/material/styles";
import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from '@mui/icons-material/Close';


import { arrayComparer,scrollToHandler } from "../../../../components/functions/generic-functions";
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
  color: "rgb(67, 239, 76)",
  backgroundColor: "inherit",
}));

const StyledXIcon = styled(CloseIcon,{
  name : "StyledXIcon",
  slot: "Wrapper"
})(({ theme }) => ({
  width: "max(20px,20px)",
  height: "max(20px,20px)",
  backgroundColor: "inherit",
  color: "rgb(255, 17, 0)" ,
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

const QuizQuestionAnsweredDropDown = () => {
  // const questionListActive = useAppSelector(
  //   (state) => state.quizStore.questionListActive
  // );
  const userSelectedQuizConjugationGrouping = useAppSelector(
    (state) => state.quizStore.userSelectedQuizConjugationGrouping
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
  const conjugationAnswerKey = useAppSelector((state)=>state.quizStore.conjugationAnswerKey);
  const vocabPhraseQuizFillInBlankAnswerKey = useAppSelector((state)=>state.quizStore.vocabPhraseQuizFillInBlankAnswerKey);
  const matchingAnswerKey = useAppSelector((state)=>state.quizStore.matchingAnswerKey);
  const vocabPhraseQuizMultipleChoiceAnswerKey = useAppSelector((state)=>state.quizStore.vocabPhraseQuizMultipleChoiceAnswerKey);
  const userSelectedMultipleChoiceQuizAnswers = useAppSelector((state)=>state.quizStore.userSelectedMultipleChoiceQuizAnswers);

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


  const dispatch = useAppDispatch();

  const numberOfMultipleChoiceQuestions = comparedMultipleChoiceArray.length;
  const numberOfMatchingQuestions = comparedMatchingArray.length;
  const numberOfFillInBlankQuestions = comparedFillInBlankArray.length;
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
      const buttonHandler = ()=>{
        scrollToHandler(`question-${multipleChoiceQuestionIndex}`)
      }
      renderReadyMultipleChoiceQuestions.push(
        <QuestionButton key={multipleChoiceQuestionIndex} onClick = {buttonHandler}>
          <StyledText>{multipleChoiceQuestionIndex + 1}</StyledText>
          {comparedMultipleChoiceArray[multipleChoiceQuestionIndex] ? (
            <StyledCheckIcon />
          ) : (
            <StyledXIcon />
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
      const buttonHandler = ()=>{
        scrollToHandler(`question-${fillInBlankIndex+ numberOfMultipleChoiceQuestions}`)
      }
      renderReadyFillInBlankQuestions.push(
        <QuestionButton key={fillInBlankIndex} onClick ={buttonHandler}>
          <StyledText>
            {fillInBlankIndex + 1 + numberOfQuizConjugationQuestions}
          </StyledText>
          {comparedFillInBlankArray[fillInBlankIndex] ? (
            <StyledCheckIcon />
          ) : (
            <StyledXIcon />
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

      const buttonHandler = ()=>{
        scrollToHandler(`question-${matchingQuestionIndex+ numberOfMultipleChoiceQuestions +numberOfFillInBlankQuestions}`)
      }

      renderReadyMatchingQuestions.push(
        <QuestionButton key={matchingQuestionIndex} onClick = {buttonHandler}>
          <StyledText>
            {matchingQuestionIndex +
              1 +
              numberOfQuizConjugationQuestions +
              numberOfFillInBlankQuestions}
          </StyledText>
          {comparedMatchingArray[matchingQuestionIndex] ? (
            <StyledCheckIcon  />
          ) : (
            <StyledXIcon />
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
            const buttonHandler = ()=>{
              scrollToHandler(`grouping-${(indexOfConjugation + 1) / 8}`)
            }
            renderReadyConjugationQuestions.push(
              <QuestionButton key={indexOfConjugation} onClick = {buttonHandler}>
                <StyledText>
                  {numberOfVocabQuestions + indexOfConjugation - 6} -{" "}
                  {numberOfVocabQuestions + indexOfConjugation + 1}
                </StyledText>
                <StyledXIcon />
               
              </QuestionButton>
            );
          } else {
            const buttonHandler = ()=>{
              scrollToHandler(`grouping-${(indexOfConjugation + 1) / 8}`)
            }
            renderReadyConjugationQuestions.push(
              <QuestionButton key={indexOfConjugation} onClick = {buttonHandler}>
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
      const buttonHandler = ()=>{
        scrollToHandler(`grouping-1`)
      }

      if (stringifiedAnswerArray.includes("false")) {
        renderReadyConjugationQuestions.push(
          <QuestionButton key={"all"} onClick = {buttonHandler}>
            <StyledText>
              {numberOfVocabQuestions + 1} -{" "}
              {numberOfVocabQuestions + numberOfQuizConjugationQuestions * 8}
            </StyledText>
            <StyledXIcon />
          </QuestionButton>
        );
      } else {
        renderReadyConjugationQuestions.push(
          <QuestionButton key={"all"} onClick = {buttonHandler}> 
            <StyledText>
              {numberOfVocabQuestions + 1} -{" "}
              {numberOfVocabQuestions + numberOfQuizConjugationQuestions * 8}
            </StyledText>
            <StyledCheckIcon  />
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
