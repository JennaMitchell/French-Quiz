import { UserQuizQuestionSetup } from "../../store/quiz-store-slice";
interface UserSelectedData {
  [french: string]: string;
  english: string;
}

// Random NUmber generaor with Min Max, and a Number to Exclude
export const randomNumberGenerator = (
  min: number,
  max: number,
  notThisNumber: number
) => {
  let randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
  while (randomNumberGenerated === notThisNumber) {
    randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return randomNumberGenerated;
};

// Random Number with Min, Max and  Array of Expections
export const randomNumberGeneratorWithNumberArrayRestriction = (
  min: number,
  max: number,
  notTheseNumber: number[]
) => {
  let randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
  while (notTheseNumber.includes(randomNumberGenerated)) {
    randomNumberGenerated = Math.floor(Math.random() * (max - min + 1) + min);
  }
  return randomNumberGenerated;
};
interface SelectedItemsTypes {
  french?: string;
  english?: string;
}

export const stringArrayScrambler = (array: string[]) => {
  const finalArray: string[] = [];
  for (let q = 0; q < array.length; q++) {
    finalArray.push("");
  }

  const arrayOfUsedNumbers = [array.length];

  if (array.length !== 0) {
    const arrayLength = array.length;

    for (let indexOfString = 0; indexOfString < arrayLength; indexOfString++) {
      const randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
        0,
        arrayLength - 1,
        arrayOfUsedNumbers
      );

      arrayOfUsedNumbers.push(randomNumber);
      finalArray[indexOfString] = array[randomNumber];
    }

    return finalArray;
  } else {
    return [];
  }
};

export const questionAnswerCreator = (
  numberOfQuestionsOne: number,
  numberOfQuestionsTwo: number,
  numberOfQuestionsThree: number,
  inputArray: SelectedItemsTypes[]
) => {
  const inputLength = inputArray.length;

  const arrayOfUsedNumbers: number[] = [inputLength];
  const arrayOfDataOne: SelectedItemsTypes[] = [];
  const arrayOfDataTwo: SelectedItemsTypes[] = [];
  const arrayOfDataThree: SelectedItemsTypes[] = [];

  let randomNumber = randomNumberGenerator(0, inputLength - 1, inputLength);

  for (let a = 0; a < numberOfQuestionsOne; a++) {
    while (arrayOfUsedNumbers.includes(randomNumber)) {
      randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
        0,
        inputLength - 1,
        arrayOfUsedNumbers
      );
    }
    arrayOfUsedNumbers.push(randomNumber);
    arrayOfDataOne.push(inputArray[randomNumber]);
  }

  for (let b = 0; b < numberOfQuestionsTwo; b++) {
    while (arrayOfUsedNumbers.includes(randomNumber)) {
      randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
        0,
        inputLength - 1,
        arrayOfUsedNumbers
      );
    }
    arrayOfUsedNumbers.push(randomNumber);
    arrayOfDataTwo.push(inputArray[randomNumber]);
  }

  for (let c = 0; c < numberOfQuestionsThree; c++) {
    while (arrayOfUsedNumbers.includes(randomNumber)) {
      randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
        0,
        inputLength - 1,
        arrayOfUsedNumbers
      );
    }
    arrayOfUsedNumbers.push(randomNumber);
    arrayOfDataThree.push(inputArray[randomNumber]);
  }

  return [arrayOfDataOne, arrayOfDataTwo, arrayOfDataThree];
};
export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Random Question Maker
//used if numberOfQuestions is less than what was selected than  we need to randomly generate the answers to be tested on
export const randomUserSelectGenerator = (
  userSelectedQuizVocabNPhrases: UserSelectedData[],
  numberOfQuestions: number
) => {
  let arrayOfAnswersNumbers: number[] = [userSelectedQuizVocabNPhrases.length];
  for (
    let indexOfRandomNumber = 0;
    indexOfRandomNumber < numberOfQuestions;
    indexOfRandomNumber++
  ) {
    const randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
      0,
      userSelectedQuizVocabNPhrases.length - 1,
      arrayOfAnswersNumbers
    );
    arrayOfAnswersNumbers.push(randomNumber);
  }
  arrayOfAnswersNumbers = arrayOfAnswersNumbers.slice(1);
  const arrayOfTestTerms = arrayOfAnswersNumbers.map((num: number) => {
    return userSelectedQuizVocabNPhrases[num];
  });
  return arrayOfTestTerms;
};

export const letterAnswerKeyCreator = (numberOfQuestions: number) => {
  const alphbetArray = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  let answerArray = alphbetArray;
  if (numberOfQuestions > alphbetArray.length) {
    const numberOfIterations = Math.ceil(
      numberOfQuestions / alphbetArray.length
    );
    for (let z = 0; z < numberOfIterations; z++) {
      let numberOfElementsToAdd = 0;
      if (numberOfIterations > 1 && z !== numberOfIterations - 1) {
        numberOfElementsToAdd = alphbetArray.length;
      } else {
        numberOfElementsToAdd = numberOfQuestions - alphbetArray.length * z;
      }
      for (let q = 0; q < numberOfElementsToAdd; q++) {
        answerArray.push(`${alphbetArray[z]}${alphbetArray[q]}`);
      }
    }
  }
  return answerArray;
};

export const verbPrefixRemover = (inputString: string) => {
  const arrayOfConjugationTableKeys = [
    "je",
    "tu",
    "il",
    "elle",
    "vous",
    "nous",
    "elles",
    "ils",
  ];
  let tempString = inputString;
  for (
    let indexOfPrefix = 0;
    indexOfPrefix < arrayOfConjugationTableKeys.length;
    indexOfPrefix++
  ) {
    tempString = tempString.replace(
      arrayOfConjugationTableKeys[indexOfPrefix],
      ""
    );
  }
  return tempString;
};

export const totalNumberOfQuizQuestionCalculator = (
  userSelectedObject: UserQuizQuestionSetup,
  numberOfConjugationQuestions: number
) => {
  const numberOfVocabQuestions =
    userSelectedObject.numberOfTotalVocabNPhraseQuestions;

  return numberOfVocabQuestions + numberOfConjugationQuestions * 8;
};

export const arrayComparer = (
  correctArray: string[],
  userInputArray: string[]
) => {
  const numberOfAnswers = correctArray.length;
  const arrayOfComparisons: boolean[] = [];
  for (
    let indexOfAnswer = 0;
    indexOfAnswer < numberOfAnswers;
    indexOfAnswer++
  ) {
    if (
      correctArray[indexOfAnswer].trim() ===
      userInputArray[indexOfAnswer].trim()
    ) {
      arrayOfComparisons.push(true);
    } else {
      arrayOfComparisons.push(false);
    }
  }

  return arrayOfComparisons;
};

  /// Handeling Scroll to button Presses 

  export const scrollToHandler = (idToScrollTo:string) =>{
    const ref = document.getElementById(idToScrollTo);
    console.log(ref);
    ref?.scrollIntoView();
  }