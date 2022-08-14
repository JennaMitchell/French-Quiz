import { styled } from "@mui/material/styles";
import { Typography, Link } from "@mui/material";
import { NavLink } from "react-router-dom";

const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  backgroundColor: theme.palette.primary.dark,
  border: "none",
  display: "grid",
  gridTemplateColumns: "repeat(4, max-content)",
  alignContent: "flex-start",
  justifyContent: "space-around",
  position: "relative",
  "@media(max-width:475px)": {
    gridTemplateColumns: "325px",
    justifyContent: "center",
    rowGap: "0px",
  },
  "@media(max-width:350px)": {
    gridTemplateColumns: "300px",
    justifyContent: "center",
    rowGap: "0px",
  },
  overflow: "hidden",
}));

const ColumnOne = styled("div", { name: "ColumnOne", slot: "Wrapper" })(() => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateRows: "repeat(3,max-content)",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  marginTop: "40px",
  "@media(max-width:475px)": {
    marginLeft: "10px",
  },
}));

const ColumnTwo = styled("div", { name: "ColumnTwo", slot: "Wrapper" })(() => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  display: "grid",
  gridTemplateRows: "repeat(4,max-content)",
  alignItems: "center",
  justifyItems: "center",
  position: "relative",
  marginTop: "40px",
  marginBottom: "40px",
  gap: "20px",
  "@media(max-width:475px)": {
    marginTop: "20px",
    marginBottom: "10px",
  },
  "@media(max-width:350px)": {
    minWidth: "100%",
    width: "100%",
    maxWidth: "100%",
  },
}));

const SocialIcons = styled("div", {
  name: "SocialIcons",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(30px,30px)",
  height: "max(30px,30px)",
  backgroundColor: theme.palette.secondary.light,
  borderRadius: "5px",
  display: "grid",
  placeItems: "center",
  gap: "0px",

  "@media (max-width:1050px)": {
    minWidth: "max-content",
    width: "max-content",
    maxWidth: "max-content",
    minHeight: "max-content",
    height: "max-content",
    maxHeight: "max-content",
    padding: "2.5px",
  },
}));
const ContactInfoContainer = styled("div", {
  name: "ContactInfoContainer",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(100%,100%)",
  height: "max(max-content,max-content)",

  display: "grid",
  gridTemplateColumns: "30px max-content",
  alignItems: "center",
  justifyContent: "space-between",
  fontSize: "22px",
  paddingBottom: "13px",

  gap: "10px",
  color: theme.palette.secondary.light,
  "@media (max-width:1150px)": {
    fontSize: "16px",
    gridTemplateColumns: "20px max-content",
  },
  "@media (max-width:1000px)": {
    paddingTop: "2.5px",
  },
  "@media (max-width:980px)": {
    fontSize: "14px",
  },

  "@media (max-width:880px)": {
    fontSize: "12px",
    gridTemplateColumns: "20px max-content",
    paddingBottom: "11px",
  },
  "@media (max-width:760px)": {
    paddingBottom: "19.5px",
  },
  "@media (max-width:730px)": {
    paddingBottom: "5px",
  },
  "@media (max-width:660px)": {
    paddingBottom: "0px",
  },
  "@media(max-width:475px)": {
    paddingBottom: "10px",
    width: "max(250px,250px)",
  },
}));

const StyledFooterNavLink = styled(NavLink, {
  name: "StyledFooterNavLink",
  slot: "Wrapper",
})(({ theme }) => ({
  backgroundColor: "inherit",

  borderRadius: "5px",
  textDecoration: "none",
  textTransform: "uppercase",
  boxSizing: "content-box",
  color: theme.palette.secondary.light,
  fontSize: "21px",
  textAlign: "center",
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  display: "inline-block",
  padding: "10px 20px",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },

  "@media (max-width:1150px)": {
    fontSize: "16px",
  },
  "@media (max-width:980px)": {
    fontSize: "14px",
  },
  "@media (max-width:880px)": {
    fontSize: "12px",
  },
  "@media (max-width:740px)": {
    fontSize: "10px",
    padding: "5px",
  },
  "@media (max-width:680px)": {
    fontSize: "8px",
    padding: "5px 10px",
  },
  "@media(max-width:475px)": {
    fontSize: "22px",
    padding: "10px 20px",
  },
}));
const StyledContactText = styled(Typography, {
  name: "StyledContactText",
  slot: "Wrapper",
})(() => ({
  color: "secondary.light",
  fontSize: "18px",
  "@media (max-width:1150px)": {
    fontSize: "16px",
  },
  "@media (max-width:980px)": {
    fontSize: "14px",
  },
  "@media (max-width:880px)": {
    fontSize: "12px",
  },
  "@media (max-width:740px)": {
    fontSize: "10px",
  },
  "@media (max-width:680px)": {
    fontSize: "8px",
  },
  "@media(max-width:475px)": {
    fontSize: "22px",
  },
}));

const StyledFooterHeading = styled(Typography, {
  name: "StyledFooterHeading",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "22px",

  textAlign: "center",
  "@media (max-width:1050px)": {
    fontSize: "16px",
  },
  "@media (max-width:880px)": {
    fontSize: "14px",
  },
  "@media (max-width:760px)": {
    fontSize: "12px",
  },
  "@media(max-width:475px)": {
    fontSize: "32px",
    width: "325px",
  },
  "@media(max-width:350px)": {
    minWidth: "100%",
    width: "100%",
    maxWidth: "100%",
  },
}));

const StyledLink = styled(Link, {
  name: "StyledLink",
  slot: "Wrapper",
})(({ theme }) => ({
  color: theme.palette.secondary.light,
  fontSize: "21px",

  textAlign: "center",
  textDecoration: "none",
  textTransform: "uppercase",
  borderRadius: "5px",

  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  displat: "inline-block",
  padding: "10px 20px",

  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "@media (max-width:1150px)": {
    fontSize: "16px",
  },
  "@media (max-width:980px)": {
    fontSize: "14px",
  },
  "@media (max-width:880px)": {
    fontSize: "12px",
  },
  "@media (max-width:740px)": {
    fontSize: "10px",
    padding: "5px",
  },
  "@media (max-width:680px)": {
    fontSize: "8px",
    padding: "5px 10px",
  },
  "@media(max-width:475px)": {
    fontSize: "22px",
    padding: "10px 20px",
  },
}));

export {
  TopContainer,
  ColumnOne,
  ColumnTwo,
  SocialIcons,
  ContactInfoContainer,
  StyledContactText,
  StyledFooterHeading,
  StyledLink,
  StyledFooterNavLink,
};
