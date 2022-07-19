import { useDispatch } from "react-redux";
import { storeActions } from "../../../../store/store";

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography, {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  backgroundColor: "inherit",
  fontSize: "26px",
  textAlign: "left",
}));

const RowContainer = styled("div", {
  name: "RowContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  height: "max-content",
  display: "grid",
  gridTemplateColumns: "1fr max-content 1fr",
  gap: "20px",
  justifyContent: "center",
  alignItems: "center",
  gridColumn: "1/span 3",
}));

interface UserSelectedData {
  [french: string]: string;
  english: string;
}

type Props = {
  inputArray: UserSelectedData[];
  databaseType: string;
  testOn: string;
};

const MatchingCreator = ({ inputArray, databaseType, testOn }: Props) => {
  const dispatch = useDispatch();

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
  // Mixing the Selected Questions
  const tempMixedArray: number[] = [];
  // creating a random array of numebrs excluisively to each other
  for (let j = 0; j < inputArray.length; j++) {
    let randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
      0,
      inputArray.length - 1,
      tempMixedArray
    );
    while (tempMixedArray.includes(randomNumber)) {
      randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
        0,
        inputArray.length - 1,
        tempMixedArray
      );
    }
    tempMixedArray.push(randomNumber);
  }

  // Step 2. creating the answer Key

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
  if (inputArray.length > alphbetArray.length) {
    const numberOfIterations = Math.ceil(
      inputArray.length / alphbetArray.length
    );
    for (let z = 0; z < numberOfIterations; z++) {
      let numberOfElementsToAdd = 0;
      if (numberOfIterations > 1 && z !== numberOfIterations - 1) {
        numberOfElementsToAdd = alphbetArray.length;
      } else {
        numberOfElementsToAdd = inputArray.length - alphbetArray.length * z;
      }
      for (let q = 0; q < numberOfElementsToAdd; q++) {
        answerArray.push(`${alphbetArray[z]}${alphbetArray[q]}`);
      }
    }
  }

  const answerKey = [];
  const testOnSideArray = [];
  const answerSide = [];

  // Creating the test on Side

  for (let e = 0; e < inputArray.length; e++) {
    testOnSideArray.push("");
  }

  // Answer Side

  for (let u = 0; u < inputArray.length; u++) {
    switch (testOn) {
      case "French":
        // english on empty side right
        // frnech on left side
        answerSide.push(inputArray[u].french);
        testOnSideArray[tempMixedArray[u]] = `${
          answerArray[tempMixedArray[u]]
        }. ${inputArray[u].english}`;
        answerKey.push(answerArray[tempMixedArray[u]]);
        break;
      case "English":
        // english on empty side left
        // frnech on right side
        answerSide.push(inputArray[u].english);
        testOnSideArray[tempMixedArray[u]] = `${
          answerArray[tempMixedArray[u]]
        }. ${inputArray[u].french}`;
        answerKey.push(answerArray[tempMixedArray[u]]);
        break;
      default:
        const coinFlip = randomNumberGenerator(0, 1, 2);
        if (coinFlip === 0) {
          answerSide.push(inputArray[u].french);
          testOnSideArray[tempMixedArray[u]] = `${
            answerArray[tempMixedArray[u]]
          }. ${inputArray[u].english}`;
          answerKey.push(answerArray[tempMixedArray[u]]);
        } else {
          answerSide.push(inputArray[u].english);
          testOnSideArray[tempMixedArray[u]] = `${
            answerArray[tempMixedArray[u]]
          }. ${inputArray[u].french}`;
          answerKey.push(answerArray[tempMixedArray[u]]);
        }
        break;
    }
  }

  // Getting Everything Render Ready
  const renderReadyData = [];
  for (let z = 0; z < inputArray.length; z++) {
    renderReadyData.push(
      <RowContainer key={z}>
        <StyledTypography>{testOnSideArray[z]}</StyledTypography>
        <StyledTypography sx={{ textDecoration: "underline" }}>
          &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
        </StyledTypography>
        <StyledTypography sx={{ textAlign: "right" }}>
          {answerSide[z]}
        </StyledTypography>
      </RowContainer>
    );
  }
  // DIspathcing answer key
  if (renderReadyData.length !== 0) {
    if (databaseType === "Vocab") {
      dispatch(
        storeActions.setPracticeSheetsFillInTheBlankVocabAnswers(answerKey)
      );
    }
    if (databaseType === "Phrases") {
      dispatch(
        storeActions.setPracticeSheetsFillInTheBlankPhrasesAnswers(answerKey)
      );
    }
  }

  return <>{renderReadyData}</>;
};
export default MatchingCreator;
