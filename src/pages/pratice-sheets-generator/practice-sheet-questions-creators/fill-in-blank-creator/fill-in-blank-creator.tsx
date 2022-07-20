import { useDispatch } from "react-redux";
import { storeActions } from "../../../../store/store";

import { styled } from "@mui/material/styles";
import { randomNumberGenerator } from "../../../../components/functions/generic-functions";
import { useState, useEffect } from "react";
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

  const dispatch = useDispatch();

  for (let i = 0; i < inputArray.length; i++) {
    if (testOn === "French") {
      answerSide.push(inputArray[i].english);
      answerKey.push(`${i + 1}. ${inputArray[i].french}`);
    } else if (testOn === "English") {
      answerSide.push(inputArray[i].french);
      answerKey.push(`${i + 1}. ${inputArray[i].english}`);
    } else {
      const coinFlip = randomNumberGenerator(0, 1, 2);
      if (coinFlip === 0) {
        answerSide.push(inputArray[i].english);
        answerKey.push(`${i + 1}. ${inputArray[i].french}`);
      } else {
        answerSide.push(inputArray[i].french);
        answerKey.push(`${i + 1}. ${inputArray[i].english}`);
      }
    }
  }

  const renderReadyData = answerSide.map((item, index) => {
    return (
      <RowContainer key={index}>
        <StyledTypography>{item}</StyledTypography>
        <StyledTypography sx={{ textDecoration: "underline" }}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </StyledTypography>
      </RowContainer>
    );
  });

  useEffect(() => {
    if (pushedAnswerKey.length !== 0) {
      if (databaseType === "Vocab") {
        dispatch(
          storeActions.setPracticeSheetsFillInTheBlankVocabAnswers(
            pushedAnswerKey
          )
        );
      } else if (databaseType === "Phrases") {
        dispatch(
          storeActions.setPracticeSheetsFillInTheBlankVocabAnswers(
            pushedAnswerKey
          )
        );
      }
    }
  }, [pushedAnswerKey, databaseType, dispatch]);

  if (pushedAnswerKey.length === 0 && renderReadyData.length !== 0) {
    setPushedAnswerKey(answerKey);
  }

  return <>{renderReadyData}</>;
};
export default FillInBlankCreator;
