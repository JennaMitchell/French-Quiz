import { styled } from "@mui/material/styles";

const MatchingTopContainer = styled("div", {
  name: "MatchingTopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(640px,640px)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.light,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
  boxShadow: "0 0 20px black",
  padding: "40px",
  borderRadius: "10px",
  rowGap: "20px",
  position: "relative",
  "@media(max-width:670px)": {
    width: "max(550px,550px)",
  },
  "@media(max-width:585px)": {
    width: "max(450px,450px)",
  },
  "@media(max-width:480px)": {
    width: "max(350px,350px)",
    padding: "30px 15px 20px 15px",
  },
  "@media(max-width:375px)": {
    width: "max(300px,300px)",
  },
}));

const MatchingRowContainer = styled("div", {
  name: "MatchingRowContainer",
  slot: "Wrapper",
})({
  width: "max(100%,100%)",
  height: "max(max-content,max-content)",
  display: "grid",
  gridTemplateColumns: "1fr max-content 1fr",
  gridTemplateRows: "max-content",
  alignItems: "center",
  justifyItems: "center",
  position: "relative",
});

const StyledTypography = styled("p", {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  fontSize: "24px",
  position: "relative",
  fontFamily: "Montserrat, sans-serif",
  "@media(max-width:585px)": {
    fontSize: "20px",
  },
  "@media(max-width:480px)": {
    fontSize: "16px",
  },
}));
export { MatchingTopContainer, MatchingRowContainer, StyledTypography };
