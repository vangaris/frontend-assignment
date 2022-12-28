import React, { useMemo } from "react";
import { MarkerF } from "@react-google-maps/api";
import InfoWindoWTooltip from "../tooltip/InfoWindoWTooltip";

import { ship } from "../../features/map/constants/map";
import { useInfoWindow } from "../tooltip/hooks";

const Marker = () => {
  const { handleOnClick, animatedPositions } = useInfoWindow();
  const memoizedIcon = useMemo(
    () => ({
      url: ship,
      scaledSize: new window.google.maps.Size(32, 32),
    }),
    []
  );

  return (
    <>
      <MarkerF
        icon={memoizedIcon}
        onClick={() => handleOnClick(animatedPositions)}
        position={animatedPositions}
      >
        <InfoWindoWTooltip position={animatedPositions} />
      </MarkerF>
    </>
  );
};

export default Marker;
