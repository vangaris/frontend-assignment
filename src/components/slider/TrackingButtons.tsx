import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import {
  setAnimationPlayer,
  setCurrentStep,
  setShowClusterer,
} from "../../features/animation/animationSlice";
import { Box, IconButton } from "@material-ui/core";
import { Pause, PlayArrow, Replay } from "@mui/icons-material";

const TrackingButtons = () => {
  const dispatch = useAppDispatch();

  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const currentStep = useAppSelector((state) => state.animation.currentStep);
  const animationControllerStatus = useAppSelector((state) => state.animation.status);
  const LastLocation = vesselInfo.length - 1;
  const isLastLocation = currentStep === LastLocation;

  const handlePause = () => {
    if (animationControllerStatus === "initial" || animationControllerStatus === "pause") {
      dispatch(setShowClusterer(false));
      return dispatch(setAnimationPlayer("play"));
    }
    dispatch(setAnimationPlayer("pause"));
  };

  const handleReplay = () => {
    dispatch(setCurrentStep(0));
    dispatch(setAnimationPlayer("play"));
  };
  return (
    <Box>
      {isLastLocation ? (
        <IconButton onClick={handleReplay} color="primary">
          <Replay fontSize="inherit" />
        </IconButton>
      ) : (
        <IconButton onClick={handlePause} color="primary">
          {animationControllerStatus === "initial" || animationControllerStatus === "pause" ? (
            <PlayArrow fontSize="inherit" />
          ) : (
            <Pause fontSize="inherit" />
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default TrackingButtons;
