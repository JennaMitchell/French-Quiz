import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
const FillInBlankTopContainer = styled("div", {
  name: "FillInBlankContainer",
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
  marginTop: "20px",
  boxShadow: "0 0 20px black",
  padding: "40px",
  borderRadius: "10px",
}));

const FillInBlankQuestionContainer = styled("div", {
  name: "FillInBlankQuestionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.light,
  display: "grid",
  gridTemplateColumns: "1fr  1fr",
  gridTemplateRows: "max-content",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",

  columnGap: "40px",
  borderRadius: "10px",
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
}));

const StyledTextField = styled(TextField, {
  name: "StyledTextField",
  slot: "Wrapper",
})(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.secondary.light,
      color: theme.palette.secondary.light,
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgb(98, 249, 98)",
    },
  },
  "&.MuiTextField-root .css-itfxkg-MuiInputBase-root-MuiOutlinedInput-root": {
    fontSize: "20px",
    textAlign: "left",
    color: theme.palette.secondary.light,
  },
  "&.MuiTextField-root .MuiInputLabel-root": {
    color: theme.palette.secondary.light,
    paddingTop: "2px",
  },
}));

const FillInBlankTitle = styled("p", {
  name: "FillInBlankTitle",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  fontSize: "36px",
  textAlign: "center",
  gridColumn: "1/span 2",
  marginBottom: "20px",
}));

export {
  FillInBlankQuestionContainer,
  FillInBlankTopContainer,
  QuestionTypography,
  StyledTextField,
  FillInBlankTitle,
};
