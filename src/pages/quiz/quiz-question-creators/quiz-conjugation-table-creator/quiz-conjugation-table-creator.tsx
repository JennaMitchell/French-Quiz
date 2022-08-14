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
  const totalNumberOfVocabQuestions =
    userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions;
  const conjugationsTableDB: conjugationDB = useAppSelector(
    (state) => state.mainStore.conjugationTableDB
  );
  const conjugationQuestionAnsweredArray = useAppSelector(
    (state) => state.quizStore.conjugationQuestionAnsweredArray
  );

  const quizSubmitButtonClicked = useAppSelector(
    (state) => state.quizStore.quizSubmitButtonClicked
  );

  const [processState, setProcessState] = useState<string | number>("start");
  const [savedTermData, setSavedTermData] = useState<setupDatabase[]>([]);
  const tempTermsData: setupDatabase[] = [];

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
  // useEffect used to push the users final answers once they push the quiz submit button
  useEffect(() => {
    if (quizSubmitButtonClicked) {
      dispatch(
        quizStoreSliceActions.setUserSelectedConjugationAnswers(
          userTypedAnswers
        )
      );
    }
  }, [quizSubmitButtonClicked, dispatch, userTypedAnswers]);

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
      dispatch(quizStoreSliceActions.setQuizConjugationTerms(savedTermData));
    }
  }, [savedAnswerKey, dispatch, savedTermData]);
  // use Effect used to push an array of booleans to see if the answer was answered by the user
  const userEnteredDataChecker = (copyOfUserTypedAnswers: string[]) => {
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
        if (userSelectedQuizConjugationGrouping === "By Verb") {
          tempTermsData.push({
            verb: verb,
            prefix: prefix,
            conjugation: conjugation,
          });
        }
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
        tempTermsData.push(userSelectedRandomConjugationTable[randomNumber]);
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
            userEnteredDataChecker(copyOfUserTypedAnswers);
          };
          return (
            <QuestionContainer
              key={`Question ${index}`}
              id={`question-${index + totalNumberOfVocabQuestions}`}
            >
              <QuestionTypography>
                {capitalizeFirstLetter(inputobject.prefix)} "
                {inputobject.verb.toLocaleLowerCase()}"
              </QuestionTypography>
              <StyledTextField
                id={`answer-${index + 1 + totalNumberOfVocabQuestions}`}
                label={`answer-${index + 1 + totalNumberOfVocabQuestions}`}
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
            userEnteredDataChecker(copyOfUserTypedAnswers);
          };

          return (
            <QuestionContainer
              key={`Question ${index}`}
              id={`question-${index + totalNumberOfVocabQuestions}`}
            >
              <QuestionTypography>
                {capitalizeFirstLetter(inputobject.prefix)} "
                {inputobject.verb.toLocaleLowerCase()}"
              </QuestionTypography>
              <StyledTextField
                id={`answer-${index + 1 + totalNumberOfVocabQuestions}`}
                label={`answer-${index + 1 + totalNumberOfVocabQuestions}`}
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
            <TopContainer
              key={indexOfGrouping}
              id={`grouping-${indexOfGrouping + 1}`}
            >
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
    setSavedTermData(tempTermsData);
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
            userEnteredDataChecker(copyOfUserTypedAnswers);
          };
          return (
            <QuestionContainer
              key={`Question ${index}`}
              id={`question-${index + totalNumberOfVocabQuestions}`}
            >
              <QuestionTypography>
                {capitalizeFirstLetter(inputobject.prefix)} "
                {inputobject.verb.toLocaleLowerCase()}"
              </QuestionTypography>
              <StyledTextField
                id={`answer-${index + 1 + totalNumberOfVocabQuestions}`}
                label={`answer-${index + 1 + totalNumberOfVocabQuestions}`}
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
            userEnteredDataChecker(copyOfUserTypedAnswers);
          };
          return (
            <QuestionContainer
              key={`Question ${index}`}
              id={`question-${index + totalNumberOfVocabQuestions}`}
            >
              <QuestionTypography>
                {capitalizeFirstLetter(inputobject.prefix)} "
                {inputobject.verb.toLocaleLowerCase()}"
              </QuestionTypography>
              <StyledTextField
                id={`answer-${index + 1 + totalNumberOfVocabQuestions}`}
                label={`answer-${index + 1 + totalNumberOfVocabQuestions}`}
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

    // Grouping by verb if selected

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
            <TopContainer
              key={`Top Container ${indexOfGrouping}`}
              id={`grouping-${(indexOfGrouping + 1) / 8}`}
              sx={{
                "@media(max-width:1450px)": {
                  marginTop: `${
                    totalNumberOfVocabQuestions === 0 &&
                    indexOfGrouping === 0 &&
                    "90px"
                  }`,
                  "@media(max-width:560px)": {
                    marginTop: `${
                      totalNumberOfVocabQuestions === 0 &&
                      indexOfGrouping === 0 &&
                      "50px"
                    }`,
                  },
                },
              }}
            >
              <QuestionNumberBox>
                {totalNumberOfVocabQuestions + indexOfGrouping + 2 - 8} -{"  "}
                {totalNumberOfVocabQuestions + indexOfGrouping + 1} of {"  "}
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
        <TopContainer
          key={`Top Container`}
          id={`grouping-${1}`}
          sx={{
            "@media(max-width:1450px)": {
              marginTop: `${totalNumberOfVocabQuestions === 0 && "90px"}`,
            },
            "@media(max-width:560px)": {
              marginTop: `${totalNumberOfVocabQuestions === 0 && "50px"}`,
            },
          }}
        >
          <QuestionNumberBox>
            {totalNumberOfVocabQuestions + 1} -{"  "}
            {totalNumberOfVocabQuestions + numberOfQuestions * 8} of{"  "}
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
