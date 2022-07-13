import { useSelector, useDispatch } from "react-redux";
import { DatabaseStates, storeActions } from "../../../../store/store";
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

const NumberOfConjugationQuestionsPopup = () => {
  const dispatch = useDispatch();

  const onCloseHandler = () => {
    dispatch(storeActions.setVocabSelectPopupActive(false));
  };
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const conjugationPopupActive = useSelector(
    (state: DatabaseStates) => state.conjugationPopupActive
  );

  // creating the max number of selected Questions
  const maxNumberOfQuestions = 30;
  let overallQuestionNumbersArray = [];
  for (let j = 0; j < maxNumberOfQuestions + 1; j++) {
    let renderQuestionOption = <StyledOption key={j}>{j}</StyledOption>;
    overallQuestionNumbersArray.push(renderQuestionOption);
  }

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
    if (conjugationPopupActive) {
      setNumberOfQuestions(0);
    }
  }, [conjugationPopupActive]);

  // Handeling Submits

  const submitHandler = () => {
    dispatch(storeActions.setConjugationPopupActive(false));
    dispatch(storeActions.setNumberOfConjugationQuestions(numberOfQuestions));
    dispatch(storeActions.setConjugationVerbChoicePopup(true));
  };

  return (
    <Dialog
      open={conjugationPopupActive}
      onClose={onCloseHandler}
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
        <ClosingIconContainer onClick={onCloseHandler}>
          <ClosingIcon onClick={onCloseHandler} />
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

          <ActionButton>Skip</ActionButton>
        </ButtonsContainer>
      </DialogContent>
    </Dialog>
  );
};
export default NumberOfConjugationQuestionsPopup;
