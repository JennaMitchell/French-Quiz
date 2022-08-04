import { TopContainer, StyledButton } from "./quiz-main-page-styled-components";
import NumberOfQuestionsPopup from "./popups/number-of-questions/number-of-questions-popup";
import QuizVocabSelectionPopup from "./popups/vocab-selection/quiz-vocab-selection-popup";
import NumberOfConjugationQuizQuestionsPopup from "./popups/number-of-conjugation-questions/number-of-conjugation-quiz-questions-popup";
import QuizConjugationSelectionPopup from "./popups/conjugation-selection/quiz-conjugation-selection-popup";
import QuizMultipleChoiceCreator from "./quiz-question-creators/quiz-multiple-choice-creator/quiz-mulitple-choice-creator";
import QuizFillInBlankCreator from "./quiz-question-creators/fill-in-blank-creator/quiz-fill-in-blank-creator";
import QuizMatchingCreator from "./quiz-question-creators/matching-choice-creator/quiz-matching-creator";
import QuizConjugationTableCreator from "./quiz-question-creators/quiz-conjugation-table-creator/quiz-conjugation-table-creator";
import QuizQuestionsDropDown from "./questions-drop-down/quiz-questions-drop-down";
import QuizAnswerKeyMain from "./quiz-answer-key/quiz-answer-key";

import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { quizReset } from "../../components/functions/quiz-reset-function";
import { useEffect, useState } from "react";
import { mainStoreSliceActions } from "../../store/store";
import MenuIcon from "@mui/icons-material/Menu";
import { quizStoreSliceActions } from "../../store/quiz-store-slice";

interface UserQuizQuestionSetup {
  numberOfTotalVocabNPhraseQuestions: number;
  numberOfVocabNPhraseMultipleChoiceQuestions: number;
  numberOfVocabNPhraseMatchingQuestions: number;
  numberOfVocabNPhraseFillInTheBlankQuestions: number;
}
const QuizMainPage = () => {
  const numberOfQuizQuestionsActive = useAppSelector(
    (state) => state.quizStore.numberOfQuizQuestionsPopupActive
  );
  const quizVocabSelectionPopupActive = useAppSelector(
    (state) => state.quizStore.quizVocabSelectionPopupActive
  );
  const quizConjugationVerbSelectionPopupActive = useAppSelector(
    (state) => state.quizStore.quizConjugationVerbSelectionPopupActive
  );
  const quizConjugationNumberOfQuestionsPopup = useAppSelector(
    (state) => state.quizStore.quizConjugationNumberOfQuestionsPopup
  );
  const quizSetupComplete = useAppSelector(
    (state) => state.quizStore.quizSetupComplete
  );
  const questionListActive = useAppSelector(
    (state) => state.quizStore.questionListActive
  );
  const userQuizQuestionSetup: UserQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );

  const conjugationQuestionAnsweredArray: boolean[] = useAppSelector(
    (state) => state.quizStore.conjugationQuestionAnsweredArray
  );
  const matchingQuestionAnsweredArray: boolean[] = useAppSelector(
    (state) => state.quizStore.matchingQuestionAnsweredArray
  );
  const fillInBlankQuestionAnsweredArray: boolean[] = useAppSelector(
    (state) => state.quizStore.fillInBlankQuestionAnsweredArray
  );
  const userSelectedMultipleChoiceQuizAnswers: string[] = useAppSelector(
    (state) => state.quizStore.userSelectedMultipleChoiceQuizAnswers
  );
  const userAnswerRetrieved: boolean = useAppSelector(
    (state) => state.quizStore.userAnswerRetrieved
  );
  const userSelectedFillInBlankAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedFillInBlankAnswers
  );
  const userSelectedConjugationAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedConjugationAnswers
  );

  const activePage: string = useAppSelector(
    (state) => state.mainStore.activePage
  );
  const firebaseDataLoaded = useAppSelector(
    (state) => state.mainStore.firebaseDataLoaded
  );
  const numberOfQuizConjugationQuestions = useAppSelector(
    (state) => state.quizStore.numberOfQuizConjugationQuestions
  );
  const quizSubmitButtonClicked = useAppSelector(
    (state) => state.quizStore.quizSubmitButtonClicked
  );
  const [initialPopupActive, setInitialPopupActive] = useState(false);
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);

  useEffect(() => {
    if (activePage !== "Quiz") {
      dispatch(mainStoreSliceActions.setActivePage("Quiz"));
    }
  });
  // "finished question set up"
  // use effect below is here so taht the first popup doesn't appear while to database is being laoded in
  useEffect(() => {
    if (firebaseDataLoaded && numberOfQuizQuestionsActive) {
      setInitialPopupActive(true);
    }
  }, [firebaseDataLoaded, numberOfQuizQuestionsActive]);

  const dispatch = useAppDispatch();
  const newQuizHandler = () => {
    quizReset(true, dispatch);
  };

  const questionMenuHandler = () => {
    dispatch(quizStoreSliceActions.setQuestionListActive(true));
  };

  // Quiz Submit Button Enabler

  useEffect(() => {
    let questionsAnsweredArray: boolean[] = [];

    if (userSelectedMultipleChoiceQuizAnswers.length !== 0) {
      for (
        let questionIndex = 0;
        questionIndex <
        userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions;
        questionIndex++
      ) {
        if (userSelectedMultipleChoiceQuizAnswers[questionIndex].length !== 0) {
          questionsAnsweredArray.push(true);
        } else {
          questionsAnsweredArray.push(false);
        }
      }
    }

    if (
      userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions !== 0
    ) {
      questionsAnsweredArray = questionsAnsweredArray.concat(
        fillInBlankQuestionAnsweredArray
      );
    }
    if (userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions !== 0) {
      questionsAnsweredArray = questionsAnsweredArray.concat(
        matchingQuestionAnsweredArray
      );
    }
    if (conjugationQuestionAnsweredArray.length !== 0) {
      questionsAnsweredArray = questionsAnsweredArray.concat(
        conjugationQuestionAnsweredArray
      );
    }
    // Final check
    if (
      !questionsAnsweredArray.includes(false) &&
      questionsAnsweredArray.length !== 0
    ) {
      setSubmitButtonEnabled(true);
    } else {
      if (submitButtonEnabled) {
        setSubmitButtonEnabled(false);
      }
    }
  }, [
    conjugationQuestionAnsweredArray,
    fillInBlankQuestionAnsweredArray,
    matchingQuestionAnsweredArray,
    userSelectedMultipleChoiceQuizAnswers,
    submitButtonEnabled,
    userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions,
    userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions,
    userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions,
  ]);

  const questionSubmitHandler = () => {
    dispatch(quizStoreSliceActions.setQuizSubmitButtonClicked(true));
  };

  // This useEffect is used to enable the answer key only when the answers have been retireved from the user
  // without out we run into the issue of rendering a component while the answers are being retrieved (at the same time);

  useEffect(() => {
    const arrayOfValuesToCheck: string[] = [];
    const arrayOfCheckedValues: boolean[] = [];
    if (quizSubmitButtonClicked) {
      if (
        userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions !== 0
      ) {
        // if we have fill in the blank questions
        // check to see if the userData has been updated
        arrayOfValuesToCheck.push("Fill In Blank");
      }

      if (userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions !== 0) {
        arrayOfValuesToCheck.push("Matching");
      }

      if (numberOfQuizConjugationQuestions !== 0) {
        arrayOfValuesToCheck.push("Conjugation");
      }
      if (arrayOfValuesToCheck.length === 0) {
        dispatch(quizStoreSliceActions.setUserAnswerRetrieved(true));
      } else {
        for (let u = 0; u < arrayOfValuesToCheck.length; u++) {
          switch (arrayOfValuesToCheck[u]) {
            case "Fill In Blank":
              if (userSelectedFillInBlankAnswers.length !== 0) {
                arrayOfCheckedValues.push(true);
              } else {
                arrayOfCheckedValues.push(false);
              }
              break;
            case "Matching":
              if (matchingQuestionAnsweredArray.length !== 0) {
                arrayOfCheckedValues.push(true);
              } else {
                arrayOfCheckedValues.push(false);
              }
              break;
            case "Conjugation":
              if (userSelectedConjugationAnswers.length !== 0) {
                arrayOfCheckedValues.push(true);
              } else {
                arrayOfCheckedValues.push(false);
              }
              break;
            default:
              break;
          }
        }
        if (!arrayOfCheckedValues.includes(false)) {
          dispatch(quizStoreSliceActions.setUserAnswerRetrieved(true));
        }
      }
    }
  }, [
    userAnswerRetrieved,
    dispatch,
    matchingQuestionAnsweredArray.length,
    numberOfQuizConjugationQuestions,
    quizSubmitButtonClicked,
    userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions,
    userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions,
    userSelectedConjugationAnswers.length,
    userSelectedFillInBlankAnswers.length,
  ]);

  return (
    <TopContainer>
      {quizSubmitButtonClicked && <QuizAnswerKeyMain />}
      {initialPopupActive && <NumberOfQuestionsPopup />}
      {quizVocabSelectionPopupActive && <QuizVocabSelectionPopup />}
      {quizConjugationNumberOfQuestionsPopup && (
        <NumberOfConjugationQuizQuestionsPopup />
      )}
      {quizConjugationVerbSelectionPopupActive && (
        <QuizConjugationSelectionPopup />
      )}
      {quizSetupComplete && questionListActive && <QuizQuestionsDropDown />}
      <StyledButton
        sx={{ top: "40px", right: "60px" }}
        onClick={newQuizHandler}
      >
        New Quiz
      </StyledButton>
      {!submitButtonEnabled && (
        <StyledButton
          sx={{
            top: "40px",
            right: "240px",
            color: "#c0bebe",
            backgroundColor: "#878787",
            ":hover": {
              color: "#c0bebe",
              backgroundColor: "#878787",
              boxShadow: "none",
            },
          }}
        >
          Submit
        </StyledButton>
      )}
      {submitButtonEnabled && !quizSubmitButtonClicked && (
        <StyledButton
          sx={{
            top: "40px",
            right: "240px",
          }}
          onClick={questionSubmitHandler}
        >
          Submit
        </StyledButton>
      )}

      {!quizSetupComplete && (
        <StyledButton
          sx={{
            top: "40px",
            left: "60px",
            color: "#c0bebe",
            backgroundColor: "#878787",
            ":hover": {
              color: "#c0bebe",
              backgroundColor: "#878787",
              boxShadow: "none",
            },
            padding: "10px",
            borderRadius: "50%",
          }}
        >
          <MenuIcon />
        </StyledButton>
      )}
      {quizSetupComplete && !questionListActive && (
        <StyledButton
          sx={{
            top: "40px",
            left: "60px",

            padding: "10px",
            borderRadius: "50%",
          }}
          onClick={questionMenuHandler}
        >
          <MenuIcon />
        </StyledButton>
      )}

      {!userAnswerRetrieved &&
        quizSetupComplete &&
        userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions !==
          0 && <QuizMultipleChoiceCreator />}
      {!userAnswerRetrieved &&
        quizSetupComplete &&
        userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions !==
          0 && <QuizFillInBlankCreator />}
      {!userAnswerRetrieved &&
        quizSetupComplete &&
        userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions !== 0 && (
          <QuizMatchingCreator />
        )}
      {quizSetupComplete && numberOfQuizConjugationQuestions !== 0 && (
        <QuizConjugationTableCreator />
      )}
    </TopContainer>
  );
};
export default QuizMainPage;
