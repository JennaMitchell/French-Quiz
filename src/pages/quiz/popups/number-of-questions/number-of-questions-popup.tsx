import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";

import { useState } from "react";
import { ChangeEventHandler } from "react";

import {
  StyledOption,
  StyledTitleTypography,
  StyledSelect,
  OptionContainer,
  SelectionContainer,
} from "./number-of-questions-popup-styled-components";
import {
  ClosingIconContainer,
  ClosingIcon,
  DisabledActionButton,
  ActionButton,
} from "../../../../components/generic-components/generic-popup-components";

import { useEffect } from "react";
import { quizReset } from "../../../../components/functions/quiz-reset-function";
const NumberOfQuestionsPopup = () => {
  const numberOfQuizQuestionsPopupActive = useAppSelector(
    (state) => state.quizStore.numberOfQuizQuestionsPopupActive
  );

  const overAllVocabDB = useAppSelector(
    (state) => state.mainStore.overAllVocabDB
  );

  const phrasesDB = useAppSelector((state) => state.mainStore.phrasesDB);
  const dispatch = useAppDispatch();
  const onCloseFunction = () => {
    quizReset(false, dispatch);
  };

  const submitButtonHandler = () => {
    dispatch(
      quizStoreSliceActions.setUserQuizQuestionSetup({
        numberOfTotalVocabNPhraseQuestions: numberOfQuestions,
        numberOfVocabNPhraseMultipleChoiceQuestions:
          numberOfMultipleChoiceQuestions,
        numberOfVocabNPhraseMatchingQuestions: numberOfMatchingQuestions,
        numberOfVocabNPhraseFillInTheBlankQuestions:
          numberOfFillInTheBlankQuestions,
      })
    );
    dispatch(
      quizStoreSliceActions.setUserSelectedQuizVocabQuestionTypes(
        selectedTestType
      )
    );
    dispatch(quizStoreSliceActions.setQuizVocabSelectionPopupActive(true));
    dispatch(quizStoreSliceActions.setNumberOfQuizQuestionsPopupActive(false));
  };
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberOfMatchingQuestions, setNumberOfMatchingQuestions] = useState(0);
  const [numberOfMultipleChoiceQuestions, setNumberOfMultipleChoiceQuestions] =
    useState(0);
  const [numberOfFillInTheBlankQuestions, setNumberOfFillInTheBlankQuestions] =
    useState(0);
  const [selectedTestType, setSelectedTestType] = useState(" ");

  // Reseting useEffect
  useEffect(() => {
    if (numberOfQuizQuestionsPopupActive) {
      setNumberOfQuestions(0);
      setNumberOfMatchingQuestions(0);
      setNumberOfMultipleChoiceQuestions(0);
      setNumberOfFillInTheBlankQuestions(0);
      setSelectedTestType(" ");
    }
  }, [numberOfQuizQuestionsPopupActive]);

  let matchingQuestionsArray = [];
  let multipleChoiceQuestionsArray: any[] = [];
  let fillInTheBlankQuestionsArray = [];

  let submitButtonEnabled = false;

  const numberOfQuestionsHandler: ChangeEventHandler<HTMLSelectElement> = (
    e
  ): void => {
    if (typeof +e.target.value === "number" && +e.target.value >= 0) {
      setNumberOfQuestions(+e.target.value);
      setNumberOfMatchingQuestions(0);
      setNumberOfMultipleChoiceQuestions(0);
      setNumberOfFillInTheBlankQuestions(0);
    }
  };
  // creating the max number of selected Questions
  const maxNumberOfQuestions = overAllVocabDB.length + phrasesDB.length;
  let overallQuestionNumbersArray = [];
  for (let j = 0; j < maxNumberOfQuestions + 1; j++) {
    let renderQuestionOption = <StyledOption key={j}>{j}</StyledOption>;
    overallQuestionNumbersArray.push(renderQuestionOption);
  }

  // this function is used to update the total questions to to still be selected and return the options avaialavle
  const matchingQuestionsHandler: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    if (typeof +e.target.value === "number" && +e.target.value >= 0) {
      setNumberOfMatchingQuestions(+e.target.value);
    }
  };

  const multipleQuestionsHandler: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    if (typeof +e.target.value === "number" && +e.target.value >= 0) {
      setNumberOfMultipleChoiceQuestions(+e.target.value);
    }
  };
  const fillInBlankQuestionsHandler: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    if (typeof +e.target.value === "number" && +e.target.value >= 0) {
      setNumberOfFillInTheBlankQuestions(+e.target.value);
    }
  };

  // Calculating the number of questions remaining and creating the options array
  let numberOfQuestionsOptions = [];
  const numberOfAvaiableQuestions =
    numberOfQuestions -
    numberOfFillInTheBlankQuestions -
    numberOfMatchingQuestions -
    numberOfMultipleChoiceQuestions;

  for (let i = 0; i < numberOfAvaiableQuestions + 1; i++) {
    let renderQuestionOptions = <StyledOption key={i}>{i}</StyledOption>;
    numberOfQuestionsOptions.push(renderQuestionOptions);
  }

  // Handeling the changing of drop down menus
  if (
    numberOfMultipleChoiceQuestions === 0 &&
    numberOfAvaiableQuestions !== 0
  ) {
    multipleChoiceQuestionsArray = numberOfQuestionsOptions;
  } else if (
    numberOfAvaiableQuestions === 0 &&
    numberOfMultipleChoiceQuestions === 0
  ) {
    multipleChoiceQuestionsArray = numberOfQuestionsOptions;
  } else {
    for (
      let y = 0;
      y < numberOfMultipleChoiceQuestions + numberOfAvaiableQuestions + 1;
      y++
    ) {
      let renderQuestionOptions = <StyledOption key={y}>{y}</StyledOption>;
      multipleChoiceQuestionsArray.push(renderQuestionOptions);
    }
  }

  if (numberOfMatchingQuestions === 0 && numberOfAvaiableQuestions !== 0) {
    matchingQuestionsArray = numberOfQuestionsOptions;
  } else if (
    numberOfAvaiableQuestions === 0 &&
    numberOfMatchingQuestions === 0
  ) {
    matchingQuestionsArray = numberOfQuestionsOptions;
  } else {
    for (
      let y = 0;
      y < numberOfMatchingQuestions + numberOfAvaiableQuestions + 1;
      y++
    ) {
      let renderQuestionOptions = <StyledOption key={y}>{y}</StyledOption>;
      matchingQuestionsArray.push(renderQuestionOptions);
    }
  }

  if (
    numberOfFillInTheBlankQuestions === 0 &&
    numberOfAvaiableQuestions !== 0
  ) {
    fillInTheBlankQuestionsArray = numberOfQuestionsOptions;
  } else if (
    numberOfAvaiableQuestions === 0 &&
    numberOfFillInTheBlankQuestions === 0
  ) {
    fillInTheBlankQuestionsArray = numberOfQuestionsOptions;
  } else {
    for (
      let y = 0;
      y < numberOfFillInTheBlankQuestions + numberOfAvaiableQuestions + 1;
      y++
    ) {
      let renderQuestionOptions = <StyledOption key={y}>{y}</StyledOption>;
      fillInTheBlankQuestionsArray.push(renderQuestionOptions);
    }
  }

  /// Enabling and Disabling the Submit Button

  if (numberOfQuestions === 0) {
    numberOfQuestionsOptions = [];
  }

  if (
    numberOfQuestions !== 0 &&
    numberOfAvaiableQuestions === 0 &&
    selectedTestType.length !== 1
  ) {
    submitButtonEnabled = true;
  }

  const testTypeHandler: ChangeEventHandler<HTMLSelectElement> = (e): void => {
    if (
      e.target.value === "English" ||
      e.target.value === "French" ||
      e.target.value === "French/English" ||
      e.target.value.length === 1
    ) {
      setSelectedTestType(e.target.value);
    }
  };
  // Skip Button Handler

  // {
  //   numberOfTotalVocabNPhraseQuestions: 0,
  //   numberOfVocabNPhraseMultipleChoiceQuestions: 0,
  //   numberOfVocabNPhraseMatchingQuestions: 0,
  //   numberOfVocabNPhraseFillInTheBlankQuestions: 0,
  // },

  const skipButtonHandler = () => {
    dispatch(
      quizStoreSliceActions.setUserQuizQuestionSetup({
        numberOfTotalVocabNPhraseQuestions: 0,
        numberOfVocabNPhraseMultipleChoiceQuestions: 0,
        numberOfVocabNPhraseMatchingQuestions: 0,
        numberOfVocabNPhraseFillInTheBlankQuestions: 0,
      })
    );
    dispatch(
      quizStoreSliceActions.setQuizConjugationNumberOfQuestionsPopup(true)
    );
    dispatch(quizStoreSliceActions.setNumberOfQuizQuestionsPopupActive(false));
    dispatch(quizStoreSliceActions.setUserSelectedQuizVocabQuestionTypes(""));
  };

  return (
    <Dialog
      open={numberOfQuizQuestionsPopupActive}
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
          paddingTop: "10px",
          paddingBottom: "10px",
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
            Step 1 of 4
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontSize: "26px",
              "@media(max-width:580px)": { fontSize: "28px" },
              "@media(max-width:520px)": { fontSize: "22px" },
              "@media(max-width:475px)": { fontSize: "18px" },
            }}
          >
            Number of Vocab/Phrase Questions
          </Typography>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          width: "max(100%,100%)",
          height: "max(max-content,max-content)",
          display: "grid",
          gridTemplateColumns: "100%",
          gap: "10px",
          placeItems: "center",
          backgroundColor: "primary.main",
          padding: "0px 20px 20px 20px",
          "div:not(:first-of-type)": {
            marginLeft: "0px",
          },
          "@media(max-width:475px)": {},
        }}
      >
        <OptionContainer>
          <StyledTitleTypography>Number of Questions:</StyledTitleTypography>
          <StyledSelect onChange={numberOfQuestionsHandler}>
            {overallQuestionNumbersArray}
          </StyledSelect>
        </OptionContainer>
        <OptionContainer>
          <StyledTitleTypography
            sx={{
              color: `${numberOfQuestions === 0 ? "grey" : "inherit"}`,
            }}
          >
            Multiple Choice:
          </StyledTitleTypography>
          <StyledSelect
            disabled={numberOfQuestions === 0 ? true : false}
            value={numberOfMultipleChoiceQuestions}
            onChange={multipleQuestionsHandler}
          >
            {numberOfMultipleChoiceQuestions === 0
              ? numberOfQuestionsOptions
              : multipleChoiceQuestionsArray}
          </StyledSelect>
        </OptionContainer>
        <OptionContainer>
          <StyledTitleTypography
            sx={{
              color: `${numberOfQuestions === 0 ? "grey" : "inherit"}`,
            }}
          >
            Matching:
          </StyledTitleTypography>
          <StyledSelect
            value={numberOfMatchingQuestions}
            onChange={matchingQuestionsHandler}
            disabled={numberOfQuestions === 0 ? true : false}
          >
            {numberOfMatchingQuestions === 0
              ? numberOfQuestionsOptions
              : matchingQuestionsArray}
          </StyledSelect>
        </OptionContainer>
        <OptionContainer sx={{ marginBottom: "5px" }}>
          <StyledTitleTypography
            sx={{
              color: `${numberOfQuestions === 0 ? "grey" : "inherit"}`,
            }}
          >
            Fill in the Blank:
          </StyledTitleTypography>
          <StyledSelect
            value={numberOfFillInTheBlankQuestions}
            onChange={fillInBlankQuestionsHandler}
            disabled={numberOfQuestions === 0 ? true : false}
          >
            {numberOfFillInTheBlankQuestions === 0
              ? numberOfQuestionsOptions
              : fillInTheBlankQuestionsArray}
          </StyledSelect>
        </OptionContainer>
        <SelectionContainer sx={{ marginTop: "0px" }}>
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
            Test my:
          </Typography>
          <StyledSelect
            onChange={testTypeHandler}
            sx={{ width: "max(170px,170px)" }}
          >
            <StyledOption>&nbsp;</StyledOption>
            <StyledOption>English</StyledOption>
            <StyledOption>French</StyledOption>
            <StyledOption>French/English</StyledOption>
          </StyledSelect>
        </SelectionContainer>
        <OptionContainer>
          {submitButtonEnabled && (
            <ActionButton onClick={submitButtonHandler}>Submit</ActionButton>
          )}
          {!submitButtonEnabled && (
            <DisabledActionButton disabled={true}>Submit</DisabledActionButton>
          )}
          <ActionButton onClick={skipButtonHandler}>Skip</ActionButton>
        </OptionContainer>
      </DialogActions>
    </Dialog>
  );
};
export default NumberOfQuestionsPopup;
