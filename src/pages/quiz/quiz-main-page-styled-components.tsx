import { styled } from "@mui/material/styles";

const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(100%,100%)",
  minHeight: "calc(100vh - 405px)",
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
  "@media(max-width:735px)": {
    minHeight: "calc(100vh - 343px)",
  },
  "@media(max-width:721px)": {
    minHeight: "calc(100vh - 326px)",
  },
  "@media(max-width:660px)": {
    minHeight: "calc(100vh - 315px)",
  },
  "@media(max-width:550px)": {
    minHeight: "calc(100vh - 305px)",
  },
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
  "@media(max-width:1280px)": {
    padding: "10px 20px 10px 20px",
    fontSize: "22px",
  },
  "@media(max-width:880px)": {
    padding: "10px 20px 10px 20px",
    fontSize: "18px",
  },
  "@media(max-width:560px)": {
    padding: "5px 10px 5px 10px",
    fontSize: "14px",
  },
}));

export { TopContainer, StyledButton };
