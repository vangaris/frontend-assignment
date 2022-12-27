import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import { setAnimationPlayer, setCurrentStep } from "../../features/animation/animationSlice";
import { Box, IconButton } from "@material-ui/core";
import { Pause, PlayArrow, Replay } from "@mui/icons-material";

const TrackingButtons = () => {
  const dispatch = useAppDispatch();

  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const currentStep = useAppSelector((state) => state.animation.currentStep);
  const animationControllerStatus = useAppSelector((state) => state.animation.status);
  const LastLocation = vesselInfo.length - 1;
  const isLastLocation = currentStep === LastLocation;

  const handlePauseClick = () => {
    if (animationControllerStatus === "initial" || animationControllerStatus === "pause") {
      return dispatch(setAnimationPlayer("play"));
    }

    dispatch(setAnimationPlayer("pause"));
  };

  const handleReplayClick = () => {
    dispatch(setCurrentStep(0));
    dispatch(setAnimationPlayer("play"));
  };
  return (
    <Box>
      {isLastLocation ? (
        <IconButton onClick={handleReplayClick} color="primary">
          <Replay fontSize="inherit" />
        </IconButton>
      ) : (
        <IconButton onClick={handlePauseClick} color="primary">
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
