import {
  Dialog,
  DialogContent,
  DialogActions,
  Grid,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { storeActions, DatabaseStates } from "../../../../store/store";

import { useState } from "react";
import { ChangeEventHandler } from "react";

import {
  StyledOption,
  StyledTitleTypography,
  StyledSelect,
  ActionButton,
  OptionContainer,
  DisabledActionButton,
  SelectionContainer,
} from "./number-of-vocab-questions-popup-styled-components";
import {
  ClosingIconContainer,
  ClosingIcon,
} from "../../../../components/generic-components/generic-popup-components";

const NumberOfVocabQuestionsPopup = () => {
  const newPracticeSheetsPopupActive = useSelector(
    (state: DatabaseStates) => state.newPracticeSheetsPopupActive
  );
  const practiceSheetGeneratorVocabQuestionSetup = useSelector(
    (state: DatabaseStates) => state.practiceSheetGeneratorVocabQuestionSetup
  );

  const dispatch = useDispatch();

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
      storeActions.setPracticeSheetGeneratorVocabQuestionSetup(
        deepCopyOfUserData
      )
    );
    dispatch(storeActions.setSelectedVocabTestType(selectedTestType));
    dispatch(storeActions.setVocabSelectPopupActive(true));
    dispatch(storeActions.setNewPracticeSheetsPopupActive(false));
  };
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberOfMatchingQuestions, setNumberOfMatchingQuestions] = useState(0);
  const [numberOfMultipleChoiceQuestions, setNumberOfMultipleChoiceQuestions] =
    useState(0);
  const [numberOfFillInTheBlankQuestions, setNumberOfFillInTheBlankQuestions] =
    useState(0);
  const [selectedTestType, setSelectedTestType] = useState(" ");

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
  const maxNumberOfQuestions = 30;
  let overallQuestionNumbersArray = [];
  for (let j = 0; j < maxNumberOfQuestions + 1; j++) {
    let renderQuestionOption = <StyledOption key={j}>{j}</StyledOption>;
    overallQuestionNumbersArray.push(renderQuestionOption);
  }

  // this function is used to update the total questions to to still be selected and return the options avaialavle
  const matchingQuestionsHandler: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    if (typeof +e.target.value === "number" && +e.target.value > 0) {
      setNumberOfMatchingQuestions(+e.target.value);
    }
  };

  const multipleQuestionsHandler: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    if (typeof +e.target.value === "number" && +e.target.value > 0) {
      setNumberOfMultipleChoiceQuestions(+e.target.value);
    }
  };
  const fillInBlankQuestionsHandler: ChangeEventHandler<HTMLSelectElement> = (
    e
  ) => {
    if (typeof +e.target.value === "number" && +e.target.value > 0) {
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

  // handeling the changing of drop down menus

  if (numberOfAvaiableQuestions < numberOfMultipleChoiceQuestions) {
    for (let y = 0; y < numberOfMultipleChoiceQuestions + 1; y++) {
      let renderQuestionOptions = <StyledOption key={y}>{y}</StyledOption>;
      multipleChoiceQuestionsArray.push(renderQuestionOptions);
    }
  } else {
    multipleChoiceQuestionsArray = numberOfQuestionsOptions;
  }

  if (numberOfAvaiableQuestions < numberOfMatchingQuestions) {
    for (let y = 0; y < numberOfMatchingQuestions + 1; y++) {
      let renderQuestionOptions = <StyledOption key={y}>{y}</StyledOption>;
      matchingQuestionsArray.push(renderQuestionOptions);
    }
  } else {
    matchingQuestionsArray = numberOfQuestionsOptions;
  }

  if (numberOfAvaiableQuestions < numberOfFillInTheBlankQuestions) {
    for (let y = 0; y < numberOfFillInTheBlankQuestions + 1; y++) {
      let renderQuestionOptions = <StyledOption key={y}>{y}</StyledOption>;
      fillInTheBlankQuestionsArray.push(renderQuestionOptions);
    }
  } else {
    fillInTheBlankQuestionsArray = numberOfQuestionsOptions;
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
  // useEffect(() => {
  //   if (newPracticeSheetsPopupActive && initialSetup) {
  //     setNumberOfQuestions(0);
  //     setNumberOfMatchingQuestions(0);
  //     setNumberOfMultipleChoiceQuestions(0);
  //     setNumberOfFillInTheBlankQuestions(0);
  //     setSelectedTestType("");
  //     dispatch(storeActions.setPracticeSheetSetupComplete(false));
  //   } else {
  //     setInitialSetup(true);
  //   }
  // }, [newPracticeSheetsPopupActive, dispatch]);
  // this useEffect is used to rest all teh varialbes if the user closes the window then reopens it
  // Group by handler
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
      storeActions.setPracticeSheetGeneratorVocabQuestionSetup({
        numberOfTotalVocabQuestions: 0,
        numberOfVocabMultipleChoiceQuestions: 0,
        numberOfVocabMatchingQuestions: 0,
        numberOfVocabFillInTheBlankQuestions: 0,
      })
    );
    dispatch(storeActions.setNumberOfConjugationPopupActive(true));
    dispatch(storeActions.setNewPracticeSheetsPopupActive(false));
    dispatch(storeActions.setSelectedVocabTestType(""));
  };

  return (
    <Dialog
      open={newPracticeSheetsPopupActive}
      onClose={skipButtonHandler}
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
        <ClosingIconContainer onClick={skipButtonHandler}>
          <ClosingIcon onClick={skipButtonHandler} />
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
            Step 1 of 6
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
            Number of Vocab Questions
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
export default NumberOfVocabQuestionsPopup;
