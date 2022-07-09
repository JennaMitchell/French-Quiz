import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";

import { NavLinkButton } from "../generic-components/generic-components";
const LogoContainer = styled("div", {
  name: "LogoContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(70px,70px)",
  height: "max(70px,70px)",
  marginTop: "10px",
  marginBottom: "10px",
  display: "grid",
  alignItems: "center",
  justifyItems: "center",
  marginLeft: "0px",
  borderRadius: "50%",

  backgroundColor: theme.palette.secondary.light,
  "@media (max-width:895px)": {
    width: "max(60px,60px)",
    height: "max(60px,60px)",
  },
  "@media (max-width:700px)": {
    width: "max(50px,50px)",
    height: "max(50px,50px)",
  },
  "@media(max-width:405px)": {
    width: "max(45px,45px)",
    height: "max(45px,45px)",
  },
}));
const LogoImage = styled("img", {
  name: "LogoImage",
  slot: "Wrapper",
})({
  width: "max(70%,70%)",
  height: "max(70%,70%)",
  position: "relative",
});
const LogoTitleContainer = styled("div", {
  name: "LogoTitleContainer",
  slot: "Wrapper",
})({
  display: "grid",
  width: "max(max-content,max-content)",
  gridTemplateColumns: "max-content max-content",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  gap: "15px",
  "@media(max-width:650px)": {
    gap: "5px",
  },
});

const StyledToolBar = styled(Toolbar, {
  name: "StyledToolBar",
  slot: "Wrapper",
})({
  display: "grid",
  padding: "0",

  gridTemplateColumns: "max-content max-content",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
});

const MenuButtonsContainer = styled("div", {
  name: "MenuButtonsContainer",
  slot: "Wrapper",
})(() => ({
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  backgroundColor: "inherit",
  color: "inherit",
  display: "grid",
  gridTemplateColumns: "repeat(5,max-content)",
  gap: "10px",
  placeItems: "center",
  position: "relative",
  zIndex: "2",
  transition: "all 0.5s",
}));

const StyledInactiveNavButton = styled(NavLinkButton, {
  name: "StyledNavButton",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  fontSize: "22px",
  padding: "10px 20px 10px 20px",
  borderRadius: "10px",
  fontFamily: theme.typography.fontFamily,
  backgroundColor: "transparent",
}));
const StyledActiveNavButton = styled(StyledInactiveNavButton, {
  name: "StyledInactiveNavButton",
  slot: "Wrapper",
})(({ theme }) => ({
  textDecoration: "underline",
}));
export {
  LogoContainer,
  LogoImage,
  LogoTitleContainer,
  StyledToolBar,
  MenuButtonsContainer,
  StyledActiveNavButton,
  StyledInactiveNavButton,
};
