import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const StyledTitleTypography = styled(Typography, {
  name: "StyledTypography",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: theme.palette.secondary.light,
  fontSize: "20px",
}));

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

export { StyledTitleTypography, VocabContainer, ButtonsContainer };
