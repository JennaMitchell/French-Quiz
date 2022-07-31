import { TopContainer, StyledButton } from "./quiz-main-page-styled-components";
import NumberOfQuestionsPopup from "./popups/number-of-questions/number-of-questions-popup";
import QuizVocabSelectionPopup from "./popups/vocab-selection/quiz-vocab-selection-popup";
import NumberOfConjugationQuizQuestionsPopup from "./popups/number-of-conjugation-questions/number-of-conjugation-quiz-questions-popup";
import QuizConjugationSelectionPopup from "./popups/conjugation-selection/quiz-conjugation-selection-popup";
import QuizMultipleChoiceCreator from "./quiz-question-creators/quiz-multiple-choice-creator/quiz-mulitple-choice-creator";
import QuizFillInBlankCreator from "./quiz-question-creators/fill-in-blank-creator/quiz-fill-in-blank-creator";
import QuizMatchingCreator from "./quiz-question-creators/matching-choice-creator/quiz-matching-creator";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { quizReset } from "../../components/functions/quiz-reset-function";
import { useEffect, useState } from "react";
import { mainStoreSliceActions } from "../../store/store";

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

  const userQuizQuestionSetup: UserQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const activePage: string = useAppSelector(
    (state) => state.mainStore.activePage
  );
  const firebaseDataLoaded = useAppSelector(
    (state) => state.mainStore.firebaseDataLoaded
  );
  const [initialPopupActive, setInitialPopupActive] = useState(false);

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

  // use Effect handles creation of initial answer key based on the user selection

  return (
    <TopContainer>
      {initialPopupActive && <NumberOfQuestionsPopup />}
      {quizVocabSelectionPopupActive && <QuizVocabSelectionPopup />}
      {quizConjugationNumberOfQuestionsPopup && (
        <NumberOfConjugationQuizQuestionsPopup />
      )}
      {quizConjugationVerbSelectionPopupActive && (
        <QuizConjugationSelectionPopup />
      )}

      <StyledButton
        sx={{ top: "40px", right: "60px" }}
        onClick={newQuizHandler}
      >
        New Quiz
      </StyledButton>
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
        }}
      >
        Questions
      </StyledButton>

      {quizSetupComplete &&
        userQuizQuestionSetup.numberOfVocabNPhraseMultipleChoiceQuestions !==
          0 && <QuizMultipleChoiceCreator />}
      {quizSetupComplete &&
        userQuizQuestionSetup.numberOfVocabNPhraseFillInTheBlankQuestions !==
          0 && <QuizFillInBlankCreator />}
      {quizSetupComplete &&
        userQuizQuestionSetup.numberOfVocabNPhraseMatchingQuestions !== 0 && (
          <QuizMatchingCreator />
        )}
    </TopContainer>
  );
};
export default QuizMainPage;
