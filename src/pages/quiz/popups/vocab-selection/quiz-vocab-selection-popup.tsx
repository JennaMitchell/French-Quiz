import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  DropDownTermTypography,
  ActionButton,
  SkipButton,
  DisabledActionButton,
  StyledStepTitleText,
  PopupTitle,
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
} from "../../../../components/generic-components/generic-popup-components";

import { useState, useEffect } from "react";

import { quizReset } from "../../../../components/functions/quiz-reset-function";
const QuizVocabSelectionPopup = () => {
  const dispatch = useAppDispatch();
  const adjectivesDB = useAppSelector((state) => state.mainStore.adjectivesDB);
  const nounsDB = useAppSelector((state) => state.mainStore.nounsDB);
  const verbsDB = useAppSelector((state) => state.mainStore.verbsDB);
  const phrasesDB = useAppSelector((state) => state.mainStore.phrasesDB);
  const quizVocabSelectionPopupActive = useAppSelector(
    (state) => state.quizStore.quizVocabSelectionPopupActive
  );
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  interface SelectedItemsTypes {
    french?: string;
    english?: string;
  }

  const [verbsDropDownMenuActive, setVerbsDropDownMenuActive] = useState(false);
  const [nounDropDownMenuActive, setNounDropDownMenuActive] = useState(false);
  const [adjectiveDropDownMenuActive, setAdjectiveDropDownMenuActive] =
    useState(false);
  const [phrasesDropDownMenuActive, setPhrasesDropDownMenuActive] =
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
  const phrasesHeadingHandler = () => {
    setPhrasesDropDownMenuActive(!phrasesDropDownMenuActive);
  };
  const onCloseFunction = () => {
    quizReset(false, dispatch);
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
      case "Phrases":
        selectedItemData = phrasesDB[index];
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
  const renderReadyNounItems = dropDownDataMaker(nounsDB, "Nouns");
  const renderReadyAdjectiveItems = dropDownDataMaker(
    adjectivesDB,
    "Adjectives"
  );
  const renderReadyPhraseItems = dropDownDataMaker(phrasesDB, "Phrases");

  if (
    userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions <=
    selectedItems.length
  ) {
    submitButtonEnabled = true;
  }

  // Submit Handler

  const submitHandler = () => {
    dispatch(
      quizStoreSliceActions.setQuizConjugationNumberOfQuestionsPopup(true)
    );
    dispatch(quizStoreSliceActions.setQuizVocabSelectionPopupActive(false));
    dispatch(
      quizStoreSliceActions.setUserSelectedQuizVocabNPhrases(selectedItems)
    );
  };
  ///Reset on Upload
  useEffect(() => {
    if (quizVocabSelectionPopupActive) {
      setSelectedItems([]);
    }
  }, [quizVocabSelectionPopupActive]);

  // Skip Button Handler

  const skipButtonHandler = () => {
    dispatch(
      quizStoreSliceActions.setUserQuizQuestionSetup({
        numberOfTotalVocabNPhraseQuestions: 0,
        numberOfVocabNPhraseMultipleChoiceQuestions: 0,
        numberOfVocabNPhraseMatchingQuestions: 0,
        numberOfVocabNPhraseFillInTheBlankQuestions: 0,
      })
    );
    dispatch(
      quizStoreSliceActions.setQuizConjugationNumberOfQuestionsPopup(true)
    );
    dispatch(quizStoreSliceActions.setQuizVocabSelectionPopupActive(false));
    dispatch(quizStoreSliceActions.setUserSelectedQuizVocabQuestionTypes(""));
    dispatch(quizStoreSliceActions.setUserSelectedQuizVocabNPhrases([]));
  };
  return (
    <StyledDialog
      open={quizVocabSelectionPopupActive}
      onClose={onCloseFunction}
      aria-labelledby="new-practice-sheet"
    >
      <StyledDialogContent sx={{ gap: "0" }}>
        <ClosingIconContainer onClick={onCloseFunction}>
          <ClosingIcon onClick={onCloseFunction} />
        </ClosingIconContainer>

        <StyledStepTitleText>Step 2 of 4</StyledStepTitleText>

        <PopupTitle sx={{ margin: "10px 0 10px 0" }}>
          Vocab Selection
        </PopupTitle>
        <SelectionContainer>
          <QuestionsRemainingText variant="h6">
            Minimum Selection Remaining: &nbsp;
          </QuestionsRemainingText>
          <QuestionsRemainingText variant="h6">
            {userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions -
              selectedItems.length >
              0 &&
              userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions -
                selectedItems.length}
            {userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions -
              selectedItems.length <=
              0 && 0}
          </QuestionsRemainingText>
        </SelectionContainer>
        {userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions -
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
            marginTop: "10px",
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
        <DropDownButton
          onClick={phrasesHeadingHandler}
          sx={{ marginBottom: `${phrasesDropDownMenuActive && "0px"}` }}
        >
          <StyledPopupTypography variant="h5">Phrases</StyledPopupTypography>
          {!phrasesDropDownMenuActive && <DropDownDownArrow />}
          {phrasesDropDownMenuActive && <DropDownUpArrow />}
        </DropDownButton>
        {phrasesDropDownMenuActive && (
          <DropDownSelectionMenu>
            {renderReadyPhraseItems}
          </DropDownSelectionMenu>
        )}

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
export default QuizVocabSelectionPopup;
