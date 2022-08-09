import { Dialog, DialogContent, DialogActions, Grid } from "@mui/material";
import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";

import { useState } from "react";
import { ChangeEventHandler } from "react";

import {
  OptionContainer,
  SelectionContainer,
} from "./number-of-vocab-questions-popup-styled-components";
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
import { practiceSheetReset } from "../../../../components/functions/practice-sheet-reset-function";
import { useEffect } from "react";

const NumberOfVocabQuestionsPopup = () => {
  const newPracticeSheetsPopupActive = useAppSelector(
    (state) => state.sheetGenerator.newPracticeSheetsPopupActive
  );
  const practiceSheetGeneratorVocabQuestionSetup = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetGeneratorVocabQuestionSetup
  );
  const overAllVocabDB = useAppSelector(
    (state) => state.mainStore.overAllVocabDB
  );
  const dispatch = useAppDispatch();
  const onCloseFunction = () => {
    practiceSheetReset(false, dispatch);
  };

  const submitButtonHandler = () => {
    const deepCopyOfUserData = JSON.parse(
      JSON.stringify(practiceSheetGeneratorVocabQuestionSetup)
    );
    // create a copy so that it's changable
    deepCopyOfUserData.numberOfTotalVocabQuestions = numberOfQuestions;
    deepCopyOfUserData.numberOfVocabMultipleChoiceQuestions =
      numberOfMultipleChoiceQuestions;
    deepCopyOfUserData.numberOfVocabMatchingQuestions =
      numberOfMatchingQuestions;
    deepCopyOfUserData.numberOfVocabFillInTheBlankQuestions =
      numberOfFillInTheBlankQuestions;

    dispatch(
      sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorVocabQuestionSetup(
        deepCopyOfUserData
      )
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setSelectedVocabTestType(selectedTestType)
    );
    dispatch(sheetGeneratorStoreSliceActions.setVocabSelectPopupActive(true));
    dispatch(
      sheetGeneratorStoreSliceActions.setNewPracticeSheetsPopupActive(false)
    );
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
    if (newPracticeSheetsPopupActive) {
      setNumberOfQuestions(0);
      setNumberOfMatchingQuestions(0);
      setNumberOfMultipleChoiceQuestions(0);
      setNumberOfFillInTheBlankQuestions(0);
      setSelectedTestType(" ");
    }
  }, [newPracticeSheetsPopupActive]);

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
  const maxNumberOfQuestions = overAllVocabDB.length;
  let overallQuestionNumbersArray = [];
  for (let j = 0; j < maxNumberOfQuestions + 1; j++) {
    let renderQuestionOption = (
      <StyledPopupOption key={j}>{j}</StyledPopupOption>
    );
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
    let renderQuestionOptions = (
      <StyledPopupOption key={i}>{i}</StyledPopupOption>
    );
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
      let renderQuestionOptions = (
        <StyledPopupOption key={y}>{y}</StyledPopupOption>
      );
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
      let renderQuestionOptions = (
        <StyledPopupOption key={y}>{y}</StyledPopupOption>
      );
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
      let renderQuestionOptions = (
        <StyledPopupOption key={y}>{y}</StyledPopupOption>
      );
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

  const skipButtonHandler = () => {
    dispatch(
      sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorVocabQuestionSetup(
        {
          numberOfTotalVocabQuestions: 0,
          numberOfVocabMultipleChoiceQuestions: 0,
          numberOfVocabMatchingQuestions: 0,
          numberOfVocabFillInTheBlankQuestions: 0,
        }
      )
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfConjugationPopupActive(true)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setNewPracticeSheetsPopupActive(false)
    );
    dispatch(sheetGeneratorStoreSliceActions.setSelectedVocabTestType(""));
  };

  return (
    <Dialog
      open={newPracticeSheetsPopupActive}
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
          minHeight: "max-content",
          height: "max-content",
          maxHeight: "100vh",
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
          <StyledStepTitleText variant="h6">Step 1 of 6</StyledStepTitleText>

          <StyledPopupTypography variant="h4">
            Number of Vocab Questions
          </StyledPopupTypography>
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
        }}
      >
        <OptionContainer>
          <StyledPopupTypography>Number of Questions:</StyledPopupTypography>
          <StyledPopupSelect onChange={numberOfQuestionsHandler}>
            {overallQuestionNumbersArray}
          </StyledPopupSelect>
        </OptionContainer>
        <OptionContainer>
          <StyledPopupTypography
            sx={{
              color: `${numberOfQuestions === 0 ? "grey" : "inherit"}`,
            }}
          >
            Multiple Choice:
          </StyledPopupTypography>
          <StyledPopupSelect
            disabled={numberOfQuestions === 0 ? true : false}
            value={numberOfMultipleChoiceQuestions}
            onChange={multipleQuestionsHandler}
          >
            {numberOfMultipleChoiceQuestions === 0
              ? numberOfQuestionsOptions
              : multipleChoiceQuestionsArray}
          </StyledPopupSelect>
        </OptionContainer>
        <OptionContainer>
          <StyledPopupTypography
            sx={{
              color: `${numberOfQuestions === 0 ? "grey" : "inherit"}`,
            }}
          >
            Matching:
          </StyledPopupTypography>
          <StyledPopupSelect
            value={numberOfMatchingQuestions}
            onChange={matchingQuestionsHandler}
            disabled={numberOfQuestions === 0 ? true : false}
          >
            {numberOfMatchingQuestions === 0
              ? numberOfQuestionsOptions
              : matchingQuestionsArray}
          </StyledPopupSelect>
        </OptionContainer>
        <OptionContainer sx={{ marginBottom: "5px" }}>
          <StyledPopupTypography
            sx={{
              color: `${numberOfQuestions === 0 ? "grey" : "inherit"}`,
            }}
          >
            Fill in the Blank:
          </StyledPopupTypography>
          <StyledPopupSelect
            value={numberOfFillInTheBlankQuestions}
            onChange={fillInBlankQuestionsHandler}
            disabled={numberOfQuestions === 0 ? true : false}
          >
            {numberOfFillInTheBlankQuestions === 0
              ? numberOfQuestionsOptions
              : fillInTheBlankQuestionsArray}
          </StyledPopupSelect>
        </OptionContainer>
        <SelectionContainer sx={{ marginTop: "0px" }}>
          <StyledPopupTypography variant="h6">Test my:</StyledPopupTypography>
          <StyledPopupSelect
            onChange={testTypeHandler}
            sx={{ width: "max-content" }}
          >
            <StyledPopupOption>&nbsp;</StyledPopupOption>
            <StyledPopupOption>English</StyledPopupOption>
            <StyledPopupOption> French</StyledPopupOption>
            <StyledPopupOption>French/English</StyledPopupOption>
          </StyledPopupSelect>
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
export default NumberOfVocabQuestionsPopup;
