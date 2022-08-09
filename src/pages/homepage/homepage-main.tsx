import { Typography } from "@mui/material";
import {
  SectionContentContainer,
  GetStartedButton,
} from "./homepage-main-styled-components";

import { SectionContainer } from "../../components/generic-components/generic-components";
import voyageImage from "../../images/homepage-images/voyage.jpg";
import FeatureOverviewSection from "./feature-overview-section/feature-overview-section";

import { mainStoreSliceActions } from "../../store/store";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { useEffect } from "react";

const HomepageMain = () => {
  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.mainStore.activePage);
  // useEffect
  useEffect(() => {
    if (activePage !== "Home") {
      dispatch(mainStoreSliceActions.setActivePage("Home"));
    }
  });
  return (
    <>
      <SectionContainer
        sx={{
          height: "max(1000px,1000px)",
          backgroundImage: `url(${voyageImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          "@media(max-width:560px)": {
            height: "max(800px,800px)",
          },
          "@media(max-width:400px)": {
            height: "max(700px,700px)",
          },
        }}
      >
        <SectionContentContainer>
          <Typography
            variant="h2"
            sx={{
              marginBottom: "20px",
              fontWeight: "bold",
              color: "secondary.light",
              "@media(max-width:560px)": {
                fontSize: "48px",
                width: "max(100%,100%)",
              },
              "@media(max-width:400px)": {
                fontSize: "36px",
              },
            }}
          >
            Start Today !
          </Typography>
          <Typography
            variant="h4"
            sx={{
              marginBottom: "40px",
              width: "max(550px,550px)",
              color: "secondary.light",
              "@media(max-width:560px)": {
                fontSize: "24px",
                width: "max(85%,85%)",
              },
              "@media(max-width:400px)": {
                fontSize: "20px",
              },
            }}
          >
            Start your language learning journey today by taking a quiz
          </Typography>
          <GetStartedButton
            to="/quiz"
            sx={{
              "@media(max-width:560px)": {
                fontSize: "24px",
              },
              "@media(max-width:400px)": {
                fontSize: "20px",
              },
            }}
          >
            Quiz Me
          </GetStartedButton>
        </SectionContentContainer>
      </SectionContainer>
      <FeatureOverviewSection />
    </>
  );
};

export default HomepageMain;
