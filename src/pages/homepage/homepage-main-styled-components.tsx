import { styled } from "@mui/material/styles";
import { ThemeButton } from "../../components/generic-components/generic-components";

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
const GetStartedButton = styled(ThemeButton, {
  name: "GetStartedButton",
  slot: "Wrapper",
})(({ theme }) => ({
  width: "max(175px,175px)",
  height: "max(75px,75px)",
  padding: "10px 20px 10px 20px",
  borderRadius: "10px",
  fontSize: "32px",
}));
export { SectionContentContainer, GetStartedButton };
