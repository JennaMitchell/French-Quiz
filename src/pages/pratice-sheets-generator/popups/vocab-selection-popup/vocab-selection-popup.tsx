import { useSelector, useDispatch } from "react-redux";
import { DatabaseStates, storeActions } from "../../../../store/store";
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
} from "./vocab-selction-popup-styled-components";
import { useState, useEffect } from "react";

const VocabSelectionPopup = () => {
  const dispatch = useDispatch();
  const adjectivesDB = useSelector(
    (state: DatabaseStates) => state.adjectivesDB
  );
  const nounsDB = useSelector((state: DatabaseStates) => state.nounsDB);
  const verbsDB = useSelector((state: DatabaseStates) => state.verbsDB);
  const vocabSelectPopupActive = useSelector(
    (state: DatabaseStates) => state.vocabSelectPopupActive
  );
  const practiceSheetGeneratorVocabQuestionSetup = useSelector(
    (state: DatabaseStates) => state.practiceSheetGeneratorVocabQuestionSetup
  );
  interface SelectedItemsTypes {
    french?: string;
    english?: string;
  }
  const onCloseHandler = () => {
    dispatch(storeActions.setVocabSelectPopupActive(false));
  };
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
      if (
        practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
          selectedItems.length !==
        0
      ) {
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
        <VocabContainer
          key={index}
          onClick={vocabHandler}
          sx={{
            backgroundColor: `${matchFound && "secondary.light"}`,
            color: `${matchFound && "secondary.dark"}`,
          }}
        >
          <Typography
            sx={{ fontSize: "inherit", color: "inherit", paddingLeft: "5px" }}
          >
            {object.french}
          </Typography>
          <EndSelectionBox>
            <Typography sx={{ fontSize: "inherit", color: "inherit" }}>
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

  if (
    practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
      selectedItems.length ===
    0
  ) {
    submitButtonEnabled = true;
  }

  // Submit Handler

  const submitHandler = () => {
    dispatch(storeActions.setNumberOfConjugationPopupActive(true));
    dispatch(storeActions.setVocabSelectPopupActive(false));
    dispatch(storeActions.setUserSelectedVocab(selectedItems));
  };
  ///Reset on Upload
  useEffect(() => {
    if (vocabSelectPopupActive) {
      setSelectedItems([]);
    }
  }, [vocabSelectPopupActive]);

  // Skip BUtton Handler

  const skipButtonHandler = () => {
    dispatch(storeActions.setPracticeSheetGeneratorVocabQuestionSetup([]));
    dispatch(storeActions.setNumberOfConjugationPopupActive(true));
    dispatch(storeActions.setVocabSelectPopupActive(false));
    dispatch(storeActions.setSelectedVocabTestType(""));
    dispatch(storeActions.setUserSelectedVocab([]));
  };
  return (
    <Dialog
      open={vocabSelectPopupActive}
      onClose={onCloseHandler}
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
          onClick={skipButtonHandler}
        >
          <ClosingIcon onClick={skipButtonHandler} />
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
            Step 2 of 6
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
              Selection Remaining :
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
              {practiceSheetGeneratorVocabQuestionSetup.numberOfTotalVocabQuestions -
                selectedItems.length}
            </Typography>
          </SelectionContainer>
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
