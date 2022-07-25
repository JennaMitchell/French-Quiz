import {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
  PhraseQuestionContainer,
} from "./multiple-choice-question-styled-components";

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
  /// Mixing the wrong Answers with the Correct Answers
  // via random numbers

  return (
    <>
      {databaseType !== "Phrases" && (
        <QuestionContainer>
          <QuestionTitle>
            {questionNumber + 1}. {title}
          </QuestionTitle>
          <QuestionAnswerBlock>
            <QuestionAnswer>A. {mixedQuestions[0]}</QuestionAnswer>
            <QuestionAnswer>B. {mixedQuestions[1]}</QuestionAnswer>
            <QuestionAnswer>C. {mixedQuestions[2]}</QuestionAnswer>
            <QuestionAnswer>D. {mixedQuestions[3]}</QuestionAnswer>
          </QuestionAnswerBlock>
        </QuestionContainer>
      )}
      {databaseType === "Phrases" && (
        <PhraseQuestionContainer>
          <QuestionTitle>
            {questionNumber + 1}. {title}
          </QuestionTitle>
          <QuestionAnswerBlock>
            <QuestionAnswer>A. {mixedQuestions[0]}</QuestionAnswer>
            <QuestionAnswer>B. {mixedQuestions[1]}</QuestionAnswer>
            <QuestionAnswer>C. {mixedQuestions[2]}</QuestionAnswer>
            <QuestionAnswer>D. {mixedQuestions[3]}</QuestionAnswer>
          </QuestionAnswerBlock>
        </PhraseQuestionContainer>
      )}
    </>
  );
};
export default MultipleChoiceQuestion;
