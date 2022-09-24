import classes from "./credits.module.css";
import { creditsData } from "./credits-data";
import logo from "../../images/logo.png";
const Credits = () => {
  const renderReadyCreditsData = creditsData.map((data, index) => {
    return (
      <div
        className={classes.imageContainer}
        key={`${data.desciption} ${index} key`}
      >
        <img
          className={classes.styledImage}
          src={data.photo}
          alt={data.desciption}
        />
        <p className={classes.photoDescription}>
          Photo by <b>{data.author}</b> on{" "}
          <a href={data.link} className={classes.unsplashLink}>
            Unsplash
          </a>
        </p>
      </div>
    );
  });

  return (
    <div className={classes.mainContainer}>
      <div className={classes.gridContainer}>
        {renderReadyCreditsData}
        <div className={classes.imageContainer} key="logo">
          <img
            className={classes.styledImage}
            src={logo}
            alt={"french flag logo"}
          />
          <p className={classes.photoDescription}>
            Created by Freepik from{" "}
            <a
              href={
                "https://www.flaticon.com/free-icon/france_3013904?term=france&page=1&position=13&page=1&position=13&related_id=3013904&origin=search"
              }
              className={classes.unsplashLink}
            >
              Flaticon
            </a>
          </p>
        </div>{" "}
      </div>
    </div>
  );
};

export default Credits;
