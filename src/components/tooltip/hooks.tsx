import { useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import { setZoom, setCenter, selectMarker, PositionType } from "../../features/map/vesselSlice";

export const useInfoWindow = () => {
  const dispatch = useAppDispatch();

  const vessel = useAppSelector((state) => state.vessel.vessel);
  const animationStatus = useAppSelector((state) => state.animation.status);
  const currentStep = useAppSelector((state) => state.animation.currentStep);
  const currentZoom = useAppSelector((state) => state.vessel.zoom);
  const showClusterer = useAppSelector((state) => state.animation.showClusterer);

  const currentMarker = vessel[currentStep];

  const handleOnClick = useCallback(
    (selectedPosition: PositionType) => {
      dispatch(selectMarker(selectedPosition));
      dispatch(setCenter(selectedPosition));
      if (currentZoom >= 10) dispatch(setZoom(10));
    },
    [currentZoom, dispatch]
  );

  const animatedPositions = useMemo(
    () => ({
      lat: Number(vessel[currentStep]?.LAT),
      lng: Number(vessel[currentStep]?.LON),
    }),
    [currentStep, vessel]
  );

  return {
    vessel,
    handleOnClick,
    showClusterer,
    animationStatus,
    animatedPositions,
    currentMarker,
  };
};
