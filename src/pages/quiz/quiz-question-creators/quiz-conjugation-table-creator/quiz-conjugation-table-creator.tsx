import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  UserSelectedData,
  quizStoreSliceActions,
} from "../../../../store/quiz-store-slice";
import { conjugationDB } from "../../../../store/store";
import {
  randomNumberGeneratorWithNumberArrayRestriction,
  capitalizeFirstLetter,
} from "../../../../components/functions/generic-functions";
import { useState, useEffect } from "react";

import {
  TopContainer,
  QuestionContainer,
  QuestionTypography,
  TitleText,
  StyledTextField,
  QuestionNumberBox,
} from "../shared-styles/quiz-shared-styled-components";
const QuizConjugationTableCreator = () => {
  interface setupDatabase {
    verb: string;
    prefix: string;
    conjugation: string;
  }

  const dispatch = useAppDispatch();

  const [reRenderTermData, setReRenderTermData] = useState<setupDatabase[]>([]);
  let tempAnswerKey: string[] = [];
  const [savedAnswerKey, setSavedAnswerKey] = useState<string[]>([]);
  const userSelectedQuizConjugations: UserSelectedData[] = useAppSelector(
    (state) => state.quizStore.userSelectedQuizConjugations
  );
  const totalNumberOfQuestions = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );
  const numberOfQuestions = userSelectedQuizConjugations.length;
  const userSelectedQuizConjugationGrouping = useAppSelector(
    (state) => state.quizStore.userSelectedQuizConjugationGrouping
  );
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const totalnumberOfVocabQuestions =
    userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions;
  const conjugationsTableDB: conjugationDB = useAppSelector(
    (state) => state.mainStore.conjugationTableDB
  );
  const conjugationQuestionAnsweredArray = useAppSelector(
    (state) => state.quizStore.conjugationQuestionAnsweredArray
  );
  const [processState, setProcessState] = useState<string | number>("start");

  const arrayOfConjugationTableKeys = [
    "je",
    "tu",
    "il",
    "elle",
    "vous",
    "nous",
    "elles",
    "ils",
  ];

  const initialUserTypedAnswers = [];
  for (
    let initialIndex = 0;
    initialIndex < userSelectedQuizConjugations.length * 8;
    initialIndex++
  ) {
    initialUserTypedAnswers.push("");
  }

  const [userTypedAnswers, setUserTypedAnswers] = useState<string[]>(
    initialUserTypedAnswers
  );
  // use effect to setup the stores answered question array
  useEffect(() => {
    const arrayOfAnsweredQuestions: boolean[] = [];
    for (
      let indexOfBoolean = 0;
      indexOfBoolean < numberOfQuestions * arrayOfConjugationTableKeys.length;
      indexOfBoolean++
    ) {
      arrayOfAnsweredQuestions.push(false);
    }

    dispatch(
      quizStoreSliceActions.setConjugationQuestionAnsweredArray(
        arrayOfAnsweredQuestions
      )
    );
  }, [numberOfQuestions, dispatch, arrayOfConjugationTableKeys.length]);

  // use Effect used to push answer key after the data is rendered
  useEffect(() => {
    if (savedAnswerKey.length !== 0) {
      dispatch(quizStoreSliceActions.setConjugationAnswerKey(savedAnswerKey));
    }
  }, [savedAnswerKey, dispatch]);
  // use Effect used to push an array of booleans to see if the answer was answered by the user
  const userEnteredDataChecker = () => {
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
        indexOfComparison < numberOfQuestions * 8;
        indexOfComparison++
      ) {
        if (
          conjugationQuestionAnsweredArray[indexOfComparison] !==
          arrayOfAnsweredQuestions[indexOfComparison]
        ) {
          updateDetected = true;
          break;
        }
      }
    }

    if (updateDetected) {
      dispatch(
        quizStoreSliceActions.setConjugationQuestionAnsweredArray(
          arrayOfAnsweredQuestions
        )
      );
    }
  };

  let tempRenderReadyItems: JSX.Element[] = [];
  let finalRenderReadyItems: JSX.Element[] | JSX.Element = [];
  const userSelectedByVerbConjugationTable = [];
  let userSelectedRandomConjugationTable = [];
  if (processState === "start") {
    // Step 1. Grabing the coolerated data from what the user selected and sorting

    for (
      let indexOfConjugation = 0;
      indexOfConjugation < userSelectedQuizConjugations.length;
      indexOfConjugation++
    ) {
      // Random selection creates an overall data that will be randomly sorted
      const selectedFrenchTerm =
        userSelectedQuizConjugations[indexOfConjugation].french;
      const conjugationData = conjugationsTableDB[selectedFrenchTerm];

      for (let i = 0; i < arrayOfConjugationTableKeys.length; i++) {
        const verb = selectedFrenchTerm;
        const conjugation = conjugationData[arrayOfConjugationTableKeys[i]];
        const prefix = arrayOfConjugationTableKeys[i];

        userSelectedRandomConjugationTable.push({
          verb: verb,
          prefix: prefix,
          conjugation: conjugation,
        });
        userSelectedByVerbConjugationTable.push({
          verb: verb,
          prefix: prefix,
          conjugation: conjugation,
        });
        tempAnswerKey.push(conjugation);
      }
    }

    // Step 2. Randomizing random selection if selected

    const newRandomizedArrayUserDataArray = [];
    if (userSelectedQuizConjugationGrouping === "Random") {
      tempAnswerKey = [];
      const randomAnswerExceptionsArray = [
        userSelectedRandomConjugationTable.length,
      ];
      for (
        let index = 0;
        index < userSelectedRandomConjugationTable.length;
        index++
      ) {
        const randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
          0,
          userSelectedRandomConjugationTable.length - 1,
          randomAnswerExceptionsArray
        );
        newRandomizedArrayUserDataArray.push(
          userSelectedRandomConjugationTable[randomNumber]
        );
        randomAnswerExceptionsArray.push(randomNumber);
        tempAnswerKey.push(
          userSelectedRandomConjugationTable[randomNumber].conjugation
        );
      }
    }

    // Step 3. Creating the inital Content
    if (userSelectedQuizConjugationGrouping === "Random") {
      finalRenderReadyItems = userSelectedRandomConjugationTable.map(
        (inputobject: setupDatabase, index: number) => {
          const changeHandler = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const copyOfUserTypedAnswers: string[] = userTypedAnswers.slice(0);

            copyOfUserTypedAnswers[index] = event.target.value;
            setUserTypedAnswers(copyOfUserTypedAnswers);
            userEnteredDataChecker();
          };
          return (
            <QuestionContainer>
              <QuestionTypography>
                {capitalizeFirstLetter(inputobject.prefix)} "
                {inputobject.verb.toLocaleLowerCase()}"
              </QuestionTypography>
              <StyledTextField
                id={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
                label={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
                variant="outlined"
                onChange={changeHandler}
                multiline
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${
                        userTypedAnswers[index].length !== 0 &&
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
    } else {
      tempRenderReadyItems = userSelectedByVerbConjugationTable.map(
        (inputobject: setupDatabase, index: number) => {
          const changeHandler = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const copyOfUserTypedAnswers: string[] = userTypedAnswers.slice(0);

            copyOfUserTypedAnswers[index] = event.target.value;
            setUserTypedAnswers(copyOfUserTypedAnswers);
            userEnteredDataChecker();
          };

          return (
            <QuestionContainer>
              <QuestionTypography>
                {capitalizeFirstLetter(inputobject.prefix)} "
                {inputobject.verb.toLocaleLowerCase()}"
              </QuestionTypography>
              <StyledTextField
                id={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
                label={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
                variant="outlined"
                onChange={changeHandler}
                multiline
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${
                        userTypedAnswers[index].length !== 0 &&
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

    // Step 4. Grouping By Verb if Group berb grouping is selected

    if (userSelectedQuizConjugationGrouping !== "Random") {
      const numberOfIterations = userSelectedQuizConjugations.length;
      let tempJSXArray = [];
      for (
        let indexOfGrouping = 0;
        indexOfGrouping <
        numberOfIterations * arrayOfConjugationTableKeys.length;
        indexOfGrouping++
      ) {
        tempJSXArray.push(tempRenderReadyItems[indexOfGrouping]);
        if ((indexOfGrouping + 1) % arrayOfConjugationTableKeys.length === 0) {
          const indexOfVerb =
            (indexOfGrouping + 1) / arrayOfConjugationTableKeys.length - 1;
          const titleVerb = userSelectedQuizConjugations[indexOfVerb].french;

          finalRenderReadyItems = (
            <TopContainer key={indexOfGrouping}>
              <TitleText>Conjugate {titleVerb}</TitleText>
              {tempJSXArray}
            </TopContainer>
          );
        }
      }
    }
    // Step 5. Pushing the initial Data for rendering and triggering the useEffect

    if (userSelectedQuizConjugationGrouping === "Random") {
      setReRenderTermData(newRandomizedArrayUserDataArray);
    } else {
      setReRenderTermData(userSelectedByVerbConjugationTable);
    }

    setSavedAnswerKey(tempAnswerKey);
    setProcessState("production");
  }

  // Handeling Data rendering after the intial push

  if (processState === "production") {
    if (userSelectedQuizConjugationGrouping === "Random") {
      finalRenderReadyItems = reRenderTermData.map(
        (inputobject: setupDatabase, index: number) => {
          const changeHandler = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const copyOfUserTypedAnswers: string[] = userTypedAnswers.slice(0);

            copyOfUserTypedAnswers[index] = event.target.value;
            setUserTypedAnswers(copyOfUserTypedAnswers);
            userEnteredDataChecker();
          };
          return (
            <QuestionContainer>
              <QuestionTypography>
                {capitalizeFirstLetter(inputobject.prefix)} "
                {inputobject.verb.toLocaleLowerCase()}"
              </QuestionTypography>
              <StyledTextField
                id={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
                label={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
                variant="outlined"
                onChange={changeHandler}
                multiline
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${
                        userTypedAnswers[index].length !== 0 &&
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
    } else {
      tempRenderReadyItems = reRenderTermData.map(
        (inputobject: setupDatabase, index: number) => {
          const changeHandler = (
            event: React.ChangeEvent<HTMLInputElement>
          ) => {
            const copyOfUserTypedAnswers: string[] = userTypedAnswers.slice(0);

            copyOfUserTypedAnswers[index] = event.target.value;
            setUserTypedAnswers(copyOfUserTypedAnswers);
            userEnteredDataChecker();
          };
          return (
            <QuestionContainer>
              <QuestionTypography>
                {capitalizeFirstLetter(inputobject.prefix)} "
                {inputobject.verb.toLocaleLowerCase()}"
              </QuestionTypography>
              <StyledTextField
                id={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
                label={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
                variant="outlined"
                onChange={changeHandler}
                multiline
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: `${
                        userTypedAnswers[index].length !== 0 &&
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

    // Grouping By Verb if Group berb grouping is selected

    if (userSelectedQuizConjugationGrouping !== "Random") {
      const numberOfIterations = userSelectedQuizConjugations.length;
      let tempJSXArray = [];
      finalRenderReadyItems = [];
      for (
        let indexOfGrouping = 0;
        indexOfGrouping <
        numberOfIterations * arrayOfConjugationTableKeys.length;
        indexOfGrouping++
      ) {
        tempJSXArray.push(tempRenderReadyItems[indexOfGrouping]);

        if ((indexOfGrouping + 1) % arrayOfConjugationTableKeys.length === 0) {
          const indexOfVerb =
            (indexOfGrouping + 1) / arrayOfConjugationTableKeys.length - 1;
          const titleVerb = userSelectedQuizConjugations[indexOfVerb].french;

          finalRenderReadyItems.push(
            <TopContainer>
              <QuestionNumberBox>
                {totalnumberOfVocabQuestions + indexOfGrouping + 2 - 8} -{"  "}
                {totalnumberOfVocabQuestions + indexOfGrouping + 1} of {"  "}
                {totalNumberOfQuestions}
              </QuestionNumberBox>
              <TitleText sx={{ paddingBottom: "0px", paddingTop: "0px" }}>
                Conjugate "{titleVerb}"
              </TitleText>
              {tempJSXArray}
            </TopContainer>
          );
          tempJSXArray = [];
        }
      }
    } else {
      finalRenderReadyItems = (
        <TopContainer>
          <QuestionNumberBox>
            {totalnumberOfVocabQuestions + 1} -{"  "}
            {totalnumberOfVocabQuestions + numberOfQuestions * 8} of{"  "}
            {totalNumberOfQuestions}
          </QuestionNumberBox>
          {finalRenderReadyItems}
        </TopContainer>
      );
    }
  }

  return <>{finalRenderReadyItems}</>;
};
export default QuizConjugationTableCreator;
