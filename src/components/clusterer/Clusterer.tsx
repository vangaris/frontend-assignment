import { MarkerClusterer, MarkerF } from "@react-google-maps/api";
import InfoWindoWTooltip from "../tooltip/InfoWindoWTooltip";
import { useInfoWindow } from "../tooltip/hooks";
import { memo } from "react";

const Clusterer = () => {
  const { vessel, handleOnClick, showClusterer } = useInfoWindow();

  return (
    <>
      {showClusterer && (
        <MarkerClusterer>
          {(clusterer) => (
            <>
              {vessel?.map((marker) => (
                <MarkerF
                  key={marker.TIMESTAMP}
                  position={{ lat: Number(marker?.LAT), lng: Number(marker?.LON) }}
                  clusterer={clusterer}
                  onClick={() =>
                    handleOnClick({ lat: Number(marker?.LAT), lng: Number(marker?.LON) })
                  }
                >
                  <InfoWindoWTooltip marker={marker} />
                </MarkerF>
              ))}
            </>
          )}
        </MarkerClusterer>
      )}
    </>
  );
};

export default memo(Clusterer);
