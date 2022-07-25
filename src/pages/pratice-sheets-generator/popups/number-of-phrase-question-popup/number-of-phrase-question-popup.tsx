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
} from "./number-of-phrase-question-popup-styled-components";
import {
  ClosingIconContainer,
  ClosingIcon,
} from "../../../../components/generic-components/generic-popup-components";
import { useEffect } from "react";
import { practiceSheetReset } from "../../../../components/functions/generic-functions";

const NumberOfPhraseQuestionsPopup = () => {
  const numberOfPhraseQuestionsPopupActive = useSelector(
    (state: DatabaseStates) => state.numberOfPhraseQuestionsPopupActive
  );
  const practiceSheetGeneratorPhrasesQuestionSetup = useSelector(
    (state: DatabaseStates) => state.practiceSheetGeneratorPhrasesQuestionSetup
  );
  const phrasesDB = useSelector((state: DatabaseStates) => state.phrasesDB);
  const dispatch = useDispatch();

  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [numberOfMatchingQuestions, setNumberOfMatchingQuestions] = useState(0);
  const [numberOfMultipleChoiceQuestions, setNumberOfMultipleChoiceQuestions] =
    useState(0);
  const [numberOfFillInTheBlankQuestions, setNumberOfFillInTheBlankQuestions] =
    useState(0);

  const [selectedTestType, setSelectedTestType] = useState("x");

  let matchingQuestionsArray = [];
  let multipleChoiceQuestionsArray: any[] = [];
  let fillInTheBlankQuestionsArray = [];

  let submitButtonEnabled = false;

  const onCloseFunction = () => {
    practiceSheetReset(false, dispatch);
  };

  const submitButtonHandler = () => {
    const deepCopyOfUserData = JSON.parse(
      JSON.stringify(practiceSheetGeneratorPhrasesQuestionSetup)
    );
    // create a copy so that it's changable
    deepCopyOfUserData.numberOfTotalPhraseQuestions = numberOfQuestions;
    deepCopyOfUserData.numberOfPhraseMultipleChoiceQuestions =
      numberOfMultipleChoiceQuestions;
    deepCopyOfUserData.numberOfPhraseMatchingQuestions =
      numberOfMatchingQuestions;
    deepCopyOfUserData.numberOfPhraseFillInTheBlankQuestions =
      numberOfFillInTheBlankQuestions;

    dispatch(
      storeActions.setPracticeSheetGeneratorPhrasesQuestionSetup(
        deepCopyOfUserData
      )
    );
    dispatch(storeActions.setPhrasesSelectionPopupActive(true));
    dispatch(storeActions.setNumberOfPhraseQuestionsPopupActive(false));
    dispatch(storeActions.setUserSelectedPhrasesTestType(selectedTestType));
  };

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
  const maxNumberOfQuestions = phrasesDB.length;
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
  useEffect(() => {
    if (numberOfPhraseQuestionsPopupActive) {
      setNumberOfQuestions(0);
      setNumberOfMatchingQuestions(0);
      setNumberOfMultipleChoiceQuestions(0);
      setNumberOfFillInTheBlankQuestions(0);
      setSelectedTestType(" ");
    }
  }, [numberOfPhraseQuestionsPopupActive]);
  // this useEffect is used to rest all teh varialbes if the user closes the window then reopens it
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

  const skipButtonHandler = () => {
    dispatch(
      storeActions.setPracticeSheetGeneratorPhrasesQuestionSetup({
        numberOfTotalPhraseQuestions: 0,
        numberOfPhraseMultipleChoiceQuestions: 0,
        numberOfPhraseMatchingQuestions: 0,
        numberOfPhraseFillInTheBlankQuestions: 0,
      })
    );

    dispatch(storeActions.setNumberOfPhraseQuestionsPopupActive(false));
    dispatch(storeActions.setUserSelectedPhrasesTestType(""));
    dispatch(storeActions.setPracticeSheetSetupComplete(true));
  };

  return (
    <Dialog
      open={numberOfPhraseQuestionsPopupActive}
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
            Step 5 of 6
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontSize: "28px",
              "@media(max-width:580px)": { fontSize: "28px" },
              "@media(max-width:520px)": { fontSize: "22px" },
              "@media(max-width:475px)": { fontSize: "18px" },
            }}
          >
            Number of Phrase Questions
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
export default NumberOfPhraseQuestionsPopup;
