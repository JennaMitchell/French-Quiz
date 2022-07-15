import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import {
  PopupActionButton,
  PopupDisabledActionButton,
} from "../../../../components/generic-components/generic-popup-components";

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

const ActionButton = styled(PopupActionButton, {
  name: "ActionButton",
  slot: "Wrapper",
})({
  fontSize: "20px",
  width: "max(90px,90px)",
  height: "max(60px,60px)",
  textAlign: "center",
  borderRadius: "10px",
});

const DisabledActionButton = styled(PopupDisabledActionButton, {
  name: "DisabledActionButton",
  slot: "Wrapper",
})({
  fontSize: "20px",
  width: "max(90px,90px)",
  height: "max(60px,60px)",
  textAlign: "center",
  borderRadius: "10px",
});

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
export {
  StyledOption,
  StyledTypography,
  StyledTitleTypography,
  StyledSelect,
  ActionButton,
  OptionContainer,
  DisabledActionButton,
  SelectionContainer,
};
