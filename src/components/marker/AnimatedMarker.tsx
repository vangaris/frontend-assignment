import React, { memo } from "react";
import { MarkerF } from "@react-google-maps/api";
import InfoWindoWTooltip from "../tooltip/InfoWindoWTooltip";

import { useInfoWindow } from "../tooltip/hooks";

const ship = "https://www.svgrepo.com/show/433795/steamship-sf.svg";
const AnimatedMarker = () => {
  const { handleOnClick, animatedPositions, currentMarker, selectedMarker } = useInfoWindow();
  const showTooltip =
    selectedMarker.lat === Number(currentMarker?.LAT) &&
    selectedMarker?.lng === Number(currentMarker?.LON);

  const icon = {
    url: ship,
    scaledSize: new window.google.maps.Size(32, 32),
  };

  return (
    <>
      <MarkerF
        icon={icon}
        onClick={() => handleOnClick(animatedPositions)}
        position={animatedPositions}
      >
        {showTooltip && <InfoWindoWTooltip marker={currentMarker} />}
      </MarkerF>
    </>
  );
};

export default memo(AnimatedMarker);
