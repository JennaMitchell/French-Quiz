import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { Dialog, DialogContent, Grid, Typography } from "@mui/material";
import {
  ClosingIconContainer,
  ClosingIcon,
} from "../../../../components/generic-components/generic-popup-components";

import {
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
  SelectionContainer,
  ButtonsContainer,
} from "./quiz-vocab-selection-popup-styled-components";
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
        <VocabContainer
          key={index}
          onClick={vocabHandler}
          sx={{
            backgroundColor: `${matchFound && "secondary.light"}`,
            color: `${matchFound && "secondary.dark"}`,
          }}
        >
          <Typography
            sx={{
              fontSize: "inherit",
              color: "inherit",
              paddingLeft: "5px",
              maxWidth: "125px",
            }}
          >
            {object.french}
          </Typography>
          <EndSelectionBox>
            <Typography
              sx={{
                fontSize: "inherit",
                color: "inherit",
                maxWidth: "125px",
                textAlign: "right",
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
    <Dialog
      open={quizVocabSelectionPopupActive}
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
          padding: "10px 40px 20px 40px",
          overflowY: "scroll",
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
            Step 2 of 4
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
            Vocab Selection
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
              {userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions -
                selectedItems.length >
                0 &&
                userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions -
                  selectedItems.length}
              {userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions -
                selectedItems.length <=
                0 && 0}
            </Typography>
          </SelectionContainer>
          {userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions -
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
              Verbs
            </Typography>
            {!verbsDropDownMenuActive && <DropDownDownArrow />}
            {verbsDropDownMenuActive && <DropDownUpArrow />}
          </DropDownButton>
          {verbsDropDownMenuActive && (
            <DropDownSelectionMenu>
              {renderReadyVerbItems}
            </DropDownSelectionMenu>
          )}
          <DropDownButton onClick={nounHeadingHandler}>
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
              Nouns
            </Typography>
            {!nounDropDownMenuActive && <DropDownDownArrow />}
            {nounDropDownMenuActive && <DropDownUpArrow />}
          </DropDownButton>
          {nounDropDownMenuActive && (
            <DropDownSelectionMenu>
              {renderReadyNounItems}
            </DropDownSelectionMenu>
          )}
          <DropDownButton onClick={adjectiveHeadingHandler}>
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
              Adjectives
            </Typography>
            {!adjectiveDropDownMenuActive && <DropDownDownArrow />}
            {adjectiveDropDownMenuActive && <DropDownUpArrow />}
          </DropDownButton>
          {adjectiveDropDownMenuActive && (
            <DropDownSelectionMenu>
              {renderReadyAdjectiveItems}
            </DropDownSelectionMenu>
          )}
          <DropDownButton onClick={phrasesHeadingHandler}>
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
            {!phrasesDropDownMenuActive && <DropDownDownArrow />}
            {phrasesDropDownMenuActive && <DropDownUpArrow />}
          </DropDownButton>
          {phrasesDropDownMenuActive && (
            <DropDownSelectionMenu>
              {renderReadyPhraseItems}
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
export default QuizVocabSelectionPopup;
