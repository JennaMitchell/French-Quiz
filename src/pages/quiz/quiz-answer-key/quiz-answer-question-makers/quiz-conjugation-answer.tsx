import { useAppSelector } from "../../../../store/hooks";

import { capitalizeFirstLetter } from "../../../../components/functions/generic-functions";

import {
  TopContainer,
  QuestionContainer,
  QuestionTypography,
  TitleText,
  StyledTextField,
  QuestionNumberBox,
} from "../../quiz-question-creators/shared-styles/quiz-shared-styled-components";
import { arrayComparer } from "../../../../components/functions/generic-functions";
import { styled } from "@mui/material";
import { UserSelectedData } from "../../../../store/quiz-store-slice";
interface setupDatabase {
  verb: string;
  prefix: string;
  conjugation: string;
}
const CorrectAnswerText = styled("p", {
  name: "IncorrectAnswerText",
  slot: "Wrapper",
})(({ theme }) => ({
  backgroundColor: "inherit",
  color: "rgb(67, 239, 76)",
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  height: "max-content",
  padding: "2px 10px",
  textAlign: "center",
  position: "absolute",
  top: "-2.5%",
  right: "20px",
  translate: "0% -50%",
  fontSize: "20px",
  zIndex: "2",
  "@media(max-width:480px)": {
    fontSize: "14px",
    right: "10px",
    padding: "2.5px",
  },
  "@media(max-width:375px)": {
    fontSize: "12px",
  },
}));
const QuizConjugationAnswered = () => {
  const userQuizQuestionSetup = useAppSelector(
    (state) => state.quizStore.userQuizQuestionSetup
  );
  const quizConjugationTerms = useAppSelector(
    (state) => state.quizStore.quizConjugationTerms
  );
  const conjugationAnswerKey = useAppSelector(
    (state) => state.quizStore.conjugationAnswerKey
  );
  const userSelectedConjugationAnswers = useAppSelector(
    (state) => state.quizStore.userSelectedConjugationAnswers
  );

  const userSelectedQuizConjugationGrouping = useAppSelector(
    (state) => state.quizStore.userSelectedQuizConjugationGrouping
  );
  const userSelectedQuizConjugations: UserSelectedData[] = useAppSelector(
    (state) => state.quizStore.userSelectedQuizConjugations
  );
  const totalNumberOfQuestions = useAppSelector(
    (state) => state.quizStore.totalNumberOfQuestions
  );

  const comparedConjugationsArray = arrayComparer(
    conjugationAnswerKey,
    userSelectedConjugationAnswers
  );

  const totalnumberOfVocabQuestions =
    userQuizQuestionSetup.numberOfTotalVocabNPhraseQuestions;

  let finalRenderReadyItems: JSX.Element[] | JSX.Element = [];
  let tempRenderReadyItems: JSX.Element[] = [];
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

  if (userSelectedQuizConjugationGrouping === "Random") {
    finalRenderReadyItems = quizConjugationTerms.map(
      (inputobject: setupDatabase, index: number) => {
        return (
          <QuestionContainer key={`Question ${index}`}>
            {!comparedConjugationsArray[index] && (
              <CorrectAnswerText>
                {conjugationAnswerKey[index]}
              </CorrectAnswerText>
            )}
            <QuestionTypography>
              {capitalizeFirstLetter(inputobject.prefix)} "
              {inputobject.verb.toLocaleLowerCase()}"
            </QuestionTypography>
            <StyledTextField
              id={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
              label={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
              variant="outlined"
              multiline
              disabled
              value={userSelectedConjugationAnswers[index]}
              sx={{
                ".css-itfxkg-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: `${
                      comparedConjugationsArray[index]
                        ? "rgb(67, 239, 76)"
                        : "rgb(255, 17, 0)"
                    }`,
                  },
                ".MuiOutlinedInput-root .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
                  {
                    color: `${
                      comparedConjugationsArray[index]
                        ? "rgb(67, 239, 76)"
                        : "rgb(255, 17, 0)"
                    }`,
                    WebkitTextFillColor: `${
                      comparedConjugationsArray[index]
                        ? "rgb(67, 239, 76)"
                        : "rgb(255, 17, 0)"
                    }`,
                    textDecoration: `${
                      !comparedConjugationsArray[index] && "line-through"
                    }`,
                    textDecorationColor: `${
                      !comparedConjugationsArray[index] && "rgb(255, 17, 0)"
                    }`,
                    textDecorationThickness: `${
                      !comparedConjugationsArray[index] && "2px"
                    }`,
                  },

                ".MuiOutlinedInput-root ": {
                  "&:hover fieldset": {
                    borderColor: `${
                      comparedConjugationsArray[index]
                        ? "rgb(67, 239, 76)"
                        : "rgb(255, 17, 0)"
                    }`,
                  },
                },
                "&.MuiTextField-root .MuiInputLabel-root": {
                  color: `${
                    comparedConjugationsArray[index]
                      ? "rgb(67, 239, 76)"
                      : "rgb(255, 17, 0)"
                  }`,
                },
              }}
            />
          </QuestionContainer>
        );
      }
    );
  } else {
    tempRenderReadyItems = quizConjugationTerms.map(
      (inputobject: setupDatabase, index: number) => {
        return (
          <QuestionContainer key={`Question ${index}`}>
            {!comparedConjugationsArray[index] && (
              <CorrectAnswerText>
                {conjugationAnswerKey[index]}
              </CorrectAnswerText>
            )}
            <QuestionTypography>
              {capitalizeFirstLetter(inputobject.prefix)} "
              {inputobject.verb.toLocaleLowerCase()}"
            </QuestionTypography>
            <StyledTextField
              id={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
              label={`answer-${index + 1 + totalnumberOfVocabQuestions}`}
              variant="outlined"
              multiline
              disabled
              value={userSelectedConjugationAnswers[index]}
              sx={{
                ".css-itfxkg-MuiInputBase-root-MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline":
                  {
                    borderColor: `${
                      comparedConjugationsArray[index]
                        ? "rgb(67, 239, 76)"
                        : "rgb(255, 17, 0)"
                    }`,
                  },
                ".MuiOutlinedInput-root .css-1sqnrkk-MuiInputBase-input-MuiOutlinedInput-input.Mui-disabled":
                  {
                    color: `${
                      comparedConjugationsArray[index]
                        ? "rgb(67, 239, 76)"
                        : "rgb(255, 17, 0)"
                    }`,
                    WebkitTextFillColor: `${
                      comparedConjugationsArray[index]
                        ? "rgb(67, 239, 76)"
                        : "rgb(255, 17, 0)"
                    }`,
                    textDecoration: `${
                      !comparedConjugationsArray[index] && "line-through"
                    }`,
                    textDecorationColor: `${
                      !comparedConjugationsArray[index] && "rgb(255, 17, 0)"
                    }`,
                    textDecorationThickness: `${
                      !comparedConjugationsArray[index] && "2px"
                    }`,
                  },

                ".MuiOutlinedInput-root ": {
                  "&:hover fieldset": {
                    borderColor: `${
                      comparedConjugationsArray[index]
                        ? "rgb(67, 239, 76)"
                        : "rgb(255, 17, 0)"
                    }`,
                  },
                },
                "&.MuiTextField-root .MuiInputLabel-root": {
                  color: `${
                    comparedConjugationsArray[index]
                      ? "rgb(67, 239, 76)"
                      : "rgb(255, 17, 0)"
                  }`,
                },
              }}
            />
          </QuestionContainer>
        );
      }
    );
  }

  // Grouping By Verb if Group berb grouping is selected

  if (userSelectedQuizConjugationGrouping !== "Random") {
    const numberOfIterations = userSelectedQuizConjugations.length;
    let tempJSXArray = [];
    finalRenderReadyItems = [];
    for (
      let indexOfGrouping = 0;
      indexOfGrouping < numberOfIterations * arrayOfConjugationTableKeys.length;
      indexOfGrouping++
    ) {
      tempJSXArray.push(tempRenderReadyItems[indexOfGrouping]);

      if ((indexOfGrouping + 1) % arrayOfConjugationTableKeys.length === 0) {
        const indexOfVerb =
          (indexOfGrouping + 1) / arrayOfConjugationTableKeys.length - 1;
        const titleVerb = userSelectedQuizConjugations[indexOfVerb].french;

        finalRenderReadyItems.push(
          <TopContainer
            key={`Top Container ${indexOfGrouping}`}
            id={`grouping-${(indexOfGrouping + 1) / 8}`}
          >
            <QuestionNumberBox>
              {totalnumberOfVocabQuestions + indexOfGrouping + 2 - 8} -{"  "}
              {totalnumberOfVocabQuestions + indexOfGrouping + 1} of {"  "}
              {totalNumberOfQuestions}
            </QuestionNumberBox>
            <TitleText sx={{ paddingBottom: "0px", paddingTop: "0px" }}>
              Conjugate "{titleVerb}"
            </TitleText>
            {tempJSXArray}
          </TopContainer>
        );
        tempJSXArray = [];
      }
    }
  } else {
    // Random Selection
    finalRenderReadyItems = (
      <TopContainer key={`Top Container`} id={"grouping-1"}>
        <QuestionNumberBox>
          {totalnumberOfVocabQuestions + 1} -{"  "}
          {totalnumberOfVocabQuestions +
            userSelectedQuizConjugations.length * 8}{" "}
          of{"  "}
          {totalNumberOfQuestions}
        </QuestionNumberBox>
        {finalRenderReadyItems}
      </TopContainer>
    );
  }

  return <>{finalRenderReadyItems}</>;
};

export default QuizConjugationAnswered;
