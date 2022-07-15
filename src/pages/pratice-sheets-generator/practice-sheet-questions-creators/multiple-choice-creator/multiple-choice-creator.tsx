import MultipleChoiceQuestion from "./child-components/multiple-choice-question";
import { useDispatch, useSelector } from "react-redux";
import { DatabaseStates, storeActions } from "../../../../store/store";
import { TopContainer } from "./multiple-choice-creator-styled-components";
interface UserSelectedData {
  french: string;
  english: string;
}
type Props = {
  inputArray: UserSelectedData[];
  numberOfQuestions: number;
  databaseType: string;
  testOn: string;
};
const MultipleChoiceCreator = ({
  inputArray,
  numberOfQuestions,
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
    database: UserSelectedData[],
    testType: string
  ) => {
    const databaseLength = database.length;
    const databaseKeys = Object.keys(database);
    const indexOfUserSelectedItem = databaseKeys.indexOf(word.french);
    // we are getting the index of the correct answer so that the answer doesn't appear twice
    // Getting a Random Number
    const randomNumberOne = randomNumberGenerator(
      0,
      databaseLength,
      indexOfUserSelectedItem
    );

    const randomNumberTwo = randomNumberGenerator(
      0,
      databaseLength,
      indexOfUserSelectedItem
    );
    const randomNumberThree = randomNumberGenerator(
      0,
      databaseLength,
      indexOfUserSelectedItem
    );
    /// Step 2. Returning The Data
    return [
      database[randomNumberOne],
      database[randomNumberTwo],
      database[randomNumberThree],
    ];
  };
  const answerKey: AnswerKey[] = [];
  const renderReadyMultipleChoiceQuestions = overallDatabase.map(
    (word: UserSelectedData, index: number) => {
      //Handeling Test Types

      let testTypeLowerCase = "";
      switch (testOn) {
        case "French":
          testTypeLowerCase = "french";
          break;
        case "English":
          testTypeLowerCase = "english";
          break;
        default:
          // The otehr option is to test on either english or french randomly
          // to handles this we grab a random number from 0
          const coinFlip = randomNumberGenerator(0, 1, 2);
          if (coinFlip === 0) {
            testTypeLowerCase = "french";
          } else {
            testTypeLowerCase = "english";
          }
          break;
      }
      const otherOptionsData = creatingThreeOptions(
        word,
        overallDatabase,
        testTypeLowerCase
      );

      const correctAnswerPosition =
        randomNumberGeneratorWithNumberArrayRestriction(1, 4, [5]);
      const wrongAnswerPositionOne =
        randomNumberGeneratorWithNumberArrayRestriction(1, 4, [
          correctAnswerPosition,
        ]);
      const wrongAnswerPositionTwo =
        randomNumberGeneratorWithNumberArrayRestriction(1, 4, [
          correctAnswerPosition,
          wrongAnswerPositionOne,
        ]);
      const wrongAnswerPositionThree =
        randomNumberGeneratorWithNumberArrayRestriction(1, 4, [
          correctAnswerPosition,
          wrongAnswerPositionTwo,
          wrongAnswerPositionOne,
        ]);
      let mixedQuestions = ["", "", "", ""];
      type ObjectKey = keyof typeof word;

      const testTypeKey = testOn as ObjectKey;
      mixedQuestions[correctAnswerPosition] = word[testTypeKey];
      mixedQuestions[wrongAnswerPositionOne] = otherOptionsData[0][testTypeKey];
      mixedQuestions[wrongAnswerPositionTwo] = otherOptionsData[1][testTypeKey];
      mixedQuestions[wrongAnswerPositionThree] =
        otherOptionsData[2][testTypeKey];
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
          mixedQuestions={mixedQuestions}
          title={questionTitle}
        />
      );
    }
  );

  if (renderReadyMultipleChoiceQuestions.length !== 0) {
    switch (databaseType) {
      case "Vocab":
        dispatch(
          storeActions.setPracticeSheetsMultipleChoiceVocabAnswers(answerKey)
        );
        break;
      case "Phrases":
        dispatch(
          storeActions.setPracticeSheetsMultipleChoicePhrasesAnswers(answerKey)
        );
        break;
      default:
        break;
    }
  }
  return <TopContainer>{renderReadyMultipleChoiceQuestions}</TopContainer>;
};
export default MultipleChoiceCreator;
