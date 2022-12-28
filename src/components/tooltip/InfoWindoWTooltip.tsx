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

  const showTooltip = selectedMarker.lat === position?.lat && selectedMarker?.lng === position?.lng;

  return (
    <>
      {showTooltip && (
        <InfoWindow position={position} onCloseClick={() => dispatch(initSelectedMarker())}>
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
