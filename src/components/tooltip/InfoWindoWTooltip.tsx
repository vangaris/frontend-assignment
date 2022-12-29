import { InfoWindow } from "@react-google-maps/api";
import { formattedDate } from "../../features/map/utils";
import "./infoWindoWTooltip.style.css";
import { useAppDispatch } from "../../features/map/hooks";
import { initSelectedMarker } from "../../features/map/vesselSlice";
import { VesselTrackType } from "../../types/vessel";
import { memo } from "react";
type PropsTypes = {
  marker?: VesselTrackType;
};

const InfoWindoWTooltip = ({ marker }: PropsTypes) => {
  const dispatch = useAppDispatch();

  return (
    <>
      {marker?.LAT && (
        <InfoWindow
          position={{ lat: Number(marker?.LAT), lng: Number(marker?.LON) }}
          onCloseClick={() => dispatch(initSelectedMarker())}
        >
          <ul className="ship-list">
            {Object.entries(marker)
              .map(([key, value]) => ({ key, value }))
              .map((ship, idx) => (
                <li className="ship-list-item" key={idx}>
                  <span className="ship-label">{ship.key}:</span>
                  <span className="ship-value">
                    {ship.key === "TIMESTAMP" ? formattedDate(ship.value) : ship.value}
                  </span>
                </li>
              ))}
          </ul>
        </InfoWindow>
      )}
    </>
  );
};

export default memo(InfoWindoWTooltip);
