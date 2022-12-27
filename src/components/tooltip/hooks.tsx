import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import { setZoom, setCenter, selectMarker, PositionType } from "../../features/map/vesselSlice";

export const useInfoWindow = () => {
  const dispatch = useAppDispatch();

  const vessel = useAppSelector((state) => state.vessel.vessel);
  const animationStatus = useAppSelector((state) => state.animation.status);
  const currentStep = useAppSelector((state) => state.animation.currentStep);
  const currentZoom = useAppSelector((state) => state.vessel.zoom);

  const handleOnClick = (selectedPosition: PositionType) => {
    dispatch(selectMarker(selectedPosition));
    dispatch(setCenter(selectedPosition));
    if (currentZoom >= 10) dispatch(setZoom(10));
  };

  const isClusterVisible =
    animationStatus === "initial" || (currentStep === 0 && animationStatus === "pause");

  const animatedPositions = {
    lat: Number(vessel[currentStep]?.LAT),
    lng: Number(vessel[currentStep]?.LON),
  };

  return { vessel, handleOnClick, isClusterVisible, animationStatus, animatedPositions };
};
