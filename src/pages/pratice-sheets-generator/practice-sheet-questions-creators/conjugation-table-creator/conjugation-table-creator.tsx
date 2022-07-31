import { sheetGeneratorStoreSliceActions } from "../../../../store/sheet-generator-slice";
import { useAppSelector, useAppDispatch } from "../../../../store/hooks";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import {
  randomNumberGeneratorWithNumberArrayRestriction,
  randomNumberGenerator,
} from "../../../../components/functions/generic-functions";
import { SingleItemRowContainer } from "../../../../components/generic-components/generic-components";
import { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

type UserSelectedData = {
  [key: string]: any;
};
// type SelectedConjugationTables = {
//   [key: string]: string;
// };

// type Answer = "je" | "tu" | "il" | "elle" | "vous" | "nous" | "elles" | "ils";

type Props = {
  inputArray: UserSelectedData[];
  groupBy: string;
};
type PairedData = {
  prefix: string;
  answer: string;
  verb: string;
};

const TableContainer = styled("div", {
  name: "TableContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(360px,360px)",
  height: "max-content",
  display: "grid",
  gridTemplateColumns: "max-content",
  gridTemplateRows: "max-content",
  rowGap: "20px",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Montserrat, sans-serif",
  marginTop: "20px",
  ":nth-child(n+5)": {
    marginTop: "40px",
  },
}));
const RowContainer = styled("div", {
  name: "RowContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(360px,360px)",
  height: "max-content",
  display: "grid",
  gridTemplateColumns: "260px 100px",
  gridTemplateRows: "max-content",
  justifyContent: "center",
  alignItems: "center",
  fontFamily: "Montserrat, sans-serif",
}));
const UnderlineContainer = styled("div", {
  name: "UnderlineContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  height: "max(100%,100%)",
  borderBottom: "2px solid black",
}));
const StyledTypography = styled(Typography, {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  backgroundColor: "inherit",
  fontSize: "26px",
  textAlign: "left",
}));
const ConjugationTableCreator = ({ inputArray, groupBy }: Props) => {
  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const conjugationTableDB: any = useAppSelector(
    (state) => state.mainStore.conjugationTableDB
  );

  const [useEffectTrigger, setUseEffectTrigger] = useState<string | number>(0);
  const [finalizedAnswerKey, setFinalizedAnswerKey] = useState<
    string[] | { [key: string]: string[] }
  >({});

  const dispatch = useAppDispatch();
  const conjugationTitles = [
    "je",
    "tu",
    "il",
    "elle",
    "vous",
    "nous",
    "elles",
    "ils",
  ];
  const selectedConjugationTables: string[] = [];
  // This grabs the conjugation data based on the selected verb
  for (let i: number = 0; i < inputArray.length; i++) {
    const temp = inputArray[i];

    const frenchItem: string = temp.french;

    selectedConjugationTables.push(conjugationTableDB[frenchItem]);
  }

  // const userSelectedDataConjugation: ConjugationTable[]
  const renderReadyData = [];
  const answerKey: string[] = [];
  const answerKeyObject: { [key: string]: string[] } = {};

  if (groupBy === "By Verb") {
    for (let j = 0; j < selectedConjugationTables.length; j++) {
      const selectedConjugation = selectedConjugationTables[j];
      const temp = inputArray[j];
      let frenchTitle = temp.french;
      let arrayOfAnswers: string[] = [];

      const rowData = conjugationTitles.map((french: string, index: number) => {
        // @ts-ignore
        arrayOfAnswers[index] = selectedConjugation[french];
        return (
          <RowContainer key={index}>
            <StyledTypography>
              {index + 1 + j * 8}. {capitalizeFirstLetter(french)} {'"'}
              {frenchTitle.toLowerCase()}
              {'"'}
            </StyledTypography>
            <UnderlineContainer />
          </RowContainer>
        );
      });
      answerKeyObject[frenchTitle] = arrayOfAnswers;

      renderReadyData[j] = <TableContainer key={j}>{rowData}</TableContainer>;
    }
  } else {
    // Step One creating an overall array of all the conjugations
    const randomizedData: PairedData[] = [];
    const numberOfIterations = inputArray.length;
    const pairedData: PairedData[] = [];
    const arrayOfUsedNumbers: number[] = [-1];

    for (let iteration = 0; iteration < numberOfIterations; iteration++) {
      for (let a = 0; a < conjugationTitles.length; a++) {
        const temp = conjugationTitles[a];

        pairedData.push({
          // @ts-ignore
          answer: selectedConjugationTables[iteration][temp],
          prefix: conjugationTitles[a],

          verb: inputArray[iteration].french,
        });
      }
    }

    // Scrambling the answers

    // Goal is to get a random number then push it to th final randomized data

    let randomNumber = randomNumberGenerator(
      0,
      pairedData.length - 1,
      pairedData.length
    );
    for (let b = 0; b < pairedData.length; b++) {
      while (arrayOfUsedNumbers.includes(randomNumber)) {
        randomNumber = randomNumberGeneratorWithNumberArrayRestriction(
          0,
          pairedData.length - 1,
          arrayOfUsedNumbers
        );
      }
      arrayOfUsedNumbers.push(randomNumber);

      randomizedData[b] = pairedData[randomNumber];
    }
    // Mapping over the randomized pair

    for (let y = 0; y < inputArray.length; y++) {
      const rowData = [];
      for (let z = 0; z < 8; z++) {
        rowData.push(
          <RowContainer key={z + y * 8}>
            <StyledTypography>
              {z + 1 + y * 8}.{" "}
              {capitalizeFirstLetter(randomizedData[z + y * 8].prefix)} {'"'}
              {randomizedData[z + y * 8].verb.toLowerCase()}
              {'"'}
            </StyledTypography>
            <UnderlineContainer />
          </RowContainer>
        );
        answerKey.push(randomizedData[z + y * 8].answer);
      }
      renderReadyData.push(<TableContainer key={y}>{rowData}</TableContainer>);
    }
  }

  useEffect(() => {
    if (typeof useEffectTrigger === "string") {
      dispatch(
        sheetGeneratorStoreSliceActions.setConjugationAnswerKey(
          finalizedAnswerKey
        )
      );
    }
  }, [useEffectTrigger, dispatch, finalizedAnswerKey]);
  // useEffect is set to deal with the error of one ocmponent rendering at the same time as another

  if (answerKey.length !== 0) {
    if (typeof useEffectTrigger !== "string") {
      setUseEffectTrigger("2");
      setFinalizedAnswerKey(answerKey);
    }
  }

  if (
    Object.keys(answerKeyObject).length !== 0 &&
    Object.keys(answerKeyObject).length === inputArray.length
  ) {
    if (typeof useEffectTrigger !== "string") {
      setUseEffectTrigger("1");
      setFinalizedAnswerKey(answerKeyObject);
    }
  }
  if (renderReadyData.length % 2 === 1) {
    const lastEntry = renderReadyData[renderReadyData.length - 1];

    renderReadyData[renderReadyData.length - 1] = (
      <SingleItemRowContainer sx={{ gridColumn: "1/span 2" }} key="last entry">
        {lastEntry}
      </SingleItemRowContainer>
    );
  }

  return <>{renderReadyData}</>;
};
export default ConjugationTableCreator;
