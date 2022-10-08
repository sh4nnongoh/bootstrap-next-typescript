import { bounds, PointExpression } from "leaflet";
export const ONE_MAP_URL = "https://maps-{s}.onemap.sg/v3/Default/{z}/{x}/{y}.png";
// eslint-disable-next-line max-len
export const ATTRIBUTION = "<img src=\"https://www.onemap.gov.sg/docs/maps/images/oneMap64-01.png\" style=\"height:20px;width:20px;\"/> OneMap | Map data &copy; contributors, <a href=\"http://SLA.gov.sg\">Singapore Land Authority</a>" as string;
export const ONE_MAP_BOUNDS = [[1.492, 104.11], [1.16, 103.6]] as PointExpression[];
export const CENTER = bounds(ONE_MAP_BOUNDS[0], ONE_MAP_BOUNDS[1]).getCenter();
export const MAX_ZOOM = 18;
export const MIN_ZOOM = 12;
export const DEFAULT_ZOOM = 12;
export const MAP_CLICK_ZOOM = 15;
export const MAX_BOUNDS_VISCOUSITY = 1;
export const ALT_TEXT_MAP_PRIMARY_PIN = "primary-pin";
