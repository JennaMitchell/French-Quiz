import { styled } from "@mui/material/styles";

const QuestionContainer = styled("div", {
  name: "QuestionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(320px,320px)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: theme.palette.secondary.dark,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
}));

const QuestionTitle = styled("div", {
  name: "QuestionTitle",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: theme.palette.secondary.dark,
  textAlign: "center",
  fontSize: "26px",
  marginBottom: "10px",
  paddingRight: "80px",
  textTransform: "capitalize",
}));
const QuestionAnswerBlock = styled("div", {
  name: "QuestionAnswerBlock",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: "inherit",
  display: "grid",
  gridTemplateRows: "repeat(2,1fr)",
  gridTemplateColumns: "repeat(2,1fr)",
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "20px",
}));

const QuestionAnswer = styled("div", {
  name: "QuestionAnswer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: theme.palette.secondary.dark,
  display: "grid",
  gridTemplateRows: "max-content max-content",
  gridTemplateColumns: "max-content",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "20px",
  textAlign: "left",
  textTransform: "lowercase",
}));

const PhraseQuestionContainer = styled("div", {
  name: "PhraseQuestionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(540px,540px)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: theme.palette.secondary.dark,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
}));

export {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
  PhraseQuestionContainer,
};
