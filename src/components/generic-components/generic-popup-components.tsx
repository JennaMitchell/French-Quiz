import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import { Typography, Dialog, DialogContent } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ClosingIconContainer = styled("div", {
  name: "ClosingIconContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.dark,
  position: "absolute",
  top: "10px",
  right: "20px",
  borderRadius: "50%",
  transition: "all 1s",
  paddingLeft: "1px",
  paddingTop: "1px",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
  },
  "@media(max-width:500px)": {
    width: "max(25px,25px)",
    height: "max(25px,25px)",
  },

  "@media(max-width:460px)": {
    top: "5px",
  },
  "@media(max-width:375px)": {
    width: "max(20px,20px)",
    height: "max(20px,20px)",
  },
}));
const ClosingIcon = styled(CloseIcon, {
  name: "ClosingIcon",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(25px,25px)",
  height: "max(25px,25px)",
  borderRadius: "50%",
  backgroundColor: "transparent",
  color: theme.palette.secondary.light,
  transition: "all 1s",
  padding: "0px",
  display: "inline-block",
  "&:hover": {
    color: theme.palette.secondary.dark,
  },
  "@media(max-width:500px)": {
    width: "max(20px,20px)",
    height: "max(20px,20px)",
  },

  "@media(max-width:375px)": {
    width: "max(15px,15px)",
    height: "max(15px,15px)",
  },
}));

const StyledPopupTypography = styled(Typography, {
  slot: "Wrapper",
  name: "StyledPopupTypography",
})(() => ({
  fontSize: "24px",
  height: "max-content",
  "@media(max-width:550px)": { fontSize: "20px" },
  "@media(max-width:480px)": { fontSize: "18px" },
  "@media(max-width:390px)": { fontSize: "16px" },
  "@media(max-width:350px)": { fontSize: "14px" },
}));

const DropDownTermTypography = styled(Typography, {
  slot: "Wrapper",
  name: "DropDownTermTypography ",
})(() => ({
  fontSize: "24px",
  height: "max(100%,100%)",
  alignSelf: "center",
  display: "flex",
  alignItems: "center",
  "@media(max-width:620px)": { fontSize: "20px" },
  "@media(max-width:480px)": { fontSize: "18px" },
  "@media(max-width:390px)": { fontSize: "14px" },
  "@media(max-width:350px)": { fontSize: "12px" },
}));

const ActionButton = styled("button", {
  name: "ActionButton",
  slot: "Wrapper",
})(({ theme }) => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  padding: "20px 20px",
  textAlign: "center",
  borderRadius: "10px",
  fontSize: "20px",
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.secondary.dark,
  transition: "all 1s",
  border: "none",
  textDecoration: "none",

  "&:hover": {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light,
  },

  "@media(max-width:475px)": { fontSize: "18px", padding: "15px" },
  "@media(max-width:375px)": { fontSize: "16px" },
  "@media(max-width:350px)": { fontSize: "14px" },
}));

const DisabledActionButton = styled("button", {
  name: "DisabledActionButton",
  slot: "Wrapper",
})({
  color: "#D0D0D0",
  backgroundColor: "#808080",
  border: "none",
  textDecoration: "none",
  textAlign: "center",
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  borderRadius: "10px",
  fontSize: "20px",
  padding: "20px 20px",
  "@media(max-width:475px)": { fontSize: "18px", padding: "15px" },
  "@media(max-width:375px)": { fontSize: "16px" },
  "@media(max-width:350px)": { fontSize: "14px" },
});

const StyledPopupSelect = styled("select", {
  name: "StyledSelect",
  slot: "Wrapper",
})(({ theme }) => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  textAlign: "right",
  fontSize: "22px",
  lineHeight: "22px",
  border: "none",
  "@media(max-width:580px)": { fontSize: "18px", lineHeight: "18px" },
  "@media(max-width:520px)": { fontSize: "16px", lineHeight: "16px" },
  "@media(max-width:475px)": {
    fontSize: "12px",
    lineHeight: "12px",
  },
}));
const StyledPopupOption = styled("option", {
  name: "StyledOption",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(45px,45px)",
  textAlign: "right",
  height: "max(max-content,max-content)",
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.light,
  fontSize: "22px",
  lineHeight: "22px",
  border: "none",
  "@media(max-width:580px)": { fontSize: "18x", lineHeight: "18px" },
  "@media(max-width:520px)": { fontSize: "16px", lineHeight: "16px" },
  "@media(max-width:475px)": {
    fontSize: "12px",
    lineHeight: "12px",
  },
}));

const StyledStepTitleText = styled(Typography, {
  name: "StyledStepTitleText",
  slot: "Wrapper",
})(() => ({
  textAlign: "center",
  fontSize: "22px",
  lineHeight: "22px",

  "@media(max-width:580px)": { fontSize: "18px", lineHeight: "18px" },
  "@media(max-width:520px)": { fontSize: "16px", lineHeight: "16px" },
  "@media(max-width:475px)": {
    fontSize: "12px",
    lineHeight: "12px",
  },
}));

const PopupTitle = styled(Typography, {
  name: "PopupTitle",
  slot: "Wrapper",
})(() => ({
  textAlign: "center",
  fontSize: "22px",
  lineHeight: "22px",

  width: "max(100%,100%)",

  "@media(max-width:580px)": { fontSize: "18px", lineHeight: "18px" },
  "@media(max-width:520px)": { fontSize: "16px", lineHeight: "16px" },
  "@media(max-width:475px)": {
    fontSize: "12px",
    lineHeight: "12px",
  },
}));

const StyledWarningText = styled(Typography, {
  name: "StyledWarningText",
  slot: "Wrapper",
})(() => ({
  color: "red",
  fontSize: "16px",
  width: "max(300px,300px)",
  textAlign: "center",
  display: "flex",
  placeItems: "center",
  "@media(max-width:475px)": {
    width: "max(250px,250px)",
    fontSize: "12px",
  },
  "@media(max-width:400px)": {
    width: "max(225px,225px)",
  },
}));

const QuestionsRemainingText = styled(Typography, {
  name: "QuestionsRemainingText ",
  slot: "Wrapper",
})(() => ({
  fontSize: "22px",
  lineHeight: "22px",
  "@media(max-width:580px)": { fontSize: "18px", lineHeight: "18px" },
  "@media(max-width:520px)": { fontSize: "16px", lineHeight: "16px" },
  "@media(max-width:475px)": {
    fontSize: "12px",
    textAlign: "center",
    lineHeight: "12px",
  },
}));
const SelectionContainer = styled("div", {
  name: "SelectionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(max-content,max-content)",
  display: "grid",
  gridTemplateRows: "max-content",
  gridTemplateColumns: "max-content max-content",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max(100%,100%)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,

  borderRadius: "2px",
  gap: "10px",
}));

const DropDownButton = styled("button", {
  name: "DropDownButton",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(490px,490px)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "mnax-content",
  backgroundColor: theme.palette.primary.dark,
  border: "1px solid black",
  fontSize: "22px",
  color: theme.palette.secondary.light,
  overflow: "hidden",
  position: "relative",
  textAlign: "left",
  padding: "5px 0 5px 20px",

  justifySelf: "center",
  marginBottom: "10px",
  "@media(max-width:620px)": {
    width: "max(410px,410px)",
  },
  "@media(max-width:550px)": {
    width: "max(300px,300px)",
  },
  "@media(max-width:475px)": {
    width: "max(280px,280px)",
  },
  "@media(max-width:390px)": {
    width: "max(235px,235px)",
  },
}));
const DropDownSelectionMenu = styled("div", {
  name: "DropDownSelectionMenu",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(480px,480px)",
  display: "grid",
  justifyContent: "space-between",
  gridAutoRows: "1fr",
  gridTemplateRows: "1fr",
  gridTemplateColumns: "100%",
  gap: "10px",
  height: "max(max-content,max-content)",
  padding: "5px 10px 5px 10px",
  backgroundColor: theme.palette.secondary.dark,
  fontSize: "18px",
  placeItems: "center",
  color: theme.palette.secondary.light,
  position: "relative",
  borderEndEndRadius: "5px",
  borderEndStartRadius: "5px",
  justifySelf: "center",
  marginBottom: "10px",
  "@media(max-width:620px)": {
    width: "max(400px,400px)",
  },
  "@media(max-width:550px)": {
    width: "max(290px,290px)",
  },
  "@media(max-width:475px)": {
    width: "max(270px,270px)",
  },
  "@media(max-width:390px)": {
    width: "max(225px,225px)",
  },
}));

const DropDownDownArrow = styled(ArrowDropDownIcon, {
  name: "DropDownDownArrow",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  position: "absolute",
  top: "6px",
  right: "5px",
  "@media(max-width:475px)": {
    width: "max(20px,20px)",
    height: "max(20px,20px)",
    top: "5px",
    right: "5px",
  },
}));
const DropDownUpArrow = styled(ArrowDropUpIcon, {
  name: "DropDownUpArrow ",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  position: "absolute",
  top: "6px",
  right: "5px",
  "@media(max-width:475px)": {
    width: "max(20px,20px)",
    height: "max(20px,20px)",
    top: "5px",
    right: "5px",
  },
}));

const AddWordIcon = styled(AddIcon, {
  name: "AddWordIcon",
  slot: "Wrapper",
})(() => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  color: "inherit",
  backgroundColor: "inherit",
  marginTop: "2.5px",
  paddingRight: "5px",
  paddingBottom: "5px",
  paddingTop: "5px",
  "@media(max-width:475px)": {
    width: "max(20px,20px)",
    height: "max(20px,20px)",
    paddingRight: "2.5px",
    paddingBottom: "2.5px",
    paddingTop: "2.5px",
  },
}));

const RemoveWordIcon = styled(RemoveIcon, {
  name: "RemoveWordIcon",
  slot: "Wrapper",
})(() => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  color: "inherit",
  backgroundColor: "inherit",
  marginTop: "2.5px",
  paddingRight: "5px",
  paddingBottom: "5px",
  paddingTop: "5px",
  "@media(max-width:475px)": {
    width: "max(20px,20px)",
    height: "max(20px,20px)",
    paddingRight: "2.5px",
    paddingBottom: "2.5px",
    paddingTop: "2.5px",
  },
}));
const EndSelectionBox = styled("div", {
  name: "EndSelectionBox",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max(max-content,max-content)",
  color: "inherit",
  position: "relative",
  display: "grid",
  gridTemplateColumns: "200px max-content",
  gridTemplateRows: "max-content",
  gap: "5px",
  "@media(max-width:550px)": {
    width: "max(100px,100px)",
    gridTemplateColumns: "75px max-content",
  },
  "@media(max-width:400px)": {
    width: "max(90px,90px)",
    gridTemplateColumns: "60px max-content",
  },
}));

const StyledDialog = styled(Dialog, {
  slot: "Wrapper",
  name: "StyledDialog",
})(({ theme }) => ({
  ".css-1t1j96h-MuiPaper-root-MuiDialog-paper ": {
    borderRadius: "20px",
    border: "none",
    margin: "0",
    width: "600px",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.secondary.light,
    minHeight: "max-content",
    height: "max-content",
    maxHeight: "90vh",
    "@media(max-width:620px)": {
      width: "max(475px,475px)",
    },

    "@media(max-width:475px)": {
      width: "max(325px,325px)",
    },
    "@media(max-width:400px)": {
      width: "max(300px,300px)",
    },
  },
}));

const QuestionOptionContainer = styled("div", {
  name: "QuestionOptionContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(95%,95%)",
  display: "grid",
  justifyContent: "space-between",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  gridTemplateColumns: "max-content max-content",
  color: theme.palette.secondary.light,
}));

const StyledDialogContent = styled(DialogContent, {
  name: "StyledDialogContent",
  slot: "Wrapper",
})(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.secondary.light,

  borderRadius: "20px",
  padding: "10px 40px 10px 40px",
  overflowY: "scroll",
  width: "600px",

  display: "grid",
  alignItems: "center",
  justifyItems: "center",
  rowGap: "10px",
  flexDirection: "column",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "90vh",
  "@media(max-width:620px)": {
    width: "max(475px,475px)",
    padding: "10px 20px 10px 20px",
  },
  "@media(max-width:475px)": {
    width: "max(325px,325px)",
  },
  "@media(max-width:400px)": {
    width: "max(300px,300px)",
    padding: "10px 20px 10px 20px",
  },
}));

const StyledSelectionRowContainer = styled("div", {
  name: "StyledSelectionRowContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  display: "grid",
  gridTemplateRows: "100%",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  justifyContent: "space-between",
  alignItems: "center",
  height: "max(100%,100%)",
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

const ActionButtonsContainer = styled("div", {
  name: "ActionButtonsContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  height: "max(max-content,max-content)",
  display: "grid",
  gridTemplateColumns: "max-content max-content",

  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "primary.main",
  padding: "0px 0px 0px 0px",
}));

export {
  ClosingIconContainer,
  ClosingIcon,
  StyledPopupTypography,
  DropDownTermTypography,
  ActionButton,
  DisabledActionButton,
  StyledPopupSelect,
  StyledPopupOption,
  StyledStepTitleText,
  PopupTitle,
  StyledWarningText,
  QuestionsRemainingText,
  SelectionContainer,
  DropDownDownArrow,
  DropDownUpArrow,
  DropDownSelectionMenu,
  DropDownButton,
  AddWordIcon,
  RemoveWordIcon,
  EndSelectionBox,
  StyledDialog,
  StyledDialogContent,
  ActionButtonsContainer,
  StyledSelectionRowContainer,
  QuestionOptionContainer,
};
