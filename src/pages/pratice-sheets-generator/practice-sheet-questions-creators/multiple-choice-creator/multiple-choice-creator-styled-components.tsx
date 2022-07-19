import { styled } from "@mui/material/styles";

const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(100%,100%)",
  minHeight: "100px",
  height: "100px",
  maxHeight: "100px",
  display: "grid",
  gridTemplateRows: "max-content",
  gridTemplateColumns: "max-content",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
  boxSizing: "content-box",
}));
export { TopContainer };
