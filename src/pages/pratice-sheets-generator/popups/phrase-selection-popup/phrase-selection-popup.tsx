import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import {
  ClosingIconContainer,
  ClosingIcon,
} from "../../../../components/generic-components/generic-popup-components";

import {
  SelectionContainer,
  ActionButton,
  DisabledActionButton,
  VocabContainer,
  DropDownButton,
  DropDownSelectionMenu,
  DropDownDownArrow,
  DropDownUpArrow,
  AddWordIcon,
  RemoveWordIcon,
  EndSelectionBox,
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
            fontSize: "16px",
          }}
        >
          <Typography
            sx={{
              fontSize: "inherit",
              color: "inherit",
              paddingLeft: "5px",
              width: "max(100px,100px)",
            }}
          >
            {object.french}
          </Typography>
          <EndSelectionBox>
            <Typography
              sx={{
                fontSize: "inherit",
                color: "inherit",
                width: "max(100px,100px)",
              }}
            >
              {object.english}
            </Typography>
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
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "primary.main",
          borderRadius: "20px",
          overflowY: "scroll",
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
        <ClosingIconContainer
          sx={{ top: "10px", right: "30px" }}
          onClick={onCloseFunction}
        >
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
            Step 6 of 6
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
            Phrase Selection
          </Typography>
          <SelectionContainer>
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
              Minimum Selection Remaining: &nbsp;
            </Typography>
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
              {practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions -
                selectedItems.length >
                0 &&
                practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions -
                  selectedItems.length}
              {practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions -
                selectedItems.length <
                0 && 0}
            </Typography>
          </SelectionContainer>
          {practiceSheetGeneratorPhrasesQuestionSetup.numberOfTotalPhraseQuestions -
            selectedItems.length <=
            0 && (
            <Typography
              sx={{
                color: "red",
                fontSize: "16px",
                width: "max(300px,300px)",
                textAlign: "center",
              }}
            >
              Warning: Picking more than the selected number of questions will
              randomize the selection
            </Typography>
          )}
          <DropDownButton onClick={verbsHeadingHandler}>
            <Typography
              variant="h5"
              sx={{
                "@media(max-width:580px)": { fontSize: "18px" },
                "@media(max-width:520px)": { fontSize: "16px" },
                "@media(max-width:475px)": {
                  fontSize: "12px",
                  textAlign: "center",
                },
              }}
            >
              Phrases
            </Typography>
            {!verbsDropDownMenuActive && <DropDownDownArrow />}
            {verbsDropDownMenuActive && <DropDownUpArrow />}
          </DropDownButton>
          {verbsDropDownMenuActive && (
            <DropDownSelectionMenu>
              {renderReadyVerbItems}
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
export default PhraseSelectionPopup;
