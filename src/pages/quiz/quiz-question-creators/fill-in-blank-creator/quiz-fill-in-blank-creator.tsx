import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { randomUserSelectGenerator } from "../../../../components/functions/generic-functions";
import {
  FillInBlankQuestionContainer,
  FillInBlankTopContainer,
  QuestionTypography,
  StyledTextField,
  FillInBlankTitle,
} from "./quiz-fill-in-blank-creator-styled-components";

import { useState, useEffect } from "react";
import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import { randomNumberGenerator } from "../../../../components/functions/generic-functions";
import {
  UserSelectedData,
  UserQuizQuestionSetup,
} from "../../../../store/quiz-store-slice";

const QuizFillInBlankCreator = () => {
  const userQuizQuestionSetup: UserQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const numberOfQuestions =
    userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions;

  const userSelectedQuizVocabQuestionTypes: string = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabQuestionTypes
  );
  const userSelectedQuizVocabNPhrases: UserSelectedData[] = useAppSelector(
    (state) => state.quizStore.userSelectedQuizVocabNPhrases
  );
  const dispatch = useAppDispatch();
  const fillInBlankQuestionAnsweredArray: boolean[] = useAppSelector(
    (state) => state.quizStore.fillInBlankQuestionAnsweredArray
  );
  const initialArray: string[] = [];
  for (let temp = 0; temp < numberOfQuestions; temp++) {
    initialArray.push("");
  }
  const [finalRenderReadyItems, setFinalRenderReadyItems] = useState<
    JSX.Element[]
  >([]);

  const [userTypedAnswers, setUserTypedAnswers] =
    useState<string[]>(initialArray);
  const [questionGenerated, setQuestionGenerated] = useState<number | string>(
    0
  );

  // use effect to setup the stores answered question array
  useEffect(() => {
    const arrayOfAnsweredQuestions: boolean[] = [];
    for (
      let indexOfBoolean = 0;
      indexOfBoolean < numberOfQuestions;
      indexOfBoolean++
    ) {
      arrayOfAnsweredQuestions.push(false);
    }

    dispatch(
      quizStoreSliceActions.setFillInBlankQuestionAnsweredArray(
        arrayOfAnsweredQuestions
      )
    );
  }, [numberOfQuestions, dispatch]);

  // use Effect used to push an array of booleans to see if the answer was answered by the user
  useEffect(() => {
    if (fillInBlankQuestionAnsweredArray.length !== 0) {
      let arrayNotEmpty = false;
      const arrayOfAnsweredQuestions = [];
      let updateDetected = false;
      for (
        let userTypedAnswersArrayIndex = 0;
        userTypedAnswersArrayIndex < userTypedAnswers.length;
        userTypedAnswersArrayIndex++
      ) {
        if (userTypedAnswers[userTypedAnswersArrayIndex] !== "") {
          arrayNotEmpty = true;
          arrayOfAnsweredQuestions.push(true);
        } else {
          arrayOfAnsweredQuestions.push(false);
        }
      }
      if (arrayNotEmpty) {
        // comparing what is already active to what isn't active
        for (
          let indexOfComparison = 0;
          indexOfComparison < numberOfQuestions;
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
      }

      if (updateDetected) {
        dispatch(
          quizStoreSliceActions.setFillInBlankQuestionAnsweredArray(
            arrayOfAnsweredQuestions
          )
        );
      }
    }
  }, [
    userTypedAnswers,
    dispatch,
    fillInBlankQuestionAnsweredArray,
    numberOfQuestions,
  ]);

  let renderReadyItems: any[] = [];
  //// Generating the Data

  if (questionGenerated === 0) {
    let arrayOfTestTerms = userSelectedQuizVocabNPhrases;
    if (numberOfQuestions < userSelectedQuizVocabNPhrases.length) {
      arrayOfTestTerms = randomUserSelectGenerator(
        userSelectedQuizVocabNPhrases,
        numberOfQuestions
      );
    }
    renderReadyItems = arrayOfTestTerms.map(
      (item: UserSelectedData, questionIndex: number) => {
        let testItem = "";
        if (userSelectedQuizVocabQuestionTypes === "French") {
          testItem = item.french;
        } else if (userSelectedQuizVocabQuestionTypes === "English") {
          testItem = item.english;
        } else {
          const coinFlip = randomNumberGenerator(0, 1, 2);
          testItem = coinFlip === 0 ? item.french : item.english;
        }

        const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
          const copyOfUserTypedAnswers = userTypedAnswers.slice(0);

          copyOfUserTypedAnswers[questionIndex] = event.target.value;
          setUserTypedAnswers(copyOfUserTypedAnswers);
        };
        return (
          <FillInBlankQuestionContainer key={questionIndex}>
            <QuestionTypography>{testItem}</QuestionTypography>

            <StyledTextField
              id={`answer-${questionIndex + 1}`}
              label={`answer-${questionIndex + 1}`}
              variant="outlined"
              onChange={changeHandler}
              multiline
            />
          </FillInBlankQuestionContainer>
        );
      }
    );
    setQuestionGenerated("x");
    setFinalRenderReadyItems(renderReadyItems);
  }
  let title = "";
  if (userSelectedQuizVocabQuestionTypes === "French") {
    title = "Translate into English";
  } else if (userSelectedQuizVocabQuestionTypes === "English") {
    title = "Translate into French";
  } else {
    title = "Translate into the Corresponding English/French Term";
  }

  return (
    <FillInBlankTopContainer>
      <FillInBlankTitle>{title}</FillInBlankTitle>
      {finalRenderReadyItems}
    </FillInBlankTopContainer>
  );
};
export default QuizFillInBlankCreator;
