import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { Typography } from "@mui/material";
import {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  ActionButton,
  DisabledActionButton,
  StyledStepTitleText,
  StyledWarningText,
  QuestionsRemainingText,
  SelectionContainer,
  DropDownDownArrow,
  DropDownUpArrow,
  DropDownSelectionMenu,
  DropDownButton,
  AddWordIcon,
  RemoveWordIcon,
  EndSelectionBox,
  StyledDialog,
  StyledDialogContent,
  ActionButtonsContainer,
  StyledSelectionRowContainer,
  DropDownTermTypography,
} from "../../../../components/generic-components/generic-popup-components";

import { useState, useEffect } from "react";
import { questionAnswerCreator } from "../../../../components/functions/generic-functions";
import { practiceSheetReset } from "../../../../components/functions/practice-sheet-reset-function";
const VocabSelectionPopup = () => {
  const dispatch = useAppDispatch();
  const adjectivesDB = useAppSelector((state) => state.mainStore.adjectivesDB);
  const nounsDB = useAppSelector((state) => state.mainStore.nounsDB);
  const verbsDB = useAppSelector((state) => state.mainStore.verbsDB);
  const vocabSelectPopupActive = useAppSelector(
    (state) => state.sheetGenerator.vocabSelectPopupActive
  );
  const practiceSheetGeneratorVocabQuestionSetup = useAppSelector(
    (state) => state.sheetGenerator.practiceSheetGeneratorVocabQuestionSetup
  );
  interface SelectedItemsTypes {
    french?: string;
    english?: string;
  }

  const [verbsDropDownMenuActive, setVerbsDropDownMenuActive] = useState(false);
  const [nounDropDownMenuActive, setNounDropDownMenuActive] = useState(false);
  const [adjectiveDropDownMenuActive, setAdjectiveDropDownMenuActive] =
    useState(false);
  const [selectedItems, setSelectedItems] = useState<SelectedItemsTypes[]>([]);

  let submitButtonEnabled = false;

  // Handeling Section Button Clicks
  const verbsHeadingHandler = () => {
    setVerbsDropDownMenuActive(!verbsDropDownMenuActive);
  };
  const nounHeadingHandler = () => {
    setNounDropDownMenuActive(!nounDropDownMenuActive);
  };
  const adjectiveHeadingHandler = () => {
    setAdjectiveDropDownMenuActive(!adjectiveDropDownMenuActive);
  };
  const onCloseFunction = () => {
    practiceSheetReset(false, dispatch);
  };

  // Function below handler the adding and removing of verbs
  const itemSelectionUpdater = (index: number, type: string) => {
    let selectedItemData: SelectedItemsTypes = {};

    switch (type) {
      case "Verbs":
        selectedItemData = verbsDB[index];
        break;
      case "Nouns":
        selectedItemData = nounsDB[index];
        break;
      case "Adjectives":
        selectedItemData = adjectivesDB[index];
        break;
      default:
        break;
    }
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
        <StyledSelectionRowContainer
          key={index}
          onClick={vocabHandler}
          sx={{
            backgroundColor: `${matchFound && "secondary.light"}`,
            color: `${matchFound && "secondary.dark"}`,
          }}
        >
          <DropDownTermTypography
            variant="h6"
            sx={{ color: "inherit", paddingLeft: "5px" }}
          >
            {object.french}
          </DropDownTermTypography>
          <EndSelectionBox>
            <DropDownTermTypography
              variant="h6"
              sx={{
                textAlign: "right",
                justifyContent: "right",
                display: "flex",
              }}
            >
              {object.english}
            </DropDownTermTypography>
            {!matchFound && <AddWordIcon />}
            {matchFound && <RemoveWordIcon />}
          </EndSelectionBox>
        </StyledSelectionRowContainer>
      );
    });
    return renderReadyItem;
  };

  const renderReadyVerbItems = dropDownDataMaker(verbsDB, "Verbs");
  const renderReadyNounItems = dropDownDataMaker(nounsDB, "Nouns");
  const renderReadyAdjectiveItems = dropDownDataMaker(
    adjectivesDB,
    "Adjectives"
  );

  if (
    practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions <=
    selectedItems.length
  ) {
    submitButtonEnabled = true;
  }

  // Submit Handler

  const submitHandler = () => {
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfConjugationPopupActive(true)
    );
    dispatch(sheetGeneratorStoreSliceActions.setVocabSelectPopupActive(false));
    dispatch(
      sheetGeneratorStoreSliceActions.setUserSelectedVocab(selectedItems)
    );
    const [multipleChoiceAnswers, matchingAnswers, fillInBlankAnswers] =
      questionAnswerCreator(
        practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMultipleChoiceQuestions,
        practiceSheetGeneratorVocabQuestionSetup.numberOfVocabMatchingQuestions,
        practiceSheetGeneratorVocabQuestionSetup.numberOfVocabFillInTheBlankQuestions,
        selectedItems
      );
    dispatch(
      sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorVocabQuestions({
        vocabMultipleChoiceQuestions: multipleChoiceAnswers,
        vocabMatchingQuestions: matchingAnswers,
        vocabFillInTheBlankQuestions: fillInBlankAnswers,
      })
    );
  };
  ///Reset on Upload
  useEffect(() => {
    if (vocabSelectPopupActive) {
      setSelectedItems([]);
    }
  }, [vocabSelectPopupActive]);

  // Skip BUtton Handler

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
    dispatch(sheetGeneratorStoreSliceActions.setVocabSelectPopupActive(false));
    dispatch(sheetGeneratorStoreSliceActions.setSelectedVocabTestType(""));
    dispatch(sheetGeneratorStoreSliceActions.setUserSelectedVocab([]));
    dispatch(
      sheetGeneratorStoreSliceActions.setPracticeSheetGeneratorVocabQuestions({
        vocabMultipleChoiceQuestions: [],
        vocabMatchingQuestions: [],
        vocabFillInTheBlankQuestions: [],
      })
    );
  };
  return (
    <StyledDialog
      open={vocabSelectPopupActive}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
      sx={{ gap: "0" }}
    >
      <StyledDialogContent sx={{ gap: "0" }}>
        <ClosingIconContainer
          onClick={onCloseFunction}
          sx={{ marginTop: "10px" }}
        >
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText variant="h6">Step 2 of 6</StyledStepTitleText>

        <StyledPopupTypography
          sx={{ marginTop: "10px", marginBottom: "10px" }}
          variant="h4"
        >
          Vocab Selection
        </StyledPopupTypography>
        <SelectionContainer>
          <QuestionsRemainingText variant="h6">
            Minimum Selection Remaining: &nbsp;
          </QuestionsRemainingText>
          <QuestionsRemainingText variant="h6">
            {practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
              selectedItems.length >
              0 &&
              practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
                selectedItems.length}
            {practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
              selectedItems.length <=
              0 && 0}
          </QuestionsRemainingText>
        </SelectionContainer>
        {practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
          selectedItems.length <=
          0 && (
          <StyledWarningText>
            Warning: Picking more than the selected number of questions will
            randomize the selection
          </StyledWarningText>
        )}
        <DropDownButton
          onClick={verbsHeadingHandler}
          sx={{
            marginBottom: `${verbsDropDownMenuActive && "0px"}`,
            marginTop: "15px",
          }}
        >
          <StyledPopupTypography variant="h5">Verbs</StyledPopupTypography>
          {!verbsDropDownMenuActive && <DropDownDownArrow />}
          {verbsDropDownMenuActive && <DropDownUpArrow />}
        </DropDownButton>
        {verbsDropDownMenuActive && (
          <DropDownSelectionMenu>{renderReadyVerbItems}</DropDownSelectionMenu>
        )}
        <DropDownButton
          onClick={nounHeadingHandler}
          sx={{ marginBottom: `${nounDropDownMenuActive && "0px"}` }}
        >
          <StyledPopupTypography variant="h5">Nouns</StyledPopupTypography>
          {!nounDropDownMenuActive && <DropDownDownArrow />}
          {nounDropDownMenuActive && <DropDownUpArrow />}
        </DropDownButton>
        {nounDropDownMenuActive && (
          <DropDownSelectionMenu>{renderReadyNounItems}</DropDownSelectionMenu>
        )}
        <DropDownButton
          onClick={adjectiveHeadingHandler}
          sx={{ marginBottom: `${adjectiveDropDownMenuActive && "0px"}` }}
        >
          <StyledPopupTypography variant="h5">Adjectives</StyledPopupTypography>
          {!adjectiveDropDownMenuActive && <DropDownDownArrow />}
          {adjectiveDropDownMenuActive && <DropDownUpArrow />}
        </DropDownButton>
        {adjectiveDropDownMenuActive && (
          <DropDownSelectionMenu>
            {renderReadyAdjectiveItems}
          </DropDownSelectionMenu>
        )}

        <ActionButtonsContainer sx={{ marginTop: "10px" }}>
          {submitButtonEnabled && (
            <ActionButton onClick={submitHandler}>Submit</ActionButton>
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
export default VocabSelectionPopup;
