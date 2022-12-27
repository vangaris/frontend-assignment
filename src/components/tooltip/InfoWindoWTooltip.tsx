import { InfoWindow } from "@react-google-maps/api";
import { formattedDate } from "../../features/map/utils";
import "./infoWindoWTooltip.style.css";
import { useAppDispatch, useAppSelector } from "../../features/map/hooks";
import { PositionType, initSelectedMarker } from "../../features/map/vesselSlice";
type PropsTypes = {
  position?: PositionType;
};

const InfoWindoWTooltip = ({ position }: PropsTypes) => {
  const dispatch = useAppDispatch();

  const vesselInfo = useAppSelector((state) => state.vessel.vessel);
  const selectedMarker = useAppSelector((state) => state.vessel.selectedMarker);
  const currentStep = useAppSelector((state) => state.animation.currentStep);

  const clusterCheck =
    selectedMarker.lat === position?.lat && selectedMarker?.lng === position?.lng;

  const markerCheck =
    selectedMarker.lat === Number(vesselInfo[currentStep]?.LAT) &&
    selectedMarker?.lng === Number(vesselInfo[currentStep]?.LON);

  const showTooltip = position ? clusterCheck : markerCheck;

  return (
    <>
      {showTooltip && (
        <InfoWindow
          position={
            position || {
              lat: Number(vesselInfo[currentStep]?.LAT),
              lng: Number(vesselInfo[currentStep]?.LON),
            }
          }
          onCloseClick={() => dispatch(initSelectedMarker())}
        >
          <ul className="ship-list">
            {Object.entries(vesselInfo[currentStep])
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

export default InfoWindoWTooltip;
