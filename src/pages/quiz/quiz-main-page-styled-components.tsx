import { styled } from "@mui/material/styles";

const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(100%,100%)",
  minHeight: "calc(100vh - 363px)",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateColumns: "max-content",
  gridTemplateRows: "max-content",
  justifyContent: "center",
  alignContent: "space-evenly",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
  paddingBottom: "20px",
}));

const StyledButton = styled("button", {
  name: "StyledButton",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.primary.dark,
  transition: "all 0.5s",
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  padding: "10px 20px 10px 20px",
  position: "absolute",

  borderRadius: "10px",
  fontSize: "26px",
  border: "none",
  ":hover": {
    backgroundColor: theme.palette.primary.main,
    boxShadow: "0 0 15px black",
  },
}));

export { TopContainer, StyledButton };
