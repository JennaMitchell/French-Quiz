import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const StyledButton = styled("button", {
  name: "StyledButton",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.secondary.dark,
  transition: "all 0.5s",
  border: "none",
  "&:hover": {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "0 5px 10px white",
  },
}));

const ThemeButton = styled("button", {
  name: "ThemeButton",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.primary.dark,
  border: "none",
  transition: "all 0.5s",
  "&:hover": {
    backgroundColor: theme.palette.primary.light,
    boxShadow: "0 0 10px white",
  },
}));
const SectionContainer = styled("div", {
  name: "SectionContainer",
  slot: "Wrapper",
})(() => ({
  transition: "all 0.5s",
  width: "max(100%,100%)",
  height: "max(max-content,max-content)",
  display: "grid",
  placeItems: "center",
}));

const NavLinkButton = styled(NavLink, {
  name: "NavLinkButton",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.light,
  backgroundColor: theme.palette.secondary.dark,
  transition: "all 0.5s",
  border: "none",
  textDecoration: "none",
  textAlign: "center",
  "&:hover": {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "0 5px 10px white",
  },
}));

const SingleItemRowContainer = styled("div", {
  name: "SingleItemRowContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateRows: "max-content",
  gridTemplateColumns: "max-content",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  gridColumn: "1/span 3",
}));
const TwoItemRowContainer = styled("div", {
  name: "TwoItemRowContainer ",
  slot: "Wrapper",
})(() => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateRows: "max-content",
  gridTemplateColumns: "max-content max-content",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  gridColumn: "1/span 3",
  gap: "40px",
}));

export {
  StyledButton,
  ThemeButton,
  SectionContainer,
  NavLinkButton,
  SingleItemRowContainer,
  TwoItemRowContainer,
};
