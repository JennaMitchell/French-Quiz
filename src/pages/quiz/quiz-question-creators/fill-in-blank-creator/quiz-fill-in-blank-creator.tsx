import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { randomUserSelectGenerator } from "../../../../components/functions/generic-functions";
import {
  TopContainer,
  QuestionContainer,
  QuestionTypography,
  TitleText,
  StyledTextField,
} from "../shared-styles/quiz-shared-styled-components";

import { useState, useEffect } from "react";
import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import { randomNumberGenerator } from "../../../../components/functions/generic-functions";
import {
  UserSelectedData,
  UserQuizQuestionSetup,
} from "../../../../store/quiz-store-slice";
import { QuestionNumberBox } from "../shared-styles/quiz-shared-styled-components";

const QuizFillInBlankCreator = () => {
  const [savedTestItems, setSavedTestItems] = useState<string[]>([]);
  const [savedAnswerItems, setSavedAnswerItems] = useState<string[]>([]);
  const [reRenderComponent, setReRenderComponent] = useState<boolean>(false);

  const userQuizQuestionSetup: UserQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const numberOfFillInBlankQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions;

  const totalNumberOfQuestions = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );
  const startingQuestionValue =
    userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions + 1;
  const endingQuestionValue =
    startingQuestionValue - 1 + numberOfFillInBlankQuestions;

  const userSelectedQuizVocabQuestionTypes: string = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabQuestionTypes
  );
  const userSelectedQuizVocabNPhrases: UserSelectedData[] = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabNPhrases
  );
  const quizSubmitButtonClicked = useAppSelector(
    (state) => state.quizStore.quizSubmitButtonClicked
  );
  const dispatch = useAppDispatch();
  const fillInBlankQuestionAnsweredArray: boolean[] = useAppSelector(
    (state) => state.quizStore.fillInBlankQuestionAnsweredArray
  );
  const initialArray: string[] = [];
  for (let temp = 0; temp < numberOfFillInBlankQuestions; temp++) {
    initialArray.push("");
  }

  const [userTypedAnswers, setUserTypedAnswers] =
    useState<string[]>(initialArray);
  const [questionGenerated, setQuestionGenerated] = useState<boolean>(false);

  // use Effect to push the users respond once the quiz submit button is pressed
  useEffect(() => {
    if (quizSubmitButtonClicked) {
      dispatch(
        quizStoreSliceActions.setUserSelectedFillInBlankAnswers(
          userTypedAnswers
        )
      );
      dispatch(
        quizStoreSliceActions.setFillInTheBlankTestTerms(savedTestItems)
      );
    }
  }, [quizSubmitButtonClicked, dispatch, userTypedAnswers, savedTestItems]);

  // use effect to setup the stores answered question array
  useEffect(() => {
    const arrayOfAnsweredQuestions: boolean[] = [];
    for (
      let indexOfBoolean = 0;
      indexOfBoolean < numberOfFillInBlankQuestions;
      indexOfBoolean++
    ) {
      arrayOfAnsweredQuestions.push(false);
    }

    dispatch(
      quizStoreSliceActions.setFillInBlankQuestionAnsweredArray(
        arrayOfAnsweredQuestions
      )
    );
  }, [numberOfFillInBlankQuestions, dispatch]);

  // useEffect used to push answer key after the data is rendered
  useEffect(() => {
    if (savedAnswerItems.length !== 0) {
      dispatch(quizStoreSliceActions.setMatchingAnswerKey(savedAnswerItems));
    }
  }, [savedAnswerItems.length, dispatch, savedAnswerItems]);

  // use Effect used to push an array of booleans to see if the answer was answered by the user
  const userEnteredDataChecker = (copyOfUserTypedAnswers: string[]) => {
    const arrayOfAnsweredQuestions = [];
    let updateDetected = false;

    for (
      let userTypedAnswersArrayIndex = 0;
      userTypedAnswersArrayIndex < userTypedAnswers.length;
      userTypedAnswersArrayIndex++
    ) {
      if (copyOfUserTypedAnswers[userTypedAnswersArrayIndex].length !== 0) {
        arrayOfAnsweredQuestions.push(true);
      } else {
        arrayOfAnsweredQuestions.push(false);
      }
    }

    for (
      let indexOfComparison = 0;
      indexOfComparison < numberOfFillInBlankQuestions;
      indexOfComparison++
    ) {
      if (
        fillInBlankQuestionAnsweredArray[indexOfComparison] !==
        arrayOfAnsweredQuestions[indexOfComparison]
      ) {
        updateDetected = true;
        break;
      }
    }

    if (updateDetected) {
      dispatch(
        quizStoreSliceActions.setFillInBlankQuestionAnsweredArray(
          arrayOfAnsweredQuestions
        )
      );
    }
    setReRenderComponent(!reRenderComponent);
  };

  let renderReadyItems: any[] = [];
  //// Generating the Data

  if (!questionGenerated) {
    let arrayOfTestTerms = userSelectedQuizVocabNPhrases;
    const testTermArray: string[] = [];
    const arrayOfAnswers: string[] = [];
    if (numberOfFillInBlankQuestions < userSelectedQuizVocabNPhrases.length) {
      arrayOfTestTerms = randomUserSelectGenerator(
        userSelectedQuizVocabNPhrases,
        numberOfFillInBlankQuestions
      );
    }
    renderReadyItems = arrayOfTestTerms.map(
      (item: UserSelectedData, questionIndex: number) => {
        let testItem = "";

        if (userSelectedQuizVocabQuestionTypes === "French") {
          testItem = item.french;
          arrayOfAnswers.push(item.english);
          testTermArray.push(item.french);
        } else if (userSelectedQuizVocabQuestionTypes === "English") {
          testItem = item.english;
          arrayOfAnswers.push(item.french);
          testTermArray.push(item.english);
        } else {
          const coinFlip = randomNumberGenerator(0, 1, 2);
          testItem = coinFlip === 0 ? item.french : item.english;
          if (coinFlip === 0) {
            arrayOfAnswers.push(item.english);
            testTermArray.push(item.french);
          } else {
            arrayOfAnswers.push(item.french);
            testTermArray.push(item.english);
          }
        }

        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          const copyOfUserTypedAnswers = userTypedAnswers.slice(0);

          copyOfUserTypedAnswers[questionIndex] = event.target.value;
          setUserTypedAnswers(copyOfUserTypedAnswers);
          userEnteredDataChecker(copyOfUserTypedAnswers);
        };

        return (
          <QuestionContainer key={questionIndex}>
            <QuestionTypography>{testItem}</QuestionTypography>

            <StyledTextField
              id={`answer-${questionIndex + startingQuestionValue}`}
              label={`answer-${questionIndex + startingQuestionValue}`}
              variant="outlined"
              onChange={changeHandler}
              multiline
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${
                      userTypedAnswers[questionIndex].length !== 0 &&
                      "secondary.light"
                    }`,
                  },
                },
              }}
            />
          </QuestionContainer>
        );
      }
    );
    setQuestionGenerated(true);
    setSavedTestItems(testTermArray);
    setSavedAnswerItems(arrayOfAnswers);
  }

  if (savedTestItems.length !== 0 && questionGenerated) {
    renderReadyItems = savedTestItems.map(
      (term: string, questionIndex: number) => {
        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          const copyOfUserTypedAnswers = userTypedAnswers.slice(0);

          copyOfUserTypedAnswers[questionIndex] = event.target.value;
          setUserTypedAnswers(copyOfUserTypedAnswers);
          userEnteredDataChecker(copyOfUserTypedAnswers);
        };

        return (
          <QuestionContainer key={questionIndex}>
            <QuestionTypography>{term}</QuestionTypography>

            <StyledTextField
              id={`answer-${questionIndex + startingQuestionValue}`}
              label={`answer-${questionIndex + startingQuestionValue}`}
              variant="outlined"
              onChange={changeHandler}
              multiline
              autoComplete="off"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: `${
                      userTypedAnswers[questionIndex].length !== 0 &&
                      "secondary.light"
                    }`,
                  },
                },
              }}
            />
          </QuestionContainer>
        );
      }
    );
  }

  let title = "";
  if (userSelectedQuizVocabQuestionTypes === "French") {
    title = "Translate the Terms into English";
  } else if (userSelectedQuizVocabQuestionTypes === "English") {
    title = "Translate the Terms into French";
  } else {
    title = "Translate into the Corresponding English/French Term";
  }

  return (
    <TopContainer>
      <QuestionNumberBox>
        {startingQuestionValue} - {endingQuestionValue} of{"  "}
        {totalNumberOfQuestions}
      </QuestionNumberBox>
      <TitleText>{title}</TitleText>
      {renderReadyItems}
    </TopContainer>
  );
};
export default QuizFillInBlankCreator;
