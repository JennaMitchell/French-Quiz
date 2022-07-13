import { styled } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
const PopupActionButton = styled("button", {
  name: "PopupActionButton",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.secondary.dark,
  transition: "all 1s",
  border: "none",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light,
  },
}));

const PopupDisabledActionButton = styled("button", {
  name: "PopupDisabledActionButton",
  slot: "Wrapper",
})(({ theme }) => ({
  color: "#D0D0D0",
  backgroundColor: "#808080",
  border: "none",
  textDecoration: "none",
  textAlign: "center",
}));
const ClosingIconContainer = styled("div", {
  name: "ClosingIconContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  display: "grid",
  justifyContent: "center",
  alignContent: "center",
  backgroundColor: theme.palette.secondary.dark,
  color: theme.palette.secondary.dark,
  position: "absolute",
  top: "10px",
  right: "10px",
  borderRadius: "50%",
  transition: "all 1s",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
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
  "&:hover": {
    color: theme.palette.secondary.dark,
  },
}));

export {
  PopupActionButton,
  PopupDisabledActionButton,
  ClosingIconContainer,
  ClosingIcon,
};
