import { styled } from "@mui/material/styles";

import { Typography } from "@mui/material";
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

const ButtonsContainer = styled("div", {
  name: "ButtonsContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  height: "max(max-content,max-content)",
  display: "grid",
  gridTemplateColumns: "max-content max-content",
  gap: "10px",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "primary.main",
  padding: "20px 0px 0px 0px",

  "@media(max-width:475px)": {},
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
export {
  ButtonsContainer,
  StyledSelect,
  StyledOption,
  OptionContainer,
  StyledTitleTypography,
};
