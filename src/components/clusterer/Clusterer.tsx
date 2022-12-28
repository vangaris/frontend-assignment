import { MarkerClusterer, MarkerF } from "@react-google-maps/api";
import InfoWindoWTooltip from "../tooltip/InfoWindoWTooltip";
import { useInfoWindow } from "../tooltip/hooks";

export const Clusterer = () => {
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
                  <InfoWindoWTooltip
                    position={{ lat: Number(marker?.LAT), lng: Number(marker?.LON) }}
                  />
                </MarkerF>
              ))}
            </>
          )}
        </MarkerClusterer>
      )}
    </>
  );
};
