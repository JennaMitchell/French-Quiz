import { styled } from "@mui/material/styles";

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
export { OptionContainer, SelectionContainer };
