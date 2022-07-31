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
});

const StyledSelect = styled("select", {
  name: "StyledSelect",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(45px,45px)",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  textAlign: "right",
  fontSize: "20px",
  border: "none",
}));
const StyledOption = styled("option", {
  name: "StyledOption ",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(45px,45px)",
  textAlign: "right",
  height: "max(max-content,max-content)",
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.light,
  fontSize: "20px",
  border: "none",
}));
const StyledTypography = styled("p", {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",

  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  fontSize: "20px",
}));
export {
  MatchingTopContainer,
  StyledSelect,
  StyledOption,
  MatchingRowContainer,
  StyledTypography,
};
