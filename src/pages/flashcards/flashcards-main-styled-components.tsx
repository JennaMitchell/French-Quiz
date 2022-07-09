import { styled } from "@mui/material/styles";
import RedoIcon from "@mui/icons-material/Redo";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "calc(100vh - 362px)",
  height: "max-content",

  backgroundColor: theme.palette.secondary.light,
  border: "none",
  display: "grid",
  placeItems: "center",
  perspective: "1000px",
  position: "relative",
}));

const FrontFlashCardContainer = styled("div", {
  name: "FrontFlashCardContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(800px,800px)",
  height: "max(600px,600px)",
  backgroundColor: theme.palette.primary.dark,
  border: "none",
  display: "grid",
  placeItems: "center",
  padding: "10px",
  zIndex: "1",
  borderRadius: "20px",
  position: "absolute",
  top: "50%",
  left: "50%",
  translate: "-50% -50%",

  transition: "all 1s",
  transformStyle: "preserve-3d",
  backfaceVisibility: "hidden",
  "&:hover": {
    boxShadow: "0 0 60px black",
  },
}));

const ClickToFlipContainer = styled("div", {
  name: "ClickToFlipContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  display: "flex",
  gap: "5px",
  position: "absolute",
  top: "30px",
  right: "30px",
  transition: "all 1s",
  opacity: "0",
}));
const RotateIcon = styled(RedoIcon, {
  name: "RotateIcon",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  color: theme.palette.secondary.light,
  backgroundColor: "inherit",
  paddingTop: "5px",
}));

const NextIconButton = styled(ArrowForwardIosIcon, {
  name: "NextIconButton",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(50px,50px)",
  height: "max(50px,50px)",
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.primary.dark,
  padding: "5px 5px 5px 10px",
  position: "absolute",
  top: "50%",
  right: "calc(50% - 500px)",
  translate: "0 -50%",
  transition: "all 0.5s",
  borderRadius: "50%",
  zIndex: "2",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0 0 10px black",
  },
}));

const PreviousIconButton = styled(ArrowBackIosNewIcon, {
  name: "PreviousIconButton",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(50px,50px)",
  height: "max(50px,50px)",
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.primary.dark,
  padding: "5px 10px 5px 5px",
  position: "absolute",
  top: "50%",
  left: "calc(50% - 500px)",
  translate: "0 -50%",
  transition: "all 0.5s",
  borderRadius: "50%",
  zIndex: "2",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0 0 10px black",
  },
}));

export {
  TopContainer,
  FrontFlashCardContainer,
  ClickToFlipContainer,
  RotateIcon,
  NextIconButton,
  PreviousIconButton,
};
