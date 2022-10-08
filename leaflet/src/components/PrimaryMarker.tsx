import {
  Icon, LatLngExpression, point
} from "leaflet";
import { FC, useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { ALT_TEXT_MAP_PRIMARY_PIN, MAP_CLICK_ZOOM } from "../constants";
const PrimaryMarker: FC = () => {
  const [primaryPin, setPrimaryPin] = useState<LatLngExpression | null>(null);
  const map = useMapEvents({
    click(event) {
      const { layerPoint } = event;
      const offsetLayerPoint = point(layerPoint.x - 18, layerPoint.y - 30);
      const latlng = map.layerPointToLatLng(offsetLayerPoint);
      setPrimaryPin(latlng);
      map.flyTo(latlng, MAP_CLICK_ZOOM);
    }
  });
  return (
    <>
      {null}
      {primaryPin && (
      <Marker
        alt={ALT_TEXT_MAP_PRIMARY_PIN}
        icon={new Icon({
          iconUrl: "/primary-pin.png"
        })}
        position={primaryPin}
      />
      )}
    </>
  );
};
export default PrimaryMarker;
