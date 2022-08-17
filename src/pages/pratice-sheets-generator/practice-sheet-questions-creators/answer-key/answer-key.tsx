// conjugationAnswerKey: string[];
// phrasesMultipleChoiceAnswerKey: string[];
// vocabMultipleChoiceAnswerKey: string[];
// phrasesMatchingAnswerKey: string[];
// vocabMatchingAnswerKey: string[];
// phrasesFillInTheBlankAnswerKey: string[];
// vocabFillInTheBlankAnswerKey: string[];

import { useAppSelector } from "../../../../store/hooks";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import { SingleItemRowContainer } from "../../../../components/generic-components/generic-components";
import { useMediaQuery } from "@mui/material";
const AnswerOverAllContainer = styled("div", {
  name: "AnswerOverAllContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateColumns: "repeat(2,max-content)",
  gridTemplateRows: "max-content",
  gap: "20px",
  gridColumn: "1 / span 3",
  alignItems: "flex-start",
  justifyContent: "space-evenly",
  marginTop: "20px",
  marginBottom: "20px",
  "@media(max-width:1280px)": {
    gridColumn: "1 / span 2",
  },
  "@media(max-width:880px)": {
    gridTemplateColumns: "max-content",
    gridColumn: "1 / span 1",
  },
}));
const AnswerSectionTitle = styled(Typography, {
  name: "AnswerSectionTitle",
  slot: "Wrapper",
})(() => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridColumn: "1 / span 2",
  marginTop: "20px",
  textAlign: "center",
  fontSize: "48px",
  justifySelf: "center",
  "@media(max-width:1280px)": {
    gridColumn: "1 /span 2",
  },
  "@media(max-width:880px)": {
    gridColumn: "1 /span 1",
    fontSize: "32px",
  },
  "@media(max-width:560px)": {
    fontSize: "28px",
  },
}));

const AnswerBlock = styled("div", {
  name: "AnswerBlock",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "100px",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateColumns: "repeat(2,max-content)",
  alignItems: "center",
  justifyContent: "center",

  "@media(max-width:1280px)": {
    gridColumn: "1 / span 2",
  },
  "@media(max-width:880px)": {
    width: "max(300px,300px)",
    gridTemplateColumns: "max-content",
    gridColumn: "1 / span 1",
    alignSelf: "center",
    justifySelf: "center",
    gap: "20px",
    paddingRight: "0px",
  },
}));

const StyledAnswerTypography = styled("p", {
  name: "StyledAnswerTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  backgroundColor: "inherit",
  fontSize: "26px",
  fontFamily: "Montserrat, sans-serif",
  textAlign: "center",
  width: "max(100%,100%)",
  "@media(max-width:1280px)": {
    gridColumn: "1 /span 2",
  },
  "@media(max-width:880px)": {
    gridColumn: "1 /span 1",
    fontSize: "18px",
    justifySelf: "center",
  },
}));
const StyledTitleTypography = styled(Typography, {
  name: "StyledTitleTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  backgroundColor: "inherit",
  fontSize: "2.125rem",
  textAlign: "left",
  fontFamily: "Montserrat, sans-serif",
  gridColumn: "1/span 2",
  gridRow: "1 / span 1",
  fontWeight: "400",
  "@media(max-width:1280px)": {
    gridColumn: "1 /span 2",
  },
  "@media(max-width:880px)": {
    gridColumn: "1 /span 1",
    fontSize: "18px",
    justifySelf: "center",
  },
  "@media(max-width:560px)": {
    fontSize: "14px",
  },
}));

const ConjugationAnswerContainer = styled("div", {
  name: "ConjugationAnswerContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  display: "grid",
  gridTemplateColumns: "max-content 160px",
  gridTemplateRows: "max-content",
  justifyContent: "space-between",
  width: "max(185px,185px)",
  textAlign: "center",
}));
const AnswerKey = () => {
  const vocabMultipleChoiceAnswerKey = useAppSelector(
    (state) => state.sheetGenerator.vocabMultipleChoiceAnswerKey
  );
  const vocabMatchingAnswerKey = useAppSelector(
    (state) => state.sheetGenerator.vocabMatchingAnswerKey
  );
  const vocabFillInTheBlankAnswerKey = useAppSelector(
    (state) => state.sheetGenerator.vocabFillInTheBlankAnswerKey
  );
  /// These three first

  /// Conjugation
  const conjugationAnswerKey = useAppSelector(
    (state) => state.sheetGenerator.conjugationAnswerKey
  );
  const userSelectedConjugationGrouping = useAppSelector(
    (state) => state.sheetGenerator.userSelectedConjugationGrouping
  );
  // Phrases
  const phrasesMultipleChoiceAnswerKey = useAppSelector(
    (state) => state.sheetGenerator.phrasesMultipleChoiceAnswerKey
  );
  const phrasesMatchingAnswerKey = useAppSelector(
    (state) => state.sheetGenerator.phrasesMatchingAnswerKey
  );
  const phrasesFillInTheBlankAnswerKey = useAppSelector(
    (state) => state.sheetGenerator.phrasesFillInTheBlankAnswerKey
  );
  const singleColumnActivate = useMediaQuery("(max-width:880px)");

  // calculating the total number of active elements to know if we need centering or not
  let totalNumberOfActiveItems = 0;

  let lastActiveAnswerKey = "";
  vocabMultipleChoiceAnswerKey.length !== 0 && totalNumberOfActiveItems++;
  vocabMatchingAnswerKey.length !== 0 && totalNumberOfActiveItems++;
  vocabFillInTheBlankAnswerKey.length !== 0 && totalNumberOfActiveItems++;
  phrasesMultipleChoiceAnswerKey.length !== 0 && totalNumberOfActiveItems++;
  phrasesMatchingAnswerKey.length !== 0 && totalNumberOfActiveItems++;
  phrasesFillInTheBlankAnswerKey.length !== 0 && totalNumberOfActiveItems++;
  if (totalNumberOfActiveItems % 2 === 1) {
    if (vocabMultipleChoiceAnswerKey.length !== 0) {
      lastActiveAnswerKey = "vocabMultipleChoiceAnswer";
    }
    if (vocabMatchingAnswerKey.length !== 0) {
      lastActiveAnswerKey = "vocabMatchingAnswerKey";
    }
    if (vocabFillInTheBlankAnswerKey.length !== 0) {
      lastActiveAnswerKey = "vocabFillInTheBlankAnswerKey";
    }
    if (phrasesMultipleChoiceAnswerKey.length !== 0) {
      lastActiveAnswerKey = "phrasesMultipleChoiceAnswerKey";
    }
    if (phrasesMatchingAnswerKey.length !== 0) {
      lastActiveAnswerKey = "phrasesMatchingAnswerKey";
    }
    if (phrasesFillInTheBlankAnswerKey.length !== 0) {
      lastActiveAnswerKey = "phrasesFillInTheBlankAnswerKey";
    }
  }

  // Answer Block Creator

  const AnswerBlockCreator = (inputArray: any) => {
    let lastItemCenteredActive = false;
    let lastItemPosition = 0;
    if (inputArray.length % 3 === 1) {
      lastItemCenteredActive = true;
      lastItemPosition = inputArray.length - 1;
    }

    const renderReadyItems = inputArray.map((answer: string, index: number) => {
      if (lastItemCenteredActive && index === lastItemPosition) {
        return (
          <StyledAnswerTypography
            key={`${answer} ${index} lastItem`}
            sx={{
              gridColumn: "1 /span 3",
              justifySelf: "center",
              alignSelf: "center",
              "@media(max-width:880px)": {
                gridColumn: "1 /span 1",
                fontSize: "18px",
                justifySelf: "center",
              },
            }}
          >
            {index + 1}. {answer}
          </StyledAnswerTypography>
        );
      } else {
        return (
          <StyledAnswerTypography
            key={`${answer} ${index} not last item`}
            sx={{
              gridColumn: "1 /span 3",

              "@media(max-width:880px)": {
                gridColumn: "1 /span 1",
                fontSize: "18px",
                justifySelf: "center",
              },
            }}
          >
            {index + 1}. {answer}
          </StyledAnswerTypography>
        );
      }
    });
    return renderReadyItems;
  };

  // Handeling Vocab Answer Keys

  const renderReadyVocabMultipleChoiceAnswers = AnswerBlockCreator(
    vocabMultipleChoiceAnswerKey
  );

  const renderReadyVocabMatchingAnswers = AnswerBlockCreator(
    vocabMatchingAnswerKey
  );

  const renderReadyVocabFillInBlankAnswers = AnswerBlockCreator(
    vocabFillInTheBlankAnswerKey
  );

  // Creating the Vocab Blocks
  const renderReadyVocabMultipleChoiceAnswersBlock = (
    <AnswerBlock
      sx={{
        gridColumn: `${
          lastActiveAnswerKey === "vocabMultipleChoiceAnswer"
            ? "1/span 2"
            : "auto"
        }`,
      }}
    >
      <StyledTitleTypography variant="h4">
        Vocab Multiple Choice Answers
      </StyledTitleTypography>
      {renderReadyVocabMultipleChoiceAnswers}
    </AnswerBlock>
  );
  const renderReadyVocabMatchingAnswersBlock = (
    <AnswerBlock
      sx={{
        gridColumn: `${
          lastActiveAnswerKey === "vocabMatchingAnswerKey" &&
          !singleColumnActivate
            ? "1/span 2"
            : "auto"
        }`,
      }}
    >
      <StyledTitleTypography variant="h4">
        Vocab Matching Answers
      </StyledTitleTypography>
      {renderReadyVocabMatchingAnswers}
    </AnswerBlock>
  );
  const renderReadyVocabFillInBlankAnswersBlock = (
    <AnswerBlock
      sx={{
        gridColumn: `${
          lastActiveAnswerKey === "vocabFillInTheBlankAnswerKey" &&
          !singleColumnActivate
            ? "1/span 2"
            : "auto"
        }`,
      }}
    >
      <StyledTitleTypography variant="h4">
        Vocab Fill in Blank Answers
      </StyledTitleTypography>
      {renderReadyVocabFillInBlankAnswers}
    </AnswerBlock>
  );
  /// Handeling Conjugation
  let renderReadyConjugationAnswers: any[] = [];

  if (userSelectedConjugationGrouping.length !== 0) {
    const copyOfConjugationAnswerKey: { [key: string]: string[] } = JSON.parse(
      JSON.stringify(conjugationAnswerKey)
    );
    const frenchKeys = Object.keys(copyOfConjugationAnswerKey);
    renderReadyConjugationAnswers = frenchKeys.map(
      (key: string, parentIndex: number) => {
        const answersArray = copyOfConjugationAnswerKey[key];

        const renderReadyAnswers = answersArray.map(
          (answer: string, index: number) => {
            return (
              <ConjugationAnswerContainer
                key={`${answer} ${index} Conjugations`}
              >
                <StyledAnswerTypography
                  sx={{
                    textAlign: "left",
                    padding: "0px",
                    gridColumn: "1/span 1",
                    gridRow: "1 / span 1",
                  }}
                >
                  {index + 1 + parentIndex * 8}.
                </StyledAnswerTypography>
                <StyledAnswerTypography
                  sx={{
                    textAlign: "left",
                    padding: "0px",
                    gridColumn: "2/span 1 !important",
                    gridRow: "1 / span 1",
                    wordBreak: "break-all",
                  }}
                >
                  {answer}
                </StyledAnswerTypography>
              </ConjugationAnswerContainer>
            );
          }
        );

        if (userSelectedConjugationGrouping === "By Verb") {
          return (
            <AnswerBlock
              key={`By verb ${parentIndex}`}
              sx={{
                alignItems: "center",
                justifyItems: "space-between",
                gap: "30px",
                "@media(max-width:880px)": {
                  justifyItems: "center !important",
                  gap: "15px",
                  paddingRight: "0px",
                },
              }}
            >
              <StyledTitleTypography
                variant="h4"
                sx={{
                  textAlign: "center",
                  paddingRight: "30px",
                  "@media(max-width:880px)": {
                    textAlign: "center",
                    fontSize: "22px",
                    paddingRight: "0px",
                  },
                }}
              >
                {key}
              </StyledTitleTypography>
              {renderReadyAnswers}
            </AnswerBlock>
          );
        } else {
          return (
            <AnswerBlock key={`Random ${parentIndex}`} sx={{ gap: "30px" }}>
              {renderReadyAnswers}
            </AnswerBlock>
          );
        }
      }
    );
  }
  if (renderReadyConjugationAnswers.length % 2 === 1 && !singleColumnActivate) {
    const lastEntry =
      renderReadyConjugationAnswers[renderReadyConjugationAnswers.length - 1];

    renderReadyConjugationAnswers[renderReadyConjugationAnswers.length - 1] = (
      <SingleItemRowContainer
        sx={{
          gridColumn: "1/span 2",
        }}
        key="last entry"
      >
        {lastEntry}
      </SingleItemRowContainer>
    );
  }

  const renderReadyConjugationAnswersBlock = (
    <AnswerBlock
      sx={{
        gridColumn: "1 /span 2",
        justifySelf: "center",
        "@media(max-width:1280px)": {
          gridColumn: "1 / span 2",
        },
        "@media(max-width:880px)": {
          gridTemplateColumns: "max-content",
          gridColumn: "1 / span 1",
        },
      }}
    >
      <StyledTitleTypography
        variant="h4"
        sx={{
          textAlign: "center",
          justifySelf: "center",
          marginBottom: "10px",
        }}
      >
        Conjugation Answers
      </StyledTitleTypography>
      {renderReadyConjugationAnswers}
    </AnswerBlock>
  );
  /// Handeling Phrases Answers
  const renderReadyPhraseMultipleChoiceAnswers = AnswerBlockCreator(
    phrasesMultipleChoiceAnswerKey
  );

  const renderReadyPhrasesMatchingAnswers = AnswerBlockCreator(
    phrasesMatchingAnswerKey
  );

  const renderReadyPhrasesFillInBlankAnswers = AnswerBlockCreator(
    phrasesFillInTheBlankAnswerKey
  );

  // Creating the Vocab Blocks
  const renderReadyPhrasesMultipleChoiceAnswersBlock = (
    <AnswerBlock
      sx={{
        gridColumn: `${
          lastActiveAnswerKey === "phrasesMultipleChoiceAnswerKey" &&
          !singleColumnActivate
            ? "1/span 2"
            : "auto"
        }`,
      }}
    >
      <StyledTitleTypography variant="h4">
        Phrases Multiple Choice Answers
      </StyledTitleTypography>
      {renderReadyPhraseMultipleChoiceAnswers}
    </AnswerBlock>
  );
  const renderReadyPhrasesMatchingAnswersBlock = (
    <AnswerBlock
      sx={{
        gridColumn: `${
          lastActiveAnswerKey === "phrasesMatchingAnswerKey" &&
          !singleColumnActivate
            ? "1/span 2"
            : "auto"
        }`,
      }}
    >
      <StyledTitleTypography variant="h4">
        Phrases Matching Answers
      </StyledTitleTypography>
      {renderReadyPhrasesMatchingAnswers}
    </AnswerBlock>
  );
  const renderReadyPhrasesFillInBlankAnswersBlock = (
    <AnswerBlock
      sx={{
        gridColumn: `${
          lastActiveAnswerKey === "phrasesFillInTheBlankAnswerKey" &&
          !singleColumnActivate
            ? "1/span 2"
            : "auto"
        }`,
      }}
    >
      <StyledTitleTypography variant="h4">
        Phrases Fill in Blank Answers
      </StyledTitleTypography>
      {renderReadyPhrasesFillInBlankAnswers}
    </AnswerBlock>
  );

  return (
    <AnswerOverAllContainer>
      <AnswerSectionTitle variant="h4">Answer Key</AnswerSectionTitle>
      {vocabMultipleChoiceAnswerKey.length !== 0 &&
        renderReadyVocabMultipleChoiceAnswersBlock}
      {vocabMatchingAnswerKey.length !== 0 &&
        renderReadyVocabMatchingAnswersBlock}
      {vocabFillInTheBlankAnswerKey.length !== 0 &&
        renderReadyVocabFillInBlankAnswersBlock}

      {phrasesMultipleChoiceAnswerKey.length !== 0 &&
        renderReadyPhrasesMultipleChoiceAnswersBlock}
      {phrasesMatchingAnswerKey.length !== 0 &&
        renderReadyPhrasesMatchingAnswersBlock}
      {phrasesFillInTheBlankAnswerKey.length !== 0 &&
        renderReadyPhrasesFillInBlankAnswersBlock}
      {conjugationAnswerKey.length !== 0 && renderReadyConjugationAnswersBlock}
    </AnswerOverAllContainer>
  );
};
export default AnswerKey;
