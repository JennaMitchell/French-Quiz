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
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
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
  right: "100px",
  borderRadius: "10px",
  fontSize: "26px",
}));

export { TopContainer, AddIconButton, ResetButton, AddIconHolder };
