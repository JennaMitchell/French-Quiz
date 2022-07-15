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
export { TopContainer };
