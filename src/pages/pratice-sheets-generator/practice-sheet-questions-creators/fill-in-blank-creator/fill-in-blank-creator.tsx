import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppDispatch } from "../../../../store/hooks";
import { styled } from "@mui/material/styles";
import { randomNumberGenerator } from "../../../../components/functions/generic-functions";
import { useEffect, useState } from "react";
import {
  SingleItemRowContainer,
  TwoItemRowContainer,
} from "../../../../components/generic-components/generic-components";
const StyledTypography = styled("p", {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  backgroundColor: "inherit",
  fontSize: "26px",
  textAlign: "left",
  fontFamily: "Montserrat, sans-serif",
}));

const RowContainer = styled("div", {
  name: "RowContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(360px,360px)",
  height: "max-content",
  display: "grid",
  gridTemplateColumns: "160px max-content",
  gap: "40px",
  justifyContent: "center",
  alignItems: "flex-start",
  overflow: "hidden",
  fontFamily: "Montserrat, sans-serif",
  marginBottom: "10px",
}));
const UnderlineContainer = styled("div", {
  name: "UnderlineContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(100px,100px)",
  height: "max(100%,100%)",
  borderBottom: "2px solid black",
}));
const PhrasesRowContainer = styled("div", {
  name: "PhrasesRowContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(480px,480px)",
  height: "max-content",
  display: "grid",
  gridTemplateColumns: "300px 150px",
  gridTemplateRows: "max-content",
  gap: "20px",
  justifyContent: "center",
  alignItems: "flex-start",
  overflow: "hidden",
  fontFamily: "Montserrat, sans-serif",
  marginBottom: "10px",
}));
const PhraseUnderlineContainer = styled("div", {
  name: "PhraseUnderlineContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(150px,150px)",
  height: "max(100%,100%)",
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

const FillInBlankCreator = ({ inputArray, databaseType, testOn }: Props) => {
  const answerSide = [];
  const answerKey: string[] = [];
  const [pushedAnswerKey, setPushedAnswerKey] = useState<string[]>([]);
  const [answerKeyDispatched, setAnswerKeyDispatched] = useState(false);

  const dispatch = useAppDispatch();

  for (let i = 0; i < inputArray.length; i++) {
    if (testOn === "French") {
      answerSide.push(inputArray[i].english);
      answerKey.push(` ${inputArray[i].french}`);
    } else if (testOn === "English") {
      answerSide.push(inputArray[i].french);
      answerKey.push(` ${inputArray[i].english}`);
    } else {
      const coinFlip = randomNumberGenerator(0, 1, 2);
      if (coinFlip === 0) {
        answerSide.push(inputArray[i].english);
        answerKey.push(` ${inputArray[i].french}`);
      } else {
        answerSide.push(inputArray[i].french);
        answerKey.push(`${inputArray[i].english}`);
      }
    }
  }

  const renderReadyData = answerSide.map((item, index) => {
    if (databaseType !== "Phrases") {
      return (
        <RowContainer key={index}>
          <StyledTypography>{item}</StyledTypography>
          <UnderlineContainer />
        </RowContainer>
      );
    } else {
      return (
        <PhrasesRowContainer key={index}>
          <StyledTypography sx={{ width: "max(100%,100%)" }}>
            {item}
          </StyledTypography>
          <PhraseUnderlineContainer />
        </PhrasesRowContainer>
      );
    }
  });

  if (pushedAnswerKey.length === 0 && renderReadyData.length !== 0) {
    setPushedAnswerKey(answerKey);
  }
  useEffect(() => {
    if (!answerKeyDispatched) {
      if (pushedAnswerKey.length !== 0) {
        if (databaseType === "Phrases") {
          // Creating a deep copy of the Vocab List

          dispatch(
            sheetGeneratorStoreSliceActions.setPhrasesFillInTheBlankAnswerKey(
              pushedAnswerKey
            )
          );
        } else if (databaseType === "Vocab") {
          // Creating a deep copy of the Vocab List

          dispatch(
            sheetGeneratorStoreSliceActions.setVocabFillInTheBlankAnswerKey(
              pushedAnswerKey
            )
          );
        }
      }
      setAnswerKeyDispatched(true);
    }
  }, [pushedAnswerKey, databaseType, dispatch, answerKeyDispatched]);

  if (renderReadyData.length % 3 === 1) {
    const lastEntry = renderReadyData[renderReadyData.length - 1];

    renderReadyData[renderReadyData.length - 1] = (
      <SingleItemRowContainer key="last entry" sx={{ marginTop: "10px" }}>
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
export default FillInBlankCreator;
