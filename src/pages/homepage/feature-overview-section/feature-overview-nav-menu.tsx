import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import flashCardIcon from "../../../images/homepage-images/flash-cards.png";
import paperIcon from "../../../images/homepage-images/paper.png";
import pencilIcon from "../../../images/homepage-images/pencil.png";
import quizIcon from "../../../images/homepage-images/quiz.png";
import hightlightImage from "../../../images/homepage-images/blue-hightlight.png";
import { mainStoreSliceActions } from "../../../store/store";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { useState } from "react";

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
  "@media(max-width:850px)": {
    gap: "50px",
  },
  "@media(max-width:650px)": {
    display: "grid",
    gridTemplateRow: "max-content max-content",
    gridTemplateColumns: "max-content max-content",
    marginTop: "20px",
  },
  "@media(max-width:370px)": {
    display: "grid",
    gridTemplateRow: "max-content max-content",
    gridTemplateColumns: "max-content max-content",
    padding: "0px",
    gap: "20px",
  },
}));

const FeatureButton = styled("div", {
  name: "FeatureButton",
  slot: "Wrapper",
})(({ theme }) => ({
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
  "@media(max-width:850px)": {
    width: "max(50px,50px)",
    height: "max(50px,50px)",
  },
  "@media(max-width:650px)": {
    width: "max(40px,40px)",
    height: "max(40px,40px)",
  },
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
  translate: "-50% -70%",
  "@media(max-width:850px)": {
    width: "max(70px,70px)",
    height: "max(70px,70px)",
  },
  "@media(max-width:650px)": {
    width: "max(60px,60px)",
    height: "max(60px,60px)",
    top: "40%",
  },
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
  const [currentMousedOverSection, setCurrentMouseOverSection] = useState("");

  const practiceSheetsButtonHandler = () => {
    buttonHandler("Practice Sheets");
  };

  const quizesButtonHandler = () => {
    buttonHandler("Quizes");
  };

  const realLifeScenarioButtonHandler = () => {
    buttonHandler("Scenarios");
  };

  const flashcardsButtonHandler = () => {
    buttonHandler("Flashcards");
  };
  const flashcardMouseEventHandler = () => {
    if (currentMousedOverSection !== "Flashcards") {
      setCurrentMouseOverSection("Flashcards");
    } else {
      setCurrentMouseOverSection("");
    }
  };

  const practiceSheetsMouseEventHandler = () => {
    if (currentMousedOverSection !== "Practice Sheets") {
      setCurrentMouseOverSection("Practice Sheets");
    } else {
      setCurrentMouseOverSection("");
    }
  };
  const quizesMouseEventHandler = () => {
    if (currentMousedOverSection !== "Quizes") {
      setCurrentMouseOverSection("Quizes");
    } else {
      setCurrentMouseOverSection("");
    }
  };
  const scenariosMouseEventHandler = () => {
    if (currentMousedOverSection !== "Scenarios") {
      setCurrentMouseOverSection("Scenarios");
    } else {
      setCurrentMouseOverSection("");
    }
  };

  return (
    <TopContainer>
      <FeatureButton
        onMouseEnter={flashcardMouseEventHandler}
        onMouseLeave={flashcardMouseEventHandler}
      >
        <FeatureIcon src={flashCardIcon} onClick={flashcardsButtonHandler} />
        <Typography variant="h6" color="secondary.dark">
          Flashcards
        </Typography>
        {homepageSelectedSection === "Flashcards" && (
          <HightlightImage src={hightlightImage} />
        )}
        {currentMousedOverSection === "Flashcards" && (
          <HightlightImage src={hightlightImage} />
        )}
      </FeatureButton>
      <FeatureButton
        onMouseEnter={practiceSheetsMouseEventHandler}
        onMouseLeave={practiceSheetsMouseEventHandler}
      >
        <FeatureIcon src={paperIcon} onClick={practiceSheetsButtonHandler} />
        {homepageSelectedSection === "Practice Sheets" && (
          <HightlightImage src={hightlightImage} />
        )}
        {currentMousedOverSection === "Practice Sheets" && (
          <HightlightImage src={hightlightImage} />
        )}
        <Typography variant="h6" color="secondary.dark">
          Practice Sheets
        </Typography>
      </FeatureButton>
      <FeatureButton
        onMouseEnter={quizesMouseEventHandler}
        onMouseLeave={quizesMouseEventHandler}
      >
        <FeatureIcon src={quizIcon} onClick={quizesButtonHandler} />
        <Typography variant="h6" color="secondary.dark">
          Quizes
        </Typography>
        {homepageSelectedSection === "Quizes" && (
          <HightlightImage src={hightlightImage} />
        )}
        {currentMousedOverSection === "Quizes" && (
          <HightlightImage src={hightlightImage} />
        )}
      </FeatureButton>
      <FeatureButton
        onMouseEnter={scenariosMouseEventHandler}
        onMouseLeave={scenariosMouseEventHandler}
      >
        <FeatureIcon src={pencilIcon} onClick={realLifeScenarioButtonHandler} />
        <Typography variant="h6" color="secondary.dark">
          Scenarios
        </Typography>
        {homepageSelectedSection === "Scenarios" && (
          <HightlightImage src={hightlightImage} />
        )}
        {currentMousedOverSection === "Scenarios" && (
          <HightlightImage src={hightlightImage} />
        )}
      </FeatureButton>
    </TopContainer>
  );
};
export default FeatureOverviewNavMenu;
