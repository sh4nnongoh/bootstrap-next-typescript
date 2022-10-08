import {
  LatLngBoundsExpression
} from "leaflet";
import { useRef } from "react";
import {
  TileLayer
} from "react-leaflet";
import {
  ATTRIBUTION, MAX_ZOOM, MIN_ZOOM, ONE_MAP_BOUNDS, ONE_MAP_URL
} from "../constants";
import PrimaryMarker from "./PrimaryMarker";
const MapLayer = () => {
  const renderCounter = useRef(0);
  renderCounter.current += 1;
  return (
    <>
      <div data-testid={`render-count-map-layer-${renderCounter.current}`} />
      <TileLayer
        attribution={ATTRIBUTION}
        url={ONE_MAP_URL}
        detectRetina
        maxZoom={MAX_ZOOM}
        minZoom={MIN_ZOOM}
        bounds={ONE_MAP_BOUNDS as LatLngBoundsExpression}
      />
      <PrimaryMarker />
    </>
  );
};
export default MapLayer;
