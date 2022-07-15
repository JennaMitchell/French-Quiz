import { styled } from "@mui/material/styles";

const QuestionContainer = styled("div", {
  name: "QuestionContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(400px,400px)",
  minHeight: "200px",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: "inherit",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const QuestionTitle = styled("div", {
  name: "QuestionTitle",
  slot: "Wrapper",
})(() => ({
  width: "max(200px,200px)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: "inherit",
  textAlign: "center",
  fontSize: "26px",
}));
const QuestionAnswerBlock = styled("div", {
  name: "QuestionAnswerBlock",
  slot: "Wrapper",
})(() => ({
  width: "max(90%,90%)",
  minHeight: "200px",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: "inherit",
  display: "grid",
  gridTemplateRows: "max-content max-content",
  gridTemplateColumns: "max-content max-content",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "20px",
}));

const QuestionAnswer = styled("div", {
  name: "QuestionAnswer",
  slot: "Wrapper",
})(() => ({
  width: "max(100px,100px)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: "inherit",
  display: "grid",
  gridTemplateRows: "max-content max-content",
  gridTemplateColumns: "100%",
  alignItems: "center",
  justifyContent: "space-between",
}));
export {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
};
