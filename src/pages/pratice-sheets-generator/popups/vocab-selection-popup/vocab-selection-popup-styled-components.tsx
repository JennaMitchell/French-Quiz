import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";
import {
  PopupActionButton,
  PopupDisabledActionButton,
} from "../../../../components/generic-components/generic-popup-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

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

const VocabContainer = styled("div", {
  name: "VocabContainer",
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
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
  },
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

const DropDownButton = styled("button", {
  name: "DropDownButton",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(310px,310px)",

  height: "max(max-content,max-content)",
  backgroundColor: theme.palette.primary.dark,
  border: "1px solid black",
  fontSize: "22px",
  color: theme.palette.secondary.light,
  overflow: "hidden",
  position: "relative",
  textAlign: "left",
  padding: "5px 0 5px 20px",
  marginTop: "10px",
  marginBottom: "0px",
}));
const DropDownSelectionMenu = styled("div", {
  name: "DropDownSelectionMenu",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(300px,300px)",
  display: "grid",
  justifyContent: "space-between",
  gridTemplateColumns: "100%",
  height: "max(max-content,max-content)",
  padding: "5px 10px 5px 10px",
  backgroundColor: theme.palette.secondary.dark,
  fontSize: "18px",
  placeItems: "center",
  color: theme.palette.secondary.light,
  position: "relative",
  borderEndEndRadius: "5px",
  borderEndStartRadius: "5px",
}));

const DropDownDownArrow = styled(ArrowDropDownIcon, {
  name: "DropDownDownArrow",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  position: "absolute",
  top: "5px",
  right: "5px",
}));
const DropDownUpArrow = styled(ArrowDropUpIcon, {
  name: "DropDownUpArrow ",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  position: "absolute",
  top: "5px",
  right: "5px",
}));

const AddWordIcon = styled(AddIcon, {
  name: "AddWordIcon",
  slot: "Wrapper",
})(() => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  color: "inherit",
  backgroundColor: "inherit",
  marginTop: "2.5px",
  paddingRight: "5px",
  paddingBottom: "5px",
  paddingTop: "5px",
}));

const RemoveWordIcon = styled(RemoveIcon, {
  name: "RemoveWordIcon",
  slot: "Wrapper",
})(() => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  color: "inherit",
  backgroundColor: "inherit",
  marginTop: "2.5px",
  paddingRight: "5px",
  paddingBottom: "5px",
  paddingTop: "5px",
}));
const EndSelectionBox = styled("div", {
  name: "EndSelectionBox",
  slot: "Wrapper",
})(() => ({
  width: "max(max-content,max-content)",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max(max-content,max-content)",
  color: "inherit",
  position: "relative",
  display: "grid",
  gridTemplateColumns: "max-content max-content",
  gridTemplateRows: "max-content",
  gap: "5px",
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

export {
  StyledTitleTypography,
  SelectionContainer,
  ActionButton,
  DisabledActionButton,
  VocabContainer,
  DropDownButton,
  DropDownSelectionMenu,
  DropDownDownArrow,
  DropDownUpArrow,
  AddWordIcon,
  RemoveWordIcon,
  EndSelectionBox,
  ButtonsContainer,
};
