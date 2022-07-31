import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import {
  ClosingIconContainer,
  ClosingIcon,
} from "../../../../components/generic-components/generic-popup-components";

import {
  ActionButton,
  DisabledActionButton,
  ButtonsContainer,
  StyledSelect,
  StyledOption,
  OptionContainer,
  StyledTitleTypography,
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
    let renderQuestionOption = <StyledOption key={j}>{j}</StyledOption>;
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
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "primary.main",
          borderRadius: "20px",
        },
        "&.PaperProps": {
          borderRadius: "20px",
          border: "none",
          margin: "0",

          "@media(maxWidth:475px)": {
            width: "max(325px,325px)",
          },
        },
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "primary.main",
          color: "secondary.light",
          overflowX: "hidden",
          borderRadius: "20px",
          padding: "10px 40px 20px 40px",

          height: "max-content",
          "@media(maxWidth:475px)": {
            width: "max(325px,325px)",
          },
        }}
      >
        <ClosingIconContainer onClick={onCloseFunction}>
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>
        <Grid
          container
          columns={1}
          sx={{ flexDirection: "column", placeItems: "center" }}
        >
          <Typography
            variant="h6"
            sx={{
              "@media(max-width:580px)": { fontSize: "18px" },
              "@media(max-width:520px)": { fontSize: "16px" },
              "@media(max-width:475px)": {
                fontSize: "12px",
                textAlign: "center",
              },
            }}
          >
            Step 3 of 6
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontSize: "32px",
              width: "max(400px,400px)",
              textAlign: "center",
              "@media(max-width:580px)": { fontSize: "28px" },
              "@media(max-width:520px)": { fontSize: "22px" },
              "@media(max-width:475px)": { fontSize: "18px" },
            }}
          >
            Select the Number of Conjugation Questions
          </Typography>
          <OptionContainer sx={{ marginTop: "20px" }}>
            <StyledTitleTypography>Number of Questions:</StyledTitleTypography>
            <StyledSelect onChange={numberOfQuestionsHandler}>
              {overallQuestionNumbersArray}
            </StyledSelect>
          </OptionContainer>
        </Grid>
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
