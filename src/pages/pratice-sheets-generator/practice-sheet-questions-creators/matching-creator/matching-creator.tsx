import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppDispatch } from "../../../../store/hooks";

import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  randomNumberGenerator,
  randomNumberGeneratorWithNumberArrayRestriction,
  letterAnswerKeyCreator,
} from "../../../../components/functions/generic-functions";
import { useEffect, useState } from "react";
import {
  SingleItemRowContainer,
  TwoItemRowContainer,
} from "../../../../components/generic-components/generic-components";

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
const UnderlineContainer = styled("div", {
  name: "UnderlineContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(60px,60px)",
  height: "max(60px,60px)",
  borderBottom: "2px solid black",
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
  const dispatch = useAppDispatch();
  const [pushedAnswerKey, setPushedAnswerKey] = useState<string[]>([]);
  const [answerKeyDispatched, setAnswerKeyDispatched] = useState(false);

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
  const alphbetArray = letterAnswerKeyCreator(inputArray.length);
  let answerArray = alphbetArray;
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
        <StyledTypography>{answerSide[z]}</StyledTypography>
        <UnderlineContainer />

        <StyledTypography sx={{ textAlign: "right" }}>
          {testOnSideArray[z]}
        </StyledTypography>
      </RowContainer>
    );
  }

  useEffect(() => {
    if (!answerKeyDispatched) {
      if (pushedAnswerKey.length !== 0) {
        if (databaseType === "Vocab") {
          dispatch(
            sheetGeneratorStoreSliceActions.setVocabMatchingAnswerKey(
              pushedAnswerKey
            )
          );
        } else if (databaseType === "Phrases") {
          dispatch(
            sheetGeneratorStoreSliceActions.setPhrasesMatchingAnswerKey(
              pushedAnswerKey
            )
          );
        }
      }
      setAnswerKeyDispatched(true);
    }
  }, [pushedAnswerKey, databaseType, dispatch, answerKeyDispatched]);

  // useffect is here to allow the answerkey to pushed after the componet is rendered
  // if you ttry to do it durng the intial renderyou will cause an error that says yo uare updating somehintg while in the process of updating
  if (pushedAnswerKey.length === 0 && answerKey.length !== 0) {
    setPushedAnswerKey(answerKey);
  }
  if (renderReadyData.length % 3 === 1) {
    const lastEntry = renderReadyData[renderReadyData.length - 1];

    renderReadyData[renderReadyData.length - 1] = (
      <SingleItemRowContainer key="last entry">
        {lastEntry}
      </SingleItemRowContainer>
    );
  }

  if (renderReadyData.length % 3 === 2) {
    const lastEntrys = renderReadyData.splice(renderReadyData.length - 2, 2);

    renderReadyData.push(
      <TwoItemRowContainer key="last entry">
        {lastEntrys[0]} {lastEntrys[1]}
      </TwoItemRowContainer>
    );
  }

  return <>{renderReadyData}</>;
};
export default MatchingCreator;
