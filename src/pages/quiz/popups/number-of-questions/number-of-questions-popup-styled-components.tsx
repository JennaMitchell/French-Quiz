import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

// import CheckIcon from "@mui/icons-material/Check";
const StyledSelect = styled("select", {
  name: "StyledSelect",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(45px,45px)",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  textAlign: "right",
  fontSize: "20px",
  border: "none",
}));
const StyledOption = styled("option", {
  name: "StyledOption ",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(45px,45px)",
  textAlign: "right",
  height: "max(max-content,max-content)",
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.light,
  fontSize: "20px",
  border: "none",
}));

const StyledTypography = styled(Typography, {
  name: "StyledTypography",
  slot: "Wrapper",
})({
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: "inherit",
});
const StyledTitleTypography = styled(Typography, {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  fontSize: "20px",
}));

const OptionContainer = styled("div", {
  name: "OptionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  display: "grid",
  justifyContent: "space-between",

  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  gridTemplateColumns: "max-content max-content",
  color: theme.palette.secondary.light,
}));
const SelectionContainer = styled("div", {
  name: "SelectionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  display: "grid",
  gridTemplateRows: "max-content",
  gridTemplateColumns: "max-content max-content",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  marginTop: "2.5px",
  marginBottom: "2.5px",
  borderRadius: "2px",
}));

// const SelectAllSectionVocabButton = styled("div", {
//   name: "SelectedAllSectionVocabButton",
//   slot: "Wrapper",
// })(({ theme }) => ({
//   width: "max(20px,20px)",
//   height: "max(20px,20px)",
//   backgroundColor: theme.palette.secondary.light,
//   display: "grid",
//   alignItems: "center",
//   justifyContent: "center",
//   position: "relative",
//   "&:hover": {
//     backgroundColor: theme.palette.primary.light,
//     border: "1px solid",
//     borderColor: theme.palette.secondary.dark,
//   },
// }));

// const StyledCheckMark = styled(CheckIcon, {
//   name: "StyledCheckedMark",
//   slot: "Wrapper",
// })(({ theme }) => ({
//   width: "max(80%,80%)",
//   height: "max(80%,80%)",
//   color: theme.palette.secondary.dark,
//   position: "relative",
// }));

export {
  StyledOption,
  StyledTypography,
  StyledTitleTypography,
  StyledSelect,
  OptionContainer,
  SelectionContainer,
};
