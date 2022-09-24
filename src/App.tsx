import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/nav/nav-bar";
import "./App.css";
import HomepageMain from "./pages/homepage/homepage-main";
import FlashcardsMain from "./pages/flashcards/flashcards-main";
import Footer from "./components/footer/footer";
import LocalDataBaseSetup from "./firebase/local-database-setup";
import PracticeSheetsGenerator from "./pages/pratice-sheets-generator/practice-sheets-generator";
import QuizMainPage from "./pages/quiz/quiz-main-page";
import ScenariosMainPage from "./pages/scenarios/scenarios-main";
import Credits from "./pages/credits/credits";

import { useAppSelector } from "./store/hooks";
export const theme = createTheme({
  palette: {
    primary: {
      main: "#457B9D",
      light: "#a8DaDC",
      dark: "#1D3557",
    },
    secondary: {
      main: "#616161",
      light: "#f5f5f5",
      dark: "#212121",
    },
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
    fontWeightRegular: 400,
    fontWeightBold: 700,
  },
});

function App() {
  const firebaseDataLoaded = useAppSelector(
    (state) => state.mainStore.firebaseDataLoaded
  );
  if (!firebaseDataLoaded) {
    document.body.classList.add("overflowHidden");
  } else {
    if (document.body.classList.contains("overflowHidden")) {
      document.body.classList.remove("overflowHidden");
    }
  }
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LocalDataBaseSetup />
        <Routes>
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route
            path="/home"
            element={
              <>
                <NavBar />
                <HomepageMain />
                <Footer />
              </>
            }
          />
          <Route
            path="/flashcards"
            element={
              <>
                <NavBar />
                <FlashcardsMain />
                <Footer />
              </>
            }
          />
          <Route
            path="/practice-sheet-generator"
            element={
              <>
                <NavBar />
                <PracticeSheetsGenerator />
                <Footer />
              </>
            }
          />
          <Route
            path="/quiz"
            element={
              <>
                <NavBar />
                <QuizMainPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/scenarios"
            element={
              <>
                <NavBar />
                <ScenariosMainPage />
                <Footer />
              </>
            }
          />
          <Route
            path="/credits"
            element={
              <>
                <NavBar />
                <Credits />
                <Footer />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
