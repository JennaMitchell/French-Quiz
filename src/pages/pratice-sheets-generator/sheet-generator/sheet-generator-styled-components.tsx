import { styled } from "@mui/material/styles";

const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(1175px,1175px)",
  minHeight: "1680px",
  height: "1680px",
  maxHeight: "1680px",
  display: "grid",
  gridTemplateRows: "max-content",
  gridTemplateColumns: "max-content",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.palette.primary.dark,
  position: "relative",
  boxSizing: "content-box",
  padding: "40px",
  borderRadius: "5px",
  marginTop: "20px",
  marginBottom: "20px",
  boxShadow: "0 0 40px black",
}));

const MainContentContainer = styled("div", {
  name: "MainContentContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(1175px,1175px)",
  minHeight: "1680px",
  height: "1680px",
  maxHeight: "1680px",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
  borderRadius: "5px",
  padding: "10px",
}));

export { TopContainer, MainContentContainer };
// Page height 1680px x 1175px
