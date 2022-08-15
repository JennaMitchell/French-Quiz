import {
  TopContainer,
  ConstructionInfoContainer,
  StyledConstructionIcon,
  ConstructionTextContainer,
} from "./scenarios-main-styled-components";
import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { mainStoreSliceActions } from "../../store/store";
const ScenariosMainPage = () => {
  const dispatch = useAppDispatch();
  const activePage = useAppSelector((state) => state.mainStore.activePage);

  // useEffect
  useEffect(() => {
    if (activePage !== "Scenarios") {
      dispatch(mainStoreSliceActions.setActivePage("Scenarios"));
    }
  });

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
