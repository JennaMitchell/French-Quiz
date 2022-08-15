import MultipleChoiceQuestion from "./child-components/multiple-choice-question";
import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { useState } from "react";
import {
  SingleItemRowContainer,
  TwoItemRowContainer,
} from "../../../../components/generic-components/generic-components";
import { useEffect } from "react";
import { useMediaQuery } from "@mui/material";

interface UserSelectedData {
  [french: string]: string;
  english: string;
}
type Props = {
  inputArray: UserSelectedData[];
  databaseType: string;
  testOn: string;
};
const MultipleChoiceCreator = ({ inputArray, databaseType, testOn }: Props) => {
  let overallDatabase: UserSelectedData[] = [];

  const doubleColumnActivate = useMediaQuery("(max-width:1280px)");
  const singleColumnActivate = useMediaQuery("(max-width:880px)");

  const phrasesDB = useAppSelector((state) => state.mainStore.phrasesDB);
  const [finalKeyPushArray, setFinalKeyPushArray] = useState<string[]>([]);
  const overAllVocabDB = useAppSelector(
    (state) => state.mainStore.overAllVocabDB
  );

  const dispatch = useAppDispatch();

  switch (databaseType) {
    case "Vocab":
      overallDatabase = overAllVocabDB;

      break;
    case "Phrases":
      overallDatabase = phrasesDB;
      break;
    default:
      break;
  }

  const randomNumberGenerator = (
    min: number,
    max: number,
    notThisNumber: number
  ) => {
    let randomNumberGenerated = Math.floor(
      Math.random() * (max - min + 1) + min
    );
    while (randomNumberGenerated === notThisNumber) {
      randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return randomNumberGenerated;
  };
  const randomNumberGeneratorWithNumberArrayRestriction = (
    min: number,
    max: number,
    notTheseNumber: number[]
  ) => {
    let randomNumberGenerated = Math.floor(
      Math.random() * (max - min + 1) + min
    );
    while (notTheseNumber.includes(randomNumberGenerated)) {
      randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
    }
    return randomNumberGenerated;
  };

  // Step 1. Creating the other Three Options
  const creatingThreeOptions = (
    word: UserSelectedData,
    database: UserSelectedData[]
  ) => {
    const databaseLength = database.length;
    // retreiving the french term from each term to find the index of the word selected
    const databaseFrenchTerms: string[] = [];
    for (const num in database) {
      databaseFrenchTerms.push(database[num].french);
    }

    const indexOfUserSelectedItem = databaseFrenchTerms.indexOf(word.french);

    // we are getting the index of the correct answer so that the answer doesn't appear twice
    // Getting a Random Number
    const randomNumberOne = randomNumberGenerator(
      0,
      databaseLength - 1,
      indexOfUserSelectedItem
    );

    const randomNumberTwo = randomNumberGeneratorWithNumberArrayRestriction(
      0,
      databaseLength - 1,
      [indexOfUserSelectedItem, randomNumberOne]
    );
    const randomNumberThree = randomNumberGeneratorWithNumberArrayRestriction(
      0,
      databaseLength - 1,
      [indexOfUserSelectedItem, randomNumberOne, randomNumberTwo]
    );

    return [
      database[randomNumberOne],
      database[randomNumberTwo],
      database[randomNumberThree],
    ];
  };
  const answerKey: string[] = [];
  let renderReadyMultipleChoiceQuestions = inputArray.map(
    (word: UserSelectedData, index: number) => {
      //Handeling Test Types
      let testTypeLowerCase = testOn.toLowerCase();
      switch (testOn) {
        case "French":
          testTypeLowerCase = "french";
          break;
        case "English":
          testTypeLowerCase = "english";
          break;
        default:
          // The other option is to test on either english or french randomly
          // to handles this we grab a random number from 0

          const coinFlip = randomNumberGenerator(0, 1, 2);
          if (coinFlip === 0) {
            testTypeLowerCase = "french";
          } else {
            testTypeLowerCase = "english";
          }
          break;
      }
      const otherOptionsData = creatingThreeOptions(word, overallDatabase);

      const correctAnswerPosition =
        randomNumberGeneratorWithNumberArrayRestriction(0, 3, [5]);
      const wrongAnswerPositionOne =
        randomNumberGeneratorWithNumberArrayRestriction(0, 3, [
          correctAnswerPosition,
        ]);
      const wrongAnswerPositionTwo =
        randomNumberGeneratorWithNumberArrayRestriction(0, 3, [
          correctAnswerPosition,
          wrongAnswerPositionOne,
        ]);
      const wrongAnswerPositionThree =
        randomNumberGeneratorWithNumberArrayRestriction(0, 3, [
          correctAnswerPosition,
          wrongAnswerPositionTwo,
          wrongAnswerPositionOne,
        ]);
      let mixedQuestions = ["", "", "", ""];
      type ObjectKey = keyof typeof word;

      mixedQuestions[correctAnswerPosition] = word[testTypeLowerCase];

      mixedQuestions[wrongAnswerPositionOne] =
        otherOptionsData[0][testTypeLowerCase];
      mixedQuestions[wrongAnswerPositionTwo] =
        otherOptionsData[1][testTypeLowerCase];
      mixedQuestions[wrongAnswerPositionThree] =
        otherOptionsData[2][testTypeLowerCase];
      let questionTitleType = "" as ObjectKey;

      if (testTypeLowerCase === "french") {
        questionTitleType = "english";
      } else {
        questionTitleType = "french";
      }
      const questionTitle = word[questionTitleType];
      /// Pushing the Correct Answer to the answser key

      switch (correctAnswerPosition) {
        case 0:
          answerKey.push("A");
          break;
        case 1:
          answerKey.push("B");
          break;
        case 2:
          answerKey.push("C");
          break;
        case 3:
          answerKey.push("D");
          break;
        default:
          break;
      }

      if (index === inputArray.length - 1) {
        setFinalKeyPushArray(answerKey);
      }

      return (
        <MultipleChoiceQuestion
          key={index}
          mixedQuestions={mixedQuestions}
          title={questionTitle}
          questionNumber={index}
          databaseType={databaseType}
        />
      );
    }
  );

  useEffect(() => {
    if (finalKeyPushArray.length === inputArray.length) {
      if (databaseType === "Vocab") {
        dispatch(
          sheetGeneratorStoreSliceActions.setVocabMultipleChoiceAnswerKey(
            finalKeyPushArray
          )
        );
      } else if (databaseType === "Phrases") {
        dispatch(
          sheetGeneratorStoreSliceActions.setPhrasesMultipleChoiceAnswerKey(
            finalKeyPushArray
          )
        );
      }
    }
  }, [
    databaseType,
    dispatch,
    finalKeyPushArray,
    finalKeyPushArray.length,
    inputArray.length,
  ]);

  if (
    renderReadyMultipleChoiceQuestions.length % 3 === 1 &&
    !singleColumnActivate
  ) {
    const lastEntry =
      renderReadyMultipleChoiceQuestions[
        renderReadyMultipleChoiceQuestions.length - 1
      ];

    renderReadyMultipleChoiceQuestions[
      renderReadyMultipleChoiceQuestions.length - 1
    ] = (
      <SingleItemRowContainer sx={{ paddingLeft: "80px" }} key="one row">
        {lastEntry}
      </SingleItemRowContainer>
    );
  }
  // handeling media centering at two rows

  if (
    renderReadyMultipleChoiceQuestions.length % 2 === 1 &&
    !singleColumnActivate &&
    doubleColumnActivate &&
    databaseType !== "Phrase"
  ) {
    const lastEntry =
      renderReadyMultipleChoiceQuestions[
        renderReadyMultipleChoiceQuestions.length - 1
      ];

    renderReadyMultipleChoiceQuestions[
      renderReadyMultipleChoiceQuestions.length - 1
    ] = (
      <SingleItemRowContainer
        sx={{ paddingLeft: "80px", gridColumn: "1/span 2" }}
        key="one row"
      >
        {lastEntry}
      </SingleItemRowContainer>
    );
  }

  if (
    renderReadyMultipleChoiceQuestions.length % 3 === 2 &&
    databaseType !== "Phrases" &&
    !doubleColumnActivate
  ) {
    const lastEntrys = renderReadyMultipleChoiceQuestions.splice(
      renderReadyMultipleChoiceQuestions.length - 2,
      2
    );

    renderReadyMultipleChoiceQuestions.push(
      <TwoItemRowContainer key="two row">
        {lastEntrys[0]} {lastEntrys[1]}
      </TwoItemRowContainer>
    );
  }

  if (
    renderReadyMultipleChoiceQuestions.length % 2 === 1 &&
    databaseType === "Phrases" &&
    !singleColumnActivate
  ) {
    const lastEntrys = renderReadyMultipleChoiceQuestions.splice(
      renderReadyMultipleChoiceQuestions.length - 1,
      2
    );

    renderReadyMultipleChoiceQuestions.push(
      <SingleItemRowContainer
        key="two row"
        sx={{
          marginLeft: "0px",
          marginTop: "20px",
          paddingLeft: "0px",

          gridColumn: "1/span 2",
        }}
      >
        {lastEntrys[0]} {lastEntrys[1]}
      </SingleItemRowContainer>
    );
  }

  return <>{renderReadyMultipleChoiceQuestions}</>;
};
export default MultipleChoiceCreator;
