import { useCallback } from "react";
import { Box, Typography } from "@material-ui/core";
import { formattedDate } from "../../features/map/utils";
import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import CustomCheckbox from "../form/checkbox/CheckBox";
import { setShowClusterer } from "../../features/animation/animationSlice";

const TrackingInfo = () => {
  const dispatch = useAppDispatch();
  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const currentStep = useAppSelector((state) => state.animation.currentStep);
  const showClusterer = useAppSelector((state) => state.animation.showClusterer);

  const handleChange = useCallback(() => {
    dispatch(setShowClusterer(!showClusterer));
  }, [dispatch, showClusterer]);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        marginTop: 5,
      }}
    >
      <Box>
        <Typography variant="h6" align="center">
          Tracking Ship ID: {vesselInfo[currentStep]?.SHIP_ID}
        </Typography>
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <CustomCheckbox label="Show Clusterer" handleChange={handleChange} />
        <Typography>Time: {formattedDate(vesselInfo[currentStep]?.TIMESTAMP)}</Typography>
        <Typography>Speed:{vesselInfo[currentStep]?.SPEED} </Typography>
        <Typography>latitude: {vesselInfo[currentStep]?.LAT} </Typography>
        <Typography>longitude: {vesselInfo[currentStep]?.LON}</Typography>
      </Box>
    </Box>
  );
};

export default TrackingInfo;
