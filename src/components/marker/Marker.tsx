import React, { useMemo } from "react";
import { MarkerF } from "@react-google-maps/api";
import InfoWindoWTooltip from "../tooltip/InfoWindoWTooltip";

import { useInfoWindow } from "../tooltip/hooks";

const ship = "https://www.svgrepo.com/show/433795/steamship-sf.svg";

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
