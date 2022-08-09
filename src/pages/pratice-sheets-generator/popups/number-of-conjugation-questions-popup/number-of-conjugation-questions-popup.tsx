import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  ActionButton,
  DisabledActionButton,
  StyledPopupSelect,
  StyledPopupOption,
  StyledStepTitleText,
} from "../../../../components/generic-components/generic-popup-components";

import {
  ButtonsContainer,
  OptionContainer,
} from "./number-of-conjugation-questions-popup-styled-components";
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
    <Dialog
      open={numberOfConjugationPopupActive}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          border: "none",
          margin: "0",
          minHeight: "max-content",
          height: "max-content",
          maxHeight: "100vh",

          "@media(max-width:475px)": {
            width: "max(325px,325px)",
          },
          "@media(max-width:400px)": {
            width: "max(300px,300px)",
          },
        },
      }}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "primary.main",
          borderRadius: "20px",
        },
        "&.PaperProps": {
          borderRadius: "20px",
          border: "none",
          margin: "0",
        },
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "primary.main",
          color: "secondary.light",
          overflowX: "hidden",
          borderRadius: "20px",
          padding: "20px 40px 20px 40px",
          display: "grid",
          gridTemplateColumns: "450px",
          gridTemplateRows: "max-content",
          alignItems: "center",
          justifyContent: "center",

          height: "max-content",
          "@media(max-width:550px)": {
            gridTemplateColumns: "350px",
          },
          "@media(max-width:475px)": {
            width: "max(325px,325px)",
            gridTemplateColumns: "300px",
            padding: "10px 20px 10px 20px",
          },
          "@media(max-width:400px)": {
            width: "max(300px,300px)",
            gridTemplateColumns: "275px",
          },
        }}
      >
        <ClosingIconContainer onClick={onCloseFunction}>
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText variant="h6" sx={{ paddingLeft: "7.5px" }}>
          Step 3 of 6
        </StyledStepTitleText>

        <StyledPopupTypography
          variant="h4"
          sx={{
            fontSize: "32px",
            textAlign: "center",

            "@media(max-width:475px)": {
              width: "max(90%,90%)",
              paddingLeft: "15px",
            },
          }}
        >
          Select the Number of Conjugation Questions
        </StyledPopupTypography>
        <OptionContainer sx={{ marginTop: "20px" }}>
          <StyledPopupTypography>Number of Questions:</StyledPopupTypography>
          <StyledPopupSelect onChange={numberOfQuestionsHandler}>
            {overallQuestionNumbersArray}
          </StyledPopupSelect>
        </OptionContainer>

        <ButtonsContainer>
          {numberOfQuestions !== 0 && (
            <ActionButton onClick={submitHandler}>Submit</ActionButton>
          )}

          {numberOfQuestions === 0 && (
            <DisabledActionButton disabled={true}>Submit</DisabledActionButton>
          )}

          <ActionButton onClick={skipButtonHandler}>Skip</ActionButton>
        </ButtonsContainer>
      </DialogContent>
    </Dialog>
  );
};
export default NumberOfConjugationQuestionsPopup;
