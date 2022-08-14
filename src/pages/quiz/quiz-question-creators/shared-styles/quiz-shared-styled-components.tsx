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
  display: "grid",
  gridTemplateRows: "max-content",
  gridTemplateColumns: "100%",

  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
  boxShadow: "0 0 20px black",
  padding: "40px",
  borderRadius: "10px",
  position: "relative",
  justifySelf: "center",
  "@media(max-width:670px)": {
    width: "max(550px,550px)",
  },
  "@media(max-width:580px)": {
    width: "max(450px,450px)",
    padding: "20px",
  },
  "@media(max-width:480px)": {
    width: "max(350px,350px)",
    padding: "10px",
  },
  "@media(max-width:375px)": {
    width: "max(300px,300px)",
    padding: "10px",
  },
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
  fontFamily: "Montserrat, sans-serif",
  "@media(max-width:480px)": {
    fontSize: "16px",
    padding: "0 10px 0 10px",
  },
  "@media(max-width:375px)": {
    fontSize: "12px",
  },
}));

const StyledTextField = styled(TextField, {
  name: "StyledTextField",
  slot: "Wrapper",
})(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
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
    "@media(max-width:480px)": {
      fontSize: "16px",
    },
    "@media(max-width:375px)": {
      fontSize: "12px",
    },
  },
  "&.MuiTextField-root .MuiInputLabel-root": {
    color: theme.palette.secondary.light,
    paddingTop: "2px",
    "@media(max-width:480px)": {
      fontSize: "16px",
    },
    "@media(max-width:375px)": {
      fontSize: "12px",
    },
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

  marginBottom: "20px",
  fontFamily: "Montserrat, sans-serif",
  "@media(max-width:585px)": {
    fontSize: "28px",
    marginTop: "20px",
    marginBottom: "0px",
  },
  "@media(max-width:480px)": {
    fontSize: "20px",
    marginTop: "20px",
  },
}));
const QuestionNumberBox = styled("div", {
  name: "QuestionNumberBox",
  slot: "Wrapper",
})(({ theme }) => ({
  fontFamily: "Montserrat, sans-serif",
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
  "@media(max-width:585px)": {
    top: "10px",
  },
  "@media(max-width:480px)": {
    fontSize: "12px",
    top: "5px",
    right: "10px",
  },
}));
export {
  TopContainer,
  QuestionContainer,
  QuestionTypography,
  StyledTextField,
  TitleText,
  QuestionNumberBox,
};
