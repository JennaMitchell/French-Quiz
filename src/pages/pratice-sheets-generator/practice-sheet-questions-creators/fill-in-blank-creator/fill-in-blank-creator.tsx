import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppDispatch } from "../../../../store/hooks";
import { styled } from "@mui/material/styles";
import { randomNumberGenerator } from "../../../../components/functions/generic-functions";
import { useEffect, useState } from "react";
import {
  SingleItemRowContainer,
  TwoItemRowContainer,
} from "../../../../components/generic-components/generic-components";
import { useMediaQuery } from "@mui/material";
const StyledTypography = styled("p", {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  backgroundColor: "inherit",
  fontSize: "26px",
  textAlign: "center",
  fontFamily: "Montserrat, sans-serif",
  "@media(max-width:560px)": {
    fontSize: "12px",
    display: "inline-grid",
  },
}));

const RowContainer = styled("div", {
  name: "RowContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(380px,380px)",
  height: "max-content",
  display: "grid",

  rowGap: "40px",
  justifyContent: "center",
  alignItems: "space-between",
  gridTemplateColumns: "100%",
  gridTemplateRows: "max-content max-content",
  overflow: "hidden",
  fontFamily: "Montserrat, sans-serif",
  marginBottom: "10px",
  "@media(max-width:1280px)": {
    justifySelf: "center",
    width: "max(340px,340px)",
  },
  "@media(max-width:560px)": {
    gridTemplateColumns: "230px",
    width: "max(230px,230px)",
  },
}));
const UnderlineContainer = styled("div", {
  name: "UnderlineContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(70%,70%)",
  height: "max(70%,70%)",
  borderBottom: "2px solid black",
  justifySelf: "center",
}));
const PhrasesRowContainer = styled("div", {
  name: "PhrasesRowContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(380px,380px)",
  height: "max-content",
  display: "grid",
  gridTemplateColumns: "100%",
  gridTemplateRows: "max-content max-content",
  rowGap: "40px",
  justifyContent: "center",
  alignItems: "flex-start",
  overflow: "hidden",
  fontFamily: "Montserrat, sans-serif",
  marginBottom: "10px",
  justifySelf: "center",
  "@media(max-width:560px)": {
    width: "max(230px,230px)",
    gridTemplateColumns: "230px",
  },
}));
const PhraseUnderlineContainer = styled("div", {
  name: "PhraseUnderlineContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(90%,90%)",
  height: "max(100%,100%)",
  borderBottom: "2px solid black",
  justifySelf: "center",
  "@media(max-content:560px)": {
    width: "max(300px,300px)",
    gridTemplateColumns: "300px",
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

const FillInBlankCreator = ({ inputArray, databaseType, testOn }: Props) => {
  const answerSide = [];
  const answerKey: string[] = [];
  const [pushedAnswerKey, setPushedAnswerKey] = useState<string[]>([]);
  const [answerKeyDispatched, setAnswerKeyDispatched] = useState(false);
  const doubleColumnActivate = useMediaQuery("(max-width:1280px)");
  const singleColumnActivate = useMediaQuery("(max-width:880px)");

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
        <RowContainer key={`Fill In Blank ${index} ${databaseType}`}>
          <StyledTypography
            sx={{
              "media(max-width:560px)": {
                width: "max(300px,300px)",
              },
            }}
          >
            {item}
          </StyledTypography>
          <UnderlineContainer />
        </RowContainer>
      );
    } else {
      return (
        <PhrasesRowContainer
          key={index}
          sx={{
            "media(max-width:560px)": {
              width: "max(240px,240px) !important",
              gridTemplateColumns: "240px !important",
            },
          }}
        >
          <StyledTypography
            sx={{
              width: "max(100%,100%)",
              "media(max-width:560px)": {
                width: "max(240px,240px) !important",
              },
            }}
          >
            {item}
          </StyledTypography>
          <PhraseUnderlineContainer
            sx={{
              "media(max-width:560px)": {
                width: "max(240px,240px) !important",
              },
            }}
          />
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

  if (renderReadyData.length % 3 === 1 && !singleColumnActivate) {
    const lastEntry = renderReadyData[renderReadyData.length - 1];

    renderReadyData[renderReadyData.length - 1] = (
      <SingleItemRowContainer key="last entry" sx={{ marginTop: "10px" }}>
        {lastEntry}
      </SingleItemRowContainer>
    );
  }

  if (
    renderReadyData.length % 2 === 1 &&
    doubleColumnActivate &&
    !singleColumnActivate
  ) {
    const lastEntry = renderReadyData[renderReadyData.length - 1];

    renderReadyData[renderReadyData.length - 1] = (
      <SingleItemRowContainer
        key="last entry"
        sx={{ marginTop: "10px", gridColumn: "1/span 2" }}
      >
        {lastEntry}
      </SingleItemRowContainer>
    );
  }

  if (renderReadyData.length % 3 === 2 && !doubleColumnActivate) {
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
