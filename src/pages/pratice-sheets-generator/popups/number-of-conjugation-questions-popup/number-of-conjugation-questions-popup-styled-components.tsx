import { styled } from "@mui/material/styles";

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

export { ButtonsContainer, OptionContainer };
