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

const StyledTypography = styled(Typography, {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  backgroundColor: "inherit",
  fontSize: "26px",
  textAlign: "left",
  width: "100%",
  "@media(max-width:1280px)": {
    fontSize: "22px",
  },
  "@media(max-width:880px)": {
    fontSize: "16px",
  },
  "@media(max-width:560px)": {
    fontSize: "14px",
  },
}));

const RowContainer = styled("div", {
  name: "RowContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(900px,900px)",
  height: "max-content",
  display: "grid",
  gridTemplateColumns: "1fr max-content 1fr",
  gap: "20px",

  justifyContent: "center",
  alignItems: "center",
  gridColumn: "1/span 3",

  "@media(max-width:1280px)": {
    width: "max(700px,700px)",
    gridColumn: "1/span 2",
  },
  "@media(max-width:880px)": {
    gridColumn: "1/span 1",
    width: "max(400px,400px)",
  },
  "@media(max-width:560px)": {
    gridColumn: "1/span 1",
    width: "max(250px,250px)",
  },
}));
const UnderlineContainer = styled("div", {
  name: "UnderlineContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(60px,60px)",
  height: "max(60px,60px)",
  borderBottom: "2px solid black",
  "@media(max-width:1280px)": {
    width: "max(50px,50px)",
    height: "max(50px,50px)",
  },
  "@media(max-width:880px)": {
    width: "max(40px,40px)",
    height: "max(40px,40px)",
  },
  "@media(max-width:560px)": {
    width: "max(25px,25px)",
    height: "max(25px,25px)",
  },
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
  const [renderReadyItems, setRenderReadyItems] = useState<JSX.Element[]>([]);

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
  if (pushedAnswerKey.length === 0) {
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
    const tempRenderReadyData = [];
    for (let z = 0; z < inputArray.length; z++) {
      tempRenderReadyData.push(
        <RowContainer key={`matching number ${z} ${databaseType}`}>
          <StyledTypography>{answerSide[z].trim()}</StyledTypography>
          <UnderlineContainer />

          <StyledTypography sx={{ textAlign: "right" }}>
            {testOnSideArray[z].trim()}
          </StyledTypography>
        </RowContainer>
      );
    }
    setRenderReadyItems(tempRenderReadyData);
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
  // if you try to do it during the intial render you will cause an error that says yo uare updating somehintg while in the process of updating
  if (pushedAnswerKey.length === 0 && answerKey.length !== 0) {
    setPushedAnswerKey(answerKey);
  }

  return <>{renderReadyItems}</>;
};
export default MatchingCreator;
