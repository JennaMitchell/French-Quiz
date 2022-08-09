import { Typography } from "@mui/material";
import { SectionContainer } from "../../../components/generic-components/generic-components";
import FeatureOverviewNavMenu from "./feature-overview-nav-menu";
import FeatureOverviewNavContent from "./feature-overview-nav-content";
const FeatureOverviewSection: React.FC = () => {
  return (
    <SectionContainer>
      <Typography
        variant="h2"
        sx={{
          marginTop: "40px",
          "@media(max-width:650px)": { fontSize: "48px" },
          "@media(max-width:450px)": { fontSize: "42px", marginTop: "20px" },
          "@media(max-width:380px)": { fontSize: "38px" },
        }}
      >
        Study Features
      </Typography>
      <FeatureOverviewNavMenu />
      <FeatureOverviewNavContent />
    </SectionContainer>
  );
};
export default FeatureOverviewSection;
