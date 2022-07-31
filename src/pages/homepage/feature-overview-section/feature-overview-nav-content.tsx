import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import notebookImage from "../../../images/homepage-images/notebook.jpg";
import { ThemeButton } from "../../../components/generic-components/generic-components";
import { useAppSelector } from "../../../store/hooks";
const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(() => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(800px,800px)",
  height: "max(max-content,max-content)",
  display: "grid",
  gridTemplateColumns: "max-content max-content",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "20px 20px",

  marginTop: "40px",
  marginBottom: "40px",
  position: "relative",
  boxShadow: "0 0 20px grey",
}));
const InfoContainer = styled("div", {
  name: "InfoContainer",
  slot: "Wrapper",
})(() => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(350px,350px)",
  height: "max(max-content,max-content)",
  display: "flex",
  flexDirection: "column",
  placeItems: "center",
  padding: "10px 20px",
  gap: "10px",
  position: "relative",
}));
const ImageContainer = styled("img", {
  name: "ImageContainer",
  slot: "Wrapper",
})(() => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(400px,400px)",
  height: "max(400px,400px)",
  display: "flex",
  placeItems: "center",
  padding: "10px 20px",

  position: "relative",
}));
const LinkButton = styled(ThemeButton, {
  name: "LinkButton",
  slot: "Wrapper",
})(() => ({
  padding: "10px 20px",
  fontSize: "24px",
  position: "relative",
  borderRadius: "0px",
  marginTop: "10px",
}));

const FeatureOverviewNavContent: React.FC = () => {
  const homepageFeatureDatabase = useAppSelector(
    (state) => state.mainStore.homepageFeatureDatabase
  );
  const homepageSelectedSection = useAppSelector(
    (state) => state.mainStore.homepageSelectedSection
  );
  return (
    <TopContainer>
      <InfoContainer>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          {/* @ts-ignore  */}
          {homepageFeatureDatabase[homepageSelectedSection].title}
        </Typography>
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          {/* @ts-ignore  */}
          {homepageFeatureDatabase[homepageSelectedSection].description}
        </Typography>
        <LinkButton>
          {/* @ts-ignore  */}
          {homepageFeatureDatabase[homepageSelectedSection].title}
        </LinkButton>
      </InfoContainer>
      <ImageContainer src={notebookImage} alt="notebook" />
    </TopContainer>
  );
};
export default FeatureOverviewNavContent;
