import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import notebookImage from "../../../images/homepage-images/notebook.jpg";
import flashcardsPhoto from "../../../images/homepage-images/flashcards-photo.jpg";
import quizPhoto from "../../../images/homepage-images/quiz-photo.jpg";
import scenariosPhoto from "../../../images/homepage-images/grammar-test-photo.jpg";
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
  "@media(max-width:850px)": { width: "max(600px,600px)" },
  "@media(max-width:650px)": {
    width: "max(400px,400px)",
    marginTop: "20px",
    marginBottom: "20px",
  },
  "@media(max-width:450px)": {
    width: "max(300px,300px)",
    gridTemplateColumns: "max-content",
    rowGap: "20px",
  },
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
  "@media(max-width:850px)": {
    width: "max(200px,200px)",
  },
  "@media(max-width:650px)": { width: "max(150px,150px)", padding: "5px 10px" },
  "@media(max-width:450px)": {
    width: "max(250px,250px)",
    padding: "0px",
  },
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
  "@media(max-width:850px)": {
    width: "max(300px,300px)",
    height: "max(300px,300px)",
  },
  "@media(max-width:650px)": {
    width: "max(200px,200px)",
    height: "max(200px,200px)",
    padding: "0px",
    paddingLeft: "20px",
  },
  "@media(max-width:450px)": {
    width: "max(250px,250px)",
    paddingLeft: "0px",
    marginLeft: "5px",
  },
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
  borderRadius: "5px",
  fontSize: "28px",
  textDecoration: "none",
  backgroundColor: theme.palette.primary.dark,
  color: theme.palette.secondary.light,
  transition: "all 0.5s",

  marginTop: "10px",
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
        <Typography
          variant="h2"
          sx={{
            textAlign: "center",
            "@media(max-width:850px)": { fontSize: "32px" },
            "@media(max-width:650px)": { fontSize: "28px" },
          }}
        >
          {/* @ts-ignore  */}
          {homepageFeatureDatabase[homepageSelectedSection].title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            "@media(max-width:850px)": { fontSize: "16px" },
            "@media(max-width:650px)": { fontSize: "12px" },
          }}
        >
          {/* @ts-ignore  */}
          {homepageFeatureDatabase[homepageSelectedSection].description}
        </Typography>
        <LinkButton
          onClick={navButtonHandler}
          to={`${homepageFeatureDatabase[homepageSelectedSection].link}`}
          sx={{
            textAlign: "center",
            "@media(max-width:850px)": { fontSize: "16px" },
          }}
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
      {homepageSelectedSection === "Scenarios" && (
        <ImageContainer src={scenariosPhoto} alt="notebook" />
      )}
    </TopContainer>
  );
};
export default FeatureOverviewNavContent;
