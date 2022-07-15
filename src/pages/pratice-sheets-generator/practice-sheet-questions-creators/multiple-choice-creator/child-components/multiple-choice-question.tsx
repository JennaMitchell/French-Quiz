import {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
} from "./multiple-choice-question-styled-components";

type Props = {
  mixedQuestions: string[];
  title: string;
};
const MultipleChoiceQuestion = ({ mixedQuestions, title }: Props) => {
  /// Mixing the wrong Answers with the Correct Answers
  // via random numbers

  return (
    <QuestionContainer>
      <QuestionTitle>{title}</QuestionTitle>
      <QuestionAnswerBlock>
        <QuestionAnswer>{mixedQuestions[0]}</QuestionAnswer>
        <QuestionAnswer>{mixedQuestions[1]}</QuestionAnswer>
        <QuestionAnswer>{mixedQuestions[2]}</QuestionAnswer>
        <QuestionAnswer>{mixedQuestions[3]}</QuestionAnswer>
      </QuestionAnswerBlock>
    </QuestionContainer>
  );
};
export default MultipleChoiceQuestion;
