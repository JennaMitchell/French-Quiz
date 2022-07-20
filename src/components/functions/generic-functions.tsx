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
