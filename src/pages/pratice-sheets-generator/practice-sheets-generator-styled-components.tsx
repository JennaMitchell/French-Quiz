import { styled } from "@mui/material/styles";
// import { ThemeButton } from "../../components/generic-components/generic-components";

import AddIcon from "@mui/icons-material/Add";
const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(100%,100%)",
  minHeight: "1200px",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateColumns: "max-content",
  gridTemplateRows: "max-content",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
  "@media(max-width:1690px)": {
    marginTop: "60px",
  },
}));

const AddIconButton = styled("div", {
  name: "AddIconButton",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.primary.dark,
  transition: "all 0.5s",
  width: "max(60px,60px)",
  height: "max(60px,60px)",
  display: "grid",
  alignContent: "center",
  justifyContent: "center",

  position: "absolute",
  top: "20px",
  left: "100px",
  padding: "20px",

  borderRadius: "50%",
}));
const AddIconHolder = styled(AddIcon, {
  name: "AddIcon",
  slot: "Wrapper",
})(() => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(45px,45px)",
  height: "max(45px,45px)",
}));
const ResetButton = styled("div", {
  name: "ResetButton",
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
  top: "25px",
  right: "calc((100vw - 1255px)/4)",
  translate: "50% 0",
  fontFamily: "Montserrat, sans-serif",

  borderRadius: "10px",
  fontSize: "22px",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    boxShadow: "0 0 10px black",
  },
  "@media(max-width:1690px)": {
    top: "-45px",
    translate: "0% 0",
    right: "calc((100vw - 1255px)/2)",
  },
  "@media(max-width:1280px)": {
    right: "calc((100vw - 883px)/2)",
  },
  "@media(max-width:880px)": {
    right: "calc((100vw - 561px)/2)",
  },
  "@media(max-width:560px)": {
    right: "calc((100vw - 320px)/2)",
    fontSize: "16px",
    top: "-40px",
  },
}));

export { TopContainer, AddIconButton, ResetButton, AddIconHolder };
