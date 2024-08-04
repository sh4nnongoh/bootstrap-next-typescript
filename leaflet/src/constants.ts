import { bounds, PointExpression } from 'leaflet';
export const ONE_MAP_URL = 'https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png';
// eslint-disable-next-line max-len
export const ATTRIBUTION = '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>' as string;
export const ONE_MAP_BOUNDS = [[1.492, 104.11], [1.16, 103.6]] as PointExpression[];
export const CENTER = bounds(ONE_MAP_BOUNDS[0], ONE_MAP_BOUNDS[1]).getCenter();
export const MAX_ZOOM = 18;
export const MIN_ZOOM = 12;
export const DEFAULT_ZOOM = 12;
export const MAP_CLICK_ZOOM = 15;
export const MAX_BOUNDS_VISCOUSITY = 1;
export const ALT_TEXT_MAP_PRIMARY_PIN = 'primary-pin';
