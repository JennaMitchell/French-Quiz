import {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
  PhraseQuestionContainer,
  PhraseQuestionAnswer,
  PhraseQuestionAnswerBlock,
} from "./multiple-choice-question-styled-components";
import { useMediaQuery } from "@mui/material";

type Props = {
  mixedQuestions: string[];
  title: string;
  questionNumber: number;
  databaseType: string;
};
const MultipleChoiceQuestion = ({
  mixedQuestions,
  title,
  questionNumber,
  databaseType,
}: Props) => {
  const singleColumnActivate = useMediaQuery("(max-width:880px)");

  return (
    <>
      {databaseType !== "Phrases" && (
        <QuestionContainer key={`${databaseType} ${questionNumber}`}>
          <QuestionTitle>
            {questionNumber + 1}. {title}
          </QuestionTitle>
          <QuestionAnswerBlock>
            <QuestionAnswer>{`A. ${mixedQuestions[0]}`}</QuestionAnswer>
            <QuestionAnswer>{`B. ${mixedQuestions[1]}`}</QuestionAnswer>
            <QuestionAnswer>{`C. ${mixedQuestions[2]}`}</QuestionAnswer>
            <QuestionAnswer>{`D. ${mixedQuestions[3]}`}</QuestionAnswer>
          </QuestionAnswerBlock>
        </QuestionContainer>
      )}

      {databaseType === "Phrases" && (
        <PhraseQuestionContainer
          sx={{
            columnGap: "20px",
            paddingRight: `${
              questionNumber + (1 % 2) === 1 && !singleColumnActivate && "80px"
            }`,
          }}
          key={`${databaseType} ${questionNumber}`}
        >
          <QuestionTitle>
            {questionNumber + 1}. {title}
          </QuestionTitle>
          <PhraseQuestionAnswerBlock>
            <PhraseQuestionAnswer
              sx={{ gridColumn: "1/span 1", gridRow: "1/span 1" }}
            >
              {`A. ${mixedQuestions[0]}`}
            </PhraseQuestionAnswer>
            <PhraseQuestionAnswer
              sx={{ gridColumn: "2/span 1", gridRow: "1/span 1" }}
            >
              {`B. ${mixedQuestions[1]}`}
            </PhraseQuestionAnswer>
            <PhraseQuestionAnswer
              sx={{ gridColumn: "1/span 1", gridRow: "2/span 1" }}
            >
              {`C. ${mixedQuestions[2]}`}
            </PhraseQuestionAnswer>
            <PhraseQuestionAnswer
              sx={{ gridColumn: "2/span 1", gridRow: "2/span 1" }}
            >
              {`D. ${mixedQuestions[3]}`}
            </PhraseQuestionAnswer>
          </PhraseQuestionAnswerBlock>
        </PhraseQuestionContainer>
      )}
    </>
  );
};
export default MultipleChoiceQuestion;
