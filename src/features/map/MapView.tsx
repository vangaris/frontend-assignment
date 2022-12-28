import { GoogleMap, Polyline, useLoadScript } from "@react-google-maps/api";
import "./styles/map.style.css";
import Loader from "../../components/loader/Loader";
import Marker from "../../components/marker/Marker";
import useVessel from "./hooks";
import AnimationController from "../animation/AnimationController";
import { styleOptions } from "./styles/styles";
import { Clusterer } from "../../components/clusterer/Clusterer";
import Modal from "../../components/modal/Modal";

const MapView = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API || "",
  });

  const { center, currentZoom, path } = useVessel();

  if (!isLoaded) return <Loader />;
  return (
    <>
      <GoogleMap zoom={currentZoom} center={center} mapContainerClassName="map-container">
        <Polyline path={path} options={styleOptions} />
        <Marker />
        <Clusterer />
        <AnimationController />
      </GoogleMap>
      <Modal />
    </>
  );
};

export default MapView;
