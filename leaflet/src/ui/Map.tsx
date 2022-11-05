import {
  LatLngBoundsExpression,
  LatLngExpression
} from "leaflet";
import {
  MapContainer
} from "react-leaflet";
import { useRef } from "react";
import {
  CENTER, DEFAULT_ZOOM, MAX_BOUNDS_VISCOUSITY, ONE_MAP_BOUNDS
} from "../constants";
import MapLayer from "./MapLayer";
const Map = () => {
  const renderCounter = useRef(0);
  renderCounter.current += 1;
  return (
    <>
      <div data-testid={`render-count-map-${renderCounter.current}`} />
      <MapContainer
        center={[CENTER.x, CENTER.y] as LatLngExpression}
        zoom={DEFAULT_ZOOM}
        maxBounds={ONE_MAP_BOUNDS as LatLngBoundsExpression}
        maxBoundsViscosity={MAX_BOUNDS_VISCOUSITY}
      >
        <MapLayer />
      </MapContainer>
    </>
  );
};
export default Map;
