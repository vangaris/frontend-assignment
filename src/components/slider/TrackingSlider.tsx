import { Box, Button, Divider, Slider, Stack } from "@mui/material";
import { WhereToVote } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import {
  setAnimationPlayer,
  setCurrentStep,
  setShowClusterer,
} from "../../features/animation/animationSlice";
import TrackingButtons from "./TrackingButtons";

const TrackingSlider = () => {
  const currentStep = useAppSelector((state) => state.animation.currentStep);
  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const dispatch = useAppDispatch();

  const LastLocation = vesselInfo.length - 1;

  const handleCheckBoxChange = (_event: any, value: any) => {
    dispatch(setCurrentStep(value));
  };

  const handleReset = () => {
    dispatch(setCurrentStep(0));
    dispatch(setAnimationPlayer("initial"));
    dispatch(setShowClusterer(true));
  };

  const handleEnd = () => dispatch(setCurrentStep(LastLocation));

  return (
    <Stack
      direction="row"
      justifyContent="space-evenly"
      alignItems="end"
      divider={<Divider orientation="vertical" flexItem />}
    >
      <TrackingButtons />
      <Box style={{ width: "100%" }} display="flex" flexDirection="column" height="40px">
        <Box display="flex" alignItems="center" padding="0 5px 0 5px">
          <Box marginRight="25px" display="flex" flexDirection="column">
            <Button onClick={handleReset} variant="outlined">
              reset
            </Button>
          </Box>
          <Slider
            value={currentStep}
            onChange={handleCheckBoxChange}
            marks
            min={0}
            max={LastLocation}
          />
          <Box marginLeft="20px">
            <Button onClick={handleEnd} variant="outlined" startIcon={<WhereToVote />}>
              end
            </Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default TrackingSlider;
