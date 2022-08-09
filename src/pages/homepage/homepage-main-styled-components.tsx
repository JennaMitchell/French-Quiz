import { styled } from "@mui/material/styles";
import { NavLink } from "react-router-dom";

const SectionContentContainer = styled("div", {
  name: "SectionContentContainer",
  slot: "Wrapper",
})(() => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
}));
const GetStartedButton = styled(NavLink, {
  name: "GetStartedButton",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(175px,175px)",
  height: "max(75px,75px)",
  padding: "0px",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  borderRadius: "10px",
  fontSize: "32px",
  textDecoration: "none",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.light,
  transition: "all 0.5s",
  "&:hover": {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    boxShadow: "0 0 10px white",
  },
  "@media(max-width:560px)": {
    minWidth: "max-content",
    width: "max-content",
    maxWidth: "max-content",
    minHeight: "max-content",
    height: "max-content",
    maxHeight: "max-content",
    padding: "20px",
  },
}));
export { SectionContentContainer, GetStartedButton };
