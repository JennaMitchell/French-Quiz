import { styled } from "@mui/material/styles";
import ConstructionIcon from "@mui/icons-material/Construction";
const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  transition: "all 0.5s",
  width: "max(100%,100%)",
  minHeight: "calc(100vh - 405px)",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateColumns: "max-content",
  gridTemplateRows: "max-content",
  justifyContent: "center",
  alignContent: "center",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
  paddingBottom: "20px",
  "@media(max-width:1150px)": {
    minHeight: "calc(100vh - 387px)",
  },
  "@media(max-width:1050px)": {
    minHeight: "calc(100vh - 378px)",
  },
  "@media(max-width:1000px)": {
    minHeight: "calc(100vh - 383px)",
  },
  "@media(max-width:980px)": {
    minHeight: "calc(100vh - 375px)",
  },
  "@media(max-width:875px)": {
    minHeight: "calc(100vh - 363px)",
  },

  "@media(max-width:765px)": {
    minHeight: "calc(100vh - 378px)",
  },
  "@media(max-width:735px)": {
    minHeight: "calc(100vh - 327px)",
  },
  "@media(max-width:670px)": {
    minHeight: "calc(100vh - 326px)",
  },
  "@media(max-width:660px)": {
    minHeight: "calc(100vh - 315px)",
  },
  "@media(max-width:550px)": {
    minHeight: "calc(100vh - 305px)",
  },
}));

const ConstructionInfoContainer = styled("div", {
  name: "ConstructionInfoContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(310px,310px)",
  height: "max(200px,200px)",
  display: "grid",
  gridTemplateColumns: "max-content",
  gridTemplateRows: "max-content",
  gap: "0px",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
}));

const StyledConstructionIcon = styled(ConstructionIcon, {
  name: "StyledConstructionIcon",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.main,
  transition: "all 0.5s",
  width: "max(80px,80px)",
  height: "max(80px,80px)",
  display: "flex",
  placeItems: "center",
  backgroundColor: theme.palette.secondary.light,
  justifySelf: "center",
}));

const ConstructionTextContainer = styled("div", {
  name: "ConstructionInfoContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.dark,
  transition: "all 0.5s",
  width: "max(310px,310px)",
  height: "max(100px,100px)",
  fontFamily: "Montserrat, sans-serif",

  backgroundColor: theme.palette.secondary.light,
  fontSize: "16px",
}));

export {
  TopContainer,
  ConstructionInfoContainer,
  StyledConstructionIcon,
  ConstructionTextContainer,
};
