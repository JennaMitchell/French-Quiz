import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(1175px,1175px)",
  minHeight: "1680px",
  height: "max-content",
  maxHeight: "max-content",
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

  "@media(max-width:1280px)": {
    width: "max(783px,783px)",
  },
  "@media(max-width:880px)": {
    width: "max(471px,471px)",
  },
  "@media(max-width:560px)": {
    width: "max(260px,260px)",
    padding: "20px",
  },
}));

const MainContentContainer = styled("div", {
  name: "MainContentContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(1175px,1175px)",
  minHeight: "1680px",
  height: "max-content",
  maxHeight: "max-content",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
  borderRadius: "5px",
  padding: "10px",
  "@media(max-width:1280px)": {
    width: "max(783px,783px)",
  },
  "@media(max-width:880px)": {
    width: "max(471px,471px)",
  },
  "@media(max-width:560px)": {
    width: "max(260px,260px)",
  },
}));

const TestContainer = styled("div", {
  name: "TestContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(100%,100%)",

  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",

  display: "grid",
  alignItems: "flex-start",
  justifyContent: "space-between",
  gridTemplateColumns: "repeat(3,max-content)",
  backgroundColor: theme.palette.secondary.light,
  position: "relative",
  borderRadius: "5px",
  padding: "0px 10px 10px",
  "@media(max-width:1280px)": {
    gridTemplateColumns: "repeat(2,max-content)",
  },
  "@media(max-width:880px)": {
    gridTemplateColumns: "repeat(1,max-content)",
  },
}));

const TestSectionTitle = styled(Typography, {
  name: "TestSectionTitle",
  slot: "Wrapper",
})(() => ({
  fontFamily: "Montserrat, sans-serif",
  marginTop: "10px",
  gridColumn: "1 /span 3",
  paddingTop: "0px",
  justifySelf: "center",

  "@media(max-width:1280px)": {
    gridColumn: "1 /span 2",
  },
  "@media(max-width:880px)": {
    gridColumn: "1 /span 1",
    fontSize: "24px",
  },
  "@media(max-width:560px)": {
    gridColumn: "1 /span 1",
    fontSize: "14px",
  },
}));

const TestSectionDescription = styled(Typography, {
  name: "TestSectionDescription",
  slot: "Wrapper",
})(() => ({
  fontFamily: "Montserrat, sans-serif",
  marginTop: "10px",
  marginBottom: "10px",
  gridColumn: "1 /span 3",

  "@media(max-width:1280px)": {
    gridColumn: "1 /span 2",
  },
  "@media(max-width:880px)": {
    gridColumn: "1 /span 1",
    fontSize: "18px",
  },
  "@media(max-width:560px)": {
    fontSize: "12px",
    width: "max(230px,230px)",
  },
}));

export {
  TopContainer,
  MainContentContainer,
  TestContainer,
  TestSectionTitle,
  TestSectionDescription,
};
// Page height 1680px x 1175px
