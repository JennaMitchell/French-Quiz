import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  ActionButton,
  SkipButton,
  DisabledActionButton,
  StyledStepTitleText,
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
  StyledPopupOption,
  StyledPopupSelect,
  DropDownTermTypography,
} from "../../../../components/generic-components/generic-popup-components";

import { useState, useEffect, ChangeEventHandler } from "react";
import { practiceSheetReset } from "../../../../components/functions/practice-sheet-reset-function";

const ConjugationSelectionPopup = () => {
  const dispatch = useAppDispatch();

  const verbsDB = useAppSelector((state) => state.mainStore.verbsDB);
  const conjugationVerbChoicePopup = useAppSelector(
    (state) => state.sheetGenerator.conjugationVerbChoicePopup
  );

  const numberOfConjugationQuestions = useAppSelector(
    (state) => state.sheetGenerator.numberOfConjugationQuestions
  );
  interface SelectedItemsTypes {
    french?: string;
    english?: string;
  }

  const [verbsDropDownMenuActive, setVerbsDropDownMenuActive] = useState(false);

  const [selectedItems, setSelectedItems] = useState<SelectedItemsTypes[]>([]);
  const [selectedGrouping, setSelectedGrouping] = useState("");

  let submitButtonEnabled = false;

  // onClose Effect
  const onCloseFunction = () => {
    practiceSheetReset(false, dispatch);
  };

  // Handeling Section Button Clicks
  const verbsHeadingHandler = () => {
    setVerbsDropDownMenuActive(!verbsDropDownMenuActive);
  };

  // Function below handler the adding and removing of verbs
  const itemSelectionUpdater = (index: number, type: string) => {
    const selectedItemData: SelectedItemsTypes = verbsDB[index];

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
      if (numberOfConjugationQuestions - selectedItems.length !== 0) {
        const copyOfSelectedItems = JSON.parse(JSON.stringify(selectedItems));
        copyOfSelectedItems.push({
          english: selectedItemData.english,
          french: selectedItemData.french,
        });
        setSelectedItems(copyOfSelectedItems);
      }
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
          <DropDownTermTypography sx={{ paddingLeft: "5px" }}>
            {object.french}
          </DropDownTermTypography>
          <EndSelectionBox>
            <DropDownTermTypography
              sx={{ textAlign: "right", justifySelf: "flex-end" }}
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

  // Submit Handler

  const submitHandler = () => {
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfPhraseQuestionsPopupActive(
        true
      )
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setConjugationVerbChoicePopup(false)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setUserSelectedConjugations(selectedItems)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setUserSelectedConjugationGrouping(
        selectedGrouping
      )
    );
  };
  ///Reset on Upload
  useEffect(() => {
    if (conjugationVerbChoicePopup) {
      setSelectedItems([]);
      setSelectedGrouping("");
    }
  }, [conjugationVerbChoicePopup]);

  // Group by handler
  const groupByHandler: ChangeEventHandler<HTMLSelectElement> = (e): void => {
    if (e.target.value === "Random" || e.target.value === "By Verb") {
      setSelectedGrouping(e.target.value);
    }
  };
  // Submit Button Handler

  // Submit Button Enabler
  if (
    selectedGrouping === "Random" ||
    (selectedGrouping === "By Verb" && selectedItems.length !== 0)
  ) {
    submitButtonEnabled = true;
  }
  const skipButtonHandler = () => {
    dispatch(
      sheetGeneratorStoreSliceActions.setConjugationVerbChoicePopup(false)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfConjugationQuestions(0)
    );
    dispatch(
      sheetGeneratorStoreSliceActions.setNumberOfPhraseQuestionsPopupActive(
        true
      )
    );

    dispatch(sheetGeneratorStoreSliceActions.setUserSelectedConjugations([]));
    dispatch(
      sheetGeneratorStoreSliceActions.setUserSelectedConjugationGrouping("")
    );
  };

  return (
    <StyledDialog
      open={conjugationVerbChoicePopup}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
    >
      <StyledDialogContent sx={{ gap: "0px" }}>
        <ClosingIconContainer
          sx={{ top: "10px", right: "30px" }}
          onClick={onCloseFunction}
        >
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText variant="h6">Step 4 of 6</StyledStepTitleText>

        <StyledPopupTypography
          variant="h4"
          sx={{
            textAlign: "center",
            paddingLeft: "10px",
            margin: "10px 0 10px 0",
          }}
        >
          Vocab Conjugation Selection
        </StyledPopupTypography>
        <SelectionContainer>
          <QuestionsRemainingText variant="h6">
            Selection Remaining :
          </QuestionsRemainingText>
          <QuestionsRemainingText variant="h6">
            {numberOfConjugationQuestions - selectedItems.length}
          </QuestionsRemainingText>
        </SelectionContainer>
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
        <SelectionContainer
          sx={{ marginTop: "10px", marginBottom: "5px", width: "100%" }}
        >
          <StyledPopupTypography variant="h5">Grouping:</StyledPopupTypography>
          <StyledPopupSelect onChange={groupByHandler}>
            <StyledPopupOption>&nbsp;</StyledPopupOption>
            <StyledPopupOption>By Verb</StyledPopupOption>
            <StyledPopupOption>Random</StyledPopupOption>
          </StyledPopupSelect>
        </SelectionContainer>

        <ActionButtonsContainer>
          <SkipButton onClick={skipButtonHandler}>Skip</SkipButton>
          {submitButtonEnabled && (
            <ActionButton onClick={submitHandler}>Submit</ActionButton>
          )}
          {!submitButtonEnabled && (
            <DisabledActionButton disabled={true}>Submit</DisabledActionButton>
          )}
        </ActionButtonsContainer>
      </StyledDialogContent>
    </StyledDialog>
  );
};
export default ConjugationSelectionPopup;
