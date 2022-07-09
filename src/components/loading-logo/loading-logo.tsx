import { styled } from "@mui/material/styles";
import logo from "../../images/logo.png";
import { useState } from "react";

const BarContainer = styled("div", {
  name: "BarContainer",
  slot: "Wrapper",
})({
  minWidth: "37.5px",
  width: "37.5px",
  maxWidth: "37.5px",
  minHeight: "200px",
  maxHeight: "200px",
  position: "absolute",
  backgroundColor: "black",
  border: "none",
  top: "0px",
  transition: "all 1s",
  zIndex: 13,
});
const BarContainerReversed = styled("div", {
  name: "BarContainerReversed",
  slot: "Wrapper",
})({
  minWidth: "37.5px",
  width: "37.5px",
  maxWidth: "37.5px",
  minHeight: "200px",
  maxHeight: "200px",
  position: "absolute",
  backgroundColor: "black",
  border: "none",
  top: "-250px",
  transition: "all 1s",
  zIndex: 13,
});

const LogoContainer = styled("div", {
  name: "LogoContainer",
  slot: "Wrapper",
})({
  minWidth: "300px",
  maxWidth: "300px",
  minHeight: "200px",
  maxHeight: "200px",
  position: "relative",
  margin: "auto",
  backgroundImage: `url(${logo})`,
  backgroundPosition: "center",
  backgroundSize: "cover",
  zIndex: 12,
});

const LoadingAnimation = () => {
  interface BarDatabase {
    id: number;
    active: boolean;
  }

  let initialSectionsData: BarDatabase[] = [
    { id: 0, active: false },
    { id: 1, active: false },
    { id: 2, active: false },
    { id: 3, active: false },
    { id: 4, active: false },
    { id: 5, active: false },
    { id: 6, active: false },
    { id: 7, active: false },
  ];
  const [sectionsData, setSectionsData] = useState(initialSectionsData);
  const [activeNumber, setActiveNumber] = useState(-2);
  const [reverseActive, setReverseActive] = useState(false);
  const [mappedData, setMappedData] = useState<any[]>();
  const [intialLoad, setInitialLoad] = useState(false);

  const moveOutBarHandler = () => {
    const copyOfSectionData = JSON.parse(JSON.stringify(sectionsData));
    // creating a copy of the database so we can update the original as we loop through without updating something that is being iterated over
    let mappedData = sectionsData.map((data: BarDatabase, index: number) => {
      let leftOffset = `${index * 37.5}px`;

      if (index === sectionsData.length - 1) {
        // at the end of the array

        if (activeNumber === data.id) {
          // check if the activeNumber is on the last entry
          copyOfSectionData[index] = { id: +index, active: true };
          setSectionsData(copyOfSectionData);
          setActiveNumber(activeNumber + 1);
          return (
            <BarContainer
              key={index}
              sx={{
                left: `${leftOffset}`,
              }}
            />
          );
        } else {
          // active number is not on the last entry then increment it by one and push the copy array

          if (!intialLoad) {
            setInitialLoad(true);
          }

          if (activeNumber === sectionsData.length) {
            // triggering the animation for the final time
            setSectionsData(copyOfSectionData);
            setActiveNumber(activeNumber + 1);
            return (
              <BarContainer
                key={index}
                sx={{
                  left: `${leftOffset}`,

                  top: "-250px",
                }}
              />
            );
          } else {
            setSectionsData(copyOfSectionData);
            setActiveNumber(activeNumber + 1);
            return (
              <BarContainer
                key={index}
                sx={{
                  left: `${leftOffset}`,
                }}
              />
            );
          }
        }
      } else {
        //not at the end of the array
        if (activeNumber === data.id) {
          copyOfSectionData[index] = { id: +index, active: true };
          //setting the animation to trigger for the previous instance on the next call through
          return (
            <BarContainer
              key={index}
              sx={{
                left: `${leftOffset}`,
              }}
            />
          );
        } else {
          if (data.active) {
            //if an animation has already triggered then move it out of the way
            return (
              <BarContainer
                key={index}
                sx={{ left: `${leftOffset}`, top: "-250px" }}
              />
            );
          } else {
            //if an animation needs to be triggered then leave it down
            return <BarContainer key={index} sx={{ left: `${leftOffset}` }} />;
          }
        }
      }
    });
    setMappedData(mappedData);
  };

  const moveInBarHandler = () => {
    const copyOfSectionData = JSON.parse(JSON.stringify(sectionsData));
    // creating a copy of the database so we can update the original as we loop through without updating something that is being iterated over
    let mappedData = sectionsData.map((data: BarDatabase, index: number) => {
      let leftOffset = `${index * 37.5}px`;

      if (index === sectionsData.length - 1) {
        // at the end of the array

        if (activeNumber === data.id) {
          // check if the activeNumber is on the last entry
          copyOfSectionData[index] = { id: +index, active: false };
          setSectionsData(copyOfSectionData);
          setActiveNumber(activeNumber - 1);
          return (
            <BarContainerReversed
              key={index}
              sx={{
                left: `${leftOffset}`,
              }}
            />
          );
        } else {
          // active number is not on the last entry then decrease it by one and push the copy array

          setSectionsData(copyOfSectionData);
          setActiveNumber(activeNumber - 1);
          return (
            <BarContainerReversed
              key={index}
              sx={{
                left: `${leftOffset}`,
                top: "0px",
              }}
            />
          );
        }
      } else {
        //not at the end of the array
        // still need to check if the activeNumber is at -1 if so then we need to trigger the final pull down animation
        if (activeNumber === -2 && index === 0) {
          return (
            <BarContainerReversed
              key={index}
              sx={{ left: `${leftOffset}`, top: "0px" }}
            />
          );
        }
        // else then this will happen

        if (activeNumber === data.id) {
          copyOfSectionData[index] = { id: +index, active: false };
          //setting the animation to trigger for the previous instance on the next call through
          return (
            <BarContainerReversed
              key={index}
              sx={{
                left: `${leftOffset}`,
              }}
            />
          );
        } else {
          if (!data.active) {
            //if an animation is to be triggered then move it down
            return (
              <BarContainerReversed
                key={index}
                sx={{ left: `${leftOffset}`, top: "0px" }}
              />
            );
          } else {
            //if an animation needs to be triggered then leave it up
            return (
              <BarContainerReversed
                key={index}
                sx={{ left: `${leftOffset}` }}
              />
            );
          }
        }
      }
    });
    setMappedData(mappedData);
  };

  if (activeNumber !== sectionsData.length + 1 && activeNumber !== -2) {
    if (!reverseActive) {
      setTimeout(moveOutBarHandler, 1000);
    } else {
      setTimeout(moveInBarHandler, 1000);
    }
    // takes a total of 9s per direction to finish,
    //  since the first iteration just sets up the animation to trigger
  }
  if (activeNumber === sectionsData.length + 1 && !reverseActive) {
    setReverseActive(true);
    setActiveNumber(sectionsData.length - 1);
  }
  if (activeNumber === -2) {
    setActiveNumber(0);
    setReverseActive(false);
  }

  return (
    <LogoContainer sx={{ opacity: `${intialLoad ? 1 : 0}` }}>
      {activeNumber !== sectionsData.length + 1 && mappedData}
    </LogoContainer>
  );
};
export default LoadingAnimation;
