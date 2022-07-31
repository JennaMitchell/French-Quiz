import {
  TopContainer,
  FrontFlashCardContainer,
  ClickToFlipContainer,
  RotateIcon,
  NextIconButton,
  PreviousIconButton,
} from "./flashcards-main-styled-components";

import { useAppSelector } from "../../store/hooks";
import { Typography } from "@mui/material";
import { useState } from "react";

const FlashcardsMain: React.FC = () => {
  type FlashcardDatabaseTypes = {
    answer: string;
    question: string;
  };
  const flashcardsDB: FlashcardDatabaseTypes[] = useAppSelector(
    (state) => state.mainStore.flashcardsDB
  );

  const [flashcardHover, setFlashcardHover] = useState(false);
  const [frontFaceShowing, setFrontFaceShowing] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  let question = "";
  let answer = "";

  const flashcardHoverHandler = () => {
    setFlashcardHover(!flashcardHover);
  };
  const flashcardClickedHandler = () => {
    setFrontFaceShowing(!frontFaceShowing);
    setFlashcardHover(true);
  };

  const previousButtonHandler = () => {
    if (currentQuestion === 0) {
      setCurrentQuestion(flashcardsDB.length - 1);
    } else {
      setCurrentQuestion(currentQuestion - 1);
    }
    if (!frontFaceShowing) {
      setFrontFaceShowing(true);
    }
  };

  const nextButtonHandler = () => {
    if (currentQuestion === flashcardsDB.length - 1) {
      setCurrentQuestion(0);
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
    if (!frontFaceShowing) {
      setFrontFaceShowing(true);
    }
  };

  if (flashcardsDB.length !== 0) {
    question = flashcardsDB[currentQuestion].question;
    answer = flashcardsDB[currentQuestion].answer;
  }

  return (
    <TopContainer>
      <FrontFlashCardContainer
        onMouseEnter={flashcardHoverHandler}
        onMouseLeave={flashcardHoverHandler}
        onClick={flashcardClickedHandler}
        sx={{
          transform: `${
            frontFaceShowing ? "rotateX(0deg)" : "rotateX(-180deg)"
          }`,
        }}
      >
        <ClickToFlipContainer sx={{ opacity: `${flashcardHover && 1}` }}>
          <Typography variant="h6" color="secondary.light">
            click to flip
          </Typography>
          <RotateIcon />
        </ClickToFlipContainer>

        <Typography variant="h4" color="secondary.light">
          {question}
        </Typography>
      </FrontFlashCardContainer>
      <FrontFlashCardContainer
        onMouseEnter={flashcardHoverHandler}
        onMouseLeave={flashcardHoverHandler}
        onClick={flashcardClickedHandler}
        sx={{
          transform: `${
            frontFaceShowing ? "rotateX(180deg)" : "rotateX(0deg)"
          }`,
        }}
      >
        <ClickToFlipContainer sx={{ opacity: `${flashcardHover && 1}` }}>
          <Typography variant="h6" color="secondary.light">
            click to flip
          </Typography>
          <RotateIcon />
        </ClickToFlipContainer>
        <Typography variant="h4" color="secondary.light">
          {answer}
        </Typography>
      </FrontFlashCardContainer>
      <NextIconButton onClick={nextButtonHandler} />
      <PreviousIconButton onClick={previousButtonHandler} />
    </TopContainer>
  );
};
export default FlashcardsMain;
