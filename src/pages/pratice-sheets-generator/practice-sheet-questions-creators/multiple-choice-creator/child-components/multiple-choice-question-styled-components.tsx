import { styled } from "@mui/material/styles";

const QuestionContainer = styled("div", {
  name: "QuestionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "min(max-content,320px)",
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
  "@media(max-width:880px)": {
    justifySelf: "center",
  },
  "@media(max-width:560px)": {
    width: "max(230px,230px)",
  },
}));

const QuestionTitle = styled("div", {
  name: "QuestionTitle",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "min(max-content,max-content)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: theme.palette.secondary.dark,
  textAlign: "center",
  fontSize: "26px",
  marginBottom: "10px",
  justifySelf: "center",

  textTransform: "capitalize",
  fontFamily: "Montserrat, sans-serif",
  "@media(max-width:560px)": {
    fontSize: "18px",
    width: "min(max-content,200px)",
  },
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
  gridTemplateRows: "max-content max-content",
  gridTemplateColumns: "max-content max-content",
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "20px",
}));

const QuestionAnswer = styled("p", {
  name: "QuestionAnswer",
  slot: "Wrapper",
})(({ theme }) => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "100px",

  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: theme.palette.secondary.dark,
  fontSize: "20px",
  textAlign: "left",
  textTransform: "lowercase",
  fontFamily: "Montserrat, sans-serif",
  "@media(max-width:560px)": {
    fontSize: "12px",
    width: "140px !important",
  },
}));

const PhraseQuestionContainer = styled("div", {
  name: "PhraseQuestionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "min(max-content,600px)",

  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: theme.palette.secondary.dark,
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
  "@media(max-width:1280px)": {
    width: "min(max-content,300px)",
  },
  "@media(max-width:880px)": {
    justifySelf: "center",
  },
  "@media(max-width:560px)": {
    width: "min(max-content,100px)",
  },
}));

const PhraseQuestionAnswerBlock = styled("div", {
  name: "PhraseQuestionAnswerBlock",
  slot: "Wrapper",
})(() => ({
  minWidth: "max-content",
  width: "min(max-content,600px)",
  maxWidth: "600px",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: "inherit",
  display: "grid",
  gridTemplateRows: "max-content max-content",
  gridTemplateColumns: "min(max-content,250px) min(max-content,200px)",
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "20px",
  "@media(max-width:1280px)": {
    width: "min(max-content,300px)",

    gridTemplateRows: "max-content max-content",
    gridTemplateColumns: "min(max-content,140px) min(max-content,140px)",
  },
  "@media(max-width:880px)": {
    width: "min(max-content,200px)",

    gridTemplateRows: "max-content max-content",
    gridTemplateColumns: "min(max-content,100px) min(max-content,100px)",
    justifySelf: "center",
  },
  "@media(max-width:560px)": {
    width: "min(max-content,28s0px)",
    gridTemplateColumns: "min(max-content,100px) min(max-content,100px)",
  },
}));

const PhraseQuestionAnswer = styled("div", {
  name: "PhraseQuestionAnswer",
  slot: "Wrapper",
})(({ theme }) => ({
  display: "inline-block",

  width: "min(200px,max-content)",

  height: "max-content",

  backgroundColor: "inherit",
  color: theme.palette.secondary.dark,
  fontSize: "16px",
  textAlign: "left",
  textTransform: "lowercase",
  fontFamily: "Montserrat, sans-serif",
  wordWrap: "break-word",
  "@media(max-width:1280px)": {
    width: "min(170px,max-content)",
  },
  "@media(max-width:560px)": {
    fontSize: "12px",
    width: "min(100px,100px) !important",
  },
}));
export {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
  PhraseQuestionContainer,
  PhraseQuestionAnswer,
  PhraseQuestionAnswerBlock,
};
