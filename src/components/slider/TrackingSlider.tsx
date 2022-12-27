import { Box, Button, Divider, Slider, Stack } from "@mui/material";
import { WhereToVote } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import { setAnimationPlayer, setCurrentStep } from "../../features/animation/animationSlice";
import TrackingButtons from "./TrackingButtons";

const TrackingSlider = () => {
  const currentStep = useAppSelector((state) => state.animation.currentStep);
  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const dispatch = useAppDispatch();

  const LastLocation = vesselInfo.length - 1;

  const handleChange = (_event: any, value: any) => {
    dispatch(setCurrentStep(value));
  };

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
          <Box marginRight={2} display="flex" flexDirection="column">
            <Button
              onClick={() => {
                dispatch(setCurrentStep(0));
                dispatch(setAnimationPlayer("initial"));
              }}
              variant="outlined"
            >
              reset
            </Button>
          </Box>
          <Slider value={currentStep} onChange={handleChange} marks min={0} max={LastLocation} />
          <Box marginLeft={2}>
            <Button
              onClick={() => dispatch(setCurrentStep(LastLocation))}
              variant="outlined"
              startIcon={<WhereToVote />}
            >
              end
            </Button>
          </Box>
        </Box>
      </Box>
    </Stack>
  );
};

export default TrackingSlider;
