import {
  GoogleMap,
  Polyline,
  useLoadScript,
  MarkerClusterer,
  MarkerF,
  // Circle,
} from "@react-google-maps/api";
import "./map.style.css";
import Loader from "../../components/loader/Loader";
import Marker from "../../components/marker/Marker";
import useLocations from "./hooks";
import AnimationController from "../animation/AnimationController";
import { styleOptions } from "./styles";

const MapView = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAnEpSSdXxpfEMbiSTRfIPTHg86rDS20U0", // TODO: add env var
  });

  const { vesselInfo, center, currentZoom, path } = useLocations();

  if (!isLoaded) return <Loader />;
  return (
    <GoogleMap zoom={currentZoom} center={center} mapContainerClassName="map-container">
      <Polyline path={path} options={styleOptions} />
      {/* <Circle center={center} radius={15000} options={closeOptions} /> */}
      <Marker />
      <MarkerClusterer>
        {(clusterer) => (
          <div>
            <>
              {console.log(clusterer)}
              {vesselInfo?.map((marker) => (
                <MarkerF
                  key={marker.LAT}
                  position={{ lat: Number(marker?.LAT), lng: Number(marker?.LON) }}
                  clusterer={clusterer}
                />
              ))}
            </>
          </div>
        )}
      </MarkerClusterer>
      <AnimationController />
    </GoogleMap>
  );
};

export default MapView;

const defaultOptions = {
  strokeOpacity: 0.5,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
};
const closeOptions = {
  ...defaultOptions,
  zIndex: 3,
  fillOpacity: 0.05,
  strokeColor: "#8BC34A",
  fillColor: "#8BC34A",
};
