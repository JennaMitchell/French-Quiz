import { AppBar, Typography } from "@mui/material";
import {
  StyledToolBar,
  LogoContainer,
  LogoImage,
  LogoTitleContainer,
  MenuButtonsContainer,
  StyledActiveNavButton,
  StyledInactiveNavButton,
  MobileMenuButton,
  HomepageMobileNavMenuDropDown,
  StyledMenuIcon,
  NonHomepageDropDown,
} from "./nav-bar-styled-components";
import { useBeforeunload } from "react-beforeunload";

import logo from "../../images/logo.png";

import { mainStoreSliceActions } from "../../store/store";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import useMediaQuery from "@mui/material/useMediaQuery";

const NavBar: React.FC = () => {
  const mobileNavMenuActive = useMediaQuery("(max-width:1500px)");
  const activePage = useAppSelector((state) => state.mainStore.activePage);
  const mobileButtonClicked = useAppSelector(
    (state) => state.mainStore.mobileButtonClicked
  );
  const dispatch = useAppDispatch();

  const mobileButtonHandler = () => {
    dispatch(
      mainStoreSliceActions.setMobileButtonClicked(!mobileButtonClicked)
    );
  };

  const acceptableHomeReturnValues = [
    "Home",
    "Flashcards",
    "Practice Sheet Generator",
    "Quiz",
    "Grammar Test",
    "Credits",
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

  const navButtonHandler = (type: string) => {
    if (activePage !== type) {
      dispatch(mainStoreSliceActions.setActivePage(type));
    }
    if (mobileButtonClicked) {
      dispatch(mainStoreSliceActions.setMobileButtonClicked(false));
    }
  };

  useBeforeunload(() => {
    localStorage.setItem("refreshed", "true");

    localStorage.setItem("activePage", JSON.stringify(activePage));
  });

  if (
    refreshed &&
    acceptableHomeReturnValues.includes(localStorageActivePage)
  ) {
    dispatch(mainStoreSliceActions.setActivePage(localStorageActivePage));
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
  const scenariosTestHandler = (): void => {
    navButtonHandler("Scenarios");
  };
  let scenariosTestPointer: () => void;
  scenariosTestPointer = scenariosTestHandler;
  const creditsTestHandler = (): void => {
    navButtonHandler("Credits");
  };
  let creditsTestPointer: () => void;
  creditsTestPointer = creditsTestHandler;

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
      title: "Scenarios",
      link: "/scenarios",
      function: scenariosTestPointer,
    },
    {
      title: "Credits",
      link: "/credits",
      function: creditsTestPointer,
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
            sx={{
              "@media(max-width:600px)": {
                fontSize: "16px",
              },
              "@media(max-width:470px)": { fontSize: "12px" },
            }}
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
            sx={{
              "@media(max-width:600px)": {
                fontSize: "16px",
              },
              "@media(max-width:470px)": { fontSize: "12px" },
            }}
          >
            &nbsp;{buttonData.title}&nbsp;
          </StyledInactiveNavButton>
        );
      }
    }
  );
  return (
    <>
      <AppBar
        sx={{
          boxShadow: "0",
          width: `100%`,
          zIndex: "3",
          position: `${activePage === "Home" ? "absolute" : "relative"}`,
          top: "0",
          left: "0",

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
            <Typography
              variant="h4"
              color="white"
              sx={{
                "@media(max-width:560px)": { fontSize: "28px" },
                "@media(max-width:470px)": { fontSize: "22px" },
              }}
            >
              French Quiz
            </Typography>
          </LogoTitleContainer>
          {!mobileNavMenuActive && (
            <MenuButtonsContainer>{renderReadyNavButtons}</MenuButtonsContainer>
          )}
          {mobileNavMenuActive && (
            <MobileMenuButton onClick={mobileButtonHandler}>
              <StyledMenuIcon />
            </MobileMenuButton>
          )}
          {mobileNavMenuActive && activePage === "Home" && (
            <HomepageMobileNavMenuDropDown
              sx={{
                transform: `${mobileButtonClicked ? "scale(1)" : "scale(0)"}`,
                transition: `${
                  mobileButtonClicked ? "all 0.5s ease-out" : "all 0.5s ease-in"
                }`,
              }}
            >
              {renderReadyNavButtons}
            </HomepageMobileNavMenuDropDown>
          )}
        </StyledToolBar>
      </AppBar>
      {mobileNavMenuActive && activePage !== "Home" && (
        <NonHomepageDropDown
          sx={{
            top: `${mobileButtonClicked ? "100px" : "-300px"}`,
            transition: `${
              mobileButtonClicked ? "all 0.5s ease-out" : "all 0.5s ease-in"
            }`,
            "@media(max-width:680px)": {
              top: `${mobileButtonClicked ? "100px" : "-250px"}`,
            },
            "@media(max-width:560px)": {
              top: `${mobileButtonClicked ? "90px" : "-250px"}`,
            },
            "@media(max-width:475px)": {
              top: `${mobileButtonClicked ? "80px" : "-250px"}`,
            },
          }}
        >
          {renderReadyNavButtons}
        </NonHomepageDropDown>
      )}
    </>
  );
};
export default NavBar;
