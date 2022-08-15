import {
  TopContainer,
  ConstructionInfoContainer,
  StyledConstructionIcon,
  ConstructionTextContainer,
} from "./scenarios-main-styled-components";

const ScenariosMainPage = () => {
  return (
    <TopContainer>
      <ConstructionInfoContainer>
        <StyledConstructionIcon />
        <ConstructionTextContainer>
          This feature is currently under development. Please check back later.
        </ConstructionTextContainer>
      </ConstructionInfoContainer>
    </TopContainer>
  );
};
export default ScenariosMainPage;
