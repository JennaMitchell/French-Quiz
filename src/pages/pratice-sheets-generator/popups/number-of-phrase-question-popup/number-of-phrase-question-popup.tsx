import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";

import { useState } from "react";
import { ChangeEventHandler } from "react";

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

import { useEffect } from "react";
import { practiceSheetReset } from "../../../../components/functions/practice-sheet-reset-function";

const NumberOfPhraseQuestionsPopup = () => {
  const numberOfPhraseQuestionsPopupActive = useAppSelector(
    (state) => state.sheetGenerator.numberOfPhraseQuestionsPopupActive
  );
  const practiceSheetGeneratorPhrasesQuestionSetup = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetGeneratorPhrasesQuestionSetup
  );
  const phrasesDB = useAppSelector((state) => state.mainStore.phrasesDB);
  const dispatch = useAppDispatch();

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
      sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorPhrasesQuestionSetup(
        deepCopyOfUserData
      )
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setPhrasesSelectionPopupActive(true)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfPhraseQuestionsPopupActive(
        false
      )
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setUserSelectedPhrasesTestType(
        selectedTestType
      )
    );
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
    let renderQuestionOption = (
      <StyledPopupOption key={j}>{j}</StyledPopupOption>
    );
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
    let renderQuestionOptions = (
      <StyledPopupOption key={i}>{i}</StyledPopupOption>
    );
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
      sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorPhrasesQuestionSetup(
        {
          numberOfTotalPhraseQuestions: 0,
          numberOfPhraseMultipleChoiceQuestions: 0,
          numberOfPhraseMatchingQuestions: 0,
          numberOfPhraseFillInTheBlankQuestions: 0,
        }
      )
    );

    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfPhraseQuestionsPopupActive(
        false
      )
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setUserSelectedPhrasesTestType("")
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setPracticeSheetSetupComplete(true)
    );
  };

  return (
    <StyledDialog
      open={numberOfPhraseQuestionsPopupActive}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
    >
      <StyledDialogContent>
        <ClosingIconContainer onClick={onCloseFunction}>
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText variant="h6" sx={{ paddingLeft: "10px" }}>
          Step 5 of 6
        </StyledStepTitleText>

        <StyledPopupTypography variant="h4" sx={{ paddingLeft: "10px" }}>
          Number of Phrase Questions
        </StyledPopupTypography>

        <QuestionOptionContainer>
          <StyledPopupTypography>Number of Questions:</StyledPopupTypography>
          <StyledPopupSelect onChange={numberOfQuestionsHandler}>
            {overallQuestionNumbersArray}
          </StyledPopupSelect>
        </QuestionOptionContainer>
        <QuestionOptionContainer>
          <StyledPopupTypography>Multiple Choice:</StyledPopupTypography>
          <StyledPopupSelect
            disabled={numberOfQuestions === 0 ? true : false}
            value={numberOfMultipleChoiceQuestions}
            onChange={multipleQuestionsHandler}
          >
            {numberOfMultipleChoiceQuestions === 0
              ? numberOfQuestionsOptions
              : multipleChoiceQuestionsArray}
          </StyledPopupSelect>
        </QuestionOptionContainer>
        <QuestionOptionContainer>
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
        </QuestionOptionContainer>
        <QuestionOptionContainer>
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
        </QuestionOptionContainer>
        <QuestionOptionContainer>
          <StyledPopupTypography>Test my:</StyledPopupTypography>
          <StyledPopupSelect
            onChange={testTypeHandler}
            sx={{ width: "max(170px,170px)" }}
          >
            <StyledPopupOption>&nbsp;</StyledPopupOption>
            <StyledPopupOption>English</StyledPopupOption>
            <StyledPopupOption>French</StyledPopupOption>
            <StyledPopupOption>French/English</StyledPopupOption>
          </StyledPopupSelect>
        </QuestionOptionContainer>
        <ActionButtonsContainer>
          {submitButtonEnabled && (
            <ActionButton onClick={submitButtonHandler}>Submit</ActionButton>
          )}
          {!submitButtonEnabled && (
            <DisabledActionButton disabled={true}>Submit</DisabledActionButton>
          )}
          <ActionButton onClick={skipButtonHandler}>Skip</ActionButton>
        </ActionButtonsContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
};
export default NumberOfPhraseQuestionsPopup;
