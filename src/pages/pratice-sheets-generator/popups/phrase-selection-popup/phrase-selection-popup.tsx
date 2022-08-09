import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { Dialog, DialogContent, Typography } from "@mui/material";
import {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  ActionButton,
  DisabledActionButton,
  StyledStepTitleText,
  StyledWarningText,
  QuestionsRemainingTest,
  SelectionContainer,
  DropDownDownArrow,
  DropDownUpArrow,
  DropDownSelectionMenu,
  DropDownButton,
  AddWordIcon,
  RemoveWordIcon,
  EndSelectionBox,
} from "../../../../components/generic-components/generic-popup-components";

import {
  VocabContainer,
  ButtonsContainer,
} from "./phrase-selection-popup-styled-components";
import { useState, useEffect } from "react";
import { questionAnswerCreator } from "../../../../components/functions/generic-functions";
import { practiceSheetReset } from "../../../../components/functions/practice-sheet-reset-function";
const PhraseSelectionPopup = () => {
  const dispatch = useAppDispatch();

  const phrasesDB = useAppSelector((state) => state.mainStore.phrasesDB);
  const phrasesSelectionPopupActive = useAppSelector(
    (state) => state.sheetGenerator.phrasesSelectionPopupActive
  );

  const practiceSheetGeneratorPhrasesQuestionSetup = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetGeneratorPhrasesQuestionSetup
  );
  interface SelectedItemsTypes {
    french?: string;
    english?: string;
  }

  const [verbsDropDownMenuActive, setVerbsDropDownMenuActive] = useState(false);

  const [selectedItems, setSelectedItems] = useState<SelectedItemsTypes[]>([]);

  let submitButtonEnabled = false;
  // onClose
  const onCloseFunction = () => {
    practiceSheetReset(false, dispatch);
  };

  // Handeling Section Button Clicks
  const verbsHeadingHandler = () => {
    setVerbsDropDownMenuActive(!verbsDropDownMenuActive);
  };

  // Function below handler the adding and removing of verbs
  const itemSelectionUpdater = (index: number, type: string) => {
    const selectedItemData: SelectedItemsTypes = phrasesDB[index];
    /// IMPORTANT THIS INSTANCE ONLY WORKS WITH PHRASES

    let indexOfTermToBeDeleted: string | number = "none";
    for (let i = 0; i < selectedItems.length; i++) {
      if (selectedItemData?.french === selectedItems[i].french) {
        indexOfTermToBeDeleted = i;

        break;
      }
    }
    if (indexOfTermToBeDeleted !== "none") {
      // splice returns the element pulled out so we need to filter
      const copyOfSelectedItems = JSON.parse(JSON.stringify(selectedItems));
      const removedArray = copyOfSelectedItems.filter(
        (val: SelectedItemsTypes[], index: number) =>
          index !== indexOfTermToBeDeleted
      );

      setSelectedItems(removedArray);
    } else {
      const copyOfSelectedItems = JSON.parse(JSON.stringify(selectedItems));
      copyOfSelectedItems.push({
        english: selectedItemData.english,
        french: selectedItemData.french,
      });
      setSelectedItems(copyOfSelectedItems);
    }
  };
  // Skip Button Handler

  const skipButtonHandler = () => {
    dispatch(sheetGeneratorStoreSliceActions.setUserSelectedPhrases([]));
    dispatch(
      sheetGeneratorStoreSliceActions.setPhrasesSelectionPopupActive(false)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setUserSelectedPhrasesTestType("")
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorPhraseQuestions({
        phraseMultipleChoiceQuestions: [],
        phraseMatchingQuestions: [],
        phraseFillInTheBlankQuestions: [],
      })
    );
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
      sheetGeneratorStoreSliceActions.setPracticeSheetSetupComplete(true)
    );
  };

  /// getting the Data ready
  const dropDownDataMaker = (
    inputArray: SelectedItemsTypes[],
    type: string
  ) => {
    const renderReadyItem = inputArray.map((object, index) => {
      // Handeling Vocab Term Clicks
      const vocabHandler = () => {
        itemSelectionUpdater(index, type);
      };

      /// Finding a Match

      let matchFound = false;

      for (let q = 0; q < selectedItems.length; q++) {
        if (object.french === selectedItems[q].french) {
          matchFound = true;
          break;
        }
      }

      return (
        <VocabContainer
          key={index}
          onClick={vocabHandler}
          sx={{
            backgroundColor: `${matchFound && "secondary.light"}`,
            color: `${matchFound && "secondary.dark"}`,
          }}
        >
          <StyledPopupTypography
            sx={{
              color: "inherit",
              paddingLeft: "5px",
              width: "max(100px,100px)",
            }}
          >
            {object.french}
          </StyledPopupTypography>
          <EndSelectionBox>
            <StyledPopupTypography
              sx={{
                color: "inherit",
                width: "max(80px,80px)",
              }}
            >
              {object.english}
            </StyledPopupTypography>
            {!matchFound && <AddWordIcon />}
            {matchFound && <RemoveWordIcon />}
          </EndSelectionBox>
        </VocabContainer>
      );
    });
    return renderReadyItem;
  };

  const renderReadyVerbItems = dropDownDataMaker(phrasesDB, "Phrases");

  // Submit Handler

  const submitHandler = () => {
    const [multipleChoiceAnswers, matchingAnswers, fillInBlankAnswers] =
      questionAnswerCreator(
        practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseMultipleChoiceQuestions,
        practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseMatchingQuestions,
        practiceSheetGeneratorPhrasesQuestionSetup.numberOfPhraseFillInTheBlankQuestions,
        selectedItems
      );
    dispatch(
      sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorPhraseQuestions({
        phraseMultipleChoiceQuestions: multipleChoiceAnswers,
        phraseMatchingQuestions: matchingAnswers,
        phraseFillInTheBlankQuestions: fillInBlankAnswers,
      })
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setPhrasesSelectionPopupActive(false)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setUserSelectedPhrases(selectedItems)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setPracticeSheetSetupComplete(true)
    );
  };
  ///Reset on Upload
  useEffect(() => {
    if (phrasesSelectionPopupActive) {
      setSelectedItems([]);
    }
  }, [phrasesSelectionPopupActive]);

  // Submit Button Enabler
  if (
    selectedItems.length >=
    practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions
  ) {
    submitButtonEnabled = true;
  }

  return (
    <Dialog
      open={phrasesSelectionPopupActive}
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
          width: "450px",
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
          overflowY: "scroll",
        },
      }}
    >
      <DialogContent
        sx={{
          backgroundColor: "primary.main",
          color: "secondary.light",
          display: "grid",

          gridTemplateColumns: "100%",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",

          height: "max-content",
        }}
      >
        <ClosingIconContainer
          sx={{ top: "10px", right: "30px" }}
          onClick={onCloseFunction}
        >
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText variant="h6">Step 6 of 6</StyledStepTitleText>

        <StyledPopupTypography variant="h4" sx={{ textAlign: "center" }}>
          Phrase Selection
        </StyledPopupTypography>
        <SelectionContainer>
          <QuestionsRemainingTest variant="h6">
            Minimum Selection Remaining: &nbsp;
          </QuestionsRemainingTest>
          <StyledPopupTypography variant="h6">
            {practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions -
              selectedItems.length >
              0 &&
              practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions -
                selectedItems.length}
            {practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions -
              selectedItems.length <
              0 && 0}
          </StyledPopupTypography>
        </SelectionContainer>
        {practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions -
          selectedItems.length <=
          0 && (
          <StyledWarningText>
            Warning: Picking more than the selected number of questions will
            randomize the selection
          </StyledWarningText>
        )}
        <DropDownButton
          onClick={verbsHeadingHandler}
          sx={{ marginBottom: "15px" }}
        >
          <StyledPopupTypography variant="h5">Phrases</StyledPopupTypography>
          {!verbsDropDownMenuActive && <DropDownDownArrow />}
          {verbsDropDownMenuActive && <DropDownUpArrow />}
        </DropDownButton>
        {verbsDropDownMenuActive && (
          <DropDownSelectionMenu>{renderReadyVerbItems}</DropDownSelectionMenu>
        )}

        <ButtonsContainer>
          {submitButtonEnabled && (
            <ActionButton onClick={submitHandler}>Submit</ActionButton>
          )}
          {!submitButtonEnabled && (
            <DisabledActionButton disabled={true}>Submit</DisabledActionButton>
          )}
          <ActionButton onClick={skipButtonHandler}>Skip</ActionButton>
        </ButtonsContainer>
      </DialogContent>
    </Dialog>
  );
};
export default PhraseSelectionPopup;
