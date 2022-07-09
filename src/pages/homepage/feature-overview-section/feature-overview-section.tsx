import { Typography } from "@mui/material";
import { SectionContainer } from "../../../components/generic-components/generic-components";
import FeatureOverviewNavMenu from "./feature-overview-nav-menu";
import FeatureOverviewNavContent from "./feature-overview-nav-content";
const FeatureOverviewSection: React.FC = () => {
  return (
    <SectionContainer>
      <Typography variant="h2" sx={{ marginTop: "40px" }}>
        Study Features
      </Typography>
      <FeatureOverviewNavMenu />
      <FeatureOverviewNavContent />
    </SectionContainer>
  );
};
export default FeatureOverviewSection;
