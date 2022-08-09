import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
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
} from "./vocab-selection-popup-styled-components";
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
        <VocabContainer
          key={index}
          onClick={vocabHandler}
          sx={{
            backgroundColor: `${matchFound && "secondary.light"}`,
            color: `${matchFound && "secondary.dark"}`,
          }}
        >
          <StyledPopupTypography
            variant="h6"
            sx={{ color: "inherit", paddingLeft: "5px" }}
          >
            {object.french}
          </StyledPopupTypography>
          <EndSelectionBox>
            <StyledPopupTypography sx={{ color: "inherit" }}>
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
    <Dialog
      open={vocabSelectPopupActive}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
      PaperProps={{
        sx: {
          borderRadius: "20px",
          border: "none",
          margin: "0",

          "@media(max-width:475px)": {
            width: "max(325px,325px)",
          },
          "@media(max-width:400px)": {
            width: "max(300px,300px)",
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
          padding: "10px 40px 10px 40px",
          overflowY: "scroll",
          height: "max-content",
          "@media(max-width:475px)": {
            width: "max(325px,325px)",
            padding: "10px 20px 10px 20px",
          },
          "@media(max-width:400px)": {
            width: "max(300px,300px)",
          },
        }}
      >
        <ClosingIconContainer
          sx={{
            top: "10px",
            right: "30px",
            "@media(max-width:460px)": {
              top: "5px",
              right: "20px",
            },
          }}
          onClick={onCloseFunction}
        >
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>
        <Grid
          container
          columns={1}
          sx={{
            flexDirection: "column",
            placeItems: "center",
            width: "max(100%,)",
          }}
        >
          <StyledStepTitleText variant="h6">Step 2 of 6</StyledStepTitleText>

          <StyledPopupTypography variant="h4">
            Vocab Selection
          </StyledPopupTypography>
          <SelectionContainer>
            <QuestionsRemainingTest variant="h6">
              Minimum Selection Remaining: &nbsp;
            </QuestionsRemainingTest>
            <Typography
              variant="h6"
              sx={{
                "@media(max-width:580px)": { fontSize: "18px" },
                "@media(max-width:520px)": { fontSize: "16px" },
                "@media(max-width:475px)": {
                  fontSize: "12px",
                },
              }}
            >
              {practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
                selectedItems.length >
                0 &&
                practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
                  selectedItems.length}
              {practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
                selectedItems.length <=
                0 && 0}
            </Typography>
          </SelectionContainer>
          {practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
            selectedItems.length <=
            0 && (
            <StyledWarningText>
              Warning: Picking more than the selected number of questions will
              randomize the selection
            </StyledWarningText>
          )}
          <DropDownButton onClick={verbsHeadingHandler}>
            <StyledPopupTypography variant="h5">Verbs</StyledPopupTypography>
            {!verbsDropDownMenuActive && <DropDownDownArrow />}
            {verbsDropDownMenuActive && <DropDownUpArrow />}
          </DropDownButton>
          {verbsDropDownMenuActive && (
            <DropDownSelectionMenu>
              {renderReadyVerbItems}
            </DropDownSelectionMenu>
          )}
          <DropDownButton onClick={nounHeadingHandler}>
            <StyledPopupTypography variant="h5">Nouns</StyledPopupTypography>
            {!nounDropDownMenuActive && <DropDownDownArrow />}
            {nounDropDownMenuActive && <DropDownUpArrow />}
          </DropDownButton>
          {nounDropDownMenuActive && (
            <DropDownSelectionMenu>
              {renderReadyNounItems}
            </DropDownSelectionMenu>
          )}
          <DropDownButton onClick={adjectiveHeadingHandler}>
            <StyledPopupTypography variant="h5">
              Adjectives
            </StyledPopupTypography>
            {!adjectiveDropDownMenuActive && <DropDownDownArrow />}
            {adjectiveDropDownMenuActive && <DropDownUpArrow />}
          </DropDownButton>
          {adjectiveDropDownMenuActive && (
            <DropDownSelectionMenu>
              {renderReadyAdjectiveItems}
            </DropDownSelectionMenu>
          )}
        </Grid>

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
export default VocabSelectionPopup;
