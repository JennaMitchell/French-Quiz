import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
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
} from "./number-of-conjugation-quiz-questions-popup-styled-components";
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
    let renderQuestionOption = <StyledOption key={j}>{j}</StyledOption>;
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
    <Dialog
      open={quizConjugationNumberOfQuestionsPopup}
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
            Step 3 of 4
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
export default NumberOfConjugationQuizQuestionsPopup;
