import { Typography } from "@mui/material";
import {
  SectionContentContainer,
  GetStartedButton,
} from "./homepage-main-styled-components";
import { SectionContainer } from "../../components/generic-components/generic-components";
import voyageImage from "../../images/homepage-images/voyage.jpg";
import FeatureOverviewSection from "./feature-overview-section/feature-overview-section";
const HomepageMain: React.FC = () => {
  return (
    <>
      <SectionContainer
        sx={{
          height: "max(1000px,1000px)",
          backgroundImage: `url(${voyageImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <SectionContentContainer>
          <Typography
            variant="h2"
            sx={{
              marginBottom: "20px",
              fontWeight: "bold",
              color: "secondary.light",
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
            }}
          >
            Start your language learning journey today by taking a quiz
          </Typography>
          <GetStartedButton>Quiz Me</GetStartedButton>
        </SectionContentContainer>
      </SectionContainer>
      <FeatureOverviewSection />
    </>
  );
};

export default HomepageMain;
