import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";

import {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  ActionButton,
  DisabledActionButton,
  StyledStepTitleText,
  StyledDialog,
  StyledDialogContent,
  QuestionOptionContainer,
  StyledPopupOption,
  StyledPopupSelect,
  ActionButtonsContainer,
} from "../../../../components/generic-components/generic-popup-components";

import { useState, useEffect } from "react";
import { ChangeEventHandler } from "react";
import { practiceSheetReset } from "../../../../components/functions/practice-sheet-reset-function";

const NumberOfConjugationQuestionsPopup = () => {
  const dispatch = useAppDispatch();

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const numberOfConjugationPopupActive = useAppSelector(
    (state) => state.sheetGenerator.numberOfConjugationPopupActive
  );

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
    practiceSheetReset(false, dispatch);
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
    if (numberOfConjugationPopupActive) {
      setNumberOfQuestions(0);
    }
  }, [numberOfConjugationPopupActive]);

  // Handeling Submits

  const submitHandler = () => {
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfConjugationPopupActive(false)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfConjugationQuestions(
        numberOfQuestions
      )
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setConjugationVerbChoicePopup(true)
    );
  };

  const skipButtonHandler = () => {
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfConjugationPopupActive(false)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfConjugationQuestions(0)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfPhraseQuestionsPopupActive(
        true
      )
    );
  };

  return (
    <StyledDialog
      open={numberOfConjugationPopupActive}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
    >
      <StyledDialogContent>
        <ClosingIconContainer onClick={onCloseFunction}>
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText
          variant="h6"
          sx={{
            paddingLeft: "7.5px",
            width: "max(100%,100%)",
          }}
        >
          Step 3 of 6
        </StyledStepTitleText>

        <StyledPopupTypography
          variant="h4"
          sx={{
            textAlign: "center",
            justifySelf: "center",
            width: "90%",
          }}
        >
          Select the Number of Conjugation Questions
        </StyledPopupTypography>
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
export default NumberOfConjugationQuestionsPopup;
