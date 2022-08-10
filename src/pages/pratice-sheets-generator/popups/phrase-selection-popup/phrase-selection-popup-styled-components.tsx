import { styled } from "@mui/material/styles";

const VocabContainer = styled("div", {
  name: "VocabContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  display: "grid",
  gridTemplateRows: "max-content",
  gridTemplateColumns: "max-content max-content",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  marginTop: "2.5px",
  marginBottom: "2.5px",
  borderRadius: "2px",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
  },
}));

const ButtonsContainer = styled("div", {
  name: "ButtonsContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  height: "max(max-content,max-content)",
  display: "grid",
  gridTemplateColumns: "max-content max-content",
  gap: "10px",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "primary.main",
  padding: "20px 0px 0px 0px",
}));

const PhraseSelectionDropDownText = styled("p", {
  slot: "Wrapper",
  name: "PhraseSelectionDropDownText",
})(() => ({
  width: "max(100%,100%)",
  fontSize: "14px",
  height: "max-content",
  minHeight: "max-content",
  color: "inherit",
  "@media(max-width:550px)": {
    fontSize: "14px",
  },
  "@media(max-width:475px)": {
    fontSize: "12px",
  },
  "@media(max-width:400px)": {
    fontSize: "10px",
  },
}));
const PhrasesEndSelectionBox = styled("div", {
  name: "PhrasesEndSelectionBox",
  slot: "Wrapper",
})(() => ({
  width: "max(175px,175px)",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max(max-content,max-content)",
  color: "inherit",
  position: "relative",
  display: "grid",
  gridTemplateColumns: "140px max-content",
  gridTemplateRows: "max-content",
  gap: "5px",
  "@media(max-width:550px)": {
    width: "max(130px,130px)",
    gridTemplateColumns: "100px max-content",
  },
  "@media(max-width:400px)": {
    width: "max(100px,100px)",
    gridTemplateColumns: "80px max-content",
  },
}));
export {
  VocabContainer,
  ButtonsContainer,
  PhraseSelectionDropDownText,
  PhrasesEndSelectionBox,
};
