import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";
const TopContainer = styled("div", {
  name: "TopContainer",
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
  position: "relative",
}));

const QuestionContainer = styled("div", {
  name: "QuestionContainer",
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
  position: "relative",

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
  fontSize: "24px",
  textAlign: "left",
}));

const StyledTextField = styled(TextField, {
  name: "StyledTextField",
  slot: "Wrapper",
})(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.secondary.main,
      color: theme.palette.secondary.light,
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.secondary.light,
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

const TitleText = styled("p", {
  name: "TitleText ",
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
const QuestionNumberBox = styled("div", {
  name: "QuestionNumberBox",
  slot: "Wrapper",
})(({ theme }) => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  padding: "5px",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.light,
  textSize: "16px",
  position: "absolute",
  top: "15px",
  right: "15px",
}));
export {
  TopContainer,
  QuestionContainer,
  QuestionTypography,
  StyledTextField,
  TitleText,
  QuestionNumberBox,
};
