import MultipleChoiceQuestion from "./child-components/multiple-choice-question";
import { useDispatch, useSelector } from "react-redux";
import { DatabaseStates, storeActions } from "../../../../store/store";

import { useEffect, useState } from "react";
interface UserSelectedData {
  [french: string]: string;
  english: string;
}
type Props = {
  inputArray: UserSelectedData[];

  databaseType: string;
  testOn: string;
};
const MultipleChoiceCreator = ({
  inputArray,

  databaseType,
  testOn,
}: Props) => {
  interface AnswerKey {
    questionNumber: number;
    answer: string;
  }
  let overallDatabase: UserSelectedData[] = [];

  const phrasesDB = useSelector((state: DatabaseStates) => state.phrasesDB);
  const overAllVocabDB = useSelector(
    (state: DatabaseStates) => state.overAllVocabDB
  );
  const dispatch = useDispatch();
  const [multipleChoiceQuestionAnswerKey, setMultipleChoiceQuestionAnswerKey] =
    useState<AnswerKey[] | []>([]);

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

    const randomNumberTwo = randomNumberGenerator(
      0,
      databaseLength - 1,
      indexOfUserSelectedItem
    );
    const randomNumberThree = randomNumberGenerator(
      0,
      databaseLength - 1,
      indexOfUserSelectedItem
    );

    return [
      database[randomNumberOne],
      database[randomNumberTwo],
      database[randomNumberThree],
    ];
  };
  const answerKey: AnswerKey[] = [];
  const renderReadyMultipleChoiceQuestions = inputArray.map(
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
          answerKey.push({ questionNumber: index, answer: "A" });
          break;
        case 1:
          answerKey.push({ questionNumber: index, answer: "B" });
          break;
        case 2:
          answerKey.push({ questionNumber: index, answer: "C" });
          break;
        case 3:
          answerKey.push({ questionNumber: index, answer: "D" });
          break;
        default:
          break;
      }

      return (
        <MultipleChoiceQuestion
          key={index}
          mixedQuestions={mixedQuestions}
          title={questionTitle}
          questionNumber={index}
        />
      );
    }
  );

  useEffect(() => {
    if (multipleChoiceQuestionAnswerKey.length !== 0) {
      switch (databaseType) {
        case "Vocab":
          dispatch(
            storeActions.setPracticeSheetsMultipleChoicePhrasesAnswers(
              multipleChoiceQuestionAnswerKey
            )
          );

          break;
        case "Phrases":
          dispatch(
            storeActions.setPracticeSheetsMultipleChoicePhrasesAnswers(
              multipleChoiceQuestionAnswerKey
            )
          );
          break;
        default:
          break;
      }
    }
  }, [multipleChoiceQuestionAnswerKey, databaseType, dispatch]);

  if (
    renderReadyMultipleChoiceQuestions.length !== 0 &&
    multipleChoiceQuestionAnswerKey.length === 0
  ) {
    setMultipleChoiceQuestionAnswerKey(answerKey);
  }

  return <>{renderReadyMultipleChoiceQuestions}</>;
};
export default MultipleChoiceCreator;
