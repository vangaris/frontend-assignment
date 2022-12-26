import { Box, Typography } from "@material-ui/core";
import { formattedDate } from "../../features/map/utils";
import { useAppSelector } from "../../features/map/hooks";

const TrackingInfo = () => {
  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const currentStep = useAppSelector((state) => state.animation.currentStep);

  return (
    <Box>
      <Typography align="center" variant="h6">
        Tracking
      </Typography>
      <Typography align="center">
        Time: {formattedDate(vesselInfo[currentStep]?.TIMESTAMP)}
      </Typography>
      <Typography align="center">Speed: {vesselInfo[currentStep]?.SPEED}</Typography>
    </Box>
  );
};

export default TrackingInfo;
