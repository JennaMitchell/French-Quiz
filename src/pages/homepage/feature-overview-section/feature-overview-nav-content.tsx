import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import notebookImage from "../../../images/homepage-images/notebook.jpg";
import flashcardsPhoto from "../../../images/homepage-images/flashcards-photo.jpg";
import quizPhoto from "../../../images/homepage-images/quiz-photo.jpg";
import grammarTestPhoto from "../../../images/homepage-images/grammar-test-photo.jpg";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { hompageFeatureDB } from "../../../store/store";
import { mainStoreSliceActions } from "../../../store/store";
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
const LinkButton = styled(NavLink, {
  name: "LinkButton",
  slot: "Wrapper",
})(({ theme }) => ({
  minWidth: "max-content",
  width: "max-content",
  maxWidth: "max-content",
  minHeight: "max-content",
  height: "max-content",
  maxHeight: "max-content",
  padding: "10px 15px",
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
    boxShadow: "0 0 10px black",
  },
}));

const FeatureOverviewNavContent: React.FC = () => {
  const homepageFeatureDatabase: hompageFeatureDB = useAppSelector(
    (state) => state.mainStore.homepageFeatureDatabase
  );
  const homepageSelectedSection = useAppSelector(
    (state) => state.mainStore.homepageSelectedSection
  );
  const dispatch = useAppDispatch();

  const navButtonHandler = () => {
    dispatch(
      mainStoreSliceActions.setActivePage(
        homepageFeatureDatabase[homepageSelectedSection].title
      )
    );
  };
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
        <LinkButton
          onClick={navButtonHandler}
          to={`${homepageFeatureDatabase[homepageSelectedSection].link}`}
        >
          {/* @ts-ignore  */}
          {homepageFeatureDatabase[homepageSelectedSection].title}
        </LinkButton>
      </InfoContainer>
      {homepageSelectedSection === "Practice Sheets" && (
        <ImageContainer src={notebookImage} alt="notebook" />
      )}
      {homepageSelectedSection === "Quizes" && (
        <ImageContainer src={quizPhoto} alt="quiz" />
      )}
      {homepageSelectedSection === "Flashcards" && (
        <ImageContainer src={flashcardsPhoto} alt="flashcard" />
      )}
      {homepageSelectedSection === "Grammar Test" && (
        <ImageContainer src={grammarTestPhoto} alt="notebook" />
      )}
    </TopContainer>
  );
};
export default FeatureOverviewNavContent;
