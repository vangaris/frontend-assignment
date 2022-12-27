import { useEffect, useRef } from "react";

import { useAppDispatch, useAppSelector } from "../map/hooks";
import { setCurrentStep } from "./animationSlice";
import { setAnimationPlayer } from "./animationSlice";
import TrackingSlider from "../../components/slider/TrackingSlider";
import TrackingInfo from "../../components/slider/TrackingInfo";
import { SliderWrapper } from "../../components/slider/SliderWrapper";
import FormVessel from "../../components/form/FormVessel";
import ErrorBoundary from "../../components/errorBoundary/ErrorBoundary";
import { setModal } from "../map/vesselSlice";

const AnimationController = () => {
  const dispatch = useAppDispatch();
  const animationControllerStatus = useAppSelector((state) => state.animation.status);
  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const currentStep = useAppSelector((state) => state.animation.currentStep);
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (currentStep === vesselInfo.length - 1) {
      dispatch(setAnimationPlayer("repeat"));
    }
  }, [currentStep, dispatch, vesselInfo.length]);

  useEffect(() => {
    if (animationControllerStatus === "play") {
      intervalRef.current = setInterval(() => {
        dispatch(setCurrentStep(currentStep + 1));
      }, 1000);
    }

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [animationControllerStatus, currentStep, dispatch]);

  return (
    <ErrorBoundary
      fallback={<div>An error occurred. Please try again later.</div>}
      onError={(error, errorInfo) => {
        dispatch(setModal(true));
      }}
    >
      <SliderWrapper>
        <TrackingInfo />
        <TrackingSlider />
        <FormVessel />
      </SliderWrapper>
    </ErrorBoundary>
  );
};

export default AnimationController;
