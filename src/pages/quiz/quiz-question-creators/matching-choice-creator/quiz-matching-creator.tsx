import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  randomUserSelectGenerator,
  randomNumberGenerator,
  stringArrayScrambler,
  letterAnswerKeyCreator,
} from "../../../../components/functions/generic-functions";
import {
  quizStoreSliceActions,
  UserSelectedData,
} from "../../../../store/quiz-store-slice";
import {
  MatchingTopContainer,
  StyledSelect,
  StyledOption,
  MatchingRowContainer,
  StyledTypography,
} from "./quiz-matching-creator-styled-components";
import { QuestionNumberBox } from "../shared-styles/quiz-shared-styled-components";
const QuizMatchingCreator = () => {
  const dispatch = useAppDispatch();
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const userSelectedQuizVocabQuestionTypes = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabQuestionTypes
  );
  const userSelectedQuizVocabNPhrases = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabNPhrases
  );
  const matchingAnswerKey = useAppSelector(
    (state) => state.quizStore.matchingAnswerKey
  );
  const matchingQuestionAnsweredArray = useAppSelector(
    (state) => state.quizStore.matchingQuestionAnsweredArray
  );
  const totalNumberOfQuestions = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );
  const quizSubmitButtonClicked = useAppSelector(
    (state) => state.quizStore.quizSubmitButtonClicked
  );
  const numberOfMatchingQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions;
  const numberOfMultipleChoiceQuestion =
    userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions;
  const numberOfFillInBlankQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions;
  const startingQuestionValue =
    numberOfMultipleChoiceQuestion + numberOfFillInBlankQuestions + 1;
  const endingQuestionValue =
    numberOfMatchingQuestions +
    numberOfFillInBlankQuestions +
    numberOfMultipleChoiceQuestion;
  const [finalrenderReadyItems, setFinalRenderReadyItems] = useState<
    JSX.Element[]
  >([]);
  const [answerKey, setAnswerKey] = useState<string[]>([]);
  const [processingState, setProcessingState] = useState<number | string>(
    "start"
  );
  const [savedTestItems, setSavedTestItems] = useState<string[]>([]);
  const [savedPromptTerms, setSavedPromptTerms] = useState<string[]>([]);
  const [processStep, setProcessStep] = useState<string | number>(1);
  const initialArray: string[] = [];
  for (let temp = 0; temp < numberOfMatchingQuestions; temp++) {
    initialArray.push("");
  }
  const [userSelectedAnswersArray, setUserSelectedAnswersArray] =
    useState<string[]>(initialArray);

  // useEffect to push users nswers once the user presses the submit button

  useEffect(() => {
    if (quizSubmitButtonClicked) {
      dispatch(
        quizStoreSliceActions.setUserSelectedMatchingAnswers(
          userSelectedAnswersArray
        )
      );
    }
  }, [quizSubmitButtonClicked, dispatch, userSelectedAnswersArray]);

  // use effect to setup the stores answered question array
  useEffect(() => {
    const arrayOfAnsweredQuestions: boolean[] = [];
    for (
      let indexOfBoolean = 0;
      indexOfBoolean < numberOfMatchingQuestions;
      indexOfBoolean++
    ) {
      arrayOfAnsweredQuestions.push(false);
    }

    dispatch(
      quizStoreSliceActions.setMatchingQuestionAnsweredArray(
        arrayOfAnsweredQuestions
      )
    );
  }, [numberOfMatchingQuestions, dispatch]);

  // useEffect that pushses the initial answerKey to the store
  useEffect(() => {
    if (processingState === 1) {
      setProcessingState("end");
      dispatch(quizStoreSliceActions.setMatchingAnswerKey(answerKey));
      dispatch(quizStoreSliceActions.setMatchingPromptTerms(savedPromptTerms));
      dispatch(quizStoreSliceActions.setMatchingTestTerms(savedTestItems));
    }
  }, [
    answerKey,
    processingState,
    dispatch,
    matchingAnswerKey.length,
    savedPromptTerms,
    savedTestItems,
  ]);

  // use Effect used to push an array of booleans to see if the answer was answered by the user
  const questionAnsweredUpdater = (copyOfUserTypedAnswers: string[]) => {
    const arrayOfAnsweredQuestions = [];
    let updateDetected = false;
    for (
      let userTypedAnswersArrayIndex = 0;
      userTypedAnswersArrayIndex < copyOfUserTypedAnswers.length;
      userTypedAnswersArrayIndex++
    ) {
      if (copyOfUserTypedAnswers[userTypedAnswersArrayIndex].length !== 0) {
        arrayOfAnsweredQuestions.push(true);
      } else {
        arrayOfAnsweredQuestions.push(false);
      }
    }

    // comparing what is already active to what isn't active
    for (
      let indexOfComparison = 0;
      indexOfComparison < numberOfMatchingQuestions;
      indexOfComparison++
    ) {
      if (
        `${matchingQuestionAnsweredArray[indexOfComparison]}` !==
        `${arrayOfAnsweredQuestions[indexOfComparison]}`
      ) {
        updateDetected = true;
        break;
      }
    }

    if (updateDetected) {
      dispatch(
        quizStoreSliceActions.setMatchingQuestionAnsweredArray(
          arrayOfAnsweredQuestions
        )
      );
    }
  };

  //Creating drop down Options
  const answerLettersArray = letterAnswerKeyCreator(numberOfMatchingQuestions);
  const renderReadyStyledOptions: JSX.Element[] = [];
  for (
    let letterIndex = 0;
    letterIndex < numberOfMatchingQuestions;
    letterIndex++
  ) {
    // select drop down handler

    renderReadyStyledOptions[letterIndex] = (
      <StyledOption key={`${letterIndex} letterIndex`}>
        {answerLettersArray[letterIndex]}
      </StyledOption>
    );
  }
  renderReadyStyledOptions.unshift(
    <StyledOption key={`${-1} letterIndex`}>{""}</StyledOption>
  );

  // Step 1. Handeling numberOfMatchingQuestions > userSelected Items and creating the two matching sides

  if (finalrenderReadyItems.length === 0 && processingState === "start") {
    // if statement is here so that the questiosn are only generated once
    let arrayOfTestTerms: any[] = userSelectedQuizVocabNPhrases;
    let termsToBeTestedOn: string[] = [];
    let promptTerms: string[] = [];
    if (numberOfMatchingQuestions < userSelectedQuizVocabQuestionTypes.length) {
      arrayOfTestTerms = randomUserSelectGenerator(
        userSelectedQuizVocabNPhrases,
        numberOfMatchingQuestions
      );
    }

    if (userSelectedQuizVocabQuestionTypes === "English") {
      termsToBeTestedOn = arrayOfTestTerms.map(
        (userObject: UserSelectedData) => {
          return userObject.english;
        }
      );
      promptTerms = arrayOfTestTerms.map((userObject: UserSelectedData) => {
        return userObject.french;
      });
    } else if (userSelectedQuizVocabQuestionTypes === "French") {
      termsToBeTestedOn = arrayOfTestTerms.map(
        (userObject: UserSelectedData) => {
          return userObject.french;
        }
      );
      promptTerms = arrayOfTestTerms.map((userObject: UserSelectedData) => {
        return userObject.english;
      });
    } else {
      // randomly  coin toss for each term
      for (
        let indexOfCoinFlippedTerm = 0;
        indexOfCoinFlippedTerm < numberOfMatchingQuestions;
        indexOfCoinFlippedTerm++
      ) {
        const coinFlip = randomNumberGenerator(0, 1, 2);
        if (coinFlip === 0) {
          termsToBeTestedOn.push(
            arrayOfTestTerms[indexOfCoinFlippedTerm].french
          );
          promptTerms.push(arrayOfTestTerms[indexOfCoinFlippedTerm].english);
        } else {
          termsToBeTestedOn.push(
            arrayOfTestTerms[indexOfCoinFlippedTerm].english
          );
          promptTerms.push(arrayOfTestTerms[indexOfCoinFlippedTerm].french);
        }
      }
    }

    // Step 2: Scrambling the array of TestOnTerms

    const scrambledTestOnTerms = stringArrayScrambler(termsToBeTestedOn);

    // Step 3. Creating the Answer via mtching the newly scrambled Tems with their original parings

    const frenchTerms = arrayOfTestTerms.map((term: UserSelectedData) => {
      return term.french;
    });
    const englishTerms = arrayOfTestTerms.map((term: UserSelectedData) => {
      return term.english;
    });
    const tempAnswerKey = scrambledTestOnTerms.map(() => {
      return "";
    });

    for (
      let indexOfScrambledAnswer = 0;
      indexOfScrambledAnswer < scrambledTestOnTerms.length;
      indexOfScrambledAnswer++
    ) {
      let termToFind = "";
      // Step 1: finding out which type  the scambled term is
      const indexOfAnswerTermInFrench = frenchTerms.indexOf(
        promptTerms[indexOfScrambledAnswer]
      );
      const indexOfAnswerTermInEnglish = englishTerms.indexOf(
        promptTerms[indexOfScrambledAnswer]
      );

      // Step 2. Finding the correlated French / English Term
      if (indexOfAnswerTermInFrench === -1) {
        // answer is in english, so the term we need to find is french to match the cooresponding answer
        // This id due to indexof returning a -1 if no response was found
        termToFind = frenchTerms[indexOfAnswerTermInEnglish];
      } else {
        // answer is in french, so the term we need to find is english
        termToFind = englishTerms[indexOfAnswerTermInFrench];
      }
      // Step 3. Finding the terms position inside the arrayOfTestTerms variable

      const positionOfAnswer = scrambledTestOnTerms.indexOf(termToFind);

      tempAnswerKey[indexOfScrambledAnswer] =
        answerLettersArray[positionOfAnswer];
    }

    const tempRenderReadyItems = [];
    for (
      let questionIndex = 0;
      questionIndex < arrayOfTestTerms.length;
      questionIndex++
    ) {
      const selectDropDownHandler = (event: any) => {
        const copyOfUserTypedAnswers = userSelectedAnswersArray.slice(0);

        copyOfUserTypedAnswers[questionIndex] = event.target.value;
        setUserSelectedAnswersArray(copyOfUserTypedAnswers);
        questionAnsweredUpdater(copyOfUserTypedAnswers);
        setProcessStep("rerender");
      };

      tempRenderReadyItems[questionIndex] = (
        <MatchingRowContainer key={`${questionIndex} Question Index`}>
          <StyledTypography
            sx={{ textAlign: "left" }}
            key={`${questionIndex} A`}
          >
            {promptTerms[questionIndex]}
          </StyledTypography>
          <StyledSelect
            onChange={selectDropDownHandler}
            sx={{
              border: `${
                userSelectedAnswersArray[questionIndex] && "1px solid"
              }`,
              borderColor: `${
                userSelectedAnswersArray[questionIndex] && "secondary.light"
              }`,
              borderRadius: `${
                userSelectedAnswersArray[questionIndex] && "5px"
              }`,
            }}
          >
            {renderReadyStyledOptions}
          </StyledSelect>
          <StyledTypography
            sx={{ textAlign: "right" }}
            key={`${questionIndex} B`}
          >
            {answerLettersArray[questionIndex]}.{"  "}
            {scrambledTestOnTerms[questionIndex]}
          </StyledTypography>
        </MatchingRowContainer>
      );
    }
    setSavedTestItems(scrambledTestOnTerms);
    setSavedPromptTerms(promptTerms);

    setFinalRenderReadyItems(tempRenderReadyItems);
    setAnswerKey(tempAnswerKey);
    setProcessingState(1);
    setProcessStep("rerender");
  }

  if (
    processStep === "rerender" &&
    savedTestItems.length !== 0 &&
    savedPromptTerms.length !== 0
  ) {
    const tempRenderReadyItems = [];
    for (
      let questionIndex = 0;
      questionIndex < savedPromptTerms.length;
      questionIndex++
    ) {
      const selectDropDownHandler = (event: any) => {
        const copyOfUserTypedAnswers = userSelectedAnswersArray.slice(0);

        copyOfUserTypedAnswers[questionIndex] = event.target.value;

        setUserSelectedAnswersArray(copyOfUserTypedAnswers);
        questionAnsweredUpdater(copyOfUserTypedAnswers);
        setProcessStep("rerender");
      };

      tempRenderReadyItems[questionIndex] = (
        <MatchingRowContainer key={`${questionIndex} Question Index`}>
          <StyledTypography
            sx={{ textAlign: "left" }}
            key={`${questionIndex} A`}
          >
            {savedPromptTerms[questionIndex]}
          </StyledTypography>
          <StyledSelect
            onChange={selectDropDownHandler}
            sx={{
              border: `${
                userSelectedAnswersArray[questionIndex] && "1px solid"
              }`,
              borderColor: `${
                userSelectedAnswersArray[questionIndex] && "secondary.light"
              }`,
              borderRadius: `${
                userSelectedAnswersArray[questionIndex] && "5px"
              }`,
            }}
          >
            {renderReadyStyledOptions}
          </StyledSelect>
          <StyledTypography
            sx={{ textAlign: "right" }}
            key={`${questionIndex} B`}
          >
            {answerLettersArray[questionIndex]}.{"  "}
            {savedTestItems[questionIndex]}
          </StyledTypography>
        </MatchingRowContainer>
      );
    }
    setFinalRenderReadyItems(tempRenderReadyItems);
    setProcessStep("stop");
  }

  return (
    <MatchingTopContainer>
      <QuestionNumberBox>
        {startingQuestionValue}
        {"   "}-{"   "}
        {endingQuestionValue}
        {"   "} of {"   "}
        {totalNumberOfQuestions}
      </QuestionNumberBox>
      {finalrenderReadyItems}
    </MatchingTopContainer>
  );
};
export default QuizMatchingCreator;
