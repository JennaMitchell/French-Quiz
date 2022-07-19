import {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
} from "./multiple-choice-question-styled-components";

type Props = {
  mixedQuestions: string[];
  title: string;
  questionNumber: number;
};
const MultipleChoiceQuestion = ({
  mixedQuestions,
  title,
  questionNumber,
}: Props) => {
  /// Mixing the wrong Answers with the Correct Answers
  // via random numbers

  return (
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
  );
};
export default MultipleChoiceQuestion;
