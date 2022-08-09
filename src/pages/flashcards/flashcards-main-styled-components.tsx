import { styled } from "@mui/material/styles";
import RedoIcon from "@mui/icons-material/Redo";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Typography } from "@mui/material";
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
  "@media(max-width:1050px)": {
    minHeight: "calc(100vh - 344px)",
  },
  "@media(max-width:880px)": {
    minHeight: "calc(100vh - 334px)",
  },
  "@media(max-width:780px)": {
    minHeight: "calc(100vh - 316px)",
  },
  "@media(max-width:760px)": {
    minHeight: "calc(100vh - 313px)",
  },
  "@media(max-width:750px)": {
    minHeight: "calc(100vh - 313px)",
  },
  "@media(max-width:560px)": {
    minHeight: "calc(100vh - 303px)",
  },
}));

const StyledTypography = styled(Typography, {
  name: "StyledTypography",
  slot: "Wrapper",
})(() => ({
  fontSize: "32px",
  "@media(max-width:880px)": {
    fontSize: "26px",
  },
  "@media(max-width:600px)": {
    fontSize: "22px",
  },
}));

const FrontFlashCardContainer = styled("div", {
  name: "FrontFlashCardContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(800px,800px)",
  height: "max(80%,500px)",
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
  "@media(max-width:1050px)": {
    width: "max(80%,80%)",
    height: "max(500px,500px)",
  },
  "@media(max-width:600px)": {
    height: "max(400px,400px)",
    width: "max(95%,95%)",
  },
  "@media(max-width:400px)": {
    height: "max(325px,325px)",
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
  "@media(max-width:1250px)": {
    right: "1.5%",
  },
  "@media(max-width:800px)": {
    width: "max(40px,40px)",
    height: "max(40px,40px)",
    right: "2%",
  },
  "@media(max-width:700px)": {
    top: "17.5%",
    right: "12.5%",
  },
  "@media(max-width:600px)": {
    top: "23.5%",
    right: "7.5%",
  },
  "@media(max-width:400px)": {
    top: "27.5%",
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
  "@media(max-width:1250px)": {
    left: "1.5%",
  },
  "@media(max-width:800px)": {
    width: "max(40px,40px)",
    height: "max(40px,40px)",
    left: "2%",
  },
  "@media(max-width:700px)": {
    top: "17.5%",
    left: "12.5%",
  },
  "@media(max-width:600px)": {
    top: "23.5%",
    left: "7.5%",
  },
  "@media(max-width:400px)": {
    top: "27.5%",
  },
}));

export {
  TopContainer,
  FrontFlashCardContainer,
  ClickToFlipContainer,
  RotateIcon,
  NextIconButton,
  PreviousIconButton,
  StyledTypography,
};
