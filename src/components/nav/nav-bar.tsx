import { AppBar, Typography } from "@mui/material";
import {
  StyledToolBar,
  LogoContainer,
  LogoImage,
  LogoTitleContainer,
  MenuButtonsContainer,
  StyledActiveNavButton,
  StyledInactiveNavButton,
} from "./nav-bar-styled-components";
import { useBeforeunload } from "react-beforeunload";

import logo from "../../images/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { DatabaseStates, storeActions } from "../../store/store";
const NavBar: React.FC = () => {
  const activePage = useSelector((state: DatabaseStates) => state.activePage);
  const acceptableHomeReturnValues = [
    "Home",
    "Flashcards",
    "Practice Sheet Generator",
    "Quiz",
    "Grammar Test",
  ];

  let localStorageActivePage: string = localStorage.getItem("activePage") ?? "";
  // when retruend it's a string of "thing" parthesis included to get around this we need to remove the ""'s

  if (localStorageActivePage.length !== 0) {
    localStorageActivePage = localStorageActivePage.slice(1);
    localStorageActivePage = localStorageActivePage.slice(
      0,
      localStorageActivePage.length - 1
    );
  }

  let refreshed: string = localStorage.getItem("refreshed") ?? "";

  type NavLinkDatabase = {
    title: string;
    link: string;
    function: any;
  };
  const dispatch = useDispatch();
  const navButtonHandler = (type: string) => {
    if (activePage !== type) {
      dispatch(storeActions.setActivePage(type));
    }
  };
  // console.log(activePage);
  // console.log(localStorageActivePage);
  // console.log(acceptableHomeReturnValues.includes(localStorageActivePage));
  // console.log("Practice Sheet Generator" === localStorageActivePage);
  useBeforeunload(() => {
    localStorage.setItem("refreshed", "true");

    localStorage.setItem("activePage", JSON.stringify(activePage));
  });

  if (
    refreshed &&
    acceptableHomeReturnValues.includes(localStorageActivePage)
  ) {
    dispatch(storeActions.setActivePage(localStorageActivePage));
    localStorage.removeItem("activePage");
    localStorage.setItem("refreshed", "false");
  }

  const homeButtonHandler = (): void => {
    navButtonHandler("Home");
  };
  let homePointer: () => void;
  homePointer = homeButtonHandler;
  const flashcardsButtonHandler = (): void => {
    navButtonHandler("Flashcards");
  };
  let flashcardButtonsPointer: () => void;
  flashcardButtonsPointer = flashcardsButtonHandler;
  const praticeSheetsButtonHandler = (): void => {
    navButtonHandler("Practice Sheet Generator");
  };
  let praticeSheetsPointer: () => void;
  praticeSheetsPointer = praticeSheetsButtonHandler;
  const quizButtonHandler = (): void => {
    navButtonHandler("Quiz");
  };
  let quizPointer: () => void;
  quizPointer = quizButtonHandler;
  const grammarTestHandler = (): void => {
    navButtonHandler("Grammar Test");
  };
  let grammarTestPointer: () => void;
  grammarTestPointer = grammarTestHandler;

  const navLinkDatabase: NavLinkDatabase[] = [
    { title: "Home", link: "/home", function: homePointer },
    {
      title: "Flashcards",
      link: "/flashcards",
      function: flashcardButtonsPointer,
    },
    {
      title: "Practice Sheet Generator",
      link: "/practice-sheet-generator",
      function: praticeSheetsPointer,
    },
    { title: "Quiz", link: "/quiz", function: quizPointer },
    {
      title: "Grammar Test",
      link: "/grammar-test",
      function: grammarTestPointer,
    },
  ];
  const renderReadyNavButtons = navLinkDatabase.map(
    (buttonData, index: number) => {
      if (activePage === buttonData.title) {
        return (
          <StyledActiveNavButton
            key={index}
            to={buttonData.link}
            onClick={buttonData.function}
          >
            &nbsp;{buttonData.title}&nbsp;
          </StyledActiveNavButton>
        );
      } else {
        return (
          <StyledInactiveNavButton
            key={index}
            to={buttonData.link}
            onClick={buttonData.function}
          >
            &nbsp;{buttonData.title}&nbsp;
          </StyledInactiveNavButton>
        );
      }
    }
  );
  return (
    <AppBar
      sx={{
        boxShadow: "0",
        width: `100%`,
        zIndex: "2",
        position: `${activePage === "Home" ? "absolute" : "relative"}`,
        top: "0",
        left: "0",
        "@media (max-width:1050px)": {
          minHeight: "80px",
        },
        "@media (max-width:880px)": {
          minHeight: "60px",
        },
        backgroundColor: `${
          activePage === "Home" ? "transparent" : "primary.dark"
        }`,
      }}
    >
      <StyledToolBar>
        <LogoTitleContainer>
          <LogoContainer>
            <LogoImage src={logo} alt="Logo" />
          </LogoContainer>
          <Typography variant="h4" color="white">
            French Quiz
          </Typography>
        </LogoTitleContainer>
        <MenuButtonsContainer>{renderReadyNavButtons}</MenuButtonsContainer>
      </StyledToolBar>
    </AppBar>
  );
};
export default NavBar;
