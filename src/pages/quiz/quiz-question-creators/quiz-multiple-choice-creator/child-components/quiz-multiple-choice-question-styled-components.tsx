import { styled } from "@mui/material/styles";

const QuestionContainer = styled("div", {
  name: "QuestionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(640px,640px)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.light,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  justifySelf: "center",
  marginTop: "20px",
  boxShadow: "0 0 20px black",
  padding: "40px",
  borderRadius: "10px",
  position: "relative",
  "@media(max-width:670px)": {
    width: "max(550px,550px)",
    padding: "20px",
  },
  "@media(max-width:585px)": {
    width: "max(450px,450px)",
  },
  "@media(max-width:480px)": {
    width: "max(350px,350px)",
    padding: "10px 20px 10px 20px",
  },
  "@media(max-width:375px)": {
    width: "max(300px,300px)",
  },
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
  color: theme.palette.secondary.light,
  textAlign: "center",
  fontSize: "36px",
  marginBottom: "40px",
  textTransform: "capitalize",
  fontFamily: "Montserrat, sans-serif",
  "@media(max-width:670px)": { marginBottom: "20px" },
  "@media(max-width:585px)": {
    fontSize: "28px",
  },
  "@media(max-width:480px)": {
    fontSize: "20px",
    marginBottom: "10px",
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
  gridTemplateRows: "repeat(2,1fr)",
  gridTemplateColumns: "repeat(2,1fr)",
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "20px",
}));

const QuestionAnswer = styled("button", {
  name: "QuestionAnswer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "100%",
  maxHeight: "100%",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  display: "grid",
  gridTemplateRows: "100%",
  gridTemplateColumns: "max-content 1fr",
  columnGap: "10px",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "20px",
  textAlign: "left",
  position: "relative",

  padding: "10px",
  borderRadius: "5px",
  transition: "all 0.5s",
  border: "1px solid",
  borderColor: theme.palette.secondary.main,
  "&:hover": {
    borderColor: theme.palette.secondary.light,
  },
}));

const QuestionTypography = styled("p", {
  name: "QuestionTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "100%",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  fontSize: "20px",
  textAlign: "left",
  fontFamily: "Montserrat, sans-serif",
  "@media(max-width:585px)": {
    fontSize: "16px",
  },
  "@media(max-width:480px)": {
    fontSize: "12px",
  },
}));

export {
  QuestionContainer,
  QuestionTitle,
  QuestionAnswerBlock,
  QuestionAnswer,
  QuestionTypography,
};
