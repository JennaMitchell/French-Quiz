import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";

import {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  ActionButton,
  DisabledActionButton,
  StyledPopupSelect,
  StyledPopupOption,
  StyledStepTitleText,
  PopupTitle,
  StyledDialog,
  StyledDialogContent,
  ActionButtonsContainer,
  QuestionOptionContainer,
} from "../../../../components/generic-components/generic-popup-components";

import { useState, useEffect } from "react";
import { ChangeEventHandler } from "react";

import { quizReset } from "../../../../components/functions/quiz-reset-function";
const NumberOfConjugationQuizQuestionsPopup = () => {
  const dispatch = useAppDispatch();

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const quizConjugationNumberOfQuestionsPopup = useAppSelector(
    (state) => state.quizStore.quizConjugationNumberOfQuestionsPopup
  );
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const numberOfVocabQuestions =
    userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions;
  const verbsDB = useAppSelector((state) => state.mainStore.verbsDB);

  // creating the max number of selected Questions
  const maxNumberOfQuestions = verbsDB.length;
  let overallQuestionNumbersArray = [];
  for (let j = 0; j < maxNumberOfQuestions + 1; j++) {
    let renderQuestionOption = (
      <StyledPopupOption key={j}>{j}</StyledPopupOption>
    );
    overallQuestionNumbersArray.push(renderQuestionOption);
  }

  // Closing Rest Function
  const onCloseFunction = () => {
    quizReset(false, dispatch);
  };

  // Handeling the Selector

  const numberOfQuestionsHandler: ChangeEventHandler<HTMLSelectElement> = (
    e
  ): void => {
    if (typeof +e.target.value === "number" && +e.target.value >= 0) {
      setNumberOfQuestions(+e.target.value);
    }
  };

  // Resetting The Popup evertime it starts up
  useEffect(() => {
    if (quizConjugationNumberOfQuestionsPopup) {
      setNumberOfQuestions(0);
    }
  }, [quizConjugationNumberOfQuestionsPopup]);

  // Handeling Submits

  const submitHandler = () => {
    dispatch(
      quizStoreSliceActions.setQuizConjugationNumberOfQuestionsPopup(false)
    );
    dispatch(
      quizStoreSliceActions.setNumberOfQuizConjugationQuestions(
        numberOfQuestions
      )
    );
    dispatch(
      quizStoreSliceActions.setQuizConjugationVerbSelectionPopupActive(true)
    );
    dispatch(
      quizStoreSliceActions.setTotalNumberOfQuestions(
        numberOfVocabQuestions + numberOfQuestions * 8
      )
    );
  };

  const skipButtonHandler = () => {
    dispatch(
      quizStoreSliceActions.setQuizConjugationNumberOfQuestionsPopup(false)
    );
    dispatch(quizStoreSliceActions.setNumberOfQuizConjugationQuestions(0));

    dispatch(quizStoreSliceActions.setQuizSetupComplete(true));
    dispatch(
      quizStoreSliceActions.setTotalNumberOfQuestions(numberOfVocabQuestions)
    );
  };

  return (
    <StyledDialog
      open={quizConjugationNumberOfQuestionsPopup}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
    >
      <StyledDialogContent>
        <ClosingIconContainer onClick={onCloseFunction}>
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText variant="h6">Step 3 of 4</StyledStepTitleText>

        <PopupTitle
          sx={{
            textAlign: "center",
            justifySelf: "center",
            width: "90%",
          }}
        >
          Select the Number of Conjugation Questions
        </PopupTitle>
        <QuestionOptionContainer>
          <StyledPopupTypography>Number of Questions:</StyledPopupTypography>
          <StyledPopupSelect onChange={numberOfQuestionsHandler}>
            {overallQuestionNumbersArray}
          </StyledPopupSelect>
        </QuestionOptionContainer>

        <ActionButtonsContainer>
          {numberOfQuestions !== 0 && (
            <ActionButton onClick={submitHandler}>Submit</ActionButton>
          )}

          {numberOfQuestions === 0 && (
            <DisabledActionButton disabled={true}>Submit</DisabledActionButton>
          )}

          <ActionButton onClick={skipButtonHandler}>Skip</ActionButton>
        </ActionButtonsContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
};
export default NumberOfConjugationQuizQuestionsPopup;
