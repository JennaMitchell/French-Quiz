import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import flashCardIcon from "../../../images/homepage-images/flash-cards.png";
import paperIcon from "../../../images/homepage-images/paper.png";
import pencilIcon from "../../../images/homepage-images/pencil.png";
import quizIcon from "../../../images/homepage-images/quiz.png";
import hightlightImage from "../../../images/homepage-images/blue-hightlight.png";
import { mainStoreSliceActions } from "../../../store/store";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";

const TopContainer = styled("div", {
  name: "TopContainer",
  slot: "Wrapper",
})(() => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  display: "flex",
  placeItems: "center",
  padding: "10px 20px",
  gap: "120px",
  marginTop: "40px",
  position: "relative",
}));

const FeatureButton = styled("div", {
  name: "FeatureButton",
  slot: "Wrapper",
})(() => ({
  color: "inherit",
  transition: "all 0.5s",
  width: "max(max-content,max-content)",
  height: "max(max-content,max-content)",
  display: "grid",
  gap: "10px",
  gridTemplateRows: "repeat(2,max-content)",
  placeItems: "center",
  zIndex: "2",
  position: "relative",
}));

const FeatureIcon = styled("img", {
  name: "FeatureIcon",
  slot: "Wrapper",
})(() => ({
  transition: "all 0.5s",
  width: "max(70px,70px)",
  height: "max(70px,70px)",
  placeItems: "center",
  zIndex: "2",
  position: "relative",
}));

const HightlightImage = styled("img", {
  name: "HightlightImage",
  slot: "Wrapper",
})(() => ({
  transition: "all 0.5s",
  width: "max(100px,100px)",
  height: "max(100px,100px)",
  placeItems: "center",
  zIndex: "1",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-70%)",
}));

const FeatureOverviewNavMenu: React.FC = () => {
  const homepageSelectedSection = useAppSelector(
    (state) => state.mainStore.homepageSelectedSection
  );
  const dispatch = useAppDispatch();

  const buttonHandler = (type: string) => {
    if (type !== homepageSelectedSection) {
      dispatch(mainStoreSliceActions.setHomepageSelectedSection(type));
    }
  };

  const practiceSheetsButtonHandler = () => {
    buttonHandler("Practice Sheets");
  };

  const quizesButtonHandler = () => {
    buttonHandler("Quizes");
  };

  const grammarTestButtonHandler = () => {
    buttonHandler("Grammar Test");
  };

  const flashcardsButtonHandler = () => {
    buttonHandler("Flashcards");
  };

  return (
    <TopContainer>
      <FeatureButton>
        <FeatureIcon src={flashCardIcon} onClick={flashcardsButtonHandler} />
        <Typography variant="h6" color="secondary.dark">
          Flashcards
        </Typography>
        {homepageSelectedSection === "Flashcards" && (
          <HightlightImage src={hightlightImage} />
        )}
      </FeatureButton>
      <FeatureButton>
        <FeatureIcon src={paperIcon} onClick={practiceSheetsButtonHandler} />
        {homepageSelectedSection === "Practice Sheets" && (
          <HightlightImage src={hightlightImage} />
        )}
        <Typography variant="h6" color="secondary.dark">
          Practice Sheets
        </Typography>
      </FeatureButton>
      <FeatureButton>
        <FeatureIcon src={quizIcon} onClick={quizesButtonHandler} />
        <Typography variant="h6" color="secondary.dark">
          Quizes
        </Typography>
        {homepageSelectedSection === "Quizes" && (
          <HightlightImage src={hightlightImage} />
        )}
      </FeatureButton>
      <FeatureButton>
        <FeatureIcon src={pencilIcon} onClick={grammarTestButtonHandler} />
        <Typography variant="h6" color="secondary.dark">
          Grammar Test
        </Typography>
        {homepageSelectedSection === "Grammar Test" && (
          <HightlightImage src={hightlightImage} />
        )}
      </FeatureButton>
    </TopContainer>
  );
};
export default FeatureOverviewNavMenu;
