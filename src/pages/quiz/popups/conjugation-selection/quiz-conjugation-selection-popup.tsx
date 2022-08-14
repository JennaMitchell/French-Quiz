import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";

import {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  DropDownTermTypography,
  ActionButton,
  DisabledActionButton,
  StyledPopupSelect,
  StyledPopupOption,
  StyledStepTitleText,
  PopupTitle,
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
} from "../../../../components/generic-components/generic-popup-components";

import { useState, useEffect, ChangeEventHandler } from "react";
import { quizReset } from "../../../../components/functions/quiz-reset-function";

const QuizConjugationSelectionPopup = () => {
  const dispatch = useAppDispatch();

  const verbsDB = useAppSelector((state) => state.mainStore.verbsDB);
  const quizConjugationVerbSelectionPopupActive = useAppSelector(
    (state) => state.quizStore.quizConjugationVerbSelectionPopupActive
  );
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const numberOfVocabQuestions =
    userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions;

  const numberOfQuizConjugationQuestions = useAppSelector(
    (state) => state.quizStore.numberOfQuizConjugationQuestions
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
    quizReset(false, dispatch);
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
      if (numberOfQuizConjugationQuestions - selectedItems.length !== 0) {
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
          <DropDownTermTypography sx={{ paddingLeft: "10px" }}>
            {object.french}
          </DropDownTermTypography>
          <EndSelectionBox>
            <DropDownTermTypography
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

  // Submit Handler

  const submitHandler = () => {
    dispatch(
      quizStoreSliceActions.setQuizConjugationVerbSelectionPopupActive(false)
    );
    dispatch(
      quizStoreSliceActions.setUserSelectedQuizConjugations(selectedItems)
    );
    dispatch(
      quizStoreSliceActions.setUserSelectedQuizConjugationGrouping(
        selectedGrouping
      )
    );
    dispatch(quizStoreSliceActions.setQuizSetupComplete(true));
  };
  ///Reset on Upload
  useEffect(() => {
    if (quizConjugationVerbSelectionPopupActive) {
      setSelectedItems([]);
      setSelectedGrouping("");
    }
  }, [quizConjugationVerbSelectionPopupActive]);

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
      quizStoreSliceActions.setQuizConjugationVerbSelectionPopupActive(false)
    );
    dispatch(quizStoreSliceActions.setNumberOfQuizConjugationQuestions(0));

    dispatch(quizStoreSliceActions.setUserSelectedQuizConjugations([]));
    dispatch(quizStoreSliceActions.setUserSelectedQuizConjugationGrouping(""));
    dispatch(quizStoreSliceActions.setQuizSetupComplete(true));
    dispatch(
      quizStoreSliceActions.setTotalNumberOfQuestions(numberOfVocabQuestions)
    );
  };

  return (
    <StyledDialog
      open={quizConjugationVerbSelectionPopupActive}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
    >
      <StyledDialogContent sx={{ gap: "0" }}>
        <ClosingIconContainer onClick={onCloseFunction}>
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText variant="h6">Step 4 of 4</StyledStepTitleText>

        <PopupTitle variant="h4" sx={{ margin: "10px 0 10px 0" }}>
          Vocab Conjugation Selection
        </PopupTitle>
        <SelectionContainer>
          <QuestionsRemainingText variant="h6">
            Selection Remaining :
          </QuestionsRemainingText>
          <QuestionsRemainingText variant="h6">
            {numberOfQuizConjugationQuestions - selectedItems.length}
          </QuestionsRemainingText>
        </SelectionContainer>
        <DropDownButton
          onClick={verbsHeadingHandler}
          sx={{
            marginTop: "10px",
            marginBottom: `${verbsDropDownMenuActive && "0"}`,
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
export default QuizConjugationSelectionPopup;
