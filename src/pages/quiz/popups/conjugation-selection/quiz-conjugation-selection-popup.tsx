import { quizStoreSliceActions } from "../../../../store/quiz-store-slice";
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
  StyledSelect,
  StyledOption,
} from "./quiz-conjugation-selection-popup-styled-components";
import { useState, useEffect, ChangeEventHandler } from "react";
import { quizReset } from "../../../../components/functions/quiz-reset-function";

const QuizConjugationSelectionPopup = () => {
  const dispatch = useAppDispatch();

  const verbsDB = useAppSelector((state) => state.mainStore.verbsDB);
  const quizConjugationVerbSelectionPopupActive = useAppSelector(
    (state) => state.quizStore.quizConjugationVerbSelectionPopupActive
  );

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
  };

  return (
    <Dialog
      open={quizConjugationVerbSelectionPopupActive}
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
            Step 4 of 4
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontSize: "26px",
              "@media(max-width:580px)": { fontSize: "28px" },
              "@media(max-width:520px)": { fontSize: "22px" },
              "@media(max-width:475px)": { fontSize: "18px" },
            }}
          >
            Vocab Conjugation Selection
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
              {numberOfQuizConjugationQuestions - selectedItems.length}
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
          <SelectionContainer sx={{ marginTop: "20px" }}>
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
              Grouping:
            </Typography>
            <StyledSelect onChange={groupByHandler}>
              <StyledOption>&nbsp;</StyledOption>
              <StyledOption>By Verb</StyledOption>
              <StyledOption>Random</StyledOption>
            </StyledSelect>
          </SelectionContainer>
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
export default QuizConjugationSelectionPopup;
