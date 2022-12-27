import { Box, Typography } from "@material-ui/core";
import { formattedDate } from "../../features/map/utils";
import { useAppSelector } from "../../features/map/hooks";

const TrackingInfo = () => {
  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const currentStep = useAppSelector((state) => state.animation.currentStep);

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
        <Typography>Time: {formattedDate(vesselInfo[currentStep]?.TIMESTAMP)}</Typography>
        <Typography>Speed:{vesselInfo[currentStep]?.SPEED} </Typography>
        <Typography>latitude: {vesselInfo[currentStep]?.LAT} </Typography>
        <Typography>longitude: {vesselInfo[currentStep]?.LON}</Typography>
      </Box>
    </Box>
  );
};

export default TrackingInfo;
