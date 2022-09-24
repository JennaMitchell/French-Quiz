import { styled } from "@mui/material/styles";
import { Toolbar } from "@mui/material";

import { NavLinkButton } from "../generic-components/generic-components";
import MenuIcon from "@mui/icons-material/Menu";

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
  "@media(max-width:560px)": {
    width: "max(60px,60px)",
    height: "max(60px,60px)",
  },
  "@media(max-width:470px)": {
    width: "max(50px,50px)",
    height: "max(50px,50px)",
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
  "@media(max-width:470px)": {
    gap: "5px",
  },
});

const StyledToolBar = styled(Toolbar, {
  name: "StyledToolBar",
  slot: "Wrapper",
})({
  display: "grid",
  padding: "5px !important",
  zIndex: "3",

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
  gridTemplateColumns: "repeat(6,max-content)",
  gap: "10px",
  placeItems: "center",
  position: "relative",
  zIndex: "3",
  transition: "all 0.5s",
  "@media(max-width:470px)": {
    gap: "5px",
  },
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
})(() => ({
  textDecoration: "underline",
}));

const MobileMenuButton = styled("div", {
  name: "MobileMenuButton ",
  slot: "Wrapper",
})(({ theme }) => ({
  backgroundColor: "transparent",
  width: "max(50px,50px)",
  height: "max(50px,50px)",
  borderRadius: "50%",
  display: "grid",
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.secondary.light,
  transition: "all 0.5s",
  marginRight: "20px",
  padding: "10px",
  "&:hover": {
    color: theme.palette.secondary.dark,
    backgroundColor: theme.palette.secondary.light,
    boxShadow: "0 5px 10px white",
  },
  position: "relative",
  zIndex: 4,
  "@media(max-width:600px)": {
    width: "max(40px,40px)",
    height: "max(40px,40px)",
    padding: "5px",
    marginRight: "5px",
  },
  "@media(max-width:470px)": {
    width: "max(30px,30px)",
    height: "max(30px,30px)",
    padding: "5px",
    marginRight: "5px",
  },
}));
const StyledMenuIcon = styled(MenuIcon, {
  name: "StyledMenuIcon",
  slot: "Wrapper",
})(() => ({
  backgroundColor: "transparent",
  width: "max(100%,100%)",
  height: "max(100%,100%)",
  borderRadius: "50%",
  zIndex: 3,
  color: "inherit",
}));

const HomepageMobileNavMenuDropDown = styled("div", {
  name: "HomepageMobileNavMenuDropDown",
  slot: "Wrapper",
})(({ theme }) => ({
  position: "absolute",
  top: "20px",
  right: "20px",
  zIndex: 2,
  width: "max(300px,300px)",
  height: "max-content",
  minHeight: "max-content",
  maxHeight: "max-content",
  padding: "60px 10px 10px 10px",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.light,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  borderRadius: "10px",
  boxShadow: "-5px 8px 10px black",

  transformOrigin: "95% 30px",

  "@media(max-width:670px)": {
    width: "max(200px,200px)",
  },
  "@media(max-width:600px)": {
    padding: "40px 10px 10px 10px",
    right: "0px",
    top: "15px",
  },
  "@media(max-width:470px)": {
    width: "max(150px,150px)",
    transformOrigin: "80% 55px",
  },
  "@media(max-width:400px)": {
    width: "max(125px,125px)",
    transformOrigin: "85% 30px",
  },
}));
/// Drop Down Menu with animations this takes place when the user isn't on the home page
const NonHomepageDropDown = styled(HomepageMobileNavMenuDropDown, {
  name: "NonHomepageDropDown",
  slot: "Wrapper",
})(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: "10px",
  position: "absolute",
  top: "-280px",
  boxShadow: "none",
  borderLeft: "1px solid black",
  borderBottom: "1px solid black",
  borderRight: "1px solid black",
  borderTopLeftRadius: "0px",
  borderTopRightRadius: "0px",
  right: "0px",
  zIndex: "1",
  "@media(max-width:670px)": {
    width: "max(200px,200px)",
  },
  "@media(max-width:600px)": {
    padding: "10px",
    right: "0px",
    top: "15px",
  },
  "@media(max-width:470px)": {
    width: "max(150px,150px)",
  },
  "@media(max-width:400px)": {
    width: "max(125px,125px)",
  },
}));

export {
  LogoContainer,
  LogoImage,
  LogoTitleContainer,
  StyledToolBar,
  MenuButtonsContainer,
  StyledActiveNavButton,
  StyledInactiveNavButton,
  MobileMenuButton,
  HomepageMobileNavMenuDropDown,
  StyledMenuIcon,
  NonHomepageDropDown,
};
