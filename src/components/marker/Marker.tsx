import React from "react";
import { MarkerF } from "@react-google-maps/api";
import InfoWindoWTooltip from "../tooltip/InfoWindoWTooltip";
import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import { setZoom, setCenter, selectMarker, PositionType } from "../../features/map/vesselSlice";
import { ship } from "../../constants/map";

const Marker = () => {
  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const currentZoom = useAppSelector((state) => state.vessel.zoom);
  const currentStep = useAppSelector((state) => state.animation.currentStep);

  const dispatch = useAppDispatch();

  const animatedPositions = {
    lat: Number(vesselInfo[currentStep]?.LAT),
    lng: Number(vesselInfo[currentStep]?.LON),
  };

  const handleOnClick = (selectedPosition: PositionType) => {
    dispatch(selectMarker(selectedPosition));
    dispatch(setCenter(selectedPosition));
    if (currentZoom >= 10) dispatch(setZoom(10));
  };
  return (
    <MarkerF
      icon={{
        url: ship,
        scaledSize: new window.google.maps.Size(32, 32),
      }}
      onClick={() => handleOnClick(animatedPositions)}
      position={animatedPositions}
    >
      <InfoWindoWTooltip />
    </MarkerF>
  );
};

export default Marker;
